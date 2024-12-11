import { Button, Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

import { useDeleteBlogMutation, useGetAllBlogQuery } from '../../redux/features/blog/blogApi';
import Error from '../../components/shared/ErrorPage';
import Loading from '../../components/shared/Loading';
import Swal from 'sweetalert2';

const Blog = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    // Use the useGetAllBlogQuery hook to fetch the data
    const {
        data: blog,
        isLoading,
        isError,
        refetch, // Access the refetch function
    } = useGetAllBlogQuery([
        { name: 'page', value: currentPage },
        { name: 'limit', value: 10 },
    ]);

    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    const handleDetails = (record: any) => {
        navigate(`/blog/${record._id}`); // Navigate to the details page with the record's ID
    };

    const handleDelete = (record: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteBlog(record._id).unwrap(); // Trigger the delete mutation with the blog ID
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your blog has been deleted.',
                        icon: 'success',
                    });

                    // Re-fetch the blog list after deletion to get the latest data
                    refetch();
                } catch (error: any) {
                    console.error('Error deleting blog:', error);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to Delete Blog',
                        text: error.message || 'Something went wrong!',
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => {
                const isExternalImage = image.startsWith('http') || image.startsWith('https');
                return isExternalImage ? (
                    <img src={image} alt="user" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                ) : (
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
                const maxLength = 70;
                return des?.length > maxLength ? `${des.slice(0, maxLength)}...` : des;
            },
        },
        {
            title: 'Details',
            key: 'actions',
            render: (_: any, record: any) => (
                <div>
                    <Button className="bg-[#F6FAFF] text-[#023F86] mr-2" onClick={() => handleDetails(record)}>
                        View
                    </Button>
                    <Button className="bg-red-600 text-white" onClick={() => handleDelete(record)} loading={isDeleting}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    const handlePaginationChange = (page: number, limit: number) => {
        setCurrentPage(page);
        setPageSize(limit);
    };

    const filteredData = blog?.data?.filter((item: any) => item.title.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div>
            <div className="ml-2 flex justify-between">
                <h1 className="font-semibold text-xl">Blog List</h1>
                <div className="flex gap-4">
                    <div className="flex gap-7">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <Link to="/add-blog">
                        <button className="bg-[#31A2FF] text-white h-9 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                            Add Blog
                        </button>
                    </Link>
                </div>
            </div>

            <div className="my-6">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowClassName={() => 'custom-row'}
                    pagination={{
                        pageSize,
                        total: blog?.meta?.total,
                        current: currentPage,
                        defaultCurrent: 1,
                        showSizeChanger: false,
                        onChange: handlePaginationChange,
                    }}
                />
            </div>
        </div>
    );
};

export default Blog;
