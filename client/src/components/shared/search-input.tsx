import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchInput({ value, onChange, placeholder = 'Search...' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className='relative w-full max-w-sm'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder={placeholder}
        className='pl-8'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
