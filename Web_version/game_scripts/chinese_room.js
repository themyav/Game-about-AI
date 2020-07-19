let foreign_words = ['##', '## @', '#@# <@>', '<@><@>$', '@@ ## %',
            '%@@% $$ *', '#$# ** % ^', '<@> @*^^', '#%# #<@># #$#', '@<@>@<@> ** %#',
            '%$ @@ ##<@>$^$', '%*# %^% %$% %<@>', '^@^ ^<@>^b^#^ #', '@# #%#^ @<@>#%^<@>$',
            '@# *@*% #%@ **$ #@#^^', '$#$$ ^^@^^<@> *$*%% #%#'];
        let rules = ['На символ # отвечай @', 'На символ @ отвечай !', 'На символ <@> отвечай #',
            'На символ $ отвечай ?', 'На символ % отвечай <@>', 'На символ * отвечай !!', 'На символ ^ отвечай *'];
        let map = new Map();
        map.set('#', '@').set('@', '!').set('<', '#').set('$', '?').set('%', '<@>').set('*', '!!').set('^', '*').set(' ', ' ');
        let i = 0;
        let j = 0;
        let words_num = foreign_words.length;
        let rules_num = rules.length;
        let true_answers = 0;
        function change() {
            let word = document.getElementById("new_word").textContent;
            let user_answer = document.getElementById("answer").value;
            let answer = '';
            for(let i = 0; i < word.length; i++){
                answer += map.get(word[i]);
                if(word[i] === '<') i = i + 2;
            }
            document.getElementById("check").innerText = 'Проверить!';
            if(i == 0)  document.getElementById("result").innerHTML = '0/' + String(words_num) +  ' верных ответов';
            if(i > 0){
                let pos  = "level" + String(i - 1);
                if(answer === user_answer) {
                    document.getElementById(pos).innerHTML = 'Верно';
                    true_answers++;
                    document.getElementById("result").innerHTML = String(true_answers) + '/' + String(words_num) + ' верных ответов';
                }
                else document.getElementById(pos).innerHTML = 'Ошибка';
            }
            if(i < words_num){
                document.getElementById("new_word").innerHTML = foreign_words[i];
                pos = "rule" + String(j);
                document.getElementById(pos).innerHTML = rules[j];
            }
            else if(i == words_num) {
                document.getElementById("new_word").innerHTML = 'Жми на кнопку "Проверить", чтобы сыграть еще раз.';
                document.getElementById("check").innerText = 'Играть еще раз!';
            }
            i = (i + 1) % (words_num + 1);
            j = (j + 1) % rules_num;
        }