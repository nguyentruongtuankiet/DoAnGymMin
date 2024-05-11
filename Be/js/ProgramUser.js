// import { Login } from "./Login.js";
import { User } from "./User.js";
import { DataTarget } from "./ListTarget.js";
import { Target } from "./Target.js";
import { DataExercises } from "./dataExercises.js";
import { Exercises } from "./Exercises.js";
export class ProgramUser {
    constructor() {
        // Khởi chạy các hàm khi khởi tạo đối tượng
        this.loadElement();
        this.check();
        this.loadWeight();
        this.loadHeight();
        this.loadAge();
    }
    loadElement() {
        // Create_account
        this.inputName = document.getElementById("fullName");
        this.inputFemale = document.getElementById("female");
        this.inputMale = document.getElementById("male");
        this.inputAge = document.getElementById("age");
        this.inputHeight = document.getElementById("height");
        this.inputWeight = document.getElementById("weight");
        this.inputUsername = document.getElementById("email");
        this.inputPassword = document.getElementById("password");
        this.errname = document.getElementById("err-name");
        this.errgender = document.getElementById("err-gender");
        this.errage = document.getElementById("err-age");
        this.errheight = document.getElementById("err-height");
        this.errweight = document.getElementById("err-weight");
        this.errusername = document.getElementById("err-email");
        this.errpassword = document.getElementById("err-pass");
        this.btnRegister = document.getElementById("btnCreate");
    }
    // Load dữ liệu từ file ListTarget
    loadDataTarget(data) {
        const target = [];
        for (let e of data) {
            const newTar = new Target(e.day, e.practice, e.kcal);
            target.push(newTar);
        }
        return target;
    }
    // Load dữ liệu từ file dataExercises
    loadDataExercises(data) {
        const ex = [];
        for (let e of data) {
            const newEx = new Exercises(e.name, e.video, e.sets, e.describe);
            ex.push(newEx);
        }
        return ex;
    }
    check() {
        // let login: Login = new Login(this.inputUsername.value, this.inputPassword.value);
        // id: number, name: string, gender: boolean, age: number, height: number, weight: number, target: Target[], bmi: number, exercises: Exercises[], account: Login
        let user = new User(0, "", true, 0, 0, 0, [], 0, [], "", "", 0, 0, []);
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
        let target = this.loadDataTarget(DataTarget);
        let exercises = this.loadDataExercises(DataExercises);
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
                let listAccount = [];
                let acc = JSON.parse(localStorage.getItem("account"));
                if (acc != null) {
                    if (Array.isArray(acc)) {
                        listAccount.push(...acc);
                    }
                    else {
                        listAccount.push(acc);
                    }
                }
                let acccount = [];
                if (acc != null) {
                    for (let i = 0; i < listAccount.length; i++) {
                        let u = new User(0, "", true, 0, 0, 0, [], 0, [], "", "", 0, 0, []);
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
                setCookie("userNow", user.Username, 86400);
                alert("Đăng ký thành công");
                setTimeout(window.location.href = "./Bmi.html", 2000);
            }
        });
    }
    loadAge() {
        for (let i = 10; i <= 100; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString();
            this.inputAge.appendChild(option);
        }
    }
    loadWeight() {
        for (let i = 30; i <= 150; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString() + " kg";
            this.inputWeight.appendChild(option);
        }
    }
    loadHeight() {
        for (let i = 70; i <= 200; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString() + " cm";
            this.inputHeight.appendChild(option);
        }
    }
    checkName() {
        let name = this.inputName.value;
        if (name == "") {
            this.errname.innerHTML = "Hãy nhập tên của bạn";
            return false;
        }
        else {
            this.errname.innerHTML = "";
        }
        return true;
    }
    checkGender() {
        if (this.inputFemale.checked || this.inputMale.checked) {
            this.errgender.innerHTML = "";
            return true;
        }
        else {
            this.errgender.innerHTML = "Hãy chọn giới tính";
            return false;
        }
    }
    checkUserName() {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let username = this.inputUsername.value;
        if (username == "") {
            this.errusername.innerHTML = "Hãy nhập email đăng nhập";
            return false;
        }
        else if (this.checkExistUser(username)) {
            this.errusername.innerHTML = "Email đã tồn tại";
            return false;
        }
        else if (emailRegex.test(username)) {
            this.errusername.innerHTML = "";
            return true;
        }
        else {
            this.errusername.innerHTML = "Email không hợp lệ";
            return false;
        }
    }
    checkPassword() {
        let testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        let password = this.inputPassword.value;
        if (password == "") {
            this.errpassword.innerHTML = "Hãy nhập mật khẩu";
            return false;
        }
        else if (password.length < 6) {
            this.errpassword.innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
            return false;
        }
        else if (!testPassword.test(password)) {
            this.errpassword.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường và 1 số";
            return false;
        }
        else {
            this.errpassword.innerHTML = "";
            return true;
        }
    }
    checkExistUser(str) {
        let listAccount = [];
        let acc = JSON.parse(localStorage.getItem("account"));
        if (acc != null) {
            if (Array.isArray(acc)) {
                listAccount.push(...acc);
            }
            else {
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
let pu = new ProgramUser();
