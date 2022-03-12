export default function Picture({ className, src, fallback, alt, ...rest }) {
  return (
    <picture className={className}>
      <source srcSet={src} />
      <img src={fallback} alt={alt} className={className} {...rest} />
    </picture>
  );
}
