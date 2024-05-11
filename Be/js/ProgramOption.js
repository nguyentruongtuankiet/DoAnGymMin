import { User } from "./User.js";
class ProgramOption {
    constructor() {
        this.loadElement();
        this.init();
    }
    loadElement() {
        this.divOption1month = document.getElementById("border1month");
        this.divOption3month = document.getElementById("border3month");
        this.divOption6month = document.getElementById("border6month");
        this.spanOption = document.getElementById("option");
    }
    init() {
        // lấy tên user hiện đang sử dụng web từ cookie lưu cho this.username để sử dụng
        this.username = this.getUserName();
        // lấy danh sách user từ localstorage luư vào acccount
        let acccount = this.getListAccount();
        let bmi = 0;
        // lấy bmi của user hiện đang sử dụng web
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == this.username) {
                bmi = acccount[i].Bmi;
            }
        }
        // hiển thị thời gian tập luyện tùy theo bmi
        if (bmi < 30) {
            this.spanOption.innerHTML = "1 Tháng";
        }
        else if (bmi <= 35) {
            this.spanOption.innerHTML = "3 Tháng";
        }
        else if (bmi > 35) {
            this.spanOption.innerHTML = "6 Tháng";
        }
        // gọi lại hàm UpdateTrainingdaysListAccount để cập nhật lại thời gian tập luyện
        let UpdateTrainingdaysListAccount = this.UpdateTrainingdaysListAccount.bind(this);
        // gọi lại hàm UpdateTrainingdaysListAccount khi click vào các option
        this.divOption1month.addEventListener("click", function () {
            UpdateTrainingdaysListAccount(acccount, 30);
            window.location.href = "./Calendar.html";
        });
        this.divOption3month.addEventListener("click", function () {
            UpdateTrainingdaysListAccount(acccount, 90);
            window.location.href = "./Calendar.html";
        });
        this.divOption6month.addEventListener("click", function () {
            UpdateTrainingdaysListAccount(acccount, 180);
            window.location.href = "./Calendar.html";
        });
    }
    // lấy tên user hiện đang sử dụng web từ cookie
    getUserName() {
        let username = decodeURIComponent(document.cookie);
        let arr = username.split("=");
        return arr[1];
    }
    // lấy danh sách user từ localstorage
    getListAccount() {
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
        return acccount;
    }
    // cập nhật lại thời gian tập luyện (trainingdays) của user hiện đang sử dụng web 
    UpdateTrainingdaysListAccount(acccount, trainingdays) {
        let listAccount = [];
        if (acccount != null) {
            if (Array.isArray(acccount)) {
                listAccount.push(...acccount);
            }
            else {
                listAccount.push(acccount);
            }
        }
        if (acccount != null) {
            for (let i = 0; i < listAccount.length; i++) {
                if (listAccount[i].Username == this.username) {
                    listAccount[i].Trainingdays = trainingdays;
                }
            }
        }
        localStorage.setItem("account", JSON.stringify(listAccount));
    }
}
let programOption = new ProgramOption();
