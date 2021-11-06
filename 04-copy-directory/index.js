const path = require('path');
const fs = require('fs');

let initDir = path.join(__dirname, 'files');
let newDir = path.join(__dirname, 'files-copy');

fs.mkdir(newDir, { recursive: true }, callback);

function callback(err) {
    if (err) throw err;
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
                // initDir=path.join(initDir,file.name)
                // newDir=path.join(newDir,file.name);
                fs.mkdir(path.join(newD,file.name),{ recursive: true }, callback);
                copyFiles(path.join(initD,file.name),path.join(newD,file.name));
            }
        }
       
    })
}
copyFiles(initDir,newDir);
