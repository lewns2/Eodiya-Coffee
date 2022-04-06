from commercial_area.models import CommercialArea, SeoulGuDong, CommercialAreaRevenue
from commercial_area import serializers
import pandas as pd



# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']


A = CommercialArea.objects.all()
for i in range(len(A)):
    print(A[i].seoulGuDong.dongName)
