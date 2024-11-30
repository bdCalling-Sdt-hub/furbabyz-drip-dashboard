import ActiveLyTrends from './dashboard/dashboard/ActiveLyTrends';
import BestShorts from './dashboard/dashboard/BestShorts';
import EnrollMent from './dashboard/dashboard/New/EnrollMent';
import EnrollMent2 from './dashboard/dashboard/New/Enrollment2';
import Finanical from './dashboard/dashboard/New/Finanical';
import RentionRates from './dashboard/dashboard/RentionRates';

function Analytics() {
    return (
        <div>
            <div className="w-full ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-3 bg-white drop-shadow-md p-4 rounded-2xl"
                        style={{ width: '400px' }}
                    >
                        <ActiveLyTrends />
                    </div>
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-3 bg-white drop-shadow-md p-2 rounded-2xl"
                        style={{ width: '400px' }}
                    >
                        <BestShorts />
                    </div>
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-5 bg-white drop-shadow-md p-4 rounded-2xl"
                        style={{ width: '750px' }}
                    >
                        <RentionRates />
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="w-full pr-6 my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-6 bg-white drop-shadow-md p-4 rounded-2xl"
                        style={{ width: '100%' }}
                    >
                        <EnrollMent />
                    </div>
                    <div
                        className="col-span-1 md:col-span-1 lg:col-span-6 bg-white drop-shadow-md p-2 rounded-2xl"
                        style={{ width: '100%' }}
                    >
                        <Finanical />
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
                        <EnrollMent2 />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
