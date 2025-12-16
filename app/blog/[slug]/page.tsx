import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/api/wordpress'
import { formatDate } from '@/lib/utils/format'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getPosts({ per_page: 3 })

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'مقالات', href: '/blog' },
          { label: post.title.rendered, href: undefined },
        ]}
      />

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Post Title and Metadata */}
            <div className="mb-8">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>خواندن {Math.ceil(post.content.rendered.length / 1000)} دقیقه</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_media && (
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-8 relative">
                <Image
                  src={`https://via.placeholder.com/1200x600?text=${encodeURIComponent(post.title.rendered)}`}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-invert prose-lg max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">مقالات مرتبط</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="bg-dark-lighter rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
                      >
                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3
                            className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-gold transition-colors"
                            dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                          />
                          <p className="text-gray-400 text-sm">{formatDate(relatedPost.date)}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

