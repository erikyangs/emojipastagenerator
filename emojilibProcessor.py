#!emojipastagenerator/bin/python
from urllib import request
import json

# Test Code ==================================

# test = {
#   "grinning": {
#     "keywords": ["face", "smile", "happy", "joy", ":D", "grin"],
#     "char": "😀",
#     "fitzpatrick_scale": False,
#     "category": "people"
#   },
#   "grimacing": {
#     "keywords": ["face", "grimace", "teeth"],
#     "char": "😬",
#     "fitzpatrick_scale": False,
#     "category": "people"
#   },
#   "grin": {
#     "keywords": ["face", "happy", "smile", "joy", "kawaii"],
#     "char": "😁",
#     "fitzpatrick_scale": False,
#     "category": "people"
#   }
# }
# result = {}
# for key in test:
#     allWords = [key] + test[key]["keywords"]
#     emoji = test[key]["char"]
#     for word in allWords:
#         result[word] = emoji

# ==================================

emojilibURL = "https://raw.githubusercontent.com/muan/emojilib/master/emojis.json"

print("starting read")
getString = request.urlopen(emojilibURL).read()
print("read ended")
emojilib = json.loads(getString)

omit = ["a", "o", "us", "octocat", "github", "custom_", "sherlock", 
"inspector", "neckbeard", "trollface", "meme", "godmode", "doom", "goberserk",
"bloody", "finnadie", "feelsgood", "rage1", "rage2", "rage3", "rage4", "suspect", "hurtrealbad",
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "af", "ad", "am", "at", "bs", "bb",
"by", "be", "bj", "bm", "gg", "is", "in", "it", "iq", "me", "my", "ms", "ma", "nu", "si", "so", 
"es", "to", "ve", "m"]

result = {}
for key in emojilib:
    allWords = [key] + emojilib[key]["keywords"]
    emoji = emojilib[key]["char"]
    for word in allWords:
        if(word not in result and word not in omit):
            result[word] = emoji

resultString = json.JSONEncoder(ensure_ascii=False, indent=4).encode(result)

path = 'emojiMapping.json'
print("starting write to " + path)
file = open(path,'w')
print("write ended")
file.write(resultString)