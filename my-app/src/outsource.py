import requests

auth_link="https://www.strava.com/api/v3/athlete/activities/"
header ={'Authorization': 'Bearer ' + "536a9287a4134eb2671faa55ef5d805e92299925"}
param ={'per_page': 200, 'page': 1}
my_dataset=requests.get(auth_link, headers=header, params=param).json()
print(my_dataset)