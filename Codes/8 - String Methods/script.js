let username = "Alain Karam";
let firstname, lastname;
let phone = "514-123-1234";
let phone2 = "438-123-1234";

console.log("username: " , username);
console.log("length: " , username.length);
console.log("UpperCase: " , username.toUpperCase());
console.log("LowerCase: " , username.toLowerCase());
console.log("first letter: " , username.charAt(0));
console.log("second letter: " , username.charAt(1));
console.log("last letter: " , username.charAt(username.length - 1));
console.log(username.indexOf("i"));
console.log(username.lastIndexOf("a"));

phone = phone.replace("-", "");
phone2 = phone2.replaceAll("-", "");
console.log(phone);
console.log(phone2);

console.log("first name using slice(): " + username.slice(0, 5));
console.log("first name using indexOf(): " + username.slice(0, username.indexOf(" ")));

console.log("last name using slice(): " + username.slice(6));
console.log("last name using indexOf(): " + username.slice(username.indexOf(" ") + 1));