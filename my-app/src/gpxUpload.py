import os
import requests

headers = {
    'accept': 'application/json',
    'authorization': 'Bearer <Token>',
    }

dir = os.getcwd() + '/files/'
for filename in os.listdir(dir):
    file = open(dir + filename, 'rb') 
    files = {
        "file": (filename, file, 'application/gpx+xml'),
        "data_type": (None, 'gpx'),
    }

    try:
        response = requests.post('http://www.strava.com/api/v3/uploads',files=files, headers=headers)
        print(filename)
        print(response.text)
        print(response.headers)

    except requests.exceptions.RequestException as e:  # This is the correct syntax
        print(e)
        sys.exit(1)