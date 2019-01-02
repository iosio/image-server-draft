import {writeFile, mkdir} from "../db/fileDB";

import {fileConfig} from "../fileConfig";

const {imagesBasePath} = fileConfig;

export const saveFile = ({data}, res) => {

    const {dir, fileName, content, images} = data;

    const directory = dir + '/';

    mkdir(directory).then(err => {

        writeFile(directory + fileName, content).then(err => {
            res({ok: true});
        });
    });
};


export const saveImage = ({data}, res) => {

    // console.log(data.name)
    const path = 'images/' + data.name;
    const content = data.content;

    writeFile(path , Buffer(content, 'base64')).then(err => {
        if (err) {
            return res({ok: false});
        }
        res({
            ok: true,
            name: data.name,
            url: imagesBasePath + data.name
        });
    });

  // k  res({ok: false});

};

