export const downloader = (exportName, data) => {
    let a = document.createElement('a');
    a.setAttribute('href', data);
    a.setAttribute('download', exportName);
    document.body.appendChild(a);
    a.click();
    a.remove();
};


export const getData = (value, extension) => {
    // const textFileTypes = ['text','json', 'txt'];
    // const isText = (type)=>textFileTypes.includes(type);
    const imageFileTypes = ['jpeg', 'jpg', 'png', 'gif'];
    const isImage = (ext) => imageFileTypes.includes(ext);

    let data;

    if (isImage(extension)) {
        data = value;
    } else {
        let encoded = encodeURIComponent(JSON.stringify(value, null, 4));
        data = `data:text/${extension};charset=utf-8,${encoded}`
    }

    return data;
};


export const downloadFile = (filename, extension, value) => {
    let data = getData(value, extension);
    downloader(`${filename}.${extension}`, data);
};


// var canvas = document.getElementById('canvas-test');
// var image = document.getElementById('canvas-image');
// var button = document.getElementById('download-button');
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'blue';
// ctx.fillRect(10, 10, 100, 100);
//
// var img = canvas.toDataURL("image/png");
// image.src = img;
//
// var encodedUri = encodeURI(img);
// button.addEventListener('click', function () {
//     downloadCanvas(this, 'canvas-test', 'test.png');
// });
//
// function downloadCanvas(link, canvasId, filename) {
//     link.href = document.getElementById(canvasId).toDataURL();
//     link.download = filename;
// }