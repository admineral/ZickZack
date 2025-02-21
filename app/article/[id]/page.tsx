import { Metadata } from 'next';
import { ArticleView } from '../../components/ArticleView';
import { TopBar } from '../../components/TopBar';

// This would normally come from an API or database
const sampleArticle = {
  id: '1',
  title: 'Wie starb Christian Pilnacek?',
  author: 'Peter Pilz',
  content: `
    <p>Ein Jahr lang hat Peter Pilz recherchiert. War es wirklich Selbstmord? Ein Unfall? Oder Fremdverschulden? ZackZack hat die Antworten auf die drängendsten Fragen zur Causa Pilnacek übersichtlich zusammengefasst.</p>
    
    <h2>Die Untersuchung</h2>
    <p>Die Wiener Staatsanwaltschaft hat nach monatelanger Untersuchung neue Details zum Tod von Christian Pilnacek veröffentlicht. Die Ermittlungen zeigen ein komplexes Bild der letzten Stunden des ehemaligen Justiz-Sektionschefs.</p>
    
    <h2>Die Fakten</h2>
    <p>Unsere investigative Recherche hat folgende Kernpunkte aufgedeckt:</p>
    <ul>
      <li>Neue Zeugenaussagen widersprechen der offiziellen Version</li>
      <li>Bisher unbekannte Dokumente werfen Fragen auf</li>
      <li>Experten zweifeln an den ersten Schlussfolgerungen</li>
    </ul>
  `,
  summary: 'Ein Jahr lang hat Peter Pilz recherchiert. War es wirklich Selbstmord? Ein Unfall? Oder Fremdverschulden?',
  engagement: {
    views: 15420,
    comments: 234,
    credibility: 92,
    shares: 567
  },
  timestamp: '2024-02-21',
  tags: ['Investigation', 'Politics', 'Justice'],
  sources: [
    'https://www.justiz.gv.at/official-statement-2024',
    'https://www.parlament.gv.at/documents/pilnacek-case',
    'https://www.wiener-zeitung.at/analysis-2024'
  ],
  comments: [
    {
      id: '1',
      author: {
        name: 'Dr. Maria Berger',
        credibility: 95,
        isVerified: true
      },
      content: 'Als ehemalige Justizministerin muss ich sagen, dass diese Recherche bemerkenswert gründlich ist. Die aufgedeckten Unstimmigkeiten in den offiziellen Berichten sind sehr beunruhigend.',
      timestamp: '2024-02-21T14:30:00Z',
      upvotes: 234,
      downvotes: 12,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Thomas Wagner',
            credibility: 82,
            isVerified: false
          },
          content: 'Können Sie mehr Details zu den spezifischen Unstimmigkeiten nennen, die Sie am besorgniserregendsten finden?',
          timestamp: '2024-02-21T15:15:00Z',
          upvotes: 45,
          downvotes: 3,
          replies: []
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Prof. Stefan Müller',
        credibility: 88,
        isVerified: true
      },
      content: 'Die forensischen Details in diesem Artikel sind präzise dargestellt. Besonders interessant finde ich die Analyse der Zeitabläufe.',
      timestamp: '2024-02-21T13:45:00Z',
      upvotes: 156,
      downvotes: 8,
      replies: []
    }
  ]
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // you would typically fetch data here
  return {
    title: `Article ${params.id} - ZickZack`,
  }
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
  // Simulate fetching article data based on params.id
  const article = {
    ...sampleArticle,
    id: params.id  // Use the actual ID from params
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <ArticleView article={article} />
      </main>
    </div>
  );
} 