import { Exercises } from "./Exercises.js";
import { User } from "./User.js";
export class ProgramEx {
    // private exNow: Exercises;
    constructor() {
        this.loadElement();
        this.init();
        this.event();
    }
    loadElement() {
        this.video = document.getElementById("video");
        this.h3 = document.getElementById("nameEx");
        this.h4 = document.getElementById("set");
        this.p = document.getElementById("p");
        this.btnTruoc = document.getElementById("btnTruoc");
        this.btnSau = document.getElementById("btnSau");
        this.btnDong = document.getElementById("btnDong");
        this.spanIndexEx = document.getElementById("indexEx");
        this.spanQuanlityEx = document.getElementById("quanlityEx");
        this.btnHoanThanh = document.getElementById("btnHoanThanh");
    }
    // cập nhật 1 cái bài tập mới
    init() {
        // lấy bài tập từ index lưu trong localstorage của user hiện đang sử dụng web
        let ex = this.getExercises(this.getListExercises());
        this.spanIndexEx.innerHTML = Number(JSON.parse(localStorage.getItem("indexEx"))) + 1 + "";
        ;
        this.h3.innerHTML = ex.Name;
        this.video.src = ex.Video;
        this.h4.innerHTML = "Set: " + ex.Sets;
        this.p.innerHTML = ex.Describe;
        this.spanQuanlityEx.innerHTML = this.getListExercises().length + "";
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.loop = true;
    }
    event() {
        // lấy tên user hiện đang sử dụng web từ cookie
        let getUesrname = this.getUserName.bind(this);
        // lấy ngày tập luyện của user hiện đang sử dụng web
        let getTrainingDays = this.getTrainingDays.bind(this);
        // lấy danh sách user từ localstorage
        let getListAccount = this.getListAccount.bind(this);
        // cập nhật lại Completion của user sau khi hoàn thành buổi tập
        let UpdateCompletionListAccount = this.UpdateCompletionListAccount.bind(this);
        let init = this.init.bind(this);
        let length = this.getListExercises().length;
        this.btnTruoc.addEventListener("click", function () {
            let index = Number(JSON.parse(localStorage.getItem("indexEx")));
            if (index == 0) {
                index = 1;
            }
            index--;
            localStorage.setItem("indexEx", JSON.stringify(index));
            init();
        });
        this.btnSau.addEventListener("click", function () {
            let index = Number(JSON.parse(localStorage.getItem("indexEx")));
            if (index >= length - 2) {
                index = length - 2;
            }
            index++;
            if (index < length - 1) {
                alert("Bạn Hãy Chắc Chắn Đã Hoàn Thành Bài Tập Này Đó Nha !!!!!!");
            }
            else {
                alert("Bạn Đã Hoàn Thành Tất Cả Bài Tập Hôm Nay !!!!!!");
            }
            localStorage.setItem("indexEx", JSON.stringify(index));
            init();
        });
        this.btnDong.addEventListener("click", function () {
            window.location.href = "Daily.html";
        });
        this.btnHoanThanh.addEventListener("click", function () {
            let index = Number(JSON.parse(localStorage.getItem("indexEx")));
            if (index < length - 1) {
                alert("Bạn Cần Hoàn Thành Các Bài Tập Trong Buổi Tập Này Trước Khi Ấn Hoàn Thành Buổi Tập !!!!!!!");
            }
            else {
                let calendar = JSON.parse(localStorage.getItem("CalendarDay"));
                let trainingDays = getTrainingDays(getUesrname(), getListAccount());
                if (calendar == trainingDays) {
                    // window.location.href = "Statistical.html";
                    window.location.href = "UpdateBmi.html";
                }
                else {
                    let ListUs = getListAccount();
                    UpdateCompletionListAccount(ListUs, calendar);
                    if (calendar % 10 == 0) {
                        window.location.href = "UpdateBmi.html";
                    }
                    else {
                        window.location.href = "Calendar.html";
                    }
                }
            }
        });
    }
    // lấy danh sách bài tập từ localstorage đã được lưu trong trong localstorage
    getListExercises() {
        let listEx = JSON.parse(localStorage.getItem("ListEx"));
        let listExercises = [];
        if (listEx != null) {
            if (Array.isArray(listEx)) {
                listExercises.push(...listEx);
            }
            else {
                listExercises.push(listEx);
            }
        }
        let ListEx = [];
        if (listEx != null) {
            for (let i = 0; i < listExercises.length; i++) {
                let e = new Exercises(listExercises[i]["name"], listExercises[i]["video"], listExercises[i]["sets"], listExercises[i]["describe"]);
                ListEx.push(e);
            }
        }
        return ListEx;
    }
    getExercises(list) {
        let index = Number(JSON.parse(localStorage.getItem("indexEx")));
        let ex = list[index];
        return ex;
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
    UpdateCompletionListAccount(acccount, completion) {
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
                if (listAccount[i].Username == this.getUserName()) {
                    listAccount[i].Completion = completion;
                }
            }
        }
        localStorage.setItem("account", JSON.stringify(listAccount));
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
}
let programEx = new ProgramEx();
