import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetEarningChartQuery } from '../../../redux/features/dashboard/dashboardApi';
import Loading from '../../../components/shared/Loading';
import Error from '../../../components/shared/ErrorPage';

const EarningChart = () => {
    const { isError, isLoading, data } = useGetEarningChartQuery(undefined);

    const chartData =
        data?.data?.[0]?.earnings?.map((item: any) => ({
            name: item.month, // Month (e.g., 'Jan', 'Feb', etc.)
            totalAmount: item.totalAmount, // Amount for that month
            year: item.year, // Amount for that month
        })) || [];

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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">Earnings</h1>
                {/* <Select onChange={(value) => setYear(value)} defaultValue="2024" className="w-32 h-[40px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select> */}
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="totalAmount" fill="#31A2FF" radius={[10, 10, 0, 0]} background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
