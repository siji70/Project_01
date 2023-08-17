
window.onload = function () {
    async function sendRequest(url = 'http://127.0.0.1:8005/server', method = 'post') {
        const response = await fetch(url, {
            method
        })
        return response.json()  //* 返回一个Promise对象
    }
    let conCenter = document.getElementById('conCenter');
    let conRight = document.getElementById('conRight')
    //? 方法1   提取返回的数据
    // sendRequest().then((res) => {
    //     (res.text()).then(data => {
    //         dt = JSON.parse(data);
    //         console.log(dt);
    //     })
    // })

    //? 方法2
    let len = 0;
    sendRequest().then((data) => {
        let { arr, readDir } = data
        len = readDir.length
        createElm(len, 'div', conCenter, 'content', readDir)
        createElm(len, 'textarea', conRight, 'content', arr)

        // ? 文本域的处理
        var reg = new RegExp("<br/>", "g");
        function createElm(len, tag, container, classList, arr) {
            for (let i = 0; i < len; i++) {
                let tmp = document.createElement(tag);
                if (tag === 'textarea') {
                    tmp.value = arr[i].replace(reg, "\r\n");
                    tmp.name = `mainText${i}`
                }
                else { tmp.innerText = arr[i] }
                tmp.classList.add(classList)
                tmp.index = i;
                container.append(tmp);
            }
        }

        // ? 点击切换文本域内容
        let ritContent = conRight.children;
        ritContent[0].classList.add('block');
        conCenter.onclick = function (ev) {
            let idx = ev.target.index;
            console.log(ev.target.className);
            if (ev.target.className === 'content') {
                for (let i = 0; i < len; i++) {
                    if (ritContent[i].classList.contains('block')) {
                        ritContent[i].classList.remove('block');
                    }
                    ritContent[idx].classList.add('block');
                }
            }

        }
        let conContent = conCenter.children;

        for (const i of conContent) {
            i.style.background = randomColor()
        }
        function randomColor() {
            let color1 = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0');
            let color2 = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0');
            let color3 = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0');

            return `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`
            // 'linear-gradient(to bottom right, red, white, yellow)'

        }



        //*  按ctrl+s后保存修改后的内容
        window.addEventListener("keydown", function (e) {
            //event.preventDefault() 方法阻止元素发生默认的行为。
            let tmpIndex;
            if (e.keyCode == 83 && e.ctrlKey) {
                e.preventDefault();
                [...ritContent].forEach(i => {
                    if (i.classList.contains('block')) {
                        tmpIndex = i.index;
                    }
                });
                console.log();
                fetch(`http://127.0.0.1:8005/saveId/${tmpIndex}`, {
                    method: 'get',
                }).then(data => {
                    let sub = document.createElement('input')
                    sub.type = 'submit';
                    conRight.appendChild(sub)
                    sub.click()
                    conRight.removeChild(sub)
                })
            }
        }, false);
    })
    // * 取消






}
