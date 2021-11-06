const path = require('path');
const fs = require('fs');
const { copyFile } = require('fs/promises');

const newDirPath = path.join(__dirname, 'project-dist');




function callback(err) {
    if (err) throw err;
}

function copyStyleFiles(){
    const filePathStyle = path.join(__dirname, 'styles');
    const bundlePathStyle = path.join(__dirname,'project-dist/style.css');
    let styleArray=[];
    fs.writeFile(bundlePathStyle,'',callback)
    fs.readdir(filePathStyle,{withFileTypes: true}, async function(err, content)
    {
        callback;
        styleArray = await copyToArray(content, filePathStyle);
        writeToFile(styleArray, bundlePathStyle);
    })
    
}

function writeToFile(array, newFilePath){
    for(let i=0;i<array.length;i++){
        fs.appendFile(newFilePath,array[i],callback);
    }  
}

async function copyToArray(directory, filePath){
    let array=[];
    for(let file of directory){
        
        if(file.isFile() && path.extname(file.name)=='.css')
        { 
            let newData = await readContent(file.name,filePath);
            array.push(newData);
        }
    }
    return array;
}
async function readContent(file, filePath){
    const data = await fs.promises.readFile(path.join(filePath, file),'utf8');
    return data;
}

function copyFiles(initD, newD){
    fs.readdir(initD,{withFileTypes: true}, (err, content)=>  
    {
        if(err)
        {
            return console.log(err);
        }
        for(let file of content){
            if(file.isFile())
            {
                fs.copyFile(path.join(initD,file.name),path.join(newD,file.name),callback);
            }
            else if(file.isDirectory()){
                fs.mkdir(path.join(newD,file.name),{ recursive: true }, callback);
                copyFiles(path.join(initD,file.name),path.join(newD,file.name));
            }
        }
       
    })
}

function copyAssets(initDir, newDir){
    fs.mkdir(newDir, { recursive: true }, callback);
    copyFiles(initDir,newDir );
}

async function getNewComponent(el)
{
    const file = el.replace(/[}{]+/g,"") + '.html';
    return await readContent(file,path.join(__dirname,'components'));
}
async function readTemplate(){
    let arrayTemplate=[];
    let template = await readContent('template.html', __dirname);
    const components = template.match(/{{.+}}/g);
    for(let el of components)
    {
        const newComp = await getNewComponent(el);
        template = template.replace(el, newComp);
    }
    arrayTemplate.push(template);
    fs.writeFile(path.join(newDirPath, 'index.html'),"",callback);
    writeToFile(arrayTemplate,path.join(newDirPath, 'index.html'));

}

function buildPage(){
    fs.mkdir(newDirPath, { recursive: true }, callback);
    copyStyleFiles();
    copyAssets(path.join(__dirname, 'assets'),path.join(newDirPath,'assets') );
    readTemplate();
}

buildPage();