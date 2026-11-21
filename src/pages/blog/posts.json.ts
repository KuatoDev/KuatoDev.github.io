import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  // Sort posts by descending order so article-4 comes first, then 3, 2, 1
  const sorted = posts.sort((a, b) => {
    return (b.data.order ?? 0) - (a.data.order ?? 0);
  });

  const payload = sorted.map(post => ({
    title: post.data.title,
    date: post.data.date,
    tag: post.data.tag,
    description: post.data.description,
    link: `blog/${post.slug}.html`
  }));

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
