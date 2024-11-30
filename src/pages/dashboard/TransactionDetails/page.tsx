import DashboardStats from '../dashboard/DashboardStats';

import TrDetails from '../TrDetails/page';

const TransactionDetails = () => {
    return (
        <div>
            <div className="">
                <DashboardStats />

                {/* User Engagement */}

                <div className="mt-5">
                    <div className="col-span-6 bg-white drop-shadow-md p-4 mx-2 rounded-2xl">
                        <TrDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
