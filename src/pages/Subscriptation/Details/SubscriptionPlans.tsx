function SubscriptionPlans() {
    return (
        <div className="w-full h-[400px]">
            <div>
                <h1 className="text-xl font-medium">Subscription Plans</h1>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    monthly
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    Details
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    switch
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    monthly
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    switch
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    Details
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    monthly
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    Details
                </button>
                <button className="px-4 py-2 border bg-[#FFFFFF] text-black rounded-md bg-transparent hover:bg-blue-500 hover:text-white">
                    Details
                </button>
            </div>
            <div className="flex justify-center items-center mt-16">
                <button className="px-14 py-2 border border-[#1153A0] font-semibold text-white bg-[#1153A0] rounded-md  ">
                    Add+
                </button>
            </div>
        </div>
    );
}

export default SubscriptionPlans;
