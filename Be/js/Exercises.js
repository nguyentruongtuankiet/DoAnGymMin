// Đại diện cho các vùng cơ mà người dùng muốn tập trung trong chương trình tập luyện. Các vùng cơ có thể bao gồm tay, ngực, bụng, chân hoặc toàn bộ cơ thể.
export class Exercises {
    constructor(name, video, sets, describe) {
        this.name = name;
        this.video = video;
        this.sets = sets;
        this.describe = describe;
    }
    set Name(name) {
        this.name = name;
    }
    get Name() {
        return this.name;
    }
    set Video(video) {
        this.video = video;
    }
    get Video() {
        return this.video;
    }
    set Sets(sets) {
        this.sets = sets;
    }
    get Sets() {
        return this.sets;
    }
    set Describe(describe) {
        this.describe = describe;
    }
    get Describe() {
        return this.describe;
    }
}
