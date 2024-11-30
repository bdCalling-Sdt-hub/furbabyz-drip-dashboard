import { Select } from 'antd';

const { Option } = Select;
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '18-24',
        uv: 31.47,
        pv: 2400,
        fill: '#8884d8',
    },
    {
        name: '25-29',
        uv: 26.69,
        pv: 4567,
        fill: '#83a6ed',
    },
    {
        name: '30-34',
        uv: 15.69,
        pv: 1398,
        fill: '#8dd1e1',
    },
    {
        name: '35-39',
        uv: 8.22,
        pv: 9800,
        fill: '#82ca9d',
    },
    {
        name: '40-49',
        uv: 8.63,
        pv: 3908,
        fill: '#a4de6c',
    },
    {
        name: '50+',
        uv: 2.63,
        pv: 4800,
        fill: '#d0ed57',
    },
    {
        name: 'unknow',
        uv: 6.67,
        pv: 4800,
        fill: '#ffc658',
    },
];

function BestShorts() {
    return (
        <div style={{ display: 'flex', height: '400px', flexDirection: 'column', gap: 10 }}>
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">Best shorts</h1>
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
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
                    <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="uv" />
                    {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BestShorts;
