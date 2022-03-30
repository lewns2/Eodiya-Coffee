import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS
from konlpy.tag import Okt
from collections import Counter
import sys

# Read text
nRes = []
okt = Okt()
gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
           '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
           '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']
for i in range(len(gu_list)):
    
    filename = './Data/reviewData/{}review.csv'.format(gu_list[i])
    sys.stdin = open(filename, 'r', encoding='utf-8')

    cnt = 0
    while True:
        line = sys.stdin.readline().split("|")
        if line == ['']:
            break
        if cnt == 0:
            cnt += 1
            continue
        URL_ID, cafe_name, review = line[0], line[1], line[2]
        # print(review)
        if review == "\n":
            continue
        
        res = okt.pos(review)
        
        for word, tag in res:
            if tag in ['Noun', 'Adjective'] and len(word) > 1:
                nRes.append(word)

c = Counter(nRes)
# 자주 나오는 10개 단어 프린트
print(c.most_common(500))
        
        # nDict = {}
        # for key, value in c.most_common(100):
        #     nDict[key] = value
        # stopwords = STOPWORDS
        # wc = WordCloud(
        # background_color='black',
        # font_path='malgun',
        # stopwords=stopwords,
        # height=600,
        # width=400
        # )

        # word_cloud = wc.generate_from_frequencies(nDict)
        # wc.to_file('wordcloud_output{}.png'.format(cnt))

# plt.imshow(word_cloud)
# plt.axis('off')
# plt.show()