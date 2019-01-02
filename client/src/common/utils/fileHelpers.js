export const getFilesFromEvent = (evt) => {
    const files = evt.target.files || (evt.dataTransfer ? evt.dataTransfer.files : null);
    return [].slice.call(files);
};


const readAsDataURLAndProvideObject = (file) =>
    new Promise((resolve, reject) => {

        var reader = new FileReader();

        reader.onerror = () => reject(reader.error);
        reader.onloadend = () => resolve({
            name: file.name,
            content: reader.result
        });
        reader.readAsDataURL(file);
    });


export const readFilesAsDataURLs = (files = []) =>
    Promise.all(files.map(file => readAsDataURLAndProvideObject(file)));


const prepImage = (blob) => blob.split(',')[1];

export const prepImgObjsForTransfer = (objs) => objs.map(obj => ({
    name: obj.name,
    content: prepImage(obj.content)
}));


export const processImagesForServer = (evt) => {

    return readFilesAsDataURLs(getFilesFromEvent(evt))
        .then(objs =>
            prepImgObjsForTransfer(objs)
        );
};


/*

    if (files.length) {

        Promise.all(files.map(file => readAs(file, 'ArrayBuffer')))
            .then(arrayBuffers => onDropArrayBuffer(arrayBuffers, files));

        Promise.all(files.map(file => readAs(file, 'DataURL')))
            .then(dataURIs => onDropDataURI(dataURIs, files));
    }
 */