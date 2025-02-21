import Link from 'next/link';

export function SidebarNav() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 min-h-screen p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Featured Journalists
          </h3>
          <div className="mt-3 space-y-3">
            {['Peter Pilz', 'Maria Weber', 'Thomas Klein'].map((name) => (
              <Link
                key={name}
                href={`/journalist/${name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {name[0]}
                </div>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Trending Topics
          </h3>
          <div className="mt-3 space-y-2">
            {['Politics', 'Investigation', 'Economy', 'Technology'].map((topic) => (
              <Link
                key={topic}
                href={`/topic/${topic.toLowerCase()}`}
                className="block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                #{topic}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Community Highlights
          </h3>
          <div className="mt-3 space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Top community contributor this week
              </p>
              <p className="mt-1 font-medium">Anna Müller</p>
              <p className="text-xs text-gray-500">15 quality contributions</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 