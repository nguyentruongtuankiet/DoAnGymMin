class Completeday {
    constructor() {
        this.loadElement();
        this.init();
    }
    loadElement() {
        this.btnCompleteday = document.getElementById("btn");
    }
    init() {
        let index = 0;
        let getUesrname = this.getUserName.bind(this);
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
        console.log(listAccount);
        this.btnCompleteday.addEventListener("click", function () {
            for (let i = 0; i < listAccount.length; i++) {
                let user = listAccount[i]['_username'];
                if (getUesrname() == user) {
                    index = listAccount.indexOf(listAccount[i]);
                    listAccount.splice(index, 1);
                }
            }
            localStorage.setItem("account", JSON.stringify(listAccount));
            window.location.href = "./Login.html";
        });
    }
    getUserName() {
        let username = decodeURIComponent(document.cookie);
        let arr = username.split("=");
        return arr[1];
    }
}
let c = new Completeday();
