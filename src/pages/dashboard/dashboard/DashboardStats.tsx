import Error from '../../../components/shared/ErrorPage';
import Loading from '../../../components/shared/Loading';
import { useGetStatisticsQuery } from '../../../redux/features/dashboard/dashboardApi';

const DashboardStats = () => {
    const { isError, isLoading, data: dasData } = useGetStatisticsQuery(undefined);

    const formatCurrency = (value: number) => {
        return `$ ${(value / 1000).toFixed(2)} K`; // Example format for 'K' value
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <Error />
            </div>
        );
    }

    // Now use the response data dynamically
    const data = [
        {
            name: 'Total Earnings',
            count: formatCurrency(dasData?.data?.totalEarnings || 0), // Format totalEarnings
            bgColor: '#fff',
        },
        {
            name: 'Total Users',
            count: dasData?.data?.totalUsers || 0, // Use totalUsers from API
            bgColor: '#fff',
        },
        {
            name: 'Total Products',
            count: dasData?.data?.totalProducts || 0, // Use totalProducts from API
            bgColor: '#fff',
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-[#fff] rounded-2xl border flex items-center gap-3 h-40">
                        <div className="flex-1 flex flex-col items-start mx-5 gap-2">
                            <p className="flex items-center justify-center text-2xl text-[#545454] font-medium">
                                {item.name}
                            </p>
                            <div>
                                <p className="text-3xl mt-3 font-bold text-[#31A2FF]">{item.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
