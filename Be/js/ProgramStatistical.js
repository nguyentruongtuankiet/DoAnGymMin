import { User } from "./User.js";
export class ProgramStatistical {
    constructor() {
        this.load();
        this.getData();
        this.createChart();
        this.init();
    }
    load() {
        this.myChart = document.getElementById("myChart");
        this.name = document.getElementById("name");
        this.age = document.getElementById("age");
        this.gender = document.getElementById("sex");
        this.height = document.getElementById("height");
        this.weight = document.getElementById("weight");
        this.weightnow = document.getElementById("weightnow");
        this.bmi = document.getElementById("bmi");
        this.btn = document.getElementById("btn");
        this.p = document.getElementById("comment");
    }
    getData() {
        let username = this.getUserName.bind(this);
        let acccount = this.getListAccount.bind(this);
        let getDay = this.getDay.bind(this);
        let getWeight = this.getWeight.bind(this);
        let arrDay = getDay(username(), acccount());
        let arrWeight = getWeight(username(), acccount());
        this.xValues = arrDay.map(x => "Ngày " + x.toString());
        this.yValues = arrWeight;
        let name = this.getName.bind(this);
        let age = this.getAge.bind(this);
        let gender = this.getGender.bind(this);
        let height = this.getHeight.bind(this);
        let getWeightFirst = this.getWeightFirst.bind(this);
        let weightNow = this.getWeightNow.bind(this);
        let getBmiNow = this.getBmiNow.bind(this);
        this.name.innerHTML = name(username(), acccount());
        this.age.innerHTML = age(username(), acccount()).toString();
        this.gender.innerHTML = gender(username(), acccount());
        this.height.innerHTML = height(username(), acccount()).toString();
        this.weight.innerHTML = getWeightFirst(username(), acccount()).toString();
        this.weightnow.innerHTML = weightNow(username(), acccount()).toString();
        this.bmi.innerHTML = getBmiNow(username(), acccount()).toString();
        if (getWeightFirst(username(), acccount()) > weightNow(username(), acccount())) {
            this.p.innerHTML = "Dựa vào cân nặng hiện tại của bạn cho thấy, Bạn đã giảm cân, hãy xem lại mục đích ban đầu của bạn khi đến với tôi là gì nhé Chúc bạn may mắn !";
        }
        else if (getWeightFirst(username(), acccount()) < weightNow(username(), acccount())) {
            this.p.innerHTML = "Dựa vào cân nặng hiện tại của bạn cho thấy, Bạn đã tăng cân,hãy xem lại mục đích ban đầu của bạn khi đến với tôi là gì nhé Chúc bạn may mắn !";
        }
    }
    init() {
        let username = this.getUserName.bind(this);
        let acccount = this.getListAccount.bind(this);
        let getTrainingDays = this.getTrainingDays.bind(this);
        this.btn.addEventListener("click", function () {
            let calendar = JSON.parse(localStorage.getItem("CalendarDay"));
            let trainingDays = getTrainingDays(username(), acccount());
            if (calendar == trainingDays) {
                window.location.href = "Completeday.html";
            }
            else {
                window.location.href = "Calendar.html";
            }
        });
    }
    createChart() {
        let xValues = this.xValues;
        let yValues = this.yValues;
        new Chart(this.myChart, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                        label: "Biểu đồ cân nặng",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0, 123, 255, 1.0)",
                        borderColor: "rgba(0, 123, 255, 0.5)",
                        data: yValues,
                    }]
            },
            options: {
                legend: { display: true },
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 6,
                                max: 20,
                                stepSize: 1
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Giá trị Y'
                            }
                        }],
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Giá trị X'
                            }
                        }]
                }
            }
        });
    }
    getUserName() {
        let username = decodeURIComponent(document.cookie);
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
    getDay(username, acccount) {
        let list = [];
        let day = [];
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                list = acccount[i].UpdateBmi;
            }
            for (let i = 0; i < list.length; i++) {
                let arr = list[i].split("=");
                day.push(Number(arr[0]));
            }
        }
        return day;
    }
    getWeight(username, acccount) {
        let list = [];
        let Weight = [];
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                list = acccount[i].UpdateBmi;
            }
            for (let i = 0; i < list.length; i++) {
                let arr = list[i].split("=");
                Weight.push(Number(arr[1]));
            }
        }
        return Weight;
    }
    getName(username, acccount) {
        let name = "";
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                name = acccount[i].Name;
            }
        }
        return name;
    }
    getAge(username, acccount) {
        let age = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                age = acccount[i].Age;
            }
        }
        return age;
    }
    getGender(username, acccount) {
        let gender = "";
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                if (acccount[i].Gender == true) {
                    gender = "Nam";
                }
                else {
                    gender = "Nữ";
                }
            }
        }
        return gender;
    }
    getHeight(username, acccount) {
        let height = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                height = acccount[i].Height;
            }
        }
        return height;
    }
    getWeightFirst(username, acccount) {
        let weight = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                weight = acccount[i].Weight;
            }
        }
        return weight;
    }
    getWeightNow(username, acccount) {
        let weight = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                let list = acccount[i].UpdateBmi;
                let arr = list[list.length - 1].split("=");
                weight = Number(arr[1]);
            }
        }
        return weight;
    }
    getBmiNow(username, acccount) {
        let getWeightNow = this.getWeightNow.bind(this);
        let getHeight = this.getHeight.bind(this);
        return Math.floor(parseInt(getWeightNow(username, acccount)) / ((parseInt(getHeight(username, acccount)) / 100) * (parseInt(getHeight(username, acccount)) / 100)));
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
let programStatistical = new ProgramStatistical();
