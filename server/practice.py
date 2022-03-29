import json

with open("../Data/XY_point/seoul_sanggwon.json", "r", encoding="utf8") as f:
    contents = f.read()
    json_data = json.loads(contents)
    for i in range(len(json_data['features'])):
        print(i)
        
    
print(str(json_data['features'][0]['geometry']['coordinates'][0])[1:-1])
print(str(json_data['features'][0]['properties']['TRDAR_CD_N']))
374