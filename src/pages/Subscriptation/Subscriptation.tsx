import EnrollMent2 from '../dashboard/dashboard/New/Enrollment2';
import SubscriptionPlans from './Details/SubscriptionPlans';

import SubscriptionStatistics from './Details/SubscriptionStatistics';
import Users from './Details/Users';

function Subscriptation() {
    return (
        <div>
            {/*  */}
            <div className="w-full pr-6 my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-7 bg-white drop-shadow-md p-2 rounded-2xl"
                        style={{ width: '100%' }}
                    >
                        <SubscriptionStatistics />
                    </div>

                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-5 bg-white drop-shadow-md p-4 rounded-2xl"
                        style={{ width: '100%' }}
                    >
                        <SubscriptionPlans />
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="w-full pr-6 my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-12 bg-white drop-shadow-md p-4 rounded-2xl"
                        style={{ width: '100%' }}
                    >
                        <Users />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscriptation;
