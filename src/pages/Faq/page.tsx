import { Table, Input, Button } from 'antd';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteFaqMutation, useGetAllFaqQuery } from '../../redux/features/faq/faqApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import Swal from 'sweetalert2';

const Faq = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    const { data: faqData, isLoading, isError, refetch } = useGetAllFaqQuery([]);

    const [deleteBlog] = useDeleteFaqMutation();

    const handleDetails = (record: any) => {
        navigate(`/faq/${record._id}`); // Navigate to the details page with the record's ID
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
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
        },

        {
            title: 'Actions', // Actions column with buttons
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Edit
                    </Button>
                    <Button className="bg-red-600 text-white " onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    // Filter data based on search text
    const filteredData = faqData?.data.filter((item: any) =>
        item.question.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handlePaginationChange = (page: number, limit: number) => {
        setCurrentPage(page);
        setPageSize(limit);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <div>
            <div className="flex justify-end gap-2">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '300px', height: '40px', display: 'flex', alignItems: 'center' }} // Adjust the width as needed
                        prefix={<CiSearch />} // Add the search icon here
                    />
                </div>
                <Link to="/add-faq">
                    <button className="bg-[#31A2FF] text-white h-10 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                        Add Faq
                    </button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowClassName={() => 'custom-row'}
                pagination={{
                    pageSize,
                    total: faqData?.meta?.total,
                    current: currentPage,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
            />
        </div>
    );
};

export default Faq;
