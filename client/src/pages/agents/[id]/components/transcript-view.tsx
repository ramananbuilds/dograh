export function TranscriptView({ transcriptUrl }: { transcriptUrl?: string }) {
  if (!transcriptUrl) {
    return <p className='text-sm text-muted-foreground'>No transcript logged for this call.</p>;
  }

  return (
    <div className='p-4 bg-muted/50 rounded-lg text-sm max-h-96 overflow-y-auto space-y-3'>
      <div className='text-xs text-muted-foreground'>Transcript loaded from: {transcriptUrl}</div>
    </div>
  );
}
