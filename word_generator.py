import random

good_words = ['кот', 'мама', 'солнце', 'суп']
bad_words = []

def generate():
    base = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    s_len = random.randint(1, 7)
    new_word = ''
    for i in range(s_len):
        new_word += base[random.randint(0, 32)]
    return  new_word

for step in range(20):
    cur_words = []
    good = [False for i in range(10)]
    true_len = 0
    for i in range(7):
        word = generate()
        if not(word in bad_words):
            cur_words.append(word)
            true_len+=1
    while true_len < 10:
        cur_words.append(good_words[random.randint(0, len(good_words) - 1)])
        true_len += 1
    random.shuffle(cur_words)
    print(*cur_words)
    print('Введите границы отрезков существующих фраз. Нумерация с 1.')
    indexes = [int(i) for i in input().split()]
    for i in range(0, len(indexes), 2):
        l = indexes[i]
        r = indexes[i + 1]
        r -=1
        l-=1
        for j in range(l, r + 1):
            good[j] = True
    for i in range(len(good)):
        phrase = ''
        if good[i] and not(cur_words[i] in good_words):
            good_words.append(cur_words[i])
        else:
            bad_words.append(cur_words[i])
