# -*- coding:utf-8 -*-
import requests

fp = open('../project/database/position_clue')
for line in fp.readlines():
	raw = line.strip('\n').split(',')
	pinyin = raw[0]
	clue = []
	for i in xrange(1, len(raw)):
		clue.append(raw[i])
	print "send data: ",pinyin
	requests.post("http://frozenshore.cn:2333/data/clue", json={
		"pinyin":pinyin,
		"clue":clue,
	})
