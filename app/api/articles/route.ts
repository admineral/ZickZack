import { NextResponse } from 'next/server';
import articles from '@/app/data/articles.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (id) {
    const article = articles.articles.find(article => article.id === id) || 
                   articles.opinions.find(opinion => opinion.id === id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  }

  if (type === 'opinions') {
    return NextResponse.json({ opinions: articles.opinions });
  }

  return NextResponse.json({
    articles: articles.articles,
    opinions: articles.opinions
  });
} 