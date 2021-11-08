const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
  
const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, "", function(error){
    if(error) 
        throw error; 
});

function question(q) {
    return new Promise( (res, rej) => {
        readline.question( q, answer => {
            res(answer);
        })
    });
};

async function main() {
    console.log('Hello!')
    var answer="";
    while (answer != 'exit\n' ) {     
        fs.appendFile(filePath, answer,function(error){
            if(error) 
                throw error; 
        });
        answer = await question('Write anything: ');  
        answer+="\n";
    }
    readline.close();
}

main();

readline.on('close', () => {
    console.log('\nGoodbye!');
  })



