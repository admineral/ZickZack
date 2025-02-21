import { TopBar } from '../../components/TopBar';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  author: string;
  summary: string;
  timestamp: string;
  engagement: {
    views: number;
    comments: number;
    credibility: number;
  };
  tags: string[];
}

// This would normally come from an API or database
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Wie starb Christian Pilnacek?',
    author: 'Peter Pilz',
    summary: 'Ein Jahr lang hat Peter Pilz recherchiert. War es wirklich Selbstmord? Ein Unfall? Oder Fremdverschulden?',
    timestamp: '2024-02-21',
    engagement: {
      views: 15420,
      comments: 234,
      credibility: 92
    },
    tags: ['Investigation', 'Politics', 'Justice']
  },
  {
    id: '2',
    title: 'Neue Enthüllungen im Justizskandal',
    author: 'Maria Weber',
    summary: 'Exklusive Dokumente zeigen das wahre Ausmaß der Korruption im österreichischen Justizsystem.',
    timestamp: '2024-02-20',
    engagement: {
      views: 12800,
      comments: 186,
      credibility: 95
    },
    tags: ['Investigation', 'Justice']
  }
];

export default async function TopicPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const topic = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const filteredArticles = sampleArticles.filter(article => 
    article.tags.map(t => t.toLowerCase()).includes(params.slug.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{topic}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Alle Artikel zum Thema {topic}
            </p>
          </header>

          <div className="space-y-6">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/article/${article.id}`}
                  className="block"
                >
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <Link
                      href={`/journalist/${article.author.toLowerCase().replace(' ', '-')}`}
                      className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {article.author}
                    </Link>
                    <span className="text-gray-500">•</span>
                    <time className="text-gray-500">{article.timestamp}</time>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">{article.engagement.views.toLocaleString()} views</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-green-500">{article.engagement.credibility}% credibility</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 