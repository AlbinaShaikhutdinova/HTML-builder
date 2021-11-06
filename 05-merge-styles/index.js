const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'styles');

const bundlePath = path.join(__dirname,'project-dist/bundle.css');

function callback(err) {
    if (err) throw err;
}

function copyStyleFiles(){
    let styleArray=[];
    fs.writeFile(bundlePath,'',callback)
    fs.readdir(filePath,{withFileTypes: true}, async function(err, content)
    {
        callback;
        styleArray = await copyToArray(content);
        writeToBundle(styleArray);
    })
    
}

function writeToBundle(array){
    for(let i=0;i<array.length;i++){
        fs.appendFile(bundlePath,array[i],callback);
    }  
}

async function copyToArray(content){
    let array=[];
    for(let file of content){
        
        if(file.isFile() && path.extname(file.name)=='.css')
        { 
            let newData = await readContent(file.name);
            array.push(newData);
        }
    }
    return array;
}
async function readContent(file){
    const data = await fs.promises.readFile(path.join(filePath, file),'utf8');
    return data;
}

copyStyleFiles();