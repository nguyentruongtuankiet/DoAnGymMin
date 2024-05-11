import { User } from "./User.js";
class ProgramCalendar {
    constructor() {
        this.loadElement();
    }
    loadElement() {
        // lấy tên user hiện đang sử dụng web từ cookie lưu cho this.username để sử dụng
        let username = this.getUserName();
        this.username = this.getUserName();
        // lấy danh sách user từ localstorage luư vào acccount gán cho biến acccount
        let acccount = this.getListAccount();
        // gọi lại hàm UpdateCalendar để cập nhật lại lịch tập gán cho biến trainingDays
        let trainingDays = this.getTrainingDays(this.username, acccount);
        // gọi lại hàm getCompletion để cập nhật lại ngày hoàn thành của user gán cho biến completion
        let UpdateBmi = this.UpdateBmi.bind(this);
        let completion = this.getCompletion(this.username, acccount);
        this.calendar = document.getElementById("Calendar");
        this.progress = document.getElementById("progress");
        this.spanLevel = document.getElementById("level");
        this.btnBack = document.getElementById("btn");
        this.btnStatistical = document.getElementById("btn1");
        this.spanTrainingMonth = document.getElementById("outstanding");
        // hiển thị thời gian tập luyện tùy theo trainingDays
        if (trainingDays == 30) {
            this.spanTrainingMonth.innerHTML = "1 Tháng";
        }
        else if (trainingDays == 90) {
            this.spanTrainingMonth.innerHTML = "3 Tháng";
        }
        else if (trainingDays == 180) {
            this.spanTrainingMonth.innerHTML = "6 Tháng";
        }
        // tạo từng ngày tập luyện và đánh dấu hoàn thành ngày tập luyện
        for (let i = 1; i <= Number(trainingDays); i++) {
            let circle = document.createElement("div");
            circle.className = "circle";
            circle.innerText = i <= completion ? '✔' : i + ""; // Hiển thị dấu tích xanh cho các số từ 1 đến completion nếu có ngày completion
            circle.style.backgroundColor = i <= completion ? 'rgb(181,181,181)' : 'rgb(255,255,255)'; // Đặt màu nền xanh cho các số từ 1 đến completion
            if (completion == 0 && i == 1) {
                UpdateBmi(username, acccount, 1, 0);
            }
            // Đặt màu nền trắng cho các số từ completion + 1 đến trainingDays
            if (i > completion && i < completion + 2) {
                circle.addEventListener("click", function () {
                    localStorage.setItem("CalendarDay", JSON.stringify(i));
                    window.location.href = "./Daily.html";
                });
            }
            else {
                // Hiển thị thông báo khi click vào các số từ completion + 1 đến trainingDays vì chỉ cho tập sau ngày hoàn thành và không cho tập những ngày sau đó
                circle.addEventListener("click", function () {
                    alert("Bạn Cần Hoàn Thành Ngày Trước Đó !!");
                });
            }
            let col = document.createElement("div");
            col.className = "col-1";
            col.appendChild(circle);
            this.calendar.appendChild(col);
        }
        // nếu ấn đóng thì quay lại trang option
        this.btnBack.addEventListener("click", function () {
            window.location.href = "./Option.html";
        });
        // cập nhật lại progress bar( báo mức đô hoàn thành của user)
        let number = Math.round(completion / trainingDays * 100);
        this.spanLevel.innerHTML = number + "%";
        let progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = number + '%';
        progressBar.textContent = number + '%';
        this.progress.appendChild(progressBar);
        this.btnStatistical.addEventListener("click", function () {
            window.location.href = "./Statistical.html";
        });
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
                // console.log(u.UpdateBmi);
                // console.log(u);
                acccount.push(u);
            }
        }
        return acccount;
    }
    // lấy tên user hiện đang sử dụng web từ cookie
    getUserName() {
        let username = decodeURIComponent(document.cookie);
        // console.log(username);
        let arr = username.split("=");
        return arr[1];
    }
    // lấy số ngày tập luyện của user hiện đang sử dụng web
    getTrainingDays(username, acccount) {
        let trainingDays = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                trainingDays = acccount[i].Trainingdays;
            }
        }
        return trainingDays;
    }
    // lấy số ngày hoàn thành của user hiện đang sử dụng web
    getCompletion(username, acccount) {
        let completion = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                completion = acccount[i].Completion;
            }
        }
        return completion;
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
            for (let i = 0; i < listAccount.length; i++) {
                if (listAccount[i].Username == username) {
                    if (day == 1) {
                        kg = listAccount[i].Weight;
                        listAccount[i].UpdateBmi.push(day + "=" + kg);
                    }
                    else {
                        listAccount[i].UpdateBmi.push(day + "=" + kg);
                    }
                }
            }
        }
        localStorage.setItem("account", JSON.stringify(listAccount));
    }
}
let programCalendar = new ProgramCalendar();
