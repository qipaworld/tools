const readline = require('readline');
const path = require('path');
const fs = require('fs');
const Regx = /\d/;
//复制文件夹内下列扩展名的所有文件（子文件夹内的文件也会被复制）
var ignoreTypes = ['.png','.jpg','.jpeg','.tga',
                    '.wav','.mp3','.ogg','.aiff'];
var targetPath = "E:\\新桌面\\TTTDDD\\T_";
var num = 0;
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
          if ((ignoreTypes.includes(path.extname(pathname).toLowerCase()))) {
                console.log(pathname);
                console.log(targetPath+filename);
                num++;
                fs.copyFileSync(pathname,targetPath+num+filename);//,(error)=>{

                // if(error){

                //     console.log(error);

                //     return false;

                // }

                //console.log('复制文件成功');}

            //)
          }
        }
    })

    
}


