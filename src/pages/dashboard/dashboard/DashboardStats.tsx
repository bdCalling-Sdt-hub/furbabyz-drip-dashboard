const DashboardStats = () => {
    const data = [
        {
            name: 'Total Earnings',
            count: '$ 14.88 K',
            bgColor: '#fff',
        },
        {
            name: 'Total Users',
            count: '65',
            bgColor: '#fff',
        },
        {
            name: 'Total Products',
            count: '120',
            bgColor: '#fff',
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 items-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-[#fff]  rounded-2xl border flex items-center gap-3 h-40">
                        <div className="flex-1 flex flex-col items-start mx-5 gap-2 ">
                            <p className="flex items-center justify-center text-2xl text-[#545454] font-medium">
                                {item.name}
                            </p>
                            <div>
                                <p className="text-3xl mt-3 font-bold text-[#31A2FF]">{item.count} </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
