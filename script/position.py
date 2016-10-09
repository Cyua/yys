# -*- coding:utf-8 -*-
import requests
import json

fp = open('../project/database/position')
for line in fp.readlines():
	raw = line.strip('\n').split(',')
	name = raw[0]
	pinyin = raw[1]
	position = []
	for i in xrange(2, len(raw)):
		position.append(raw[i])
	print "send data: ",name
	requests.post("http://frozenshore.cn:2333/data/position", json={
		"name":name,
		"pinyin":pinyin,
		"position":position,
	})
