from openai import OpenAI
import os
import re

def extract_json(content):
    match = re.search(r'\{.*\}', content, re.DOTALL)
    if match:
        return match.group(0)
    return None

os.environ["OPENAI_API_KEY"] = ''

client = OpenAI()
def moderate_content(article_text):
    data = []
    for text in article_text:
        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": """You are an AI assistant that helps review articles for inappropriate content. 
and givinng result as only
```{
    approriate: appropriate percentage without persentage sign,
    inApproriate: InAppropriate percentage without persentage sign
}```"""
},
                {"role": "user", "content": f"Please review the following article for inappropriate content:\n\n{text.split()[0:100]}"}
            ]
        )

        data.append(extract_json(completion.choices[0].message.content))
    print(data)
    return data
moderation_result = moderate_content("This category lists developers of the Python programming language and important members of the Python community.")
print(moderation_result)
