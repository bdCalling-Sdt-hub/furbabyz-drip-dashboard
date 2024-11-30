function Operation() {
    return (
        <div>
            <h1 className="text-2xl font-semibold ">Operational Metrics</h1>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-around gap-5 mt-8 mb-5">
                <h1 className="text-xl font-semibold">Courses</h1>
                <h1 className="text-xl font-semibold">Shorts</h1>
                <h1 className="text-xl font-semibold">Courses Week</h1>
                <h1 className="text-xl font-semibold">Shorts Week</h1>
            </div>

            {/* Metrics Section */}
            <div className="flex flex-col gap-5">
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="flex justify-around gap-5 border-2 border-[#E2EAF2] rounded-lg text-xl p-4 my-2"
                    >
                        <h1 className="lg:text-lg md:text-sm">Grammar - xxx</h1>
                        <h1 className="lg:text-lg md:text-sm">2.5MB</h1>
                        <h1 className="lg:text-lg md:text-sm">48 Members</h1>
                        <h1 className="lg:text-lg md:text-sm">42 Members</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Operation;
