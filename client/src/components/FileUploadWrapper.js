import React from 'react';
import {Capsule} from '@iosio/capsule';

export const FileUploadWrapper = Capsule({
    styles: () => ({
        input: {
            '&::-webkit-file-upload-button': {
                visibility: 'hidden',
            },
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: '-1'
        },
    })
})(class DropArea extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.mounted = false;
        this.state = {
            draggingOver: false
        };

        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    _setState = (obj, cb) => {
        if (this.mounted) {
            this.setState(obj, () => cb && cb())
        }
    };


    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (!this.state.draggingOver) {
            this._setState({draggingOver: true});
        }

    }

    handleDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.state.draggingOver) {
            this._setState({draggingOver: false});
        }
    }

    handleDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.state.draggingOver) {
            this._setState({draggingOver: false});
        }

        this.props.onLoad && this.props.onLoad(evt);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.props.onLoad && this.props.onLoad(e);
    };

    handleClick = () => {
        if (this.inputRef.current) {
            this.inputRef.current.click()
        } else {
            this.inputRef.click()
        }
    };

    render() {
        const {
            cx,
            classes,
            multiple,
            dragEnterClass,
            children
        } = this.props;

        const {draggingOver} = this.state;

        const Trigger = children;

        if (!Trigger) return null;

        let triggerClassName = '';

        let joinedClassNames = '';

        if (Trigger.props && Trigger.props.className) {
            triggerClassName = Trigger.props.className;
            joinedClassNames = Trigger.props.className;
        }

        if (draggingOver) {
            joinedClassNames = cx(
                triggerClassName,
                dragEnterClass,
            );
        }

        const Trig = React.cloneElement(Trigger, {
            ...Trigger.props,
            className: joinedClassNames,
            onDragOver: this.handleDragOver,
            onDragLeave: this.handleDragLeave,
            onDrop: this.handleDrop,
            onClick: this.handleClick
        });

        return (
            <React.Fragment>
                <input
                    ref={r => this.inputRef = r}
                    multiple={multiple}
                    className={cx(classes.input)}
                    type="file"
                    onChange={(e) => this.handleChange(e)}/>
                {Trig}
            </React.Fragment>
        )
    }
});
