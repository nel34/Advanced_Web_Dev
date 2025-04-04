import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.sass'

const data = [
  { date: 'Aout 15', ventes: 2300 },
  { date: 'Aout 24', ventes: 1500 },
  { date: 'Aout 31', ventes: 1900 },
  { date: 'Sept 7', ventes: 600 },
  { date: 'Sept 14', ventes: 950 },
  { date: 'Sept 21', ventes: 300 },
  { date: 'Sept 28', ventes: 800 },
  { date: 'Oct 5', ventes: 3200 },
  { date: 'Oct 12', ventes: 2400 },
  { date: 'Oct 19', ventes: 1200 },
];

export default function BarChartRestaurateur() {
    return (
        <div className="bar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value}€`} />
                    <Tooltip />
                    <Bar dataKey="ventes" fill="black" barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
