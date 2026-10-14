export function ProductListImage({ src, alt, loading = 'lazy' }: { src: string; alt: string; loading?: 'eager' | 'lazy' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className="block shrink-0 max-w-none self-end"
      style={{
        maxHeight: 'calc(100% + 6rem)',
        width: 'auto',
        height: 'auto',
      }}
    />
  )
}
