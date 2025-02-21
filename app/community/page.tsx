import { TopBar } from '../components/TopBar';
import Link from 'next/link';

interface CommunityMember {
  id: string;
  name: string;
  role: 'expert' | 'journalist' | 'verified_reader';
  credibilityScore: number;
  contributions: number;
  expertise: string[];
  recentActivity: {
    type: 'comment' | 'document' | 'verification';
    title: string;
    date: string;
    impact: number;
  }[];
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    credibilityScore: number;
    role: 'expert' | 'journalist' | 'verified_reader';
  };
  timestamp: string;
  participantCount: number;
  credibilityScore: number;
  tags: string[];
  summary: string;
}

// This would normally come from an API or database
const sampleMembers: CommunityMember[] = [
  {
    id: 'dr-mueller',
    name: 'Dr. Stefan Müller',
    role: 'expert',
    credibilityScore: 98,
    contributions: 156,
    expertise: ['Justiz', 'Verfassungsrecht', 'Politik'],
    recentActivity: [
      {
        type: 'verification',
        title: 'Verifizierung: Forensischer Bericht im Fall Pilnacek',
        date: '2024-02-21',
        impact: 85
      },
      {
        type: 'comment',
        title: 'Analyse der rechtlichen Implikationen',
        date: '2024-02-20',
        impact: 72
      }
    ]
  },
  {
    id: 'berger',
    name: 'Dr. Maria Berger',
    role: 'expert',
    credibilityScore: 95,
    contributions: 89,
    expertise: ['Justizpolitik', 'EU-Recht'],
    recentActivity: [
      {
        type: 'document',
        title: 'Einreichung: EU-Rechtsgutachten',
        date: '2024-02-19',
        impact: 78
      }
    ]
  }
];

const sampleDiscussions: Discussion[] = [
  {
    id: 'justice-reform',
    title: 'Reform des österreichischen Justizsystems',
    author: {
      name: 'Dr. Stefan Müller',
      credibilityScore: 98,
      role: 'expert'
    },
    timestamp: '2024-02-21',
    participantCount: 45,
    credibilityScore: 92,
    tags: ['Justice', 'Reform', 'Politics'],
    summary: 'Diskussion über notwendige Reformen im österreichischen Justizsystem nach den jüngsten Enthüllungen.'
  },
  {
    id: 'corruption-prevention',
    title: 'Präventivmaßnahmen gegen Korruption',
    author: {
      name: 'Dr. Maria Berger',
      credibilityScore: 95,
      role: 'expert'
    },
    timestamp: '2024-02-20',
    participantCount: 32,
    credibilityScore: 89,
    tags: ['Corruption', 'Prevention', 'Justice'],
    summary: 'Analyse und Diskussion von effektiven Maßnahmen zur Korruptionsprävention in öffentlichen Institutionen.'
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Community</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gemeinsam für investigativen Journalismus und Transparenz
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Discussions */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Aktuelle Diskussionen</h2>
                <div className="space-y-6">
                  {sampleDiscussions.map(discussion => (
                    <article
                      key={discussion.id}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          href={`/community/discussion/${discussion.id}`}
                          className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {discussion.title}
                        </Link>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-500">
                            {discussion.credibilityScore}% credibility
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {discussion.summary}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <Link
                            href={`/community/member/${discussion.author.name.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              {discussion.author.name[0]}
                            </div>
                            <div>
                              <span className="font-medium">{discussion.author.name}</span>
                              <span className="text-gray-500 ml-2">{discussion.author.credibilityScore}%</span>
                            </div>
                          </Link>
                          <span className="text-gray-500">{discussion.participantCount} Teilnehmer</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map(tag => (
                            <Link
                              key={tag}
                              href={`/topic/${tag.toLowerCase()}`}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Top Contributors */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Top Experten</h2>
                <div className="space-y-6">
                  {sampleMembers.map(member => (
                    <div
                      key={member.id}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg">
                            {member.name[0]}
                          </div>
                          <div>
                            <Link
                              href={`/community/member/${member.id}`}
                              className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {member.name}
                            </Link>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                member.role === 'expert'
                                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                                  : member.role === 'journalist'
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                  : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              }`}>
                                {member.role}
                              </span>
                              <span className="text-sm text-gray-500">
                                {member.contributions} Beiträge
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.expertise.map(exp => (
                                <span
                                  key={exp}
                                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full"
                                >
                                  {exp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-500 font-medium">
                            {member.credibilityScore}%
                          </div>
                          <div className="text-sm text-gray-500">credibility</div>
                        </div>
                      </div>

                      <div className="mt-4 pl-16">
                        <h4 className="text-sm font-medium mb-2">Letzte Aktivitäten</h4>
                        <div className="space-y-2">
                          {member.recentActivity.map((activity, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <div className={`w-2 h-2 mt-1.5 rounded-full ${
                                activity.type === 'verification'
                                  ? 'bg-green-500'
                                  : activity.type === 'document'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-500'
                              }`} />
                              <div>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {activity.title}
                                </p>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                  <time>{activity.date}</time>
                                  <span>•</span>
                                  <span>Impact: {activity.impact}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Mitmachen</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Neue Diskussion starten
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    Expertise verifizieren
                  </button>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Statistiken</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Experten</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">2.4K</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Diskussionen</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">12K</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Beiträge</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold">91%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Credibility</div>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Beliebte Themen</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(sampleDiscussions.flatMap(d => d.tags))).map(tag => (
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