import { Button, Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { IoMdSearch } from 'react-icons/io';
import { useDeleteProductMutation, useGetAllProductQuery } from '../../redux/features/product/productApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import Swal from 'sweetalert2';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    const {
        data: productData,
        isLoading,
        isError,
        refetch,
    } = useGetAllProductQuery([
        { name: 'page', value: currentPage },
        { name: 'limit', value: pageSize },
    ]);

    const [deleteProduct] = useDeleteProductMutation();

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
                    await deleteProduct(record._id).unwrap(); // Trigger the delete mutation with the blog ID
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your Product has been deleted.',
                        icon: 'success',
                    });

                    // Re-fetch the blog list after deletion to get the latest data
                    refetch();
                } catch (error: any) {
                    console.error('Error deleting blog:', error);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to Delete Product',
                        text: error.message || 'Something went wrong!',
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    // Define columns for the Ant Design table
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (images: string[]) => {
                if (Array.isArray(images) && images.length > 0) {
                    return (
                        <div className="flex gap-2">
                            {images?.slice(0, 3)?.map((image, index) => {
                                const isExternalImage = image.startsWith('http') || image.startsWith('https');
                                return (
                                    <img
                                        key={index}
                                        src={isExternalImage ? image : `${import.meta.env.VITE_BASE_URL}${image}`}
                                        alt={`product-image-${index}`}
                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                );
                            })}
                        </div>
                    );
                }
                return null;
            },
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
            render: (size: { sizeName: string }[]) => {
                // Check if size is an array and has data
                if (Array.isArray(size) && size.length > 0) {
                    // Map over the size array and join the 'sizeName' property values
                    return size.map((item) => item?.sizeName).join(', ');
                }
                // If no sizes are available, return a fallback text
                return 'No sizes available'; // You can change this to whatever you prefer
            },
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Color',
            dataIndex: 'colour',
            key: 'colour',
            render: (colour: any) => colour?.colourName, // Render color name
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span className={status === 'active' ? 'text-[#31A2FF]' : 'text-[#FF0000]'}>{status}</span>
            ),
        },
        {
            title: 'Details',
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Edit
                    </Button>
                    <Button
                        className="bg-red-600 text-white"
                        onClick={() => handleDelete(record)}
                        // loading={isDeleting} // Show loading state while deleting
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    // Filter data based on search text
    const filteredData = productData?.data?.filter((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    // Handle row selection
    const handleDetails = (record: any) => {
        navigate(`/products/${record._id}`); // Navigate to the details page
    };

    const handlePaginationChange = (page: number, limit: number) => {
        // Update state for current page and page size
        setCurrentPage(page);
        setPageSize(limit);
    };

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

    return (
        <div>
            {/* Search input */}
            <div className="ml-2  flex justify-between">
                <h1 className=" font-semibold text-xl">Products List</h1>
                {/* date */}
                <div className="flex gap-4 my-3">
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

            {/* Table component */}
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="_id"
                loading={isLoading}
                rowClassName={() => 'custom-row'}
                // pagination={{
                //     current: currentPage,
                //     pageSize,
                //     total: productData?.meta?.total,
                //     onChange: (page, pageSize) => {
                //         setCurrentPage(page);
                //         setPageSize(pageSize);
                //     },
                // }}

                pagination={{
                    pageSize: pageSize, // Set page size dynamically
                    total: productData?.meta?.total,
                    current: currentPage, // Set current page dynamically
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: handlePaginationChange, // Call the pagination change handler
                }}
            />
        </div>
    );
};

export default Products;
