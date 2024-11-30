import Transaction from '../Transaction/page';
import BestShorts from './BestShort';
import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import Operation from './Operation';
import UserChart from './UserChart';
import UserEngagement from './UserEngagement';

const Dashboard = () => {
    return (
        <div className="">
            <DashboardStats />
            <div className="my-5">
                <div
                    className="col-span-1 md:col-span-1 lg:col-span-5 bg-white drop-shadow-md p-4 rounded-2xl"
                    style={{ width: '100%' }}
                >
                    {/* Total Services */}
                    <EarningChart />
                </div>
            </div>
            {/* User Engagement */}

            <div className="mt-5">
                <div className="col-span-6 bg-white drop-shadow-md p-4 mx-2 rounded-2xl">
                    <Transaction />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
