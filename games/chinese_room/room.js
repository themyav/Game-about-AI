let chars = "!@#%*=-+?:;*" // $ и & не ставить, они какие-то системные
let rules = []
let rulesMap = new Map()
let mapping = new Map([[0, "Нет результата"], [1, "Верно"], [-1, "Ошибка"]]);
let tasks_done_correct = 0;
let tasks_done = 0;
let last_results = [0, 0, 0, 0, 0];
let rules_left_on_cur_length = chars.length;
let cur_rule_len = 1;
let cur_word_len = 6;
let delta_len_word = 4;
let turns_to_inc_word = 5;

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function newWord(length) {
    let word = "";
    while (word.length < length) {
        word = word + chars[randInt(0, chars.length - 1)];
    }
    return word;
}

function realReplace(source, from, to) {
    while (source.includes(from)) {
        source = source.replace(from, to);
    }
    return source;
}

function maskString(str) {
    let maskedStr = "";
    let char;
    for (char of str) {
        maskedStr = maskedStr + "o" + char;
    }
    return maskedStr;
}

function makeCorrectResult(input) {
    let maskedInput = maskString(input);
    let rule;
    for (rule of rules) {
        let maskedRule = maskString(rule);
        maskedInput = realReplace(maskedInput, maskedRule, rulesMap.get(rule));
    }
    maskedInput = realReplace(maskedInput, "o", "");
    return maskedInput;
}

function button() {
    check();
    addRule();
    updateUI();
}

function check() {
    let input = document.getElementById("input_word").textContent;
    let output_got = document.getElementById("output_got").value;
    let output_correct = makeCorrectResult(input);
    console.log(input, output_correct, output_got);

    last_results.pop();
    tasks_done += 1;
    if (output_got === output_correct) {
        last_results.unshift(1);
        tasks_done_correct += 1;
    }
    else {
        last_results.unshift(-1);
    }
}

function updateUI() {
    if (tasks_done !== 0) {
        document.getElementById("score_percent").innerHTML = Math.floor(tasks_done_correct / tasks_done * 100) + "%";
        document.getElementById("score").innerHTML = tasks_done_correct + " верно из " + tasks_done;
    }

    turns_to_inc_word -= 1;
    if (turns_to_inc_word == 0) {
        turns_to_inc_word = 5;
        cur_word_len += delta_len_word;
        delta_len_word = Math.max(delta_len_word - 2, 0);
    }
    document.getElementById("input_word").innerHTML = newWord(cur_word_len);

    resultsDoc = document.getElementById("results");
    while (resultsDoc.childElementCount > 0) {
        resultsDoc.removeChild(resultsDoc.firstChild);
    }

    for (result of last_results) {
        let resultDoc = document.createElement('div');
        resultDoc.innerHTML = mapping.get(result);
        resultsDoc.append(resultDoc);
    }
    document.getElementById("output_got").value = "";
}

function addRule() {
    if (rules.length >= 15) return;
    if (rules_left_on_cur_length <= 1) {
        cur_rule_len += 1;
        rules_left_on_cur_length = Math.pow(chars.length, cur_rule_len);
    }
    let input, output;
    while (true) {
        input = newWord(cur_rule_len);
        output = newWord(cur_rule_len);
        if (input === output) continue;
        if (rulesMap.has(input) === true) continue;
        break;
    }

    rulesMap.set(input, output);
    rules.unshift(input);

    let docRules = document.getElementById("rules");
    let newRule = document.createElement('div');
    //newRule.innerHTML = "\"" + input + "\" => \"" + output + "\"";
    newRule.innerHTML = input.padEnd(7) + " заменяй на " + output;
    docRules.insertAdjacentElement("afterbegin", newRule);

    rules_left_on_cur_length -= 1;
}

function togglePause() {
    return;
}