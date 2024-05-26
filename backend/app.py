from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
import json
from crawl_article import crawl_wikipedia
from articlemoderation import moderate_content

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


@app.route("/crawlarticle", methods=["POST"])
def crawlarticles():
    url = request.json.get("url")
    print(url)
    # page = requests.get(url)
    # soup = BeautifulSoup(page.content, "html.parser")
 
    # images = soup.find_all("img")
    # data = [image.get('src') for image in images]
    # # return jsonify(data)
    classified_articles=crawl_wikipedia(url)
    print(classified_articles)

    return jsonify({"article": url, "classified_articles": classified_articles})


@app.route("/crawlvideos", methods=["POST"])
def crawlvideos():
    print("working")
    url = request.json.get("url")
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    videos = soup.find_all("source")
    data = [video.get("src") for video in videos]
    # return jsonify(data)
    classified_videos = classify_videos(data)
    print(data)
    return jsonify({"videos": data, "classified_videos": classified_videos})


def classify_images(images):
    classified_images = {"appropriate": [], "inappropriate": []}
    for image in images:
        params = {
            'url': image,
            'models': 'wad',
           'api_user': "1846878292",
  'api_secret': "88ZwfJhaBgXNW2nUS8rt",
        }
        response = requests.get('https://api.sightengine.com/1.0/check.json', params=params)
        output = json.loads(response.text)
        print(output)
        flag=""

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
def classify_videos(videos):
    classified_videos = {"appropriate": [], "inappropriate": []}
    for image in videos:
        params = {
            'url': image,
            'models': 'wad',
           'api_user': '1080320659',
  'api_secret': "88ZwfJhaBgXNW2nUS8rt",
        }
        response = requests.get('https://api.sightengine.com/1.0/check.json', params=params)
        output = json.loads(response.text)
        print(output)
        flag=""
        if "weapon" in output and "none" in output["nudity"]:

            flag=flag+"weapon"

            weapon=output['weapon']
            alcohol= output["alcohol"]
            drugs=output["drugs"]

            if weapon >0.4 or alcohol>0.4 or drugs>0.4 :
                classified_videos["inappropriate"].append(image)
            else:
                classified_videos["appropriate"].append(image)

        if "tobacoo" in output and "none" in output["nudity"]:

            flag=flag+"tobacco"

            tobacco=output['tobacoo']['prob']

            if tobacco >0.4:
                classified_videos["inappropriate"].append(image)
            else:
                classified_videos["appropriate"].append(image)

        else:

            classified_videos["appropriate"].append(image)
    return classified_videos


@app.route("/classify", methods=["POST"])
def classify():
    images = request.json.get("data")
    classified_images = classify_images(images)
    return jsonify(classified_images)


@app.route("/classifyvideo", methods=["POST"])
def classifyvideo():
    videos = request.json.get("data")
    classified_videos = classify_videos(videos)
    return jsonify(classified_videos)

@app.route("/classifyarticle", methods=["POST"])
def classifyarticle():
    articles = request.json.get("data")
    print(articles)
    classified_articles = crawl_wikipedia(articles)
    print(classified_articles)
    result=moderate_content(classified_articles)
    return jsonify(result)

if __name__ == "__main__":
    app.run()

