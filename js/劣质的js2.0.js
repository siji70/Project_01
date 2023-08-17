window.onload = function () {
    let root = document.getElementById('root')
    let tx = document.getElementsByTagName('textarea');
    let arr = []
    let dt = {}

    // fetch('http://127.0.0.1:8005/save/id/1', {
    //     method: 'get',
    // })


    // let form = document.getElementById('form')
    // let sub = document.createElement('input')
    // sub.type = 'submit';
    // form.appendChild(sub)
    // sub.click()
    // form.removeChild(sub)




    let ul = document.getElementById('ul');
    for (let i = 0; i < 3; i++) {
        let li = document.createElement('li');
        li.innerText = i;
        ul.appendChild(li);

    }
}

