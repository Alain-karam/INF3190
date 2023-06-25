let age = 18;
let age2 = "18";
let firstName = "Alain";
let student = true;

age = age + 1;
age2 = age2 + 1;

console.log("Hello, " + firstName);
console.log("you are " + age);
console.log("not " + age2);
console.log("and you're still a student " + student);


document.getElementById("p1").innerHTML = "Hello, " + firstName;
document.getElementById("p2").innerHTML = "you are " + age;
document.getElementById("p3").innerHTML = "not " + age2;
document.getElementById("p4").innerHTML = "and you're still a student " + student;