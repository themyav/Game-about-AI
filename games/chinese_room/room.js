let chars = "!@#$%&*=-+?:;/*"
let rules = new Map();
let mapping = new Map([[0, "Нет результата"], [1, "Верно"], [-1, "Ошибка"]]);
let tasks_done_correct = 0;
let tasks_done = 0;
let last_results = [0, 0, 0, 0, 0];
let rules_left_on_cur_length = chars.length;
let cur_rule_len = 1;

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

function button() {
    check();
    addRule();
    updateUI();
}

function check() {
    // FIXME
    let input = document.getElementById("input_word").textContent;
    let output_got = document.getElementById("output_got").value;
    let output_correct = input;
    let rule;
    for (rule of rules) {
        output_correct.replace(rule[0], rule[1]);
    }
    console.log(input, output_correct, output_got);
    last_results.shift();
    tasks_done += 1;
    if (output_got === output_correct) {
        last_results.push(1);
        tasks_done_correct += 1;
    }
    else {
        last_results.push(-1);
    }
}

function updateUI() {
    if (tasks_done != 0) {
        document.getElementById("score_percent").innerHTML = Math.floor(tasks_done_correct / tasks_done * 100) + "%";
        document.getElementById("score").innerHTML = tasks_done_correct + "<br>верно из<br>" + tasks_done;
    }

    document.getElementById("input_word").innerHTML = newWord(12);

    resultsDoc = document.getElementById("results");
    while (resultsDoc.childElementCount > 0) {
        resultsDoc.removeChild(resultsDoc.firstChild);
    }

    for (result of last_results) {
        let resultDoc = document.createElement('div');
        resultDoc.innerHTML = mapping.get(result);
        resultsDoc.append(resultDoc);
    }
}

function addRule() {
    if (rules_left_on_cur_length <= 1) {
        cur_rule_len += 1;
        rules_left_on_cur_length = Math.pow(chars.length, cur_rule_len);
    }
    let input, output;
    while (true) {
        input = newWord(cur_rule_len);
        output = newWord(cur_rule_len);
        if (input === output) continue;
        if (rules.has(input) === true) continue;
        break;
    }

    rules.set(input, output);

    let docRules = document.getElementById("rules");
    let newRule = document.createElement('div');
    //newRule.innerHTML = "\"" + input + "\" => \"" + output + "\"";
    newRule.innerHTML = input.padEnd(7) + " => " + output;
    docRules.append(newRule);

    rules_left_on_cur_length -= 1;
}