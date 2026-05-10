import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = (await getCollection('journal', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: '清凤小栈',
    description: 'Just Do It --With World',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/journal/${post.slug}/`,
    })),
  })
}
