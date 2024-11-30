import { Table } from 'antd';
import { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../Transaction/transaction.css';
import { IoMdSearch } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';
import Calendar from 'react-calendar'; // Import the calendar
import 'react-calendar/dist/Calendar.css'; // Calendar styles
import { Value } from 'react-calendar/src/shared/types.js';

const TrDetails = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Value) => {
        if (date instanceof Date) {
            setSelectedDate(date); // Only set if it's a valid Date
        }
        setShowPicker(false); // Close the calendar after selecting a date
    };

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },

        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Details', // Actions column with buttons
            key: 'actions',
            render: (_: any, record: any) => (
                <div>
                    <div
                        className="cursor-pointer text-[#31A2FF] hover:text-[#fff]"
                        onClick={() => handleDetails(record)}
                    >
                        <AiOutlineExclamationCircle size={24} />
                    </div>
                </div>
            ),
        },
    ];

    // Sample data
    const data = [
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '500',
            date: '16 april 2024',
        },
        {
            key: '252',
            id: '0s02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '268',
            date: '16 april 2024',
        },
        {
            key: '245',
            id: 'f002',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '240',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },

        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        {
            key: '782',
            id: '0fd02',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            amount: '554',
            date: '16 april 2024',
        },
        // additional data...
    ];

    // Filter data based on search text
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    return (
        <div className="bg-[#fff]">
            <div className="ml-2 my-5 flex justify-between">
                <h1 className=" font-semibold text-xl">Resent Transactions</h1>
                {/* date */}
                <div className="flex gap-7">
                    <div className="relative">
                        <div className="px-4 py-2 flex items-center justify-center gap-10 bg-white border rounded-3xl">
                            <h1 className="text-lg">Date</h1>
                            <h1
                                className="text-xl font-medium cursor-pointer"
                                onClick={() => setShowPicker(!showPicker)}
                            >
                                <SlCalender />
                            </h1>
                        </div>
                        {showPicker && (
                            <div className="absolute top-12 left-0 z-10 bg-white shadow-lg rounded-lg">
                                <Calendar onChange={handleDateChange} value={selectedDate} />
                            </div>
                        )}
                    </div>
                    {/* userName */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="bg-[#31A2FF] text-white h-8 w-8 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                            <IoMdSearch size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowClassName={() => 'custom-row'} // Add a custom class to each row
            />
        </div>
    );
};

export default TrDetails;
