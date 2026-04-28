import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const csvsDirectory = path.join(process.cwd(), 'public', 'csvs');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
}

function getFilesRecursively(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let allFiles: string[] = [];
  
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      allFiles = allFiles.concat(getFilesRecursively(fullPath));
    } else if (file.endsWith('.md')) {
      allFiles.push(fullPath);
    }
  });
  
  return allFiles;
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filePaths = getFilesRecursively(postsDirectory);
  const allPostsData = filePaths.map((fullPath) => {
    const relativePath = path.relative(postsDirectory, fullPath);
    const slug = relativePath.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // Use filename (slug) as the title as requested
    const title = `${slug}.md`;

    return {
      slug,
      content: matterResult.content,
      title,
      date: matterResult.data.date || fs.statSync(fullPath).birthtime.toISOString().split('T')[0],
      description: matterResult.data.description || '',
      ...matterResult.data,
    } as PostData;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    // Decode slug in case it has URL encoded characters
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use filename (slug) as the title
    const title = `${decodedSlug}.md`;

    return {
      slug: decodedSlug,
      content: matterResult.content,
      title,
      date: matterResult.data.date || fs.statSync(fullPath).birthtime.toISOString().split('T')[0],
      description: matterResult.data.description || '',
      ...matterResult.data,
    } as PostData;
  } catch (e) {
    return null;
  }
}

export function getCsvFiles(): string[] {
  if (!fs.existsSync(csvsDirectory)) {
    return [];
  }
  return fs.readdirSync(csvsDirectory).filter(file => file.endsWith('.csv'));
}
