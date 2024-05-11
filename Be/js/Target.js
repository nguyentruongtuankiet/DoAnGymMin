export class Target {
    constructor(day, practice, kcal) {
        this.day = day;
        this.practice = practice;
        this.kcal = kcal;
    }
    set Day(day) {
        this.day = day;
    }
    get Day() {
        return this.day;
    }
    set Practice(practice) {
        this.practice = practice;
    }
    get Practice() {
        return this.practice;
    }
    set Kcal(kcal) {
        this.kcal = kcal;
    }
    get Kcal() {
        return this.kcal;
    }
}
