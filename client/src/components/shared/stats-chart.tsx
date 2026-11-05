import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface StatsChartProps {
  data: { label: string; value: number }[];
}

export function StatsChart({ data }: StatsChartProps) {
  return (
    <div className='h-[300px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='label' stroke='#888888' fontSize={12} />
          <YAxis stroke='#888888' fontSize={12} />
          <Tooltip />
          <Bar dataKey='value' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-primary' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
