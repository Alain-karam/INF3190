let age = window.prompt("How old are you?");


let age2 = age + 1;
//age = parseInt(age) + 1;
age  = Number(age) + 1;

console.log(typeof age);
console.log(typeof age2);
console.log("You will be " , age , " years old next year. and not " + age2 + " years old next year.");


let w,x,y,z;

w = Number(3.14);
x = Number("3.14");
y = Boolean("");
z = Boolean("asdf");

console.log(x);
console.log(y);
console.log(z);