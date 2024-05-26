import requests
from bs4 import BeautifulSoup

def crawl_wikipedia(category):
    base_url = 'https://en.wikipedia.org'
    category_url = base_url + '/wiki/Category:' + category.replace(' ', '_')
    
    # Send HTTP GET request to the category page
    response = requests.get(category_url)
    
    if response.status_code == 200:
        # Parse HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find links to articles in the category
        article_links = soup.select('.mw-category-group ul li a')
        
        articles = []
        for link in article_links:
            # Check if the selected element is an anchor tag
            if 'href' in link.attrs:
                article_url = base_url + link['href']
                article_response = requests.get(article_url)
                if article_response.status_code == 200:
                    article_soup = BeautifulSoup(article_response.text, 'html.parser')
                    # Extract article content
                    article_content = article_soup.select_one('.mw-parser-output').get_text()
                    articles.append(article_content)
            else:
                print(f"Skipping invalid link: {link}")
        
        return articles
    else:
        print('Failed to retrieve data from Wikipedia.')
        return None

