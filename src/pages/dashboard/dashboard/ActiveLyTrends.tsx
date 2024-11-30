import { Select } from 'antd';

const { Option } = Select;
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#008DE7', '#023F86', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function ActiveLyTrends() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text- font-medium">Activity Trends</h1>
                <div>
                    <Select defaultValue="Weekly" className="w-28 h-[30px]">
                        <Option value="week1">week1</Option>
                        <Option value="week2">week2</Option>
                        <Option value="week3">week3</Option>
                        <Option value="week4">week4</Option>
                        <Option value="week5">week5</Option>
                        <Option value="week6">week6</Option>
                        <Option value="week7">week7</Option>
                    </Select>
                </div>
                <div>
                    <Select defaultValue="Monthly" className="w-28 h-[30px] ml-1">
                        <Option value="Month1">Month1</Option>
                        <Option value="Month2">Month2</Option>
                        <Option value="Month3">Month3</Option>
                        <Option value="Month4">Month4</Option>
                        <Option value="Month5">Month5</Option>
                        <Option value="Month6">Month6</Option>
                        <Option value="Month7">Month7</Option>
                    </Select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={340}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ActiveLyTrends;
