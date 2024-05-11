import { Exercises } from "./Exercises.js";
import { DataExercises } from "./dataExercises.js";
import { DataTarget } from "./ListTarget.js";
import { Target } from "./Target.js";
export class ListExercises {
    constructor() {
        this.loadElement();
        this.loadData();
        this.init();
    }
    loadElement() {
        this.spanDay = document.getElementById("day");
        this.spanKcal = document.getElementById("kcal");
        this.spanTime = document.getElementById("time");
        this.spanExercisesName = document.getElementById("nameEx");
        this.spanQuantity = document.getElementById("quantity");
        this.divListExercises = document.getElementById("listEx");
        this.btnBegin = document.getElementById("button");
    }
    loadData() {
        const exercises = [];
        // lấy danh sách bài tập từ file dataExercises
        for (let e of DataExercises) {
            const newEx = new Exercises(e.name, e.video, e.sets, e.describe);
            exercises.push(newEx);
        }
        // cập nhật cho this.exList
        this.exList = exercises;
        const target = [];
        // lấy danh sách target từ file ListTarget
        for (let t of DataTarget) {
            const newTarget = new Target(t.day, t.practice, t.kcal);
            target.push(newTarget);
        }
        // cập nhật cho this.target
        this.target = target;
    }
    init() {
        let target = this.target;
        let btnBegin = this.btnBegin;
        // hiển thị ngày tập luyện
        this.spanDay.innerHTML = this.getCalendarDays() + "";
        // gọi lại hàm lấy danh sách bài tập tùy theo tên bài tập gán cho biến filterExercises
        let filterExercises = this.filterExercises.bind(this);
        // gọi lại hàm tạo danh sách bài tập gán cho biến createListExercises
        let createListExercises = this.createListExercises.bind(this);
        let exList = [];
        // vì có cao nhất là 6 tháng nên cho i chạy từ 1 đến 180 luôn :)))) là 180 ngày á
        for (let i = 1; i <= 180; i++) {
            // nếu i == ngày tập luyện
            if (i == Number(this.getCalendarDays())) {
                // nếu ngày tập mà rời vào ngày 1 (thứ hai) hoặc ngày 4 (thứ năm) 
                if (i % 7 == 1 || i % 7 == 4) {
                    // hiển thị thông tin tập luyện tùy theo ngày tập luyện theo target từ file ListTarget đã được lưu cho biến target tuongw tự mấy cái dưới cũng thế nha :))))
                    this.spanKcal.innerHTML = target[0].Kcal + "";
                    this.spanTime.innerHTML = target[0].Practice;
                    this.spanExercisesName.innerHTML = "Ngực, Vai, Tay Sau";
                    let ex1 = filterExercises("Ngực", this.exList);
                    let ex2 = filterExercises("Vai", this.exList);
                    let ex3 = filterExercises("Tay", this.exList);
                    let ex4 = filterExercises("Sau", ex3);
                    ex1.push(...ex2, ...ex4);
                    exList = ex1;
                    // console.log(ex1);
                }
                else if (i % 7 == 2 || i % 7 == 5) {
                    this.spanKcal.innerHTML = target[1].Kcal + "";
                    this.spanTime.innerHTML = target[1].Practice;
                    this.spanExercisesName.innerHTML = "Lưng, Xô, Tay Trước";
                    let ex1 = filterExercises("Lưng", this.exList);
                    let ex2 = filterExercises("Xô", this.exList);
                    let ex3 = filterExercises("Tay", this.exList);
                    let ex4 = filterExercises("Trước", ex3);
                    ex1.push(...ex2, ...ex4);
                    exList = ex1;
                    // console.log(ex1);
                }
                else if (i % 7 == 3 || i % 7 == 6) {
                    this.spanKcal.innerHTML = target[2].Kcal + "";
                    this.spanTime.innerHTML = target[2].Practice;
                    this.spanExercisesName.innerHTML = "Chân, Bụng";
                    let ex1 = filterExercises("Chân", this.exList);
                    let ex2 = filterExercises("Cầu", this.exList);
                    let ex3 = filterExercises("Squat", this.exList);
                    let ex4 = filterExercises("Đùi", this.exList);
                    let ex5 = filterExercises("Mông", this.exList);
                    let ex6 = filterExercises("Bụng", this.exList);
                    let ex7 = filterExercises("Liên", this.exList);
                    ex1.push(...ex2, ...ex3, ...ex4, ...ex5, ...ex6, ...ex7);
                    exList = ex1;
                    // console.log(ex1);
                }
                else if (i % 7 == 0) {
                    this.spanKcal.innerHTML = this.target[6].Kcal + "";
                    this.spanTime.innerHTML = this.target[6].Practice;
                    this.spanExercisesName.innerHTML = "Cardio";
                    let ex1 = filterExercises("Cardio", this.exList);
                    let ex2 = filterExercises("Nhảy", this.exList);
                    ex1.push(...ex2);
                    exList = ex1;
                }
            }
        }
        // tạo danh sách bài tập theo danh sách bài tập đã được lọc ở trên
        createListExercises(exList);
        // nếu ấn bắt đầu thì lưu danh sách bài tập đã được lọc ở trên vào localstorage và chuyển sang trang Ex.html
        btnBegin.addEventListener("click", function () {
            localStorage.setItem("ListEx", JSON.stringify(exList));
            localStorage.setItem("indexEx", JSON.stringify(0));
            window.location.href = "./Ex.html";
        });
    }
    // tạo danh sách bài tập hiển thị lên web
    createListExercises(exList) {
        this.spanQuantity.innerHTML = exList.length + "";
        for (let e of exList) {
            let span1 = document.createElement("span");
            span1.innerHTML = e.Name;
            span1.style.fontWeight = "bold"; // Set font weight to bold
            span1.style.fontSize = "20px";
            let divspan1 = document.createElement("div");
            divspan1.className = "row";
            divspan1.appendChild(span1);
            let span2 = document.createElement("span");
            span2.innerHTML = e.Sets + "";
            let h5 = document.createElement("h5");
            h5.style.fontSize = "15px";
            h5.innerHTML = "Sets:";
            h5.appendChild(span2);
            let divspan2 = document.createElement("div");
            divspan2.className = "row";
            divspan2.appendChild(h5);
            let div1 = document.createElement("div");
            div1.className = "col-md-8";
            div1.appendChild(divspan1);
            div1.appendChild(divspan2);
            let video = document.createElement("video");
            video.src = e.Video;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.style.width = "100%";
            video.style.height = "100%";
            let div2 = document.createElement("div");
            div2.className = "col-md-4";
            // div2.style.backgroundColor = "black";
            div2.appendChild(video);
            let div3 = document.createElement("div");
            div3.className = "row";
            div3.appendChild(div2);
            div3.appendChild(div1);
            let div = document.createElement("div");
            div.className = "oneEx";
            div.style.margin = "10px";
            div.addEventListener("click", function () {
                localStorage.setItem("ListEx", JSON.stringify(exList));
                localStorage.setItem("indexEx", JSON.stringify(exList.indexOf(e)));
                window.location.href = "./Ex.html";
            });
            div.appendChild(div3);
            this.divListExercises.appendChild(div);
        }
    }
    // lấy danh sách bài tập theo tên bài tập
    filterExercises(str, ex) {
        const exercises = [];
        for (let e of ex) {
            let arr = e.Name.split(" ");
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == str) {
                    exercises.push(e);
                }
            }
        }
        return exercises;
    }
    // lấy số lượng ngày tập luyện
    getCalendarDays() {
        let day = JSON.parse(localStorage.getItem("CalendarDay"));
        return Number(day);
    }
}
let list = new ListExercises();
