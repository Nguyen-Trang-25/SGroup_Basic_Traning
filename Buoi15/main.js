
function dangky() {
    const taotk = document.getElementById('taotk').value;
    const taomk = document.getElementById('taomk').value;
    const user1 ={
        nameuser: taotk,
        passuser: taomk
    }
    localStorage.setItem("newuser",JSON.stringify(user1))
    redirectToNewPage1();
}
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('dangky').addEventListener('click', dangky);
})

function redirectToNewPage1(){
    window.location.href = "./login.html"
}

// function login() {
//     const username = document.getElementById('name').value;
//     const password = document.getElementById('pass').value;
//     const user ={
//         name: username,
//         pass: password
//         }
//     console.log(user)
//     localStorage.setItem("user",JSON.stringify(user));
//     redirectToNewPage();
// }
// document.addEventListener('DOMContentLoaded',function(){
//     document.getElementById('login').addEventListener('click', login);
// })

// const nhap = localStorage.getItem("newuser")
// const thu = localStorage.getItem("user")
// const obnhap = JSON.parse(nhap)
// const obthu = JSON.parse(thu)
// function redirectToNewPage(){
//     if (obnhap.nameuser==obthu.name && obnhap.passuser==obthu.pass) {
//         window.location.href = "./done.html"
//     }
//     else console.log("Tai khoan khong ton tai");
// }
// console.log(obthu,obnhap)