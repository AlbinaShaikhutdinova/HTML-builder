const path = require('path');
const fs = require('fs');
const { stat } = require('fs/promises');
  
const filePath = path.join(__dirname, 'secret-folder');

function showFileInfo(newPath, file){
  fs.stat(newPath,(err, stats) => {
    if (err) {
      return console.log(err);
    }
    else 
      console.log(path.basename(file.name,path.extname(file.name))+" - " + path.extname(file.name).replace('.','')+" - " + stats.size/1024 +"kb");
    });         
}

async function readDir(filePath) {
  for(let file of await fs.promises.readdir(filePath, {withFileTypes: true})){
      const newPath = path.join(filePath, file.name)
        if(file.isFile()){
            showFileInfo(newPath,file);
        }
        else if(file.isDirectory()){
          await readDir(newPath)
        }
  }
}
readDir(filePath);