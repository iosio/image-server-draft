import fse from 'fs-extra';
import {fileConfig} from "../fileConfig";

export const writeFile = (file_path , data, options) => {
    return fse.writeFile(fileConfig.exportPath + file_path, data, options);
};

export const mkdir = (dir)=>{
    return fse.ensureDir(dir);
};