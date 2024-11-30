import { Table, Input, Button } from 'antd';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

const Size = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Actions', // Actions column with buttons
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Edit
                    </Button>
                    <Button className="bg-red-600 text-white text-[#023F86]" onClick={() => handleAction(record)}>
                        Delete
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
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'Active',
            plan: 'Monthly',
        },

        // additional data...
    ];

    // Filter data based on search text
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    const handleAction = (record: any) => {
        console.log(`Action for ${record.name}`);
    };

    return (
        <div>
            <div className="flex justify-end gap-2">
                <Link to="/AddSize">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Button className="bg-[#F6FAFF] text-[#023F86]">Add Size</Button>
                    </div>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '300px', display: 'flex', alignItems: 'center' }} // Adjust the width as needed
                        prefix={<CiSearch />} // Add the search icon here
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
};

export default Size;
