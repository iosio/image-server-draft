import React from 'react';
import {Capsule} from '@iosio/capsule';

// import {SocketTester} from "./components/SocketTester";
// import {ImageUploader} from "./components/ImageUploader";

import {FileUploadWrapper} from "./components/FileUploadWrapper";

import {socket} from "./common/socket";

import {processImagesForServer} from "./common/utils/fileHelpers";

export const App = Capsule({
    styles: () => ({
        dropArea: {
            background: '#eaf5ff'
        },
        dragEnter: {
            background: '#b4c1ff'
        }
    })
})(class App extends React.Component {

    constructor() {
        super();

        this.state = {
            imagePaths: []
        }
    }


    handleFiles = (files) => {

        processImagesForServer(files).then((imgObjArray) => {


            if (!imgObjArray || imgObjArray.length === 0) return;

            imgObjArray.forEach((obj) => {

                socket.request('saveImage', obj, (resp) => {

                    let imagePaths = this.state.imagePaths;

                    if (!resp.ok) {

                    } else {
                        imagePaths.push({name: resp.name, url: resp.url});
                        this.setState({imagePaths})
                    }


                })

            })


        })
    }

    render() {

        const {classes} = this.props;
        const {imagePaths} = this.state;

        return (
            <div className="App">

                {/*<SocketTester/>*/}
                {/*<FileUploadWrapper*/}
                {/*multiple*/}
                {/*onLoad={this.onLoad}*/}
                {/*dragEnterClass={classes.dragEnter}>*/}


                {/*<div className={classes.dropArea}*/}
                {/*style={{*/}
                {/*height: 500,*/}
                {/*width: 500,*/}
                {/*}}>*/}
                {/*click me*/}
                {/*</div>*/}


                <FileUploadWrapper
                    // multiple={true}
                    dragEnterClass={classes.dragEnter}
                    onLoad={this.handleFiles}>

                    <div className={classes.dropArea}
                         style={{
                             height: 200,
                             width: 500,
                         }}>
                        click me
                    </div>

                </FileUploadWrapper>


                {imagePaths.map((imgObj, i) => (
                    <img alt={'asdf'} src={imgObj.url} key={i}/>
                ))}

            </div>
        );
    }
});

