// import { Login } from "./Login";
export class User {
    constructor(id = 1, name = "", gender, age = 1, height = 1, weight = 1, target = [], bmi = 1, exercises = [], username, password, trainingdays = 1, completion = 0, updatebmi = []) {
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
    set Id(id) {
        this.id = id;
    }
    get Id() {
        return this.id;
    }
    set Name(name) {
        this.name = name;
    }
    get Name() {
        return this.name;
    }
    set Gender(gender) {
        this.gender = gender;
    }
    get Gender() {
        return this.gender;
    }
    set Age(age) {
        this.age = age;
    }
    get Age() {
        return this.age;
    }
    set Height(height) {
        this.height = height;
    }
    get Height() {
        return this.height;
    }
    set Weight(weight) {
        this.weight = weight;
    }
    get Weight() {
        return this.weight;
    }
    set Target(target) {
        this.target = target;
    }
    get Target() {
        return this.target;
    }
    set Bmi(bmi) {
        this.bmi = bmi;
    }
    get Bmi() {
        return this.bmi;
    }
    set Exercises(exercises) {
        this.exercises = exercises;
    }
    get Exercises() {
        return this.exercises;
    }
    set Username(username) {
        this._username = username;
    }
    get Username() {
        return this._username;
    }
    set Password(password) {
        this._password = password;
    }
    get Password() {
        return this._password;
    }
    set Trainingdays(trainingdays) {
        this.trainingdays = trainingdays;
    }
    get Trainingdays() {
        return this.trainingdays;
    }
    set Completion(completion) {
        this.completion = completion;
    }
    get Completion() {
        return this.completion;
    }
    set UpdateBmi(updatebmi) {
        this.updatebmi = updatebmi;
    }
    get UpdateBmi() {
        return this.updatebmi;
    }
}
