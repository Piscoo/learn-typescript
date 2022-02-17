// example type 
// function greeter(person: string) {
// 	return "Hello, " + person;
// }
// let user = "Pisco";
// let user = [1, 2, 3];
// document.body.innerHTML = greeter(user);
/**
 * tsc greeter.ts
 * greeter.ts:7:35 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
 */
// interface
// interface Person {
// 	firstName: string;
// 	lastName: string;
// }
// function greeter(person: Person) {
// 	return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = {
// 	firstName: "Pisco",
// 	lastName: "Smith"
// };
// document.body.innerHTML = greeter(user);
// class
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + " " + person.lastName + "！" + "<br>" + person.fullName;
}
var user = new Student("Pisco", "X.", "Smith");
document.body.innerHTML = greeter(user);
