import Link from 'next/link';

export function TopBar() {
  return (
    <header className="border-b-3 border-ink-blue dark:border-paper-white bg-paper-white dark:bg-ink-blue">
      {/* Top Banner */}
      <div className="border-b border-ink-gray/20 dark:border-paper-gray/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs text-ink-gray dark:text-paper-gray">
            <div>
              {new Date().toLocaleDateString('de-AT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div>Vol. 1 • No. 23</div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="text-center">
            <h1 className="font-playfair text-5xl md:text-7xl font-black tracking-tight mb-2">
              ZickZack
            </h1>
            <p className="font-source-serif text-sm uppercase tracking-widest text-ink-gray dark:text-paper-gray">
              Investigativer Journalismus für Österreich
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-y border-ink-gray/20 dark:border-paper-gray/20 py-3">
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/investigations"
              className="font-source-serif text-sm uppercase tracking-wider text-ink-gray hover:text-editorial-red dark:text-paper-gray dark:hover:text-editorial-red transition-colors"
            >
              Investigations
            </Link>
            <Link
              href="/community"
              className="font-source-serif text-sm uppercase tracking-wider text-ink-gray hover:text-editorial-red dark:text-paper-gray dark:hover:text-editorial-red transition-colors"
            >
              Community
            </Link>
            <Link
              href="/trending"
              className="font-source-serif text-sm uppercase tracking-wider text-ink-gray hover:text-editorial-red dark:text-paper-gray dark:hover:text-editorial-red transition-colors"
            >
              Trending
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Suchen..."
                className="w-full md:w-64 px-4 py-2 bg-transparent border-b-2 border-ink-gray/20 dark:border-paper-gray/20 focus:border-editorial-red dark:focus:border-editorial-red focus:outline-none font-source-serif text-sm"
              />
            </div>
            <button className="px-4 py-2 bg-editorial-red text-paper-white rounded-none hover:bg-editorial-red/90 transition-colors font-source-serif text-sm uppercase tracking-wider">
              Publish
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 