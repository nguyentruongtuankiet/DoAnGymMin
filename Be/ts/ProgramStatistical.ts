
import { User } from "./User.js";
declare var Chart: any;
export class ProgramStatistical {
    private xValues: string[];
    private yValues: number[];
    private myChart: HTMLCanvasElement;
    private name: HTMLSpanElement;
    private age: HTMLSpanElement;
    private gender: HTMLSpanElement;
    private height: HTMLSpanElement;
    private weight: HTMLSpanElement;
    private weightnow: HTMLSpanElement;
    private bmi: HTMLSpanElement;
    private btn: HTMLButtonElement;
    private p: HTMLParagraphElement;



    constructor() {
        this.load();
        this.getData();
        this.createChart();
        this.init();

    }
    private load() {
        this.myChart = document.getElementById("myChart") as HTMLCanvasElement;
        this.name = document.getElementById("name") as HTMLSpanElement;
        this.age = document.getElementById("age") as HTMLSpanElement;
        this.gender = document.getElementById("sex") as HTMLSpanElement;
        this.height = document.getElementById("height") as HTMLSpanElement;
        this.weight = document.getElementById("weight") as HTMLSpanElement;
        this.weightnow = document.getElementById("weightnow") as HTMLSpanElement;
        this.bmi = document.getElementById("bmi") as HTMLSpanElement;
        this.btn = document.getElementById("btn") as HTMLButtonElement;
        this.p = document.getElementById("comment") as HTMLParagraphElement;
    }

    private getData() {
        let username = this.getUserName.bind(this);
        let acccount = this.getListAccount.bind(this);
        let getDay = this.getDay.bind(this);
        let getWeight = this.getWeight.bind(this);
        let arrDay: number[] = getDay(username(), acccount());
        let arrWeight: number[] = getWeight(username(), acccount());
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
        } else if (getWeightFirst(username(), acccount()) < weightNow(username(), acccount())) {
            this.p.innerHTML = "Dựa vào cân nặng hiện tại của bạn cho thấy, Bạn đã tăng cân,hãy xem lại mục đích ban đầu của bạn khi đến với tôi là gì nhé Chúc bạn may mắn !";
        }

    }
    private init() {
        let username = this.getUserName.bind(this);
        let acccount = this.getListAccount.bind(this);
        let getTrainingDays = this.getTrainingDays.bind(this);
        this.btn.addEventListener("click", function () {
            let calendar = JSON.parse(localStorage.getItem("CalendarDay"));
            let trainingDays = getTrainingDays(username(), acccount());
            if (calendar == trainingDays) {
                window.location.href = "Completeday.html";
            } else {
                window.location.href = "Calendar.html";
            }
        });
    }
    private createChart() {
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
                legend: { display: true }, // Hiển thị chú thích
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
    private getUserName(): string {
        let username = decodeURIComponent(document.cookie);
        let arr = username.split("=");

        return arr[1];
    }
    private getListAccount(): User[] {
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
                let u: User = new User(0, "", true, 0, 0, 0, [], 0, [], "", "", 0, 0, []);
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
    private getDay(username: string, acccount: User[]): number[] {
        let list: string[] = [];
        let day: number[] = [];
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
    private getWeight(username: string, acccount: User[]): number[] {
        let list: string[] = [];
        let Weight: number[] = [];
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
    private getName(username: string, acccount: User[]): string {
        let name: string = "";
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                name = acccount[i].Name;
            }
        }
        return name;
    }
    private getAge(username: string, acccount: User[]): number {
        let age: number = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                age = acccount[i].Age;
            }
        }
        return age;
    }
    private getGender(username: string, acccount: User[]): string {
        let gender: string = "";
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                if (acccount[i].Gender == true) {
                    gender = "Nam";
                } else {
                    gender = "Nữ";
                }
            }
        }
        return gender;
    }
    private getHeight(username: string, acccount: User[]): number {
        let height: number = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                height = acccount[i].Height;
            }
        }
        return height;
    }
    private getWeightFirst(username: string, acccount: User[]): number {
        let weight: number = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                weight = acccount[i].Weight;
            }
        }
        return weight;
    }
    private getWeightNow(username: string, acccount: User[]): number {
        let weight: number = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                let list = acccount[i].UpdateBmi;
                let arr = list[list.length - 1].split("=");
                weight = Number(arr[1]);
            }
        }
        return weight;
    }
    private getBmiNow(username: string, acccount: User[]): number {
        let getWeightNow = this.getWeightNow.bind(this);
        let getHeight = this.getHeight.bind(this);
        return Math.floor(parseInt(getWeightNow(username, acccount)) / ((parseInt(getHeight(username, acccount)) / 100) * (parseInt(getHeight(username, acccount)) / 100)));
    }
    private getTrainingDays(username: string, acccount: User[]): number {
        let trainingDays: number = 0;
        for (let i = 0; i < acccount.length; i++) {
            if (acccount[i].Username == username) {
                trainingDays = acccount[i].Trainingdays;
            }
        }
        return trainingDays;
    }
}

let programStatistical = new ProgramStatistical();