import { Table, Input, Button } from 'antd';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const columns = [
        {
            title: 'Select', // Checkbox column title
            dataIndex: 'select',
            key: 'select',
            render: (_: any, record: any) => (
                <input type="checkbox" onChange={(e) => handleCheckboxChange(e, record)} />
            ),
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <img src={image} alt="User" width={50} height={50} style={{ borderRadius: '8px' }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status', // Status column
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <span style={{ color: status === 'Active' ? 'green' : 'red' }}>{status}</span>,
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Actions', // Actions column with buttons
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Details
                    </Button>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleAction(record)}>
                        Payment
                    </Button>
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
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '2',
            id: '002',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Inactive',
            plan: 'Yearly',
        },
        {
            key: '2',
            id: '002',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Inactive',
            plan: 'Yearly',
        },
        {
            key: '2',
            id: '002',
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Inactive',
            plan: 'Yearly',
        },
        // additional data...
    ];

    // Filter data based on search text
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, record: any) => {
        console.log(`Checkbox for ${record.name} is now ${e.target.checked}`);
    };

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    const handleAction = (record: any) => {
        console.log(`Action for ${record.name}`);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Input
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '300px', display: 'flex', alignItems: 'center' }} // Adjust the width as needed
                    prefix={<CiSearch />} // Add the search icon here
                />
            </div>
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
};

export default Users;
