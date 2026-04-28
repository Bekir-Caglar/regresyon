import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="container">
      <header className="header">
        <h1>Markdown Blog</h1>
        <p>Listelenmiş markdown dosyalarınızı burada bulabilirsiniz.</p>
      </header>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--secondary)' }}>
            Henüz dosya eklenmemiş.
          </p>
        ) : (
          posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <article className="post-card">
                <span className="date">{post.date}</span>
                <h2>{post.title}</h2>
                {post.description && <p>{post.description}</p>}
              </article>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
