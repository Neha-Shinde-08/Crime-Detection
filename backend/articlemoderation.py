import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'your-api-key'

def moderate_content(article_text):
    print(article_text)
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Use the appropriate model
        messages=[
            {"role": "system", "content": "You are an AI assistant that helps review articles for inappropriate content."},
            {"role": "user", "content": f"Please review the following article for inappropriate content:\n\n{article_text}\n\nFlag any issues and explain why they are problematic."}
        ],
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.5,
    )
    
    return response.choices[0].message['content'].strip()

# Example usage
article_text = """
Your article text goes here.
"""

moderation_result = moderate_content(article_text)
print("Moderation Result:")
print(moderation_result)
