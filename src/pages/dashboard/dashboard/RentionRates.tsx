import { Select } from 'antd';

const { Option } = Select;

import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Sat',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Sun',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Mon',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Tue',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Wed',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Thur',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },
    {
        name: 'Fri',
        uv: 1300,
        pv: 900,
        amt: 1300,
    },
];
function RentionRates() {
    return (
        <div>
            <div style={{ display: 'flex', height: '380px', flexDirection: 'column', gap: 10 }}>
                <div className="px-2 flex items-center justify-between">
                    <h1 className="text-xl font-medium">Retention Rates</h1>
                    <Select defaultValue="Weekly" className="w-32 h-[40px]">
                        <Option value="weekly">Weekly</Option>
                        <Option value="saturday">Saturday</Option>
                        <Option value="sunday">Sunday</Option>
                        <Option value="monday">Monday</Option>
                        <Option value="tuesday">Tuesday</Option>
                        <Option value="wednesday">Wednesday</Option>
                        <Option value="thursday">Thursday</Option>
                        <Option value="friday">Friday</Option>
                    </Select>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart
                        layout="horizontal" // Change layout to horizontal to place names on the bottom
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <XAxis dataKey="name" type="category" />
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" radius={[10, 10, 0, 0]} barSize={20} fill="#413ea0" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RentionRates;
