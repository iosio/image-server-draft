import React from 'react';

import {getBlobFromImage} from "../common/utils/fileHelpers";

export class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            blob: ''
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        getBlobFromImage(e.target.files[0]).then(({file, blob})=>{
            this.setState({
                file: file,
                blob: blob
            });

            this.props.onImageLoad && this.props.onImageLoad({file, blob});
        })
    }

    render() {
        let {blob} = this.state;
        let IMG = null;

        if (blob) {
            IMG = (<img src={blob} />);
        } else {
            IMG = (<div>select an Image for Preview</div>);
        }

        return (
            <div>
                <form onSubmit={(e)=>this._handleSubmit(e)}>

                    <input
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />

                    <button
                            type="submit"
                            onClick={(e)=>this.props.handleSubmit(e)}>
                        Upload Image
                    </button>

                </form>

                <div >
                    {IMG}
                </div>
            </div>
        )
    }
}
