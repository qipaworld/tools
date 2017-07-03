<hr>

**奇葩世界的工具库**

官网: http://qipa.world

<hr>

# 目前只有nodeJs 工具 :-) #

克隆项目后直接运行setup.js。他会帮您配置环境，文件在nodejs目录下

```
node setup.js
```

<hr>

## 命令行工具都在console目录里 ##
完整目录：nodejs/console

<hr>

## 添加水印/角标并自动生成对应平台icon ##

运行 addMaskAndSpawnIcon.js 参数(icon原图,水印/角标（直接用鼠标拖到命令行即可）,导出图片格式可以不传默认为png,是否自动同步大小可以不传默认为false) ，运行后会在源文件所在目录下创建 qipaworldIcon 目录，生成的icon会放到该目录下
```
node addMaskAndSpawnIcon.js image_path mask_path image_format auto_size
```

## 自动生成ios 和android icon 工具 ##
运行 spawnIcon.js 参数(icon原图（直接用鼠标拖到命令行即可）)，运行后会在源文件所在目录下创建 qipaworldIcon 目录，生成的icon会放到该目录下
```
node spawnIcon.js image_path
```

## 给图片加水印/角标 ##
运行 addMask.js 参数(icon原图,水印/角标（直接用鼠标拖到命令行即可）,导出图片格式可以不传默认为png,是否自动同步大小可以不传默认为false) ，运行后会在源文件所在目录下创建 qipaworldIcon 目录，生成的icon会放到该目录下
```
node addMask.js image_path mask_path image_format auto_size
```

## 把图片大小添加到图片名字后面,支持一次修改文件夹内所有图片的名字 ##
运行 addSizeToName.js 参数(icon原图或者文件夹（直接用鼠标拖到命令行即可）,导出图片的名字可以不传默认为image,导出图片格式可以不传默认为png) ，运行后会在源文件所在目录下创建 qipaworldIcon 目录，生成的icon会放到该目录下
```
node addSizeToName.js path name image_format
```

<hr>

**版权所有者**

qipaworld

官网: http://qipa.world

<hr>