export default function Picture({
  className,
  src,
  fallback,
  alt,
  srcType = 'image/webp',
  fallbackType = 'image/png',
  ...rest
}) {
  return (
    <picture className={className}>
      <source srcSet={src} type={srcType} />
      <source srcSet={fallback} type={fallbackType} />
      <img src={fallback} alt={alt} className={className} {...rest} />
    </picture>
  );
}
