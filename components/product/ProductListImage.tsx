export function ProductListImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
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
