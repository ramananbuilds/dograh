export function AudioPlayer({ src }: { src: string }) {
  if (!src) return <span className='text-xs text-muted-foreground'>No audio available</span>;
  return <audio controls src={src} className='h-8 w-full max-w-xs' />;
}
