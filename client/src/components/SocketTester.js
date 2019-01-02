import React from 'react';
import {socket} from "../common/socket";
import {ImageUploader} from "./ImageUploader";
import {downloader, downloadFile} from "../common/utils/downloadFile";
import {getBlobFromImage} from "../common/utils/fileHelpers";
import {FileUploadWrapper} from "./FileUploadWrapper";

// socket.on('connect', () => {
//     console.log('-------connected')
// });
//
// socket.on('disconnect', () => {
//     console.log('-------disconnect')
// });
//
// socket.on('reconnecting', () => {
//     console.log('-------reconnecting')
// });
//
// socket.on('error', () => {
//     console.log('-------error')
// });


export class SocketTester extends React.Component {

    state = {
        message: '',
        response: '',
        send_response: '',
        test: '',

        docValue: '',
        files: [],
        images: []
    };


    componentDidMount() {

        // mitt.on('test2',(data)=>{
        //     this.setState({test: data})
        // })
        socket.on('send-response', (data) => {
            console.log('hard coded response to send')
            this.setState({send_response: data})
        })

    }

    onImageLoad = ({file, blob}) => {
        this.setState((state) => {

            state.images.push(blob);
            state.files.push(file);

            console.log(file);
            return {
                ...state,
                files: state.files,
                images: state.images
            }
        }, () => {
            console.log(this.state)
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();


        const data = {
            dir: 'templates',
            fileName: 'test.json',
            content: this.state.docValue,
            images: []
        };


        socket.request('saveFile', data, (data) => {


            this.setState({response: data.ok ? 'file saved' : 'error saving'});
        })

    };


    updateField = (value, field) => {
        this.setState({[field]: value});
    };

    request = () => {

        const data = {
            dir: 'templates',
            fileName: 'test.json',
            content: JSON.stringify({hello: 123}),
            images: []
        };


        socket.request('saveFile', data, (data) => {


            this.setState({response: data.ok ? 'file saved' : 'error saving'});
        })

    };

    saveImage = () => {
        if (!this.state.images[0]) return;

        const obj = {
            name: this.state.files[0].name,
            file: this.state.images[0].split(',')[1]
        };

        socket.request('saveImage', obj, (resp) => {
            this.setState({response: resp.ok ? 'image saved' : 'error saving'});
        })
    };

    send = () => {
        socket.send('send-response', {msg: this.state.message});
    };

    testDownload = () => {


        const img = this.state.images[0];

        downloadFile('test', 'jpeg', img)
    };

    render() {

        const {docValue, classes} = this.state;

        return (
            <div className="App">

                {/*<button onClick={() => socket.open()}>*/}
                    {/*open*/}
                {/*</button>*/}
                {/*<button onClick={() => socket.close()}>*/}
                    {/*close*/}
                {/*</button>*/}

                {/*Message:*/}
                {/*<input value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}/>*/}

                {/*<button onClick={this.send}>*/}
                    {/*send*/}
                {/*</button>*/}

                {/*<button onClick={this.request}>*/}
                    {/*request*/}
                {/*</button>*/}


                <button onClick={this.testDownload}>
                    download file
                </button>

                <button onClick={this.saveImage}>
                  save image
                </button>
                <br/>
                <br/>

                Response to request: {this.state.response}
                <br/>





                <br/>
                <br/>

                <h5>test document</h5>

                <textarea value={docValue} onChange={(e) => this.updateField(e.target.value, 'docValue')}>

                </textarea>

                <br/>
                <br/>

                <ImageUploader onImageLoad={this.onImageLoad} handleSubmit={this.handleSubmit}/>



                <FileUploadWrapper
                    dragEnterClass={classes.dragEnter}
                    onLoad={this.handleFiles}>

                    <div className={classes.dropArea}
                         style={{
                             height: 500,
                             width: 500,
                         }}>
                        click me
                    </div>

                </FileUploadWrapper>

                <img alt={'asdf'} src={'http://localhost:4000/uploads/thumbnail.jpg'}/>
            </div>
        );
    }
}

