export class Target {
    protected day: number
    protected practice: string // thời gian tập luyện
    protected kcal: number
    constructor(day: number, practice: string, kcal: number) {
        this.day = day
        this.practice = practice
        this.kcal = kcal
    }
    set Day(day: number) {
        this.day = day
    }
    get Day(): number {
        return this.day
    }
    set Practice(practice: string) {
        this.practice = practice
    }
    get Practice(): string {
        return this.practice
    }
    set Kcal(kcal: number) {
        this.kcal = kcal
    }
    get Kcal(): number {
        return this.kcal
    }
}