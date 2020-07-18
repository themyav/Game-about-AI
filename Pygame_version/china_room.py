#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fileencoding=utf-8
words = []
rules = []
f = open('foreign_words.txt')
r = open('rules.txt')
for line in f:
    words.append(line)
for line in r:
    rules.append(line)
print(rules)
def get_answ(s):
    ignore = [False for i in range(len(s))]
    answer = ''
    for i in range(len(s)):
        if ignore[i]:
            continue
        if s[i] == '#':
            answer += '@'
        if s[i] == '@':
            answer += '!'
        if s[i] == '<':
            answer += '#'
            ignore[i + 1] = True
            ignore[i + 2] = True
        if s[i] == '$':
            answer += '?'
        if s[i] == '%':
            answer += '<@>'
        if s[i] == '*':
            answer += '!!'
        if s[i] == '^':
            answer += '*'
        if s[i] == ' ':
            answer += ' '
    return answer

step = 1
point = 0

for i in range(len(words)):
    if i < len(rules):
        print(rules[i], end = '')
    print(words[i], end = '')
    your_answ = input()
    m_answ = get_answ(words[i])
    if your_answ == m_answ:
        print("OK", end = ' ')
        point+=1
    else:
        print("INCORRECT", end = ' ')
    print("step: ", step, "/15; points: ", point)
    step+=1

