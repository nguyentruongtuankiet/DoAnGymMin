// import { Login } from "./Login.js";
import { User } from "./User.js";
import { DataTarget } from "./ListTarget.js";
import { Target } from "./Target.js";
import { DataExercises } from "./dataExercises.js";
import { Exercises } from "./Exercises.js";
export class ProgramUser {
    // Create_account
    private inputName: HTMLInputElement;
    private inputFemale: HTMLInputElement;
    private inputMale: HTMLInputElement;
    private inputAge: HTMLInputElement;
    private inputHeight: HTMLInputElement;
    private inputWeight: HTMLInputElement;
    private inputUsername: HTMLInputElement;
    private inputPassword: HTMLInputElement;

    private errname: HTMLParagraphElement;
    private errgender: HTMLParagraphElement;
    private errage: HTMLParagraphElement;
    private errheight: HTMLParagraphElement;
    private errweight: HTMLParagraphElement;
    private errusername: HTMLParagraphElement;
    private errpassword: HTMLParagraphElement;
    private btnRegister: HTMLButtonElement;


    constructor() {
        // Khởi chạy các hàm khi khởi tạo đối tượng
        this.loadElement();
        this.check();
        this.loadWeight();
        this.loadHeight();
        this.loadAge();

    }
    private loadElement(): void {
        // Create_account
        this.inputName = document.getElementById("fullName") as HTMLInputElement;
        this.inputFemale = document.getElementById("female") as HTMLInputElement;
        this.inputMale = document.getElementById("male") as HTMLInputElement;
        this.inputAge = document.getElementById("age") as HTMLInputElement;
        this.inputHeight = document.getElementById("height") as HTMLInputElement;
        this.inputWeight = document.getElementById("weight") as HTMLInputElement;
        this.inputUsername = document.getElementById("email") as HTMLInputElement;
        this.inputPassword = document.getElementById("password") as HTMLInputElement;

        this.errname = document.getElementById("err-name") as HTMLParagraphElement;
        this.errgender = document.getElementById("err-gender") as HTMLParagraphElement;
        this.errage = document.getElementById("err-age") as HTMLParagraphElement;
        this.errheight = document.getElementById("err-height") as HTMLParagraphElement;
        this.errweight = document.getElementById("err-weight") as HTMLParagraphElement;
        this.errusername = document.getElementById("err-email") as HTMLParagraphElement;
        this.errpassword = document.getElementById("err-pass") as HTMLParagraphElement;
        this.btnRegister = document.getElementById("btnCreate") as HTMLButtonElement;

    }
    // Load dữ liệu từ file ListTarget
    private loadDataTarget(data: any): Target[] {
        const target: Target[] = [];
        for (let e of data) {
            const newTar = new Target(e.day, e.practice, e.kcal);
            target.push(newTar);
        }
        return target;

    }
    // Load dữ liệu từ file dataExercises
    private loadDataExercises(data: any): Exercises[] {
        const ex: Exercises[] = [];
        for (let e of data) {
            const newEx = new Exercises(e.name, e.video, e.sets, e.describe);
            ex.push(newEx);
        }
        return ex;
    }

