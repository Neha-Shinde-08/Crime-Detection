from bs4 import BeautifulSoup
import requests

def crawlvideos():
    print("working")
    url = "https://www.istockphoto.com/videos/gun"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    videos = soup.find_all("source")
    data = [video.get("src") for video in videos]
   
    print(page)
   
crawlvideos()
