import { Select } from 'antd';

const { Option } = Select;

const UserChart = () => {
    const data = [
        {
            name: 'Denisa Ozel',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            progress: 76,
        },
        {
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            progress: 85,
        },
        {
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            progress: 92,
        },
        {
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            progress: 92,
        },
        {
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            progress: 92,
        },
        // Add more users as needed
    ];

    return (
        <div style={{ display: 'flex', height: '400px', flexDirection: 'column', gap: 10 }}>
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">Best courses</h1>
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
            <div className="flex flex-col">
                {data.map((user, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center justify-center md:justify-start p-2">
                        <img
                            width={500}
                            height={500}
                            className="size-10 rounded-full bg-slate-500 object-cover mb-4 md:mb-0 md:mr-4"
                            src={user.image}
                            alt={`${user.name} avatar`}
                        />
                        <div className="flex flex-row gap-3 items-center md:items-start">
                            <h1 className="font-bold">{user.name}</h1>
                            <div className="mx-auto flex h-3 lg:w-[270px] md:w-[170px] items-center justify-center rounded-full bg-[#D7E8FD] my-2">
                                <div
                                    style={{ width: `${user.progress}%` }}
                                    className="transition-width h-3 rounded-full bg-[#023F86] duration-500"
                                ></div>
                            </div>
                            <p className="text-sm font-semibold">{user.progress}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserChart;
