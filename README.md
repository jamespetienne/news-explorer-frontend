# News Explorer

**News Explorer** is a responsive web application that allows users to search for news articles from the past week, save their favorite articles, and view them later. The app integrates with the [News API](https://newsapi.org) to fetch articles and simulates backend responses for authentication and article-saving functionalities.

## Live Demo
[News Explorer](https://jamespetienne.github.io/news-explorer-frontend/)

---

## Features
1. **Search for News Articles**
   - Users can enter a keyword to search for articles published in the last 7 days.
   - Integrated with the [News API](https://newsapi.org/v2/everything) for article fetching.
   - Displays a "Please enter a keyword" error message if the search bar is empty.

2. **Dynamic Article Rendering**
   - Displays up to 100 articles in response to a search query.
   - Initially shows 3 articles with a "Show More" button to display additional results in batches of 3.

3. **Bookmark Functionality**
   - Articles can be bookmarked when the user is logged in.
   - Displays an inactive "Save" icon for logged-out users with a hover message prompting them to sign in.
   - Saved articles are displayed on a separate "Saved Articles" page.

4. **Simulated Backend**
   - Stubbed responses for:
     - Logging in.
     - Checking authentication tokens.
     - Saving and deleting articles.
   - Allows reviewers to interact with the app without a fully functioning backend.

5. **Preloader Animation**
   - A circular preloader with "Searching for news..." text is displayed while fetching articles.

6. **Error Handling**
   - Displays "Nothing Found" if no articles match the search query.
   - Shows an error message, "Sorry, something went wrong during the request. Please try again later," if the API call fails.

7. **Responsive Design**
   - Fully responsive layout optimized for both desktop and mobile devices.
   - Follows design specifications from Figma.

8. **Deployment**
   - Hosted on GitHub Pages for public access.
   - Fully functional navigation with HashRouter to ensure compatibility with GitHub Pages.

---

## How It Works
### **API Integration**
The app interacts with the [News API](https://newsapi.org/v2/everything) to fetch news articles. The following parameters are used:
- `q`: Keyword entered by the user.
- `apiKey`: API key registered with News API.
- `from`: Date 7 days before the current date.
- `to`: Current date.
- `pageSize`: Maximum number of articles (set to 100 for the free plan).
