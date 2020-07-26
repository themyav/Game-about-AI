let matchesPerTurn = 2;
let matchesOnGameBegin = 0;
let curMatchesTakenByUser = 0;
let matches = 0;

let AI_Table_Q_Values;
let AI_Table_Best_Turn = new Map();

function AIMakeTurn() {
    let AITakingMatchesNum = Math.min(AIPredict(), matches);
    console.log(`From matches ${matches} AI goes ${AITakingMatchesNum}`);
    matches -= AITakingMatchesNum;
    for (let i = 0; i < matchesOnGameBegin && AITakingMatchesNum > 0; i++) {
        let curMatch = document.getElementById("match" + i) ;
        if (curMatch.style.visibility !== "hidden") {
            AITakingMatchesNum--;
            curMatch.style.visibility = "hidden";
        }
    }

    console.log(`Now there are ${matches} matches`);
    if (matches === 0) {
        alert("ИИ победил");
        AIRecalc(true);
        generateNewGame();
        return;
    }
    updateUI();
}

function AIPredict() {
    if (AI_Table_Best_Turn.has(matches)) {
        return AI_Table_Best_Turn.get(matches);
    }
    return randInt(1, 3);
}

function AIRecalc(didAIWin) {

}

function endUserTurn() {
    if (curMatchesTakenByUser === 0) {
        alert("Вы должны взять хотя бы одну спичку");
        return;
    }
    curMatchesTakenByUser = 0;
    if (matches === 0) {
        alert("Вы победили");
        AIRecalc(false);
        generateNewGame();
        return;
    }
    AIMakeTurn();
    updateUI();
}

function matchesPerTurnChange() {
    let matchesPerTurnInput = document.getElementById("matchesPerTurn");
    if (!confirm("Вы точно хотите продолжить? Изменение этого значения приведёт к перезапуску игры и потере прогресса обучения.")) {
        matchesPerTurnInput.value = matchesPerTurn;
        return;
    }

    let newMatchesPerTurn = matchesPerTurnInput.value;
    newMatchesPerTurn = Math.min(10, Math.max(2, newMatchesPerTurn));
    matchesPerTurnInput.value = newMatchesPerTurn;
    matchesPerTurn = newMatchesPerTurn;
    generateNewGame();
}

function userTakesMatch(num) {
    matchImg = document.getElementById("match" + num);
    matchImg.style.visibility = "hidden";
    curMatchesTakenByUser += 1;
    matches -= 1;
    if (curMatchesTakenByUser === matchesPerTurn || matches === 0) {
        endUserTurn();
    }
    updateUI();
}

function generateNewGame() {
    matchesOnGameBegin = randInt(matchesPerTurn + 1, 20);
    console.log(matchesOnGameBegin, matchesPerTurn);
    matches = matchesOnGameBegin;
    curMatchesTakenByUser = 0;
    let matchesHolder = document.getElementById("matches_holder");

    while (matchesHolder.childElementCount > 0) {
        matchesHolder.removeChild(matchesHolder.firstChild);
    }

    for (let i = 0; i < matchesOnGameBegin; i++) {
        matchesHolder.insertAdjacentHTML('beforeend', "<img src=\"resources/match.png\" width=\"24px\" id=\"match" + i + "\" onclick=\"userTakesMatch(" + i + ");\">");
    }
    updateUI();
}

function updateUI() {
    document.getElementById("matchesNumOnTable").innerText = "Число спичек на столе: " + matches;
    document.getElementById("mathcesTakenByUser").innerText = "Вы взяли спичек: " + curMatchesTakenByUser;
}

function togglePause() {
}