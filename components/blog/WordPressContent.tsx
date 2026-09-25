import clsx from 'clsx'

interface WordPressContentProps {
  html?: string | null
  className?: string
}

export function WordPressContent({ html, className }: WordPressContentProps) {
  const content = (html ?? '').trim()
  if (!content) return null

  return (
    <div
      className={clsx('wp-editor-content', className)}
      dir="auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
