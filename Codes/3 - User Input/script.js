let username;

document.getElementById("myButton").onclick = function () {
    username = document.getElementById("myName").value;
    console.log(username + " is logged in");
    document.getElementById("myLabel").innerHTML = "Log out";
}
