function exitPage() {
    let ans = confirm("Вы действительно хотите выйти их игры? Ваш прогресс будет утерян.");

    if (ans) {
        document.location='/Game-about-AI';
    }
}