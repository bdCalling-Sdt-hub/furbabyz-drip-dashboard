import { Select } from 'antd';

const { Option } = Select;
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '2017',
        uv: 8,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2016',
        uv: 4,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '2018',
        uv: 6,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '2000',
        uv: 7,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '2021',
        uv: 6,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '2022',
        uv: 2,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '2023',
        uv: 8,
        pv: 4300,
        amt: 2100,
    },
];

function EnrollMent() {
    const formatTick = (value: number) => {
        return `${value}K`;
    };

    return (
        <div>
            <div style={{ display: 'flex', height: '400px', flexDirection: 'column', gap: 10 }}>
                <div className="px-2 flex items-center justify-between">
                    <h1 className="text-xl font-medium">Enrollment Statistics</h1>
                    <Select defaultValue="Weekly" className="w-32 h-[35px]">
                        <Option value="week1">week1</Option>
                        <Option value="week2">week2</Option>
                        <Option value="week3">week3</Option>
                        <Option value="week4">week4</Option>
                        <Option value="week5">week5</Option>
                        <Option value="week6">week6</Option>
                        <Option value="week7">week7</Option>
                    </Select>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatTick} /> {/* Format the Y-axis values */}
                        <Tooltip formatter={(value) => [`${value}K`, 'UV']} />
                        <Area type="monotone" dataKey="uv" stroke="#023F86" fill="#EBF4FF" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default EnrollMent;
