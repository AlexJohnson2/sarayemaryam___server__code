import requests , json , time
data = requests.post("http://193.176.243.61:8080/kala/sefaresh_sayer/getall")
print(json.loads(data.text))
while True:
    for i in json.loads(data.text)['result']:
        if i['num']!="ناموجود":
            requests.post("http://193.176.243.61:8080/delete_comments",data={'name':i['name']})
    time.sleep(100000)
