import clsx from 'clsx'

interface WordPressContentProps {
  html?: string | null
  className?: string
  dir?: 'auto' | 'rtl' | 'ltr'
}

export function WordPressContent({ html, className, dir = 'auto' }: WordPressContentProps) {
  const content = (html ?? '').trim()
  if (!content) return null

  return (
    <div
      className={clsx('wp-editor-content', className)}
      dir={dir}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
