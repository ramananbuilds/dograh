export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className='p-4 bg-muted rounded-md overflow-x-auto text-xs font-mono'>
      <code>{code}</code>
    </pre>
  );
}
