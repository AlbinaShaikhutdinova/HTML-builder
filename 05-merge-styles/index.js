const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'styles');

const bundlePath = path.join(__dirname,'project-dist/bundle.css');

function callback(err) {
    if (err) throw err;
}

async function mergeStyles(initPath, newPath){
    let styleArray=[];
    fs.writeFile(newPath,'',callback)
    const content = await fs.promises.readdir(initPath,{withFileTypes: true});
    styleArray = await copyToArray(content, initPath);
    writeToBundle(styleArray, newPath); 
}

function writeToBundle(array, newPath){
    for(let i=0;i<array.length;i++){
        fs.appendFile(newPath,array[i],callback);
    }  
}

async function copyToArray(content, initPath){
    let array=[];
    for(let file of content){
        
        if(file.isFile() && path.extname(file.name)=='.css')
        { 
            let newData = await fs.promises.readFile(path.join(initPath, file.name),'utf8');
            array.push(newData);
        }
    }
    return array;
}


mergeStyles(filePath, bundlePath);

module.exports = {mergeStyles}