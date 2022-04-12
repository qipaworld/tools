const readline = require('readline');
const path = require('path');
const fs = require('fs');
const Regx = /\d/;
//删除文件夹内所有文件，除了这些扩展名之外（子文件夹内的文件也会被删除）
var ignoreTypes = ['.png','.jpg','.jpeg','.tga',
                    '.wav','.mp3','.ogg','.aiff',
                    '.fbx','.obj'];
function readSyncByRl(tips) {
    tips = tips || '> ';
 
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
 
        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
 
readSyncByRl('\n请把文件夹拖拽过来，然后按回车：').then((res) => {
    mapDir(res);
});

function mapDir(dir) {

    let files = fs.readdirSync(dir);
    if (!files) {
        console.log('\n目录打开失败：'+dir);
        return;
    }
    console.log('\n开始目录：'+dir);
    
    files.forEach((filename, index) => {

        let pathname = path.join(dir, filename);
        let stats = fs.statSync(pathname); // 读取文件信息

        if (!stats) {
          console.log('\n获取文件stats失败'+pathname)
          return;
        }

        if (stats.isDirectory()) {
           mapDir(pathname);
        } 
        else if (stats.isFile()) {
          if (!(ignoreTypes.includes(path.extname(pathname).toLowerCase()))) {  // 只读取txt文件
                fs.unlink(pathname,function(error){

                if(error){

                    console.log(error);

                    return false;

                }

                console.log('删除文件成功');

            })
          }
        }
    })

    
}


