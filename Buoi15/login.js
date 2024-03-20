const nhap = localStorage.getItem("newuser")
const obnhap = JSON.parse(nhap)
function login() {
    const username = document.getElementById('name').value;
    const password = document.getElementById('pass').value;
    const user ={
        name: username,
        pass: password
        }
    console.log(user)
    function redirectToNewPage(){
        if (obnhap.nameuser==username && obnhap.passuser==password) {
            window.location.href = "./done.html"
        }
        else alert("Tai khoan khong ton tai")
    }
    redirectToNewPage();
    console.log(obnhap)
}
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('login').addEventListener('click', login);
})
