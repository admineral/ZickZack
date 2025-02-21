import articles from './articles.json';

export async function fetchAndCacheArticles() {
  // In a real app, this would be an API call
  // For now, we'll just return our static JSON data
  return articles.articles;
} 