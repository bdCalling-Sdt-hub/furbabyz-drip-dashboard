// src/pages/dashboard/Details.jsx or Details.tsx
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const goToSpaceSeeker = () => {
        navigate('/space-seeker'); // Navigate to the SpaceSeeker page
    };

    const fetchData = (id: any) => {
        return {
            id,
            name: 'John Doe',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
        };
    };

    const data = fetchData(id);

    return (
        <div className="lg:ml-9 ml-0">
            <div className="flex items-center gap-10">
                <IoArrowBackSharp className="h-6 w-6 cursor-pointer" onClick={goToSpaceSeeker} />
                <img className="h-14 w-14 rounded-full" src={data.image} alt={data.name} />
                <div>
                    <h1 className="text-lg font-semibold">{data.name}</h1>
                    <p className="text-sm text-gray-500">{data.status}</p>
                </div>
                <div>
                    <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Subscribed to Student Yearly Package
                    </button>
                </div>
            </div>

            {/* Input Fields Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-[1150px]">
                <div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Change input type based on state
                            id="password"
                            placeholder="Enter your password"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <FaRegEyeSlash className="text-lg -mt-2" />
                            ) : (
                                <FaRegEye className="text-lg -mt-2" />
                            )}{' '}
                            {/* Toggle icon */}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="current-grade">
                            Current Grade
                        </label>
                        <input
                            type="text"
                            id="current-grade"
                            placeholder="Enter your current grade"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="current-school">
                            Current School
                        </label>
                        <input
                            type="text"
                            id="current-school"
                            placeholder="Enter your current school"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="current-school">
                            How Did you Hear about us ?
                        </label>
                        <input
                            type="text"
                            id="current-school"
                            placeholder="Friends"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="enroll-course">
                            Enrolled Course
                        </label>
                        <input
                            type="text"
                            id="enroll-course"
                            placeholder="Enter your enrolled course"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            id="enroll-course"
                            placeholder="Enter your enrolled course"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            id="enroll-course"
                            placeholder="Enter your enrolled course"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
