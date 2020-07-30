let menuIsHidden = true;

function openInfo() {
    menuIsHidden = !menuIsHidden;
    if (!menuIsHidden) {
        document.getElementById('hiddenInfo').classList.toggle('openMenu');
        document.getElementById('textArrow').textContent = "▲";
    } else {
        document.getElementById('hiddenInfo').classList.toggle('openMenu');
        document.getElementById('textArrow').textContent = "Узнать больше ▼";
    }
}