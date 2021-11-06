const path = require('path');
const fs = require('fs');

let initDir = path.join(__dirname, 'files');
let newDir = path.join(__dirname, 'files-copy');



function callback(err) {
    if (err) console.log(err);
}
  

async function copyDirectory(initD, newD,root = true){
    await fs.promises.mkdir(newD, { recursive: true });
     if(root)
     try{
        await cleanDirectory(newD);
     }catch(er){console.log(er)}
    
    for(let file of await fs.promises.readdir(initD,{withFileTypes: true})){
        if(file.isFile())
        {
            fs.copyFile(path.join(initD,file.name),path.join(newD,file.name),callback);
        }
        else if(file.isDirectory()){
            fs.promises.mkdir(path.join(newD,file.name),{ recursive: true });
            copyDirectory(path.join(initD,file.name),path.join(newD,file.name), false);
        }
    }
}
copyDirectory(initDir,newDir);

async function cleanDirectory(dir, root = true){
    for(let file of await fs.promises.readdir(dir,{withFileTypes: true})){
        if(file.isFile())
        {
            fs.unlink(path.join(dir, file.name), ((err) => {
              if(err) console.log(err);}));
        }
        else if(file.isDirectory()){
            try{
                await cleanDirectory(path.join(dir, file.name), false); 
            }catch(er){console.log(er)}  
        }
    }
    if(!root)
    {    
        fs.rmdir(dir, (err) => {
            if (err) {
                console.log(err);
            }
    });}
}

module.exports = {copyDirectory, cleanDirectory}