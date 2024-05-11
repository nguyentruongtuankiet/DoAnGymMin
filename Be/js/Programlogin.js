// Lớp đối tượng đăng nhập
// import { Login } from "./Login.js";
export class Programlogin {
    constructor() {
        this.loadElement();
        this.checkLogin();
        this.event();
    }
    loadElement() {
        this.inputEmail = document.getElementById("email");
        this.inputPassword = document.getElementById("password");
        this.pErrEmail = document.getElementById("err-email");
        this.pErrPassword = document.getElementById("err-password");
        this.btnLogin = document.getElementById("btnLogin");
    }
    event() {
        let deleteCookie = this.deleteCookie.bind(this);
        let setCookie = this.setCookie.bind(this);
        let getUesrname = this.getUesrname.bind(this);
        let checkEmail = this.checkEmail.bind(this);
        let checkPassword = this.checkPassword.bind(this);
        this.btnLogin.addEventListener("click", function (even) {
            even.preventDefault();
            if (checkEmail() && checkPassword()) {
                deleteCookie("userNow");
                setCookie("userNow", getUesrname(), 86400);
                window.location.href = "Calendar.html";
            }
        });
    }
    getUesrname() {
        return this.inputEmail.value;
    }
    checkEmail() {
        let email = this.inputEmail.value;
        let listAccount = [];
        let acc = JSON.parse(localStorage.getItem("account"));
        if (Array.isArray(acc)) {
            listAccount.push(...acc);
        }
        else {
            listAccount.push(acc);
        }
        for (let i = 0; i < listAccount.length; i++) {
            let username = listAccount[i]['_username'];
            if (email == username) {
                return true;
            }
        }
        return false;
    }
    checkPassword() {
        let password = this.inputPassword.value;
        let listAccount = [];
        let acc = JSON.parse(localStorage.getItem("account"));
        if (Array.isArray(acc)) {
            listAccount.push(...acc);
        }
        else {
            listAccount.push(acc);
        }
        for (let i = 0; i < listAccount.length; i++) {
            let pass = listAccount[i]['_password'];
            if (password == pass) {
                return true;
            }
        }
        return false;
    }
    checkLogin() {
        let errEmail = this.pErrEmail;
        let errPassword = this.pErrPassword;
        let checkEmail = this.checkEmail.bind(this);
        let checkPassword = this.checkPassword.bind(this);
        this.btnLogin.addEventListener("click", function (even) {
            even.preventDefault();
            if (checkPassword()) {
                errPassword.innerHTML = "";
            }
            else {
                errPassword.innerHTML = "Mật khẩu không đúng";
            }
            if (checkEmail()) {
                errEmail.innerHTML = "";
            }
            else {
                errEmail.innerHTML = "Email không đúng";
            }
        });
    }
    setCookie(name, value, seconds) {
        let expires = "";
        if (seconds) {
            const date = new Date();
            date.setTime(date.getTime() + seconds * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
    deleteCookie(name) {
        this.setCookie(name, null, null);
    }
}
let a = new Programlogin();
// localStorage.setItem("user", JSON.stringify(new Login("admin", "123456")));
// let ac : Login = new Login("admin", "123456")
// let listAccount: Login[] = [];
// let acc: Login[] = JSON.parse(localStorage.getItem("user"));
// if (Array.isArray(acc)) {
//     listAccount.push(...acc);
// } else {
//     listAccount.push(acc);
// }
// console.log(listAccount);
// let ac : Login = new Login("jschjh", "1234577") 
//  listAccount.push(ac);
// localStorage.setItem("user", JSON.stringify(listAccount));
// console.log(listAccount);
// localStorage.setItem("user", JSON.stringify(new Login("admin", "123456")));
