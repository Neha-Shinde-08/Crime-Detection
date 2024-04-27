import requests
import json

params = {
  # specify the models you want to apply
  'models': 'wad',
  # specify where you want to receive result callbacks
  'callback_url': 'https://yourcallback/path',
  'api_user': '1846878292',
  'api_secret': '88ZwfJhaBgXNW2nUS8rt'
}
files = {'media': open('istockphoto-1339089882-640_adpp_is.mp4', 'rb')}
r = requests.post('https://api.sightengine.com/1.0/video/check.json', files=files, data=params)

output = json.loads(r.text)
print(output)