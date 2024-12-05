// import { Table } from 'antd';
// import { useState } from 'react';
// import { AiOutlineExclamationCircle } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
// import '../Transaction/transaction.css';
// import { IoMdSearch } from 'react-icons/io';
// import 'react-calendar/dist/Calendar.css'; // Calendar styles
// import { useGetAllTransactionQuery } from '../../../redux/features/treansactionDetails/treansactionApi';

// const TrDetails = () => {
//     const [searchText, setSearchText] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const { data: transactions, isLoading, isError } = useGetAllTransactionQuery([]);

//     const columns = [
//         {
//             title: 'Transaction ID',
//             dataIndex: 'id',
//             key: 'id',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Amount',
//             dataIndex: 'amount',
//             key: 'amount',
//         },

//         {
//             title: 'Date',
//             dataIndex: 'date',
//             key: 'date',
//         },
//         {
//             title: 'Details', // Actions column with buttons
//             key: 'actions',
//             render: (_: any, record: any) => (
//                 <div>
//                     <div
//                         className="cursor-pointer text-[#31A2FF] hover:text-[#fff]"
//                         onClick={() => handleDetails(record)}
//                     >
//                         <AiOutlineExclamationCircle size={24} />
//                     </div>
//                 </div>
//             ),
//         },
//     ];

//     // Sample data
//     const data = [
//         {
//             key: '1',
//             id: '001',
//             name: 'John Doe',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '500',
//             date: '16 april 2024',
//         },
//         {
//             key: '252',
//             id: '0s02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '268',
//             date: '16 april 2024',
//         },
//         {
//             key: '245',
//             id: 'f002',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '240',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },

//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         {
//             key: '782',
//             id: '0fd02',
//             name: 'Jane Smith',
//             image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
//             amount: '554',
//             date: '16 april 2024',
//         },
//         // additional data...
//     ];
//     console.log(transactions, 'transactions');
//     // Filter data based on search text
//     const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

//     const handleDetails = (record: any) => {
//         navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
//     };

//     return (
//         <div className="bg-[#fff]">
//             <div className="ml-2 my-5 flex justify-between">
//                 <h1 className=" font-semibold text-xl">Resent Transactions</h1>
//                 {/* date */}
//                 <div className="flex gap-7">
//                     {/* userName */}
//                     <div className="flex items-center gap-2">
//                         <div className="flex-1">
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 className="w-full bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div className="bg-[#31A2FF] text-white h-8 w-8 flex items-center justify-center rounded-full shadow-md cursor-pointer">
//                             <IoMdSearch size={20} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Table
//                 columns={columns}
//                 dataSource={filteredData}
//                 rowClassName={() => 'custom-row'} // Add a custom class to each row
//             />
//         </div>
//     );
// };

// export default TrDetails;

import React, { useState } from 'react';
import { Button, ConfigProvider, Table } from 'antd';
import { useGetAllTransactionQuery } from '../../../redux/features/treansactionDetails/treansactionApi';
import { IoMdSearch } from 'react-icons/io';
import Loading from '../../../components/shared/Loading';
import Error from '../../../components/shared/ErrorPage';

interface Product {
    _id: string;
    productId: {
        _id: string;
        name: string;
        image: string[];
        price: number;
    };
    quantity: number;
}

interface Payment {
    _id: string;
    products: Product[];
    createdAt: string;
    user: {
        _id: string;
        name: string;
    };
}

const TrDetails: React.FC = () => {
    const { data: response, isLoading, error } = useGetAllTransactionQuery([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePaginationChange = (page: number, limit: number) => {
        setCurrentPage(page);
        setPageSize(limit);
    };

    // Transform and filter the data
    const filteredData = response?.data
        ?.map((payment: Payment, index: number) => {
            return payment.products.map((product) => ({
                key: `${payment._id}-${product._id}`, // Unique key for each row
                picture: product.productId.image[0], // First image of the product
                productName: product.productId.name,
                userName: payment.user.name, // User name from the payment
                quantity: `${product.quantity} Piece${product.quantity > 1 ? 's' : ''}`,
                price: `$${product.productId.price}`,
                orderDate: new Date(payment.createdAt).toLocaleDateString(),
                totalPrice: `$${product.productId.price * product.quantity}`,
            }));
        })
        .flat()
        .filter((item) => {
            // Apply search filter based on product name
            return item.productName.toLowerCase().includes(searchText.toLowerCase());
        });

    const columns = [
        {
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (image: string) => {
                const isExternalImage = image.startsWith('http') || image.startsWith('https');
                return isExternalImage ? (
                    <img src={image} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                ) : (
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}${image}`}
                        alt="product"
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                    />
                );
            },
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },

        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
    ];

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between">
                <h2 className="text-md md:text-xl font-medium text-title mb-4 mt-4">Transactions History</h2>
                <div className="ml-2 flex justify-between my-2">
                    <div className="flex gap-7">
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="bg-[#31A2FF] text-white h-8 w-8 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                                <IoMdSearch size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: 'transparent',
                            borderColor: 'transparent',
                            headerColor: '#584857',
                            fontSize: 15,
                        },
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredData} // Use the filtered data
                    rowClassName={() => 'custom-row'}
                    pagination={{
                        pageSize: pageSize,
                        total: response?.meta?.total, // Update the pagination total count
                        current: currentPage,
                        defaultCurrent: 1,
                        showSizeChanger: false,
                        onChange: handlePaginationChange,
                    }}
                />
            </ConfigProvider>
        </div>
    );
};

export default TrDetails;
