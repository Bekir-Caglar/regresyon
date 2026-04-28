import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const post = getPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Geri Dön
      </Link>
      
      <article className="prose">
        <header style={{ marginBottom: '2rem' }}>
          <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>{post.date}</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{post.title}</h1>
          {post.description && (
            <p style={{ fontSize: '1.1rem', color: 'var(--secondary)', fontStyle: 'italic' }}>
              {post.description}
            </p>
          )}
        </header>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
