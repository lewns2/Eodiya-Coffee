import pandas as pd
import numpy
df7 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-집객시설).csv', encoding='CP949')
df7 = df7.loc[(df7['기준_년_코드'] == 2021) & (df7['기준_분기_코드'] == 3)]
print(str(df7.iloc[0]['은행_수']) == 'nan')