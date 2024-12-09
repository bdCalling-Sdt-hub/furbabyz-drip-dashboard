import React, { useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import { useGetAllTransactionQuery } from '../../../redux/features/treansactionDetails/treansactionApi';

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
    const [pageSize, setPageSize] = useState(5);

    const handlePaginationChange = (page: number, limit: number) => {
        setCurrentPage(page);
        setPageSize(limit);
    };

    // Transform and filter the data
    const filteredData = response?.data
        ?.map((payment: Payment) => {
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
                                    className="w-full lg:w-72 bg-white text-gray-800 rounded-3xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
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
