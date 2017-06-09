var fs = require("fs");
var exec = require('child_process').exec; 
var node_path = process.env.NODE_PATH
var modules = JSON.parse(fs.readFileSync("./setup.json"));
var is_finished = true;
var cmd_str = "npm install i ";
var progress_face = ["(^_^)","(x_x)"];

// 退出方法
function setup_exit() {
    process.stdout.write("\33[K\r");
    console.log("》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》");
    for (var i in modules) {
        var status = checkModules(i);
        if(!status[0]){
            console.log("install " + status[1] + " failed !" + progress_face[1]);        
            is_finished = false
        }
    }
    if (is_finished)
    {
        console.log("setup finished" + progress_face[0]);        
    }
    process.exit(0);
}

// 监听退出方法
process.on('SIGINT', function() {
  setup_exit();
});

//检测系统内是否有这个库，如果有则进一步检测版本，如果都符合就返回true 否则返回false+第三方库名称
function checkModules(modules_id) {
    var target_modules_data = modules[modules_id];
    var path = node_path + "/"+ target_modules_data.name;
    if (!fs.existsSync(path)) {
        return [false,target_modules_data.name];
    }
    else{
        var modules_data = JSON.parse(fs.readFileSync(path + "/package.json"));
        if (modules_data.version < target_modules_data.version){
            return [false,target_modules_data.name];
        }
    }
    return [true,target_modules_data.name];
}

//检测平台
if (process.platform != "win32"){
    cmd_str = "sudo " + cmd_str;
}

//初始化命令
for (var i in modules) {
    var status = checkModules(i);
    if(!status[0]){
        cmd_str += (status[1] + " ");
        is_finished = false;
    }
}
cmd_str += "-g"

// 如果库全部就位，则停止表示提示成功
if(is_finished){
    console.log("setup finished" + progress_face[0]);
    process.exit(0);
}

//下载库
var build = exec(cmd_str, function(err,stdout,stderr){
    // is_finished = true;
    setup_exit();
});
console.log("===================================================================");
console.log("Being configured, this process may be a bit slow, please be patient");
console.log("===================================================================");
build.stdout.on('data', data => console.log(data));

// 进度条
// var progress_index = 0;
// var progress = "Being configured, this process may be a bit slow, please be patient";

// function updateProgress() {
//     if(is_finished){
//         setup_exit();
//     }
//     else{
//         build.on('data', data => console.log('stdout: ', data))
//         setTimeout(updateProgress, 800);
//         process.stdout.write(progress + progress_face[progress_index%2] + "\33[K\r");
//         progress_index++;
//     }
// }
// updateProgress();
