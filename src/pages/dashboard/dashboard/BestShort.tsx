import { Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const BestShorts = () => {
    const [progressNumber, setProgressNumber] = useState(0);

    const number = 2 * Math.PI * 40; // Calculated for full circle (2 * pi * r)
    useEffect(() => {
        if (progressNumber < number) {
            const timeout = setTimeout(() => {
                setProgressNumber(progressNumber + 1);
            }, 300); // Adjust the interval as per your requirement
            return () => clearTimeout(timeout); // Cleanup function to clear the timeout
        }
    }, [progressNumber, number]);
    return (
        <div className="rounded-lg  bg-white p-4">
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">Best shorts</h1>
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
            <div className="h-[340px] text-black relative w-[340px] dark:text-white">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                        className="stroke-current text-gray-200"
                        strokeWidth={5}
                        cx={50}
                        cy={50}
                        r={40}
                        fill="transparent"
                    />
                    <circle
                        style={{
                            strokeDasharray: number,
                            strokeDashoffset: `${number - progressNumber}`,
                            transition: 'stroke-dashoffset 0.35s',
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            stroke: '#5887BD #008DE7 #023F86',
                        }}
                        className="progress-ring__circle  stroke-current text-indigo-500"
                        strokeWidth={5}
                        strokeLinecap="round"
                        cx={50}
                        cy={50}
                        r={40}
                        fill="transparent"
                        strokeDashoffset={number}
                    />
                    <text x={50} y={50} fontFamily="lato" fontSize={10} textAnchor="middle" alignmentBaseline="middle">
                        {Math.floor((progressNumber * 100) / number)}%
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default BestShorts;
