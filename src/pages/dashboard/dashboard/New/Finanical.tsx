import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        date: 'Sat',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        date: 'Sun',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        date: 'Mon',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        date: 'Tues',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        date: 'Wed',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        date: 'Thus',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        date: 'Fri',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function Finanical() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <div className="px-2 flex items-center justify-between gap-36">
                    <h1 className="text-xl font-medium">Financial Analytics</h1>
                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            <p className="h-3 w-4 my-1 rounded-full bg-[#023F86]"></p>
                            <p>Earnings</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="h-3 w-4 my-1 rounded-full bg-[#0A8FDC]"></p>
                            <p>Expense</p>
                        </div>
                    </div>
                </div>
                <Select defaultValue="Weekly" className="w-32 h-[40px]">
                    <Option value="week1">week1</Option>
                    <Option value="week2">week2</Option>
                    <Option value="week3">week3</Option>
                    <Option value="week4">week4</Option>
                    <Option value="week5">week5</Option>
                    <Option value="week6">week6</Option>
                    <Option value="week7">week7</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={365}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        height={1}
                        scale="band"
                        xAxisId="quarter"
                    />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="pv" fill="#023F86" radius={[6, 6, 0, 0]} barSize={25} />
                    <Bar dataKey="uv" fill="#008DE7" radius={[6, 6, 0, 0]} barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Finanical;
