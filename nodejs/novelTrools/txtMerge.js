const readline = require('readline');
const path = require('path');
const fs = require('fs');
const Regx = /\d/;

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
 
readSyncByRl('\n请把小说文件夹拖拽过来，然后按回车：').then((res) => {
    mapDir(res);
});

function mapDir(dir) {

    let files = fs.readdirSync(dir);
    if (!files) {
        console.log('\n目录打开失败：'+dir);
        return;
    }
    console.log('\n开始目录：'+dir);

    let allTxt = "";
    let txtNameArr = []; 
    
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
          if (['.txt'].includes(path.extname(pathname))) {  // 只读取txt文件
            if (Regx.test(filename[0])) {
                let dataArr = filename.split(" "); 
                txtNameArr.push({num : parseFloat(dataArr[0]),name: dataArr[1].replace(".txt",""),pathname: pathname,filename: filename});
            }
          }
        }
    })

    txtNameArr.sort(sortByNum);

    txtNameArr.forEach((txtData, index) => {
        let data = fs.readFileSync(txtData.pathname);
        if (!data) {
          console.log('\n文件打开失败：'+txtData.pathname);
          return;
        }
        allTxt = allTxt + "\n第" + (index+1) + "章 " + txtData.name + "\n\n" + data +"\n" ;
    })

    console.log("\n完成目录"+dir);
    console.log("\n共合并"+txtNameArr.length+"章");
      
    fs.writeFile(path.join(dir, "全部章节.txt"),allTxt,function(err){
     if(err){
         console.log("文件写入失败"+dir)
     }else{
         console.log("文件写入成功"+dir);

     }

    })   
}

function sortByNum(a, b)
{
    return a.num - b.num;
}

