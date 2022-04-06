import pymysql


conn = pymysql.connect(host='j6e203.p.ssafy.io',
                       port=3636,
                       user='ssafy',
                       password='Ssafy203!!',
                       db='ssafy_bigdata',
                       charset='utf8')

sql = "SELECT * FROM commercial_area_commercialarea"

with conn:
    with conn.cursor() as cur:
        cur.execute(sql)
        result = cur.fetchall()
        for res in result:
            try:
                tmp = eval(''.join(res[3]))
                min_xv = 999
                min_yv = 999
                max_xv = 0
                max_yv = 0
                for i in tmp:
                    if max_xv < i[0]:
                        max_xv = i[0]
                    if min_xv > i[0]:
                        min_xv = i[0]
                    if max_yv < i[1]:
                        max_yv = i[1]
                    if min_yv > i[1]:
                        min_yv = i[1]
                center_x = (min_xv + max_xv) / 2
                center_y = (min_yv + max_yv) / 2
                print(res[0], center_x, center_y)
                new_sql = 'UPDATE commercial_area_commercialarea SET commercialCenterXPoint = %s, commercialCenterYPoint = %s WHERE commercialAreaCode = %s'
                cur.execute(new_sql, (center_x, center_y, res[0]))
                conn.commit()
            except:
                pass
