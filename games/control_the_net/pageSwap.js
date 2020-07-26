var isSwapped = false;

function swap() {
    if (!isSwapped) {
        document.getElementById('supportPage').style.display = "block";
        document.getElementById('mainPage').style.display = "none";
        isSwapped = true;
        clearInterval(IntervalId);
    } else {
        document.getElementById('supportPage').style.display = "none";
        document.getElementById('mainPage').style.display = "block";
        isSwapped = false;
        IntervalId = setInterval(drawFrame, 10);
    }
}
