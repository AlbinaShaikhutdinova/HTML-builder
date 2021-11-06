const path = require('path');
const fs = require('fs');
const { stat } = require('fs/promises');
  
const filePath = path.join(__dirname, 'secret-folder');

// fs.promises.readdir(filePath,{withFileTypes: true}).then(files =>
//     {
//         for (const file of files)
//         {
//             if(file.isFile())
//             {
//                 console.log(file.name);
//             }
//         }
//     }).catch( err =>
//     {
//         console.error(err);
//     })

    // async function nextDir2(dir){
    //     for(let file of await fsPromises.readdir(dir, {withFileTypes: true})){
    //       if(file.isDirectory()){
    //         await nextDir2(path.join(dir, file.name))
    //       }else if(file.isFile()){
    //         zip.addFile(path.join(dir, file.name), path.relative(startDir, path.join(dir, file.name)))
    //       }
    //     }
    //   }

async function nextDir(filePath) {
  for(let file of await fs.promises.readdir(filePath, {withFileTypes: true})){
      const newPath = path.join(filePath, file.name)
        if(file.isFile()){
          fs.stat(newPath,(err, stats) => {
            if (err) {
              return console.log(err);
            }
            else 
              console.log(path.basename(file.name,path.extname(file.name))+" - " + path.extname(file.name).replace('.','')+" - " + stats.size/1024 +"kb");
            });           
          }
        else if(file.isDirectory()){
          await nextDir(newPath)
        }
  }
}
nextDir(filePath);