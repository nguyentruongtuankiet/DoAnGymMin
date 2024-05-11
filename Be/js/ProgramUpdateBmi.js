import { User } from "./User.js";
export class ProgramUpdateBmi {
    constructor() {
        this.loadElement();
        this.init();
        this.loadWeight();
    }
    loadElement() {
        this.weight = document.getElementById("weight");
        this.btn = document.getElementById("btn");
    }
    init() {
        let weight = this.weight;
        let getCalender = this.getCalender.bind(this);
        let getListAccount = this.getListAccount.bind(this);
        let getUserName = this.getUserName.bind(this);
        let updateBmi = this.UpdateBmi.bind(this);
        let getTrainingDays = this.getTrainingDays.bind(this);
        let calendar = JSON.parse(localStorage.getItem("CalendarDay"));
        let trainingDays = getTrainingDays(getUserName(), getListAccount());
        this.btn.addEventListener("click", function (even) {
            even.preventDefault();
            if (calendar == trainingDays) {
                let weightnow = Number(weight.value);
                updateBmi(getUserName(), getListAccount(), getCalender(), weightnow);
                window.location.href = "./Statistical.html";
            }
            else {
                let weightnow = Number(weight.value);
                updateBmi(getUserName(), getListAccount(), getCalender(), weightnow);
                window.location.href = "./Calendar.html";
            }
        });
    }
    loadWeight() {
        for (let i = 30; i <= 150; i++) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.text = i.toString() + " Kg";
            this.weight.appendChild(option);
        }
    }
    getUserName() {
        let username = decodeURIComponent(document.cookie);
        // console.log(username);
        let arr = username.split("=");
        return arr[1];
    }
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
    UpdateBmi(username, acccount, day, kg) {
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
            let bmibefor = "";
            for (let i = 0; i < listAccount.length; i++) {
                if (listAccount[i].Username == username) {
                    listAccount[i].UpdateBmi.push(day + "=" + kg);
                }
                if (listAccount[i].UpdateBmi.length >= 2) {
                    bmibefor = listAccount[i].UpdateBmi[listAccount[i].UpdateBmi.length - 2];
                    let kg1 = bmibefor.split("=");
                    let kg2 = Number(kg1[1]);
                    let bmi = listAccount[i].Bmi;
                    if (bmi < 18.5 && bmi < 25) {
                        if ((kg2 - kg > 0) && (kg2 - kg <= 2)) {
                            alert("Bạn Đã Giảm Cân Cần Xem lại Chế Độ Tập Và Dinh Dưỡng !");
                        }
                        else if ((kg2 - kg > 2) && (kg2 - kg <= 5)) {
                            alert("Bạn Đã Giảm Cân Khá Nhiều Cần Xem lại Chế Độ Tập Và Dinh Dưỡng !");
                        }
                        else if ((kg2 - kg > 5) && (kg2 - kg <= 10)) {
                            alert("Bạn Đang Giảm Cân 1 Cách Nguy Hiểm Bạn Đang Áp Dụng Sai Lộ Trình !!");
                        }
                        else if (kg2 - kg > 10) {
                            alert("Bạn Đang Không Trung Thực !!!!");
                        }
                        else if (kg2 - kg == 0) {
                            alert("Bạn Đang Chững Cân, Bạn Cần Quan Sát Body Của Mình !");
                        }
                        else if (kg2 - kg < 0) {
                            alert("Bạn Đang Tăng Cân, Bạn Cần Quan Sát Body Của Mình Đây Là Dấu Hiệu Tốt !");
                        }
                    }
                    else if (bmi >= 25) {
                        if ((kg2 - kg > 0) && (kg2 - kg <= 2)) {
                            alert("Bạn Đã Giảm Cân !");
                        }
                        else if ((kg2 - kg > 2) && (kg2 - kg <= 5)) {
                            alert("Bạn Đã Giảm Cân Khá Nhiều bạn Thật Tuyệt !");
                        }
                        else if ((kg2 - kg > 5) && (kg2 - kg <= 10)) {
                            alert("Bạn Đang Giảm Cân 1 Cách Nguy Hiểm Bạn Đang Áp Dụng Sai Lộ Trình !!");
                        }
                        else if (kg2 - kg > 10) {
                            alert("Bạn Đang Không Trung Thực !!!!");
                        }
                        else if (kg2 - kg == 0) {
                            alert("Bạn Đang Chững Cân, Bạn Cần Quan Sát Body Của Mình !");
                        }
                        else if (kg2 - kg < 0) {
                            alert("Bạn Đang Tăng Cân, Bạn Cần Quan Sát Body Của Mình Thật Không Ổn !");
                        }
                    }
                }
            }
        }
        localStorage.setItem("account", JSON.stringify(listAccount));
    }
    getCalender() {
        let cal = JSON.parse(localStorage.getItem("CalendarDay"));
        return Number(cal);
    }
    getTrainingDays(username, acccount) {
        let trainingDays = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                trainingDays = acccount[i].Trainingdays;
            }
        }
        return trainingDays;
    }
}
let programUpdateBmi = new ProgramUpdateBmi();
