var isSwapped = false;

function swapPage() {
    if (!isSwapped) {
        document.getElementById('supportPage').style.display = "block";
        document.getElementById('mainPage').style.display = "none";
        isSwapped = true;
    } else {
        document.getElementById('supportPage').style.display = "none";
        document.getElementById('mainPage').style.display = "block";
        isSwapped = false;
    }
    togglePause();
}