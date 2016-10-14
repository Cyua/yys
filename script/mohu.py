# -*- coding:utf-8 -*-
import requests
import time

fp = open('../project/database/mohu')
for line in fp.readlines():
	raw = line.strip('\n').split(',')
	name = raw[0]
	for i in xrange(1, len(raw)):
		if raw[0] == "":
			continue
		requests.post("http://frozenshore.cn:2333/data/mohu", json={
			"fake":raw[i],
			"real":name,
		})
		print name, raw[i]
		time.sleep(0.5)
