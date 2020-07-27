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
    let ans = confirm("Вы действительно хотите выйти из игры? Ваш прогресс будет утерян.");

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

function div(numerator, denominator) {
    return Math.floor(numerator / denominator);
}

function infoBox() {
    isSwapped = !isSwapped;
    if (isSwapped) {
        document.getElementById('supportBG').style.display = 'block';
        document.getElementById('supportBG').classList.add('animate');
    } else {
        document.getElementById('supportBG').style.display = 'none';
        document.getElementById('supportBG').classList.remove('animate');
    }
    togglePause();
}