import { TopBar } from '../components/TopBar';
import Link from 'next/link';

interface Investigation {
  id: string;
  title: string;
  status: 'ongoing' | 'completed';
  progress: number;
  leadInvestigator: string;
  startDate: string;
  lastUpdate: string;
  credibilityScore: number;
  impactScore: number;
  documentCount: number;
  summary: string;
  tags: string[];
  milestones: {
    date: string;
    title: string;
    type: 'document' | 'revelation' | 'update';
  }[];
}

// This would normally come from an API or database
const sampleInvestigations: Investigation[] = [
  {
    id: 'pilnacek-case',
    title: 'Der Fall Pilnacek',
    status: 'ongoing',
    progress: 75,
    leadInvestigator: 'Peter Pilz',
    startDate: '2023-02-21',
    lastUpdate: '2024-02-21',
    credibilityScore: 92,
    impactScore: 89,
    documentCount: 47,
    summary: 'Eine umfassende Untersuchung der Umstände um den Tod von Christian Pilnacek.',
    tags: ['Justice', 'Politics', 'Corruption'],
    milestones: [
      {
        date: '2024-02-21',
        title: 'Neue Zeugenaussagen enthüllt',
        type: 'revelation'
      },
      {
        date: '2024-01-15',
        title: 'Geheime Dokumente aufgetaucht',
        type: 'document'
      }
    ]
  },
  {
    id: 'justice-scandal',
    title: 'Justizskandal Enthüllungen',
    status: 'ongoing',
    progress: 45,
    leadInvestigator: 'Maria Weber',
    startDate: '2024-01-10',
    lastUpdate: '2024-02-20',
    credibilityScore: 95,
    impactScore: 82,
    documentCount: 23,
    summary: 'Systematische Untersuchung der Korruptionsvorwürfe im österreichischen Justizsystem.',
    tags: ['Justice', 'Corruption'],
    milestones: [
      {
        date: '2024-02-20',
        title: 'Interne Protokolle gesichert',
        type: 'document'
      }
    ]
  }
];

export default function InvestigationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Investigationen</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Tiefgehende Recherchen und Enthüllungen von ZickZack
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Investigation Feed */}
            <div className="lg:col-span-2 space-y-6">
              {sampleInvestigations.map(investigation => (
                <article
                  key={investigation.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          investigation.status === 'ongoing'
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        }`}>
                          {investigation.status === 'ongoing' ? 'Laufend' : 'Abgeschlossen'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {investigation.progress}% abgeschlossen
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="text-green-500">{investigation.credibilityScore}%</span>
                          <span className="text-gray-500 ml-1">Credibility</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-blue-500">{investigation.impactScore}</span>
                          <span className="text-gray-500 ml-1">Impact</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/investigation/${investigation.id}`}
                      className="block"
                    >
                      <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                        {investigation.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {investigation.summary}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <Link
                        href={`/journalist/${investigation.leadInvestigator.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          {investigation.leadInvestigator[0]}
                        </div>
                        <span>{investigation.leadInvestigator}</span>
                      </Link>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span>{investigation.documentCount} Dokumente</span>
                        <span>•</span>
                        <time>Letzte Aktualisierung: {investigation.lastUpdate}</time>
                      </div>
                    </div>

                    {/* Timeline Preview */}
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-semibold mb-3">Letzte Entwicklungen</h3>
                      <div className="space-y-3">
                        {investigation.milestones.slice(0, 2).map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className={`w-2 h-2 mt-1.5 rounded-full ${
                              milestone.type === 'revelation'
                                ? 'bg-red-500'
                                : milestone.type === 'document'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{milestone.title}</p>
                              <time className="text-xs text-gray-500">{milestone.date}</time>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Mitarbeiten</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Dokument einreichen
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    Anonymer Hinweis
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Statistiken</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">{sampleInvestigations.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Aktive Fälle</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">70</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dokumente</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">93%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Credibility</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Impact Score</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Themen</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(sampleInvestigations.flatMap(i => i.tags))).map(tag => (
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