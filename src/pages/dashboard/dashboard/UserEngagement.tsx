import { Select } from 'antd';
import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
const { Option } = Select;
const data = [
    {
        name: 'Saturday',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Sunday',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Monday',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Tuesday',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Wednesday',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Thursday',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Friday',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const UserEngagement = () => {
    const [opacity, setOpacity] = useState({
        uv: 1,
        pv: 1,
    });

    const handleMouseEnter = (o: any) => {
        const { dataKey } = o;

        setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
    };

    const handleMouseLeave = (o: any) => {
        const { dataKey } = o;

        setOpacity((op) => ({ ...op, [dataKey]: 1 }));
    };

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
                    <h1 className="text-xl font-medium">User Engagement</h1>
                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            <p className="h-3 w-4 my-1 rounded-full bg-[#023F86]"></p>
                            <p>Total User</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="h-3 w-4 my-1 rounded-full bg-[#0A8FDC]"></p>
                            <p>Active User</p>
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
            <div style={{ width: '100%', height: '440px' }}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
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
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                        <Line
                            type="monotone"
                            dataKey="pv"
                            strokeOpacity={opacity.pv}
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" strokeOpacity={opacity.uv} stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserEngagement;
