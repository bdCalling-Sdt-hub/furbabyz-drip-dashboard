import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAllUsersQuery } from '../../redux/features/users/userApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';

const SpaceSeeker = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    // Fetch user data based on current page and page size
    const {
        data: usesrData,
        isError,
        isLoading,
    } = useGetAllUsersQuery([
        { name: 'page', value: currentPage },
        { name: 'limit', value: 10 },
    ]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => {
                // Check if the image URL starts with http or https
                const isExternalImage = image.startsWith('http') || image.startsWith('https');

                return isExternalImage ? (
                    <img src={image} alt="user" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                ) : (
                    // If not an external URL, prepend the base URL from the environment variable
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}${image}`}
                        alt="user"
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                    />
                );
            },
        },
        {
            title: 'Join Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: 'Details',
            key: 'actions',
            render: (_: any, record: any) => (
                <div>
                    <div
                        className="cursor-pointer text-[#31A2FF] hover:text-[#fff]"
                        onClick={() => handleDetails(record)}
                    >
                        <Button>Details</Button>
                    </div>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <Error />
            </div>
        );
    }

    // Filter data based on search text
    const filteredData = usesrData?.data?.filter((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleDetails = (record: any) => {
        navigate(`/userdetails/${record._id}`);
    };

    // Pagination Change Handler
    const handlePaginationChange = (page: number, limit: number) => {
        // Update state for current page and page size
        setCurrentPage(page);
        setPageSize(limit);
    };

    return (
        <div className="">
            <div className="ml-2 flex justify-between">
                <h1 className="font-semibold text-xl">User List</h1>
                <div className="flex gap-7">
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full lg:w-72 bg-white text-gray-800 rounded-3xl px-10 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowClassName={() => 'custom-row'}
                    pagination={{
                        pageSize: pageSize, // Set page size dynamically
                        total: usesrData?.meta?.total,
                        current: currentPage, // Set current page dynamically
                        defaultCurrent: 1,
                        showSizeChanger: false,
                        onChange: handlePaginationChange, // Call the pagination change handler
                    }}
                />
            </div>
        </div>
    );
};

export default SpaceSeeker;
