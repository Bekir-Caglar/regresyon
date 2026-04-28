import Link from 'next/link';
import { getAllPosts, getDataFiles } from '@/lib/markdown';

export default function Home() {
  const posts = getAllPosts();
  const dataFiles = getDataFiles();

  return (
    <main className="container">
      <header className="header">
        <h1>Markdown Blog</h1>
        <p>Listelenmiş markdown dosyalarınızı ve veri setlerini burada bulabilirsiniz.</p>
      </header>

      <div className="main-layout">
        <section className="posts-column">
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
        </section>

        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Excel Veri Setleri</h3>
            <div className="csv-list">
              {dataFiles.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>
                  Henüz veri dosyası bulunmuyor.
                </p>
              ) : (
                dataFiles.map((file) => (
                  <a 
                    key={file} 
                    href={`/csvs/${file}`} 
                    download 
                    className="csv-item"
                  >
                    <span className="csv-icon">📊</span>
                    <span>{file}</span>
                    <span className="download-btn">İndir</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
