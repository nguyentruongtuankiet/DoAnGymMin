import { User } from "./User.js";
class ProgramBmi {
    constructor() {
        this.loadElement();
        this.loadBmi();
    }
    loadElement() {
        this.spanBmi = document.getElementById("bmi");
        this.spanBmi2 = document.getElementById("ResultBmi");
        this.spanBmi3 = document.getElementById("Notification");
        this.btn = document.getElementById("btn");
    }
    // load bmi tùy theo email user
    loadBmi() {
        let username = decodeURIComponent(document.cookie);
        console.log(username);
        let arr = username.split("=");
        // lấy tên user hiện đang sử dụng web từ cookie lưu cho this.username để sử dụng
        this.username = arr[1];
        let listAccount = [];
        // Lấy dữ liệu (mảng các user) từ localstorage
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
                u.UpdateBmi = listAccount[i]["updateBmi"];
                acccount.push(u);
            }
        }
        let bmi = 0;
        // lấy bmi của user hiện đang sử dụng web
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == this.username) {
                bmi = acccount[i].Bmi;
            }
        }
        // hiển thị bmi và thông báo tùy theo bmi
        this.spanBmi.innerHTML = bmi + "";
        this.spanBmi2.innerHTML = bmi + "";
        this.username = arr[1];
        // hiển thị thông báo tùy theo bmi
        if (bmi < 18.5) {
            this.spanBmi.style.color = "rgb(90,188,227)";
            this.spanBmi2.style.color = "rgb(90,188,227)";
            this.spanBmi3.innerHTML = "Bạn Đang Gầy";
            this.spanBmi3.style.color = "rgb(90,188,227)";
        }
        else if (bmi >= 18.5 && bmi < 25) {
            this.spanBmi.style.color = "rgb(159,180,59)";
            this.spanBmi2.style.color = "rgb(159,180,59)";
            this.spanBmi3.innerHTML = "Bạn Đang Bình Thường";
            this.spanBmi3.style.color = "rgb(159,180,59)";
        }
        else if (bmi >= 25 && bmi < 30) {
            this.spanBmi.style.color = "rgb(246,129,34)";
            this.spanBmi2.style.color = "rgb(246,129,34)";
            this.spanBmi3.innerHTML = "Bạn Đang Thừa Cân";
            this.spanBmi3.style.color = "rgb(246,129,34)";
        }
        else if (bmi >= 30 && bmi <= 35) {
            this.spanBmi.style.color = "rgb(232,69,54)";
            this.spanBmi2.style.color = "rgb(232,69,54)";
            this.spanBmi3.innerHTML = "Bạn Đang Béo Phì";
            this.spanBmi3.style.color = "rgb(232,69,54)";
        }
        else if (bmi > 35) {
            this.spanBmi.style.color = "rgb(190,59,139)";
            this.spanBmi2.style.color = "rgb(190,59,139)";
            this.spanBmi3.innerHTML = "Bạn Đang Béo Phì Nguy Hiểm";
            this.spanBmi3.style.color = "rgb(190,59,139)";
        }
        this.next();
    }
    // chuyển sang trang option khi ấn xác nhận
    next() {
        this.btn.addEventListener("click", function () {
            window.location.href = "./Option.html";
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
let programBmi = new ProgramBmi();
