import chroma from 'chroma-js';

// Create a color scale
const colorScale = chroma.scale(['lightcyan', 'blue', 'darkblue']);

// Define the size for each orbit
const ORBIT_SIZES = [
  { min: 10, max: 15 },  // Small orbs for low engagement
  { min: 15, max: 20 },  // Medium orbs for medium engagement
  { min: 20, max: 25 }   // Large orbs for high engagement
];

// Define the relevance range for each orbit based on views
const ORBIT_RELEVANCE_RANGES = [
  { min: 0, max: 10000 },      // First orbit: 0-10k views
  { min: 10001, max: 20000 },  // Second orbit: 10k-20k views
  { min: 20001, max: 40000 }   // Third orbit: 20k+ views
];

// Define the orbits (radius in pixels)
const orbits = [70, 150, 250];

// Function to calculate the relevance score
function calculateRelevance(article) {
  const viewsWeight = 1;
  const commentsWeight = 50;  // Comments weighted more heavily
  const credibilityWeight = 100;  // Credibility weighted most heavily
  return (
    viewsWeight * article.engagement.views +
    commentsWeight * article.engagement.comments +
    credibilityWeight * article.engagement.credibility
  );
}

// Function to map a relevance score to a size within a given range
function mapRelevanceToSize(relevance, sizeRange) {
  const normalizedRelevance = (relevance - ORBIT_RELEVANCE_RANGES[0].min) / 
    (ORBIT_RELEVANCE_RANGES[2].max - ORBIT_RELEVANCE_RANGES[0].min);
  return sizeRange.min + normalizedRelevance * (sizeRange.max - sizeRange.min);
}

// Function to map articles to orbs
function mapArticlesToOrbs(articles) {
  const orbsData = [[], [], []];
  let idCounter = 0;

  articles.forEach(article => {
    const views = article.engagement.views;
    let orbitIndex;

    // Determine orbit based on views
    if (views <= ORBIT_RELEVANCE_RANGES[0].max) {
      orbitIndex = 0;
    } else if (views <= ORBIT_RELEVANCE_RANGES[1].max) {
      orbitIndex = 1;
    } else {
      orbitIndex = 2;
    }

    const relevance = calculateRelevance(article);
    const size = mapRelevanceToSize(relevance, ORBIT_SIZES[orbitIndex]);

    const orb = {
      id: idCounter++,
      size: size,
      headline: article.title,
      text: article.summary,
      comments: article.engagement.comments,
      likes: article.engagement.credibility,
      isAd: false,
      color: colorScale(article.engagement.credibility / 100).hex(),
      type: article.type,
      author: article.author,
      timestamp: article.timestamp
    };

    orbsData[orbitIndex].push(orb);
  });

  return orbsData;
}

export { mapArticlesToOrbs, orbits };