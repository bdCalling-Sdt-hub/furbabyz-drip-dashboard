import { Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { IoMdSearch } from 'react-icons/io';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useGetAllBlogQuery } from '../../redux/features/blog/blogApi';
import { render } from 'react-dom';
import Error from '../../components/shared/ErrorPage';
import Loading from '../../components/shared/Loading';

const Blog = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    const {
        data: blog,
        isLoading,
        isError,
    } = useGetAllBlogQuery([
        { name: 'page', value: currentPage },
        { name: 'limit', value: 10 },
    ]);

    console.log(blog, 'blog');

    const columns = [
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
            render: (des: string) => {
                const maxLength = 70; // Maximum number of characters to display
                // Slice the description and add '...' if it's too long
                return des?.length > maxLength ? `${des.slice(0, maxLength)}...` : des;
            },
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

    const handlePaginationChange = (page: number, limit: number) => {
        // Update state for current page and page size
        setCurrentPage(page);
        setPageSize(limit);
    };

    // Filter data based on search text
    const filteredData = blog?.data?.filter((item: any) => item.title.toLowerCase().includes(searchText.toLowerCase()));

    const handleDetails = (record: any) => {
        navigate(`/details/${record.id}`); // Navigate to the details page with the record's ID
    };

    return (
        <div className="">
            <div className="ml-2  flex justify-between">
                <h1 className=" font-semibold text-xl">Blog List</h1>
                {/* date */}
                <div className="flex gap-4">
                    <div className="flex gap-7">
                        {/* userName */}
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
                    <div className="flex gap-7">
                        {/* userName */}
                        <Link to="/add-blog">
                            <button className="bg-[#31A2FF] text-white h-9 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                                Add Blog
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
                    pagination={{
                        pageSize: pageSize, // Set page size dynamically
                        total: blog?.meta?.total,
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

export default Blog;
