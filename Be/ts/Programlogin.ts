// Lớp đối tượng đăng nhập
// import { Login } from "./Login.js";
export class Programlogin {

    private inputEmail: HTMLInputElement;
    private inputPassword: HTMLInputElement;
    private pErrEmail: HTMLParagraphElement;
    private pErrPassword: HTMLParagraphElement;
    private btnLogin: HTMLButtonElement;


    constructor() {
        this.loadElement();
        this.checkLogin();
        this.event();
    }

    private loadElement(): void {
        this.inputEmail = document.getElementById("email") as HTMLInputElement;
        this.inputPassword = document.getElementById("password") as HTMLInputElement;
        this.pErrEmail = document.getElementById("err-email") as HTMLParagraphElement;
        this.pErrPassword = document.getElementById("err-password") as HTMLParagraphElement;
        this.btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
    }


    private event(): void {
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

    private getUesrname(): string {
        return this.inputEmail.value;
    }

    private checkEmail(): boolean {
        let email = this.inputEmail.value;
        let listAccount: object[] = [];
        let acc: object[] = JSON.parse(localStorage.getItem("account"));
        if (Array.isArray(acc)) {
            listAccount.push(...acc);
        } else {
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

    
    private checkPassword(): boolean {
        let password = this.inputPassword.value;
        let listAccount: object[] = [];
        let acc: object[] = JSON.parse(localStorage.getItem("account"));
        if (Array.isArray(acc)) {
            listAccount.push(...acc);
        } else {
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
    private checkLogin(): void {
        let errEmail = this.pErrEmail;
        let errPassword = this.pErrPassword;
        let checkEmail = this.checkEmail.bind(this);
        let checkPassword = this.checkPassword.bind(this);
        this.btnLogin.addEventListener("click", function (even) {
            even.preventDefault();
            if (checkPassword()) {
                errPassword.innerHTML = "";
            }else{
                errPassword.innerHTML = "Mật khẩu không đúng";
            }
            if (checkEmail()) {
                errEmail.innerHTML = "";
            }else{
                errEmail.innerHTML = "Email không đúng";
            }
                   
            
        });

    }
    private setCookie(name: string, value: string, seconds: number): void {
        let expires: string = "";
        if (seconds) {
            const date: Date = new Date();
            date.setTime(date.getTime() + seconds * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
    private deleteCookie(name: string): void {
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
