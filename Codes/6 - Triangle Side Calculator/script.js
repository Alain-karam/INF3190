let a, b, c;

document.getElementById("calculate").onclick = function() {

    a = document.getElementById("a").value;
    b = document.getElementById("b").value;

    c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    document.getElementById("result").innerHTML = "c = " + c;
}
