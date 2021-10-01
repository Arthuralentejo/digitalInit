import json
import requests
import json



# url = 'https://api.brasil.io/dataset/covid19/caso/data/?state=PR&dateStart=2020-08-25&dateEnd=2020-12-31'
# headers = {"Authorization": "Token fedbd4c8e4240bdaedb238e131cc2fe3573d8e0d"}


# r = requests.get(url, headers=headers)
# # print(type r.json())
# with open('./ret2.json','w',encoding='utf-8') as arq:

#     json.dump(r.json(), arq , ensure_ascii=False)

url = 'http://localhost:5000/?state=RJ&dateStart=2020-08-25&dateEnd=2020-12-31'
headers = {"Authorization": "Token fedbd4c8e4240bdaedb238e131cc2fe3573d8e0d"}

r = requests.get(url)
print(r.text)
# print(type r.json())
# with open('./ret2.json','w',encoding='utf-8') as arq:

#     json.dump(r.json(), arq , ensure_ascii=False)
