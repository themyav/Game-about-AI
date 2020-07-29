let matchesPerTurn = 2;
let matchesOnGameBegin = 0;
let curMatchesTakenByUser = 0;
let matches = 0;
const maxMatches = 30;

let games = 0;
let userWins = 0;

let turns = [];

let userCanTurn = true;
let wasTurns = false;

let AI_Table_Best_Turn = new Map();

function AIMakeTurn() {
    let AITakingMatchesNum = Math.min(AIPredict(), matches);
    turns.push(AITakingMatchesNum);
    matches -= AITakingMatchesNum;
    for (let i = 0; i < matchesOnGameBegin && AITakingMatchesNum > 0; i++) {
        let curMatch = document.getElementById("match" + i) ;
        if (curMatch.style.visibility !== "hidden") {
            AITakingMatchesNum--;
            curMatch.style.visibility = "hidden";
        }
    }

    if (matches === 0) {
        games++;
        alert("ИИ победил");
        AIRecalc(true);
        generateNewGame();
        return;
    }
    userCanTurn = true;
    updateUI();
}

function AIPredict() {
    if (AI_Table_Best_Turn.has(matches)) {
        return AI_Table_Best_Turn.get(matches);
    }
    return randInt(1, matchesPerTurn + 1);
}

function AIRecalc() {
    let curMatches = 0;
    let doIRecord = true;
    for (let i = turns.length - 1; i >= 0; i -= 1) {
        curMatches += turns[i];
        if (doIRecord && !AI_Table_Best_Turn.has(curMatches)) {
            console.log(`Now i know that on ${curMatches} i turn ${turns[i]}`)
            AI_Table_Best_Turn.set(curMatches, turns[i]);
        }
        doIRecord = !doIRecord;
    }
    console.log(AI_Table_Best_Turn);
}

function endUserTurn() {
    userCanTurn = false;
    if (curMatchesTakenByUser === 0) {
        alert("Вы должны взять хотя бы одну спичку");
        return;
    }
    turns.push(curMatchesTakenByUser);
    curMatchesTakenByUser = 0;
    if (matches === 0) {
        userWins++;
        games++;
        alert("Вы победили");
        AIRecalc(false);
        generateNewGame();
        return;
    }
    setTimeout(() => {  AIMakeTurn(); }, 500);
    updateUI();
}

function matchesPerTurnChange() {
    let matchesPerTurnInput = document.getElementById("matchesPerTurn");
    if (wasTurns) {
        if (!confirm("Вы точно хотите продолжить? Изменение этого значения приведёт к перезапуску игры и потере прогресса обучения.")) {
            matchesPerTurnInput.value = matchesPerTurn;
            return;
        }
    }

    let newMatchesPerTurn = matchesPerTurnInput.value;
    newMatchesPerTurn = Math.min(10, Math.max(2, newMatchesPerTurn));
    matchesPerTurnInput.value = newMatchesPerTurn;
    matchesPerTurn = newMatchesPerTurn;
    AI_Table_Best_Turn.clear();
    generateNewGame();
    wasTurns = false;
}

function userTakesMatch(num) {
    wasTurns = true;
    if (!userCanTurn) return;
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
    userCanTurn = true;
    matchesOnGameBegin = randInt(matchesPerTurn + 1, maxMatches);
    matches = matchesOnGameBegin;
    curMatchesTakenByUser = 0;
    let matchesHolder = document.getElementById("matches_holder");

    while (matchesHolder.childElementCount > 0) {
        matchesHolder.removeChild(matchesHolder.firstChild);
    }

    for (let i = 0; i < matchesOnGameBegin; i++) {
        matchesHolder.insertAdjacentHTML('beforeend', "<img src=\"resources/match.png\" width=\"24px\" id=\"match" + i + "\" onclick=\"userTakesMatch(" + i + ");\">");
    }
    turns = [];
    updateUI();
}

function updateUI() {
    document.getElementById("matchesNumOnTable").innerText = "Число спичек на столе: " + matches;
    document.getElementById("mathcesTakenByUser").innerText = "Вы взяли спичек: " + curMatchesTakenByUser;
    document.getElementById("score_percent").innerText = Math.floor(AI_Table_Best_Turn.size / maxMatches * 100) + "%";
    document.getElementById("score").innerHTML = userWins + "<br>побед из<br>" + games;
}

function togglePause() {
}