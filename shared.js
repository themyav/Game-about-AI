let isSwapped = false;

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

function exitPage() {
    let ans = confirm("Вы действительно хотите выйти их игры? Ваш прогресс будет утерян.");

    if (ans) {
        document.location='../../';
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) {
    // Copy-paste from the Internet
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < ms);
}