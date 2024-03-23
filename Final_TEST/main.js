document.getElementById('login_clk').addEventListener('click',function(){
    document.getElementById('option').style.display='flex'
    document.getElementById('back_gr').style.display='unset'
})
document.getElementById('close').addEventListener('click',function(){
    document.getElementById('option').style.display='none'
    document.getElementById('back_gr').style.display='none'
})
var user=[];
//---Create Acount---//
function createAccount () {
    if (JSON.parse(localStorage.getItem('user'))===null){
        keys=[];
    }
    if ( document.getElementById('email').value === "" || document.getElementById('pass').value === "") {
        alert("vui lòng không để trống thông tin");
    }else {
        // array user
        const account={
            email: document.getElementById('email').value,
            pass: document.getElementById('pass').value
        };
    user.push(account);
    localStorage.setItem('user',JSON.stringify(user));
    redirectToLoginPage ()
    }
    
}

///---Login---//

function login () {
    if ( document.getElementById('email').value === "" || document.getElementById('pass').value === "") {
        alert("vui lòng không để trống thông tin");
    }else {
        // array user
        user=JSON.parse(localStorage.getItem('user'))
        check=false;
        for (var i=0; i<user.length; i++){
            if (user[i].email==document.getElementById('email').value &&
            user[i].pass==document.getElementById('pass').value){
                check=true;
                break;
            }
        }
        if(check){
            console.log("huhuhuh")
            window.location.href='../done.html'
        }
        else{
            alert('Tài khoản không tồn tại')
        }
    }
    
}

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('login').addEventListener('click',login);
})
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('regis').addEventListener('click',createAccount);
})
function ui_login (){
    document.getElementById('title').innerText='Log in to collaborate on "Final Test Design"'
    document.getElementById('login').innerText='Log in'
    document.getElementById('login').style.display='block'
    document.getElementById('regis').style.display='none'
    document.getElementById('reset').style.fontSize='15px';
    document.getElementById('reset').style.color='##1d52b5'
    document.getElementById('reset').innerText='Reset password'
    document.getElementById('link_regis').style.display="none"
    document.getElementById('link_login').style.display="block"
}
function ui_regis (){
    document.getElementById('title').innerText='Create an account to collaborate on "Final Test Design"'
    document.getElementById('login').style.display='none'
    document.getElementById('regis').style.display='block'
    document.getElementById('reset').innerText='By clicking "Create account" or "Continue with Google", you agree to the Figma TOS and Privacy Policy.'
    document.getElementById('link_regis').style.display="block"
    document.getElementById('reset').style.fontSize='12px';
    document.getElementById('reset').style.color='#9c9999'
    document.getElementById('link_login').style.display="none"
    document.getElementById('reset').style.order='1'
}

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('link_login2').addEventListener('click',ui_login);
})
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('link').addEventListener('click',ui_regis);
})


function redirectToLoginPage () {
    ui_login();
}