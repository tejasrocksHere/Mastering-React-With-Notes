import requests
from bs4 import BeautifulSoup

# Example URL (replace with the actual URL)
url = 'https://clist.by/'

# Send a GET request to the URL
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Print the soup object (for debugging purposes)
# print(soup)

# Store the HTML content in a text file
with open('page_content.txt', 'w', encoding='utf-8') as file:
    file.write(soup.prettify())  # Use prettify() for a nicer format

print("HTML content stored in 'page_content.txt'.")
