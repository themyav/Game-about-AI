let menuIsHidden = true;

function openInfo() {
    menuIsHidden = !menuIsHidden;
    if (!menuIsHidden) {
        document.getElementById('hiddenInfo').classList.add('openMenu');
        document.getElementById('hiddenInfo').classList.remove('closeMenu');
        document.getElementById('textArrow').textContent = "▲";
        showInfo();
        /*setTimeout(showInfo, 1500);*/
    } else {
        showInfo();
        document.getElementById('hiddenInfo').classList.remove('openMenu');
        document.getElementById('hiddenInfo').classList.add('closeMenu');
        document.getElementById('textArrow').textContent = "Узнать больше ▼";
    }
}

function showInfo() {
    if (menuIsHidden) {
        document.getElementById('infoText').style.display = 'none';
    } else {
        document.getElementById('infoText').style.display = 'block';
    }
}