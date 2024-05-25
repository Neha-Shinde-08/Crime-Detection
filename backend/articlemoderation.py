import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = ''

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
Some videos they get of accidents, murders and attacks get put up the day they happen because it's so popular with people who upload to the site, members also post videos and pictures of their own accidents or attacks that qualifie as gore. It's called, “today's edition of best gore member”, and then you get the video and pictures plus the members username and backstory about the incident. , they get all these accident, murder, suicide, lynching and beheading videos days and weeks before any other site. They have the best sources to get the content and 90% or more of it is best gore first material. So before you see it anywhere else, it most likely was first uploaded on bestgore and that it where most sites would have got it from.
"""

moderation_result = moderate_content(article_text)
print("Moderation Result:")
print(moderation_result)