    private check(): void {
        // let login: Login = new Login(this.inputUsername.value, this.inputPassword.value);
        // id: number, name: string, gender: boolean, age: number, height: number, weight: number, target: Target[], bmi: number, exercises: Exercises[], account: Login
        let user: User = new User(0, "", true, 0, 0, 0, [], 0, [], "", "", 0,0,[]);
        let checkName = this.checkName.bind(this);
        let checkGender = this.checkGender.bind(this);
        let checkUserName = this.checkUserName.bind(this);
        let checkPassword = this.checkPassword.bind(this);
        let inputName = this.inputName;
        let inputMale = this.inputMale;
        let age = this.inputAge;
        let height = this.inputHeight;
        let weight = this.inputWeight;
        let Username = this.inputUsername;
        let pass = this.inputPassword;
        let setCookie = this.setCookie.bind(this);
        let deleteCookie = this.deleteCookie.bind(this);
        let target: Target[] = this.loadDataTarget(DataTarget);
        let exercises: Exercises[] = this.loadDataExercises(DataExercises);

        this.btnRegister.addEventListener("click", function (even) {
            even.preventDefault();

            if (checkName() && checkGender() && checkUserName() && checkPassword()) {
                user.Name = inputName.value;
                user.Gender = inputMale.checked;
                user.Age = parseInt(age.value);
                user.Height = parseInt(height.value);
                user.Weight = parseInt(weight.value);
                user.Target = target;
                user.Bmi = Math.floor(parseInt(weight.value) / ((parseInt(height.value) / 100) * (parseInt(height.value) / 100)));
                user.Exercises = exercises;
                user.Username = Username.value;
                user.Password = pass.value;
                let listAccount: object[] = [];
                let acc: object[] = JSON.parse(localStorage.getItem("account"));
                if (acc != null) {
                    if (Array.isArray(acc)) {
                        listAccount.push(...acc);
                    } else {
                        listAccount.push(acc);
                    }
                }
                let acccount: User[] = [];
                if (acc != null) {
                    for (let i = 0; i < listAccount.length; i++) {
                        let u: User = new User(0, "", true, 0, 0, 0, [], 0, [], "", "", 0,0,[]);
                        u.Id = i;
                        u.Name = listAccount[i]["name"];
                        u.Gender = listAccount[i]["gender"];
                        u.Age = listAccount[i]["age"];
                        u.Height = listAccount[i]["height"];
                        u.Weight = listAccount[i]["weight"];
                        u.Target = listAccount[i]["target"];
                        u.Bmi = listAccount[i]["bmi"];
                        u.Exercises = listAccount[i]["exercises"];
                        u.Username = listAccount[i]["_username"];
                        u.Password = listAccount[i]["_password"];
                        u.Trainingdays = listAccount[i]["trainingdays"];
                        u.Completion = listAccount[i]["completion"];
                        u.UpdateBmi = listAccount[i]["updatebmi"];
                        acccount.push(u);
                    }
                }
                acccount.push(user);
                localStorage.setItem("account", JSON.stringify(acccount));
                console.log(acccount);
                setCookie("userNow",user.Username, 86400);
                alert("Đăng ký thành công");
                setTimeout(window.location.href = "./Bmi.html", 2000)

            }

        });

    }
    private loadAge(): void {
        for (let i = 10; i <= 100; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            this.inputAge.appendChild(option);
        }

    }
    private loadWeight(): void {
        for (let i = 30; i <= 150; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString() + " kg";
            this.inputWeight.appendChild(option);
        }
    }
    private loadHeight(): void {
        for (let i = 70; i <= 200; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString() + " cm";
            this.inputHeight.appendChild(option);
        }

    }

    private checkName(): boolean {
        let name = this.inputName.value;
        if (name == "") {
            this.errname.innerHTML = "Hãy nhập tên của bạn";
            return false;
        } else {
            this.errname.innerHTML = "";
        }
        return true;
    }
    private checkGender(): boolean {
        if (this.inputFemale.checked || this.inputMale.checked) {
            this.errgender.innerHTML = "";
            return true;
        } else {
            this.errgender.innerHTML = "Hãy chọn giới tính";
            return false;
        }
    }
    private checkUserName(): boolean {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let username = this.inputUsername.value;
        if (username == "") {
            this.errusername.innerHTML = "Hãy nhập email đăng nhập";
            return false;
        } else if (this.checkExistUser(username)) {
            this.errusername.innerHTML = "Email đã tồn tại";
            return false;
        } else if (emailRegex.test(username)) {
            this.errusername.innerHTML = "";
            return true;
        } else {
            this.errusername.innerHTML = "Email không hợp lệ";
            return false;
        }


    }
    private checkPassword(): boolean {
        let testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        let password = this.inputPassword.value;
        if (password == "") {
            this.errpassword.innerHTML = "Hãy nhập mật khẩu";
            return false;
        } else if (password.length < 6) {
            this.errpassword.innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
            return false;
        } else if (!testPassword.test(password)) {
            this.errpassword.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường và 1 số";
            return false;
        } else {
            this.errpassword.innerHTML = "";
            return true;
        }
    }
    private checkExistUser(str: string): boolean {
        let listAccount: object[] = [];
        let acc: object[] = JSON.parse(localStorage.getItem("account"));
        if (acc != null) {
            if (Array.isArray(acc)) {
                listAccount.push(...acc);
            } else {
                listAccount.push(acc);
            }
        }
        for (let i = 0; i < listAccount.length; i++) {
            let email = listAccount[i]['_username'];
            if (str == email) {
                return true;
            }
        }
        return false;
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

let pu = new ProgramUser();
