const readline = require('readline');
const path = require('path');
const fs = require('fs');
const Regx = /\d/;
var isRemove = true;
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
    for (; isRemove; ) {
        isRemove = false;
        mapDir(res);
    }
});

function mapDir(dir) {

    let files = fs.readdirSync(dir);
    if (!files) {
        console.log('\n目录打开失败：'+dir);
        return;
    }
    
    if(files.length < 1)
    {
        fs.rmdirSync(dir);
        console.log('删除目录成功');
        isRemove = true;
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
        
    })

    
}


