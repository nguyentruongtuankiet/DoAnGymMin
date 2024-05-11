

// Đại diện cho các vùng cơ mà người dùng muốn tập trung trong chương trình tập luyện. Các vùng cơ có thể bao gồm tay, ngực, bụng, chân hoặc toàn bộ cơ thể.
export class Exercises {
    protected name: string;
    protected video: string;
    protected sets: number;
    protected describe: string;
    constructor(name?: string, video?: string, sets?: number, describe?: string) {
        this.name = name;

        this.video = video;
        this.sets = sets;
        this.describe = describe;
    }
    set Name(name: string) {
        this.name = name;
    }
    get Name(): string {
        return this.name;

    }
    set Video(video: string) {
        this.video = video;
    }
    get Video(): string {
        return this.video;
    }
    set Sets(sets: number) {
        this.sets = sets;
    }
    get Sets(): number {
        return this.sets;
    }
    set Describe(describe: string) {
        this.describe = describe;
    }
    get Describe(): string {
        return this.describe;
    }





}