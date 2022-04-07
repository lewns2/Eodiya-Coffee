import pandas
import pymysql
from time import sleep

file = pandas.read_csv('new_file.csv', sep='|')

conn = pymysql.connect(host='j6e203.p.ssafy.io',
                       port=3636,
                       user='ssafy',
                       password='Ssafy203!!',
                       db='ssafy_bigdata',
                       charset='utf8')

# sql = "SELECT * FROM commercial_area_commercialarea"
# sql = "INSERT INTO commercial_area_commercialareaapartment VALUES(%d, %d, %d)"

# print(type(file))
tmp_list = []
for idx, row in file.iterrows():
    new = list(row[1].split(','))
    if new[0] == '2021' and new[1] == '3':
        tmp_list.append([int(new[20]), int(new[4])])

# print(tmp_list)
sql = "INSERT INTO commercial_area_commercialareaapartment(commercialAreaCode_id) SELECT commercialAreaCode FROM commercial_area_commercialarea WHERE EXISTS(SELECT commercialAreaCode FROM commercial_area_commercialarea WHERE commercialAreaCode = %s) AND NOT EXISTS(SELECT commercialAreaCode_id FROM commercial_area_commercialareaapartment WHERE commercialAreaCode_id = %s)"
sql2 = "UPDATE commercial_area_commercialareaapartment SET apartmentAvgPrice=%s WHERE commercialAreaCode_id=%s"
with conn:
    with conn.cursor() as cur:
        for idx, tmp in enumerate(tmp_list):
            # print(tmp[0], tmp[1])
            cur.execute(sql, (tmp[1], tmp[1]))
            # conn.commit()
            cur.execute(sql2, (tmp[0], tmp[1]))
            conn.commit()
            # print('ok')
    # print(new)
    # sleep(0.1)
# print(len(file))
