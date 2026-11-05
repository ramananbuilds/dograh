import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function CsvUpload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Audience</CardTitle>
      </CardHeader>
      <CardContent>
        <Input type='file' accept='.csv' />
      </CardContent>
    </Card>
  );
}
