import { Exercises } from "./Exercises";
import { Target } from "./Target";
// import { Login } from "./Login";
export class User {
    private id: number;
    private name: string;
    private gender: boolean;
    private age: number;
    private height: number;
    private weight: number;
    private target: Target[];
    private bmi: number;
    private exercises: Exercises[];
    private _username: string;
    private _password: string;
    private trainingdays: number;
    private completion: number;
    private updatebmi: string[];

    constructor(id: number = 1, name: string = "", gender: boolean, age: number = 1, height: number = 1, weight: number = 1, target: Target[] = [], bmi: number = 1, exercises: Exercises[] = [], username: string, password: string, trainingdays: number = 1, completion: number = 0, updatebmi: string[] = []) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.target = target;
        this.bmi = bmi;
        this.exercises = exercises;
        this._username = username;
        this._password = password;
        this.trainingdays = trainingdays;
        this.completion = completion;
        this.updatebmi = updatebmi;

    }
    set Id(id: number) {
        this.id = id;
    }
    get Id(): number {
        return this.id;
    }
    set Name(name: string) {
        this.name = name;
    }
    get Name(): string {
        return this.name;
    }
    set Gender(gender: boolean) {
        this.gender = gender;

    }
    get Gender(): boolean {
        return this.gender;
    }
    set Age(age: number) {
        this.age = age;
    }
    get Age(): number {
        return this.age;
    }
    set Height(height: number) {
        this.height = height;
    }
    get Height(): number {
        return this.height;
    }
    set Weight(weight: number) {
        this.weight = weight;
    }
    get Weight(): number {
        return this.weight;
    }
    set Target(target: Target[]) {
        this.target = target;
    }
    get Target(): Target[] {
        return this.target;
    }
    set Bmi(bmi: number) {
        this.bmi = bmi;
    }
    get Bmi(): number {
        return this.bmi;
    }
    set Exercises(exercises: Exercises[]) {
        this.exercises = exercises;
    }
    get Exercises(): Exercises[] {
        return this.exercises;
    }
    set Username(username: string) {
        this._username = username;
    }
    get Username(): string {
        return this._username;
    }
    set Password(password: string) {
        this._password = password;
    }
    get Password(): string {
        return this._password;
    }
    set Trainingdays(trainingdays: number) {
        this.trainingdays = trainingdays;
    }
    get Trainingdays(): number {
        return this.trainingdays;
    }
    set Completion(completion: number) {
        this.completion = completion;
    }
    get Completion(): number {
        return this.completion;
    }
    set UpdateBmi(updatebmi: string[]) {
        this.updatebmi = updatebmi;
    }
    get UpdateBmi(): string[] {
        return this.updatebmi;
    }




}