export function DateRangePicker() {
  return (
    <div className='flex items-center gap-2'>
      <input type='date' className='border border-input rounded px-2 py-1 text-xs bg-transparent' />
      <span className='text-xs text-muted-foreground'>to</span>
      <input type='date' className='border border-input rounded px-2 py-1 text-xs bg-transparent' />
    </div>
  );
}
