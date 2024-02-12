from flask import Flask, request, jsonify
from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__)




@app.route("/crawl", methods=["POST"])
def crawl():
    url = request.json.get("url")
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    images = soup.find_all("img")
    data = [image.get('src') for image in images]
    # return jsonify(data)
    classified_images = classify_images(data)
    return jsonify({"images": data, "classified_images": classified_images})

def classify_images(images):
    classified_images = {"appropriate": [], "inappropriate": []}
    for image in images:
        params = {
            'url': image,
            'models': 'nudity-2.0, wad',
           'api_user': '769181231',
  'api_secret': 'NEV4dKpNW7Ty24ia8qUt'


        }
        response = requests.get('https://api.sightengine.com/1.0/check.json', params=params)
        output = json.loads(response.text)
        print(output)
        flag=""
        if "nudity" in output and "none" in output["nudity"]:

            flag=flag+"nudity"

            sexual_activity = output['nudity']['sexual_activity']
            sexual_display = output['nudity']['sexual_display']
            erotica = output['nudity']['erotica']
            suggestive = output['nudity']['suggestive']
            suggestive_classes = output['nudity']['suggestive_classes']
            none = output['nudity']['none']
            if sexual_activity >0.4 or sexual_display >0.4 or erotica  >0.4 or suggestive  >0.4:
                classified_images["inappropriate"].append(image)

            else:
                classified_images["appropriate"].append(image)
        
        if "weapon" in output and "none" in output["nudity"]:

            flag=flag+"weapon"

            weapon=output['weapon']
            alcohol= output["alcohol"]
            drugs=output["drugs"]

            if weapon >0.4 or alcohol>0.4 or drugs>0.4 :
                classified_images["inappropriate"].append(image)
            else:
                classified_images["appropriate"].append(image)

        if "tobacoo" in output and "none" in output["nudity"]:

            flag=flag+"tobacco"

            tobacco=output['tobacoo']['prob']
          

            if tobacco >0.4:
                classified_images["inappropriate"].append(image)
            else:
                classified_images["appropriate"].append(image)

        else:
          
            classified_images["appropriate"].append(image)
    return classified_images

@app.route("/classify", methods=["POST"])
def classify():
    images = request.json.get("data")
    classified_images = classify_images(images)
    return jsonify(classified_images)


@app.route("/classifyvideo", methods=["POST"])
def classify():
    videos = request.json.get("data")
    classified_videos = classify_videos(videos)
    return jsonify(classified_videos)



if __name__ == "__main__":
    app.run()



