import { TopBar } from '../../components/TopBar';

interface SourceVerification {
  url: string;
  title: string;
  verifiedAt: string;
  verifiedBy: string;
  credibilityScore: number;
  archiveLinks: string[];
  citations: {
    date: string;
    publication: string;
    title: string;
    url: string;
  }[];
  verificationNotes: string[];
}

// This would normally come from an API or database
const sampleSource: SourceVerification = {
  url: 'https://www.justiz.gv.at/official-statement-2024',
  title: 'Offizielle Stellungnahme des Justizministeriums',
  verifiedAt: '2024-02-22T14:30:00Z',
  verifiedBy: 'ZickZack Fact-Checking Team',
  credibilityScore: 95,
  archiveLinks: [
    'https://web.archive.org/web/20240222143000/https://www.justiz.gv.at/official-statement-2024',
    'https://archive.is/abcd1234'
  ],
  citations: [
    {
      date: '2024-02-23',
      publication: 'Der Standard',
      title: 'Analyse der Justizministerium-Stellungnahme',
      url: 'https://derstandard.at/analyse'
    },
    {
      date: '2024-02-22',
      publication: 'Die Presse',
      title: 'Reaktionen auf die offizielle Erklärung',
      url: 'https://diepresse.com/reaktionen'
    }
  ],
  verificationNotes: [
    'Dokument wurde durch digitale Signatur bestätigt',
    'Metadaten stimmen mit Veröffentlichungszeitpunkt überein',
    'Inhalt wurde mit drei unabhängigen Quellen gegengeprüft'
  ]
};

export default function SourceVerificationPage({ params }: { params: { id: string } }) {
  // Simulate fetching source data based on params.id
  const source = {
    ...sampleSource,
    id: params.id  // Store the ID for future use
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-2">{source.title}</h1>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 break-all"
              >
                {source.url}
              </a>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Verification Status</h2>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>Credibility Score</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {source.credibilityScore}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Verified by {source.verifiedBy} on{' '}
                      {new Date(source.verifiedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Archive Links</h2>
                  <ul className="space-y-2">
                    {source.archiveLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          Archive {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Verification Notes</h2>
                  <ul className="space-y-2">
                    {source.verificationNotes.map((note, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-green-500">✓</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3">Citations</h2>
                  <div className="space-y-4">
                    {source.citations.map((citation, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                      >
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {citation.title}
                        </a>
                        <div className="text-sm text-gray-500 mt-1">
                          {citation.publication} • {citation.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 