import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { day: 'Пн', temp: 25.8, ph: 7.0 },
  { day: 'Вт', temp: 26.2, ph: 7.1 },
  { day: 'Ср', temp: 26.0, ph: 6.9 },
  { day: 'Чт', temp: 26.4, ph: 7.2 },
  { day: 'Пт', temp: 26.7, ph: 7.0 },
  { day: 'Сб', temp: 26.5, ph: 6.8 },
  { day: 'Вс', temp: 26.2, ph: 7.0 },
];

export default function ParameterChart() {
  return (
    <div className="w-full h-[400px] bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
      <h3 className="text-xl font-serif text-white mb-6 italic">История <span className="not-italic font-semibold text-blue-400">Стабильности</span> Аквариума</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#555" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="#555" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={[24, 28]}
            label={{ value: 'Темп (°C)', angle: -90, position: 'insideLeft', fill: '#555', fontSize: 10 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#555" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={[6, 8]}
            label={{ value: 'pH', angle: 90, position: 'insideRight', fill: '#555', fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', fontSize: '12px' }}
            itemStyle={{ color: '#ccc' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="temp" 
            name="Температура (°C)"
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="ph" 
            name="Уровень pH"
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
