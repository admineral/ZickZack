import { TopBar } from '../../components/TopBar';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'text';
  uploadDate: string;
  verificationStatus: 'verified' | 'pending' | 'disputed';
  credibilityScore: number;
  source: string;
  summary: string;
}

interface Milestone {
  date: string;
  title: string;
  description: string;
  type: 'document' | 'revelation' | 'update';
  relatedDocuments?: string[];
  impact?: number;
}

interface Investigation {
  id: string;
  title: string;
  status: 'ongoing' | 'completed';
  progress: number;
  leadInvestigator: string;
  team: string[];
  startDate: string;
  lastUpdate: string;
  credibilityScore: number;
  impactScore: number;
  summary: string;
  description: string;
  tags: string[];
  milestones: Milestone[];
  documents: Document[];
  relatedInvestigations: string[];
}

// This would normally come from an API or database
const sampleInvestigation: Investigation = {
  id: 'pilnacek-case',
  title: 'Der Fall Pilnacek',
  status: 'ongoing',
  progress: 75,
  leadInvestigator: 'Peter Pilz',
  team: ['Maria Weber', 'Thomas Klein'],
  startDate: '2023-02-21',
  lastUpdate: '2024-02-21',
  credibilityScore: 92,
  impactScore: 89,
  summary: 'Eine umfassende Untersuchung der Umstände um den Tod von Christian Pilnacek.',
  description: `Eine detaillierte Untersuchung der Ereignisse und Umstände, die zum Tod von Christian Pilnacek führten. 
  Die Recherche umfasst Zeugenaussagen, offizielle Dokumente und forensische Analysen.`,
  tags: ['Justice', 'Politics', 'Corruption'],
  milestones: [
    {
      date: '2024-02-21',
      title: 'Neue Zeugenaussagen enthüllt',
      description: 'Drei bisher unbekannte Zeugen haben sich gemeldet und neue Details offenbart.',
      type: 'revelation',
      impact: 85
    },
    {
      date: '2024-01-15',
      title: 'Geheime Dokumente aufgetaucht',
      description: 'Interne Memoranden zeigen Unstimmigkeiten in der offiziellen Version.',
      type: 'document',
      relatedDocuments: ['memo-2024-01', 'report-2024-02']
    }
  ],
  documents: [
    {
      id: 'memo-2024-01',
      title: 'Internes Memorandum vom 15.01.2024',
      type: 'pdf',
      uploadDate: '2024-01-15',
      verificationStatus: 'verified',
      credibilityScore: 95,
      source: 'Anonyme Quelle',
      summary: 'Detaillierte Beschreibung der internen Abläufe und Entscheidungsprozesse.'
    },
    {
      id: 'report-2024-02',
      title: 'Forensischer Bericht',
      type: 'pdf',
      uploadDate: '2024-02-01',
      verificationStatus: 'verified',
      credibilityScore: 98,
      source: 'Unabhängiges Labor',
      summary: 'Wissenschaftliche Analyse der physischen Beweise und Spuren.'
    }
  ],
  relatedInvestigations: ['justice-scandal']
};

export default async function InvestigationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  // Simulate fetching investigation data based on params.id
  const investigation = {
    ...sampleInvestigation,
    id  // Use the actual ID from params
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
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

            <h1 className="text-3xl font-bold mb-4">{investigation.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {investigation.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href={`/journalist/${investigation.leadInvestigator.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    {investigation.leadInvestigator[0]}
                  </div>
                  <div>
                    <div className="font-medium">{investigation.leadInvestigator}</div>
                    <div className="text-sm">Lead Investigator</div>
                  </div>
                </Link>
                <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
                  <div className="text-sm text-gray-500">Team</div>
                  <div className="flex -space-x-2">
                    {investigation.team.map((member) => (
                      <Link
                        key={member}
                        href={`/journalist/${member.toLowerCase().replace(' ', '-')}`}
                        className="relative"
                      >
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                          {member[0]}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <time>Gestartet: {investigation.startDate}</time>
                <span>•</span>
                <time>Letzte Aktualisierung: {investigation.lastUpdate}</time>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Timeline */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Timeline</h2>
                <div className="space-y-6">
                  {investigation.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8 last:pb-0"
                    >
                      <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                        milestone.type === 'revelation'
                          ? 'bg-red-500'
                          : milestone.type === 'document'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }`} />
                      {index < investigation.milestones.length - 1 && (
                        <div className="absolute left-2 top-4 w-px h-full bg-gray-200 dark:bg-gray-700" />
                      )}
                      <div>
                        <time className="text-sm text-gray-500">{milestone.date}</time>
                        <h3 className="text-lg font-medium mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {milestone.description}
                        </p>
                        {milestone.impact && (
                          <div className="mt-2 text-sm">
                            <span className="text-blue-500">{milestone.impact}</span>
                            <span className="text-gray-500 ml-1">Impact Score</span>
                          </div>
                        )}
                        {milestone.relatedDocuments && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {milestone.relatedDocuments.map(docId => {
                              const doc = investigation.documents.find(d => d.id === docId);
                              return doc && (
                                <Link
                                  key={docId}
                                  href={`/document/${docId}`}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                  {doc.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Document Repository */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Dokumente</h2>
                <div className="space-y-4">
                  {investigation.documents.map(document => (
                    <div
                      key={document.id}
                      className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{document.title}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            document.verificationStatus === 'verified'
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : document.verificationStatus === 'disputed'
                              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                              : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {document.verificationStatus}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {document.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">Quelle: {document.source}</span>
                          <span className="text-gray-500">•</span>
                          <time className="text-gray-500">{document.uploadDate}</time>
                          <span className="text-gray-500">•</span>
                          <span className="text-green-500">{document.credibilityScore}% credibility</span>
                        </div>
                      </div>
                      <Link
                        href={`/document/${document.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Ansehen
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
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

              {/* Related Investigations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Verwandte Fälle</h2>
                <div className="space-y-3">
                  {investigation.relatedInvestigations.map(id => (
                    <Link
                      key={id}
                      href={`/investigation/${id}`}
                      className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <h3 className="font-medium">Justizskandal Enthüllungen</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Systematische Untersuchung der Korruptionsvorwürfe
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Themen</h2>
                <div className="flex flex-wrap gap-2">
                  {investigation.tags.map(tag => (
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