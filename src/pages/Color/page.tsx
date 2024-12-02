import { Table, Input, Button } from 'antd';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

const Colour = () => {
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
                    <Button className="bg-red-600 text-white " onClick={() => handleAction(record)}>
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
        navigate(`/details/${record.id}`);
    };

    const handleAction = (record: any) => {
        console.log(`Action for ${record.name}`);
    };

    return (
        <div>
            <div className="flex justify-end gap-2">
                <Link to="/addcolour">
                    <button className="bg-[#31A2FF] text-white h-8 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                        Add Color
                    </button>
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

export default Colour;
