import { Table } from 'antd';
import { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import './transaction.css';

const Transaction = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

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
        // additional data...
    ];

    // Filter data based on search text
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    return (
        <div className="bg-[#fff]">
            <div className="ml-2 my-5">
                <h1 className=" font-semibold text-xl">Resent Transactions</h1>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowClassName={() => 'custom-row'} // Add a custom class to each row
            />
        </div>
    );
};

export default Transaction;
