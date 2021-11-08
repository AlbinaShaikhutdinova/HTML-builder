const path = require('path');
const fs = require('fs');
const {mergeStyles} = require('../05-merge-styles/index');
const {copyDirectory} = require('../04-copy-directory/index');
const { copyFile } = require('fs/promises');

const newDirPath = path.join(__dirname, 'project-dist');

function callback(err) {
    if (err) throw err;
}


function writeToFile(array, newFilePath){
    for(let i=0;i<array.length;i++){
        fs.appendFile(newFilePath,array[i],callback);
    }  
}

async function readContent(file, filePath){
    const data = await fs.promises.readFile(path.join(filePath, file),'utf8');
    return data;
}
async function copyAssets(initDir, newDir){
    try{
        await fs.promises.mkdir(newDir, { recursive: true }, callback);
        await copyDirectory(initDir,newDir);
    }
    catch(err){ console.log(err)}
   
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
    copyAssets(path.join(__dirname, 'assets'),path.join(newDirPath,'assets'));
    mergeStyles(path.join(__dirname, 'styles'),path.join(__dirname,'project-dist/style.css'))
    readTemplate();
}

buildPage();