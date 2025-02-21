import { JournalistProfile } from '../../components/JournalistProfile';
import { TopBar } from '../../components/TopBar';

// This would normally come from an API or database
const sampleJournalist = {
  name: 'Peter Pilz',
  bio: 'Investigative journalist focusing on political corruption and institutional accountability. Former member of the Austrian Parliament and founder of ZackZack.',
  stats: {
    totalArticles: 342,
    totalViews: 1500000,
    avgCredibility: 94,
    followers: 12500,
    investigations: 156
  },
  specialties: [
    'Political Investigation',
    'Corruption',
    'Justice System',
    'Government Accountability',
    'Public Policy'
  ],
  recentArticles: [
    {
      id: '1',
      title: 'Wie starb Christian Pilnacek?',
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
      title: 'ÖVP Skandal: Neue Enthüllungen',
      summary: 'Exklusive Dokumente zeigen das wahre Ausmaß der Korruption in der österreichischen Volkspartei.',
      timestamp: '2024-02-18',
      engagement: {
        views: 12800,
        comments: 186,
        credibility: 95
      },
      tags: ['Politics', 'Corruption', 'Investigation']
    },
    {
      id: '3',
      title: 'Justizministerium: Die geheimen Akten',
      summary: 'ZackZack enthüllt brisante Details aus internen Dokumenten des Justizministeriums.',
      timestamp: '2024-02-15',
      engagement: {
        views: 9600,
        comments: 145,
        credibility: 91
      },
      tags: ['Justice', 'Politics', 'Investigation']
    }
  ]
};

export default async function JournalistPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // Simulate fetching journalist data based on params.slug
  const journalist = {
    ...sampleJournalist,
    slug: params.slug  // Store the slug for future use
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <JournalistProfile {...journalist} />
    </div>
  );
} 