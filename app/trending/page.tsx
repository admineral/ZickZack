import { TopBar } from '../components/TopBar';
import Link from 'next/link';

interface TrendingStory {
  id: string;
  title: string;
  summary: string;
  author: string;
  timestamp: string;
  credibilityScore: number;
  impactScore: number;
  engagement: {
    views: number;
    comments: number;
    shares: number;
  };
  tags: string[];
  relatedInvestigations: string[];
  verificationStatus: 'verified' | 'developing' | 'disputed';
  recentUpdates: {
    timestamp: string;
    title: string;
    type: 'revelation' | 'update' | 'verification';
  }[];
}

// This would normally come from an API or database
const sampleTrending: TrendingStory[] = [
  {
    id: 'pilnacek-new-evidence',
    title: 'Neue Beweise im Fall Pilnacek',
    summary: 'Exklusive Dokumente werfen neues Licht auf die letzten Stunden von Christian Pilnacek.',
    author: 'Peter Pilz',
    timestamp: '2024-02-21T14:30:00Z',
    credibilityScore: 92,
    impactScore: 89,
    engagement: {
      views: 24500,
      comments: 342,
      shares: 1280
    },
    tags: ['Justice', 'Politics', 'Breaking'],
    relatedInvestigations: ['pilnacek-case'],
    verificationStatus: 'developing',
    recentUpdates: [
      {
        timestamp: '2024-02-21T16:45:00Z',
        title: 'Neue Zeugenaussagen bestätigen Zeitablauf',
        type: 'verification'
      },
      {
        timestamp: '2024-02-21T15:30:00Z',
        title: 'Dokumente von unabhängigem Labor bestätigt',
        type: 'verification'
      }
    ]
  },
  {
    id: 'justice-reform-leak',
    title: 'Geleakte Reform-Pläne des Justizministeriums',
    summary: 'Interne Dokumente zeigen radikale Änderungen in der österreichischen Justiz.',
    author: 'Maria Weber',
    timestamp: '2024-02-21T12:15:00Z',
    credibilityScore: 88,
    impactScore: 85,
    engagement: {
      views: 18900,
      comments: 256,
      shares: 890
    },
    tags: ['Justice', 'Reform', 'Politics'],
    relatedInvestigations: ['justice-scandal'],
    verificationStatus: 'verified',
    recentUpdates: [
      {
        timestamp: '2024-02-21T13:45:00Z',
        title: 'Ministerium bestätigt Echtheit der Dokumente',
        type: 'verification'
      }
    ]
  }
];

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trending</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Die wichtigsten Entwicklungen in Echtzeit
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trending Stories */}
              {sampleTrending.map(story => (
                <article
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          story.verificationStatus === 'verified'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : story.verificationStatus === 'disputed'
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {story.verificationStatus}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(story.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="text-green-500">{story.credibilityScore}%</span>
                          <span className="text-gray-500 ml-1">credibility</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-blue-500">{story.impactScore}</span>
                          <span className="text-gray-500 ml-1">impact</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/article/${story.id}`}
                      className="block"
                    >
                      <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                        {story.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {story.summary}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <Link
                        href={`/journalist/${story.author.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          {story.author[0]}
                        </div>
                        <span>{story.author}</span>
                      </Link>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span>{story.engagement.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{story.engagement.comments} comments</span>
                        <span>•</span>
                        <span>{story.engagement.shares} shares</span>
                      </div>
                    </div>

                    {/* Recent Updates */}
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-semibold mb-3">Letzte Entwicklungen</h3>
                      <div className="space-y-3">
                        {story.recentUpdates.map((update, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className={`w-2 h-2 mt-1.5 rounded-full ${
                              update.type === 'revelation'
                                ? 'bg-red-500'
                                : update.type === 'verification'
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{update.title}</p>
                              <time className="text-xs text-gray-500">
                                {new Date(update.timestamp).toLocaleTimeString()}
                              </time>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags and Related */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {story.tags.map(tag => (
                          <Link
                            key={tag}
                            href={`/topic/${tag.toLowerCase()}`}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                      {story.relatedInvestigations.length > 0 && (
                        <Link
                          href={`/investigation/${story.relatedInvestigations[0]}`}
                          className="text-sm text-blue-500 hover:text-blue-600"
                        >
                          Zur Investigation →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Engagement Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Trending Metrics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Durchschnittliche Credibility</span>
                      <span className="text-green-500">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold">43.4K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold">2.1K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Shares</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Verified</span>
                    <span className="text-green-500 font-medium">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Developing</span>
                    <span className="text-yellow-500 font-medium">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Disputed</span>
                    <span className="text-red-500 font-medium">0</span>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Trending Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(sampleTrending.flatMap(s => s.tags))).map(tag => (
                    <Link
                      key={tag}
                      href={`/topic/${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 