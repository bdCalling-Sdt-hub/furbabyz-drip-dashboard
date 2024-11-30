import { Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { IoMdSearch } from 'react-icons/io';

import { AiOutlineExclamationCircle } from 'react-icons/ai';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const columns = [
        {
            title: 'Products ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <img src={image} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <div>
                    {status === 'active' ? (
                        <span className="text-[#31A2FF]">{status}</span>
                    ) : (
                        <span className="text-[#FF0000]">{status}</span>
                    )}
                </div>
            ),
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
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'delete',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
            status: 'active',
            price: '454',
            size: 'L',
            gender: 'male',
            descriptation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            color: 'red',
        },
        // additional data...
    ];

    // Filter data based on search text
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    return (
        <div className="">
            <div className="ml-2  flex justify-between">
                <h1 className=" font-semibold text-xl">Products List</h1>
                {/* date */}
                <div className="flex gap-4">
                    <div className="flex gap-7">
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
                    <div className="flex gap-7">
                        {/* userName */}
                        <Link to="/add-product">
                            <button className="bg-[#31A2FF] text-white h-9 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                                Add Product
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowClassName={() => 'custom-row'} // Add a custom class to each row
                />
            </div>
        </div>
    );
};

export default Products;
