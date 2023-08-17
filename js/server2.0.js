
// 引入express

const express = require('express');

//创建应用对象（服务器
const app = express();

const { log } = require('console');
const fs = require('fs');
// const path = require('path');
const { resolve, join } = require('path');
const bodyParser = require('body-parser')

// //!以下代码默认的操作对象都是以txt为后缀名，默认的读取对象都存在于 ../劣质的笔记/ 里面


const pt = resolve(__dirname, '../劣质的笔记') + '\\';
// todo 读取文件功能
function selfReadFile(_path) {
    let _pt = pt + _path;
    let _data = '';
    fs.readFile(_pt, function (err, data) {
        if (err) {
            console.log(err);
            _data = err.toString()
            return;
        }
        // console.log(data.toString());
        _data = data.toString();
    })
    return _data;
}
//todo 写入文件功能  如果没有文件则会创建一个，默认新内容会覆盖掉原来的内容
function selfWriteFile(_path, _data) {
    let _pts = pt + _path;
    // todo 表示内容会覆盖掉原来的内容
    fs.writeFile(_pts, _data, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(`写入成功~${_data}`);
    })
}

// todo 删除文件功能 没有该文件则会报错
function selfRemoveFile(_path) {
    fs.rm(`${pt}${_path}`, (err, data) => {
        if (err) {
            console.log(err);
        } else
            console.log("删除成功啦~");
    })
}


app.get('/server', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    setTimeout(() => {
        response.send('Hello AJAX-3');
    }, 1000);
});

app.post('/server', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    // console.log(request.body.uname);


    let readDir = fs.readdirSync("./劣质的笔记/");
    let arr = new Array(readDir.length);
    arr.fill([]);

    for (let index = 0; index < readDir.length; index++) {
        let data = fs.readFileSync(`${pt}${readDir[index]}`, 'utf-8')
        // console.log(data);
        arr[index] = data;
    }
    let res = {
        readDir,
        arr
    }
    response.send(res);
});


let idx = 0;
app.get('/saveId/:id', (request, response) => {
    // selfReadFile
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(request.params);
    idx = request.params.id
    response.end()
})

app.use(express.static(resolve(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/save', (req, res) => {
    let readDir = fs.readdirSync("./劣质的笔记/");
    let text = 'mainText' + idx
    let str = `${req.body[text]}`
    if (str != 'undefined') {
        fs.writeFileSync(pt + readDir[idx], str, { encoding: 'utf-8' })
        console.log('cg');
    }
    res.sendFile(resolve(__dirname, '../劣质的笔记本.html'))
})




// 监听端口服务
app.listen(8005, () => {
    console.log("服务已经启动,8005端口监听中...");
});