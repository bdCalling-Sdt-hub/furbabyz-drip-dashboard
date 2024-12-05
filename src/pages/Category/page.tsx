import { Table, Input, Button } from 'antd';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import Swal from 'sweetalert2';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../redux/features/category/categoryApi';

const Category = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Fetch sizes and provide loading and error states
    const { data, isLoading, isError, error, refetch } = useGetAllCategoryQuery(undefined);
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDetails = (record: any) => {
        navigate(`/category/${record._id}`);
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
                    await deleteCategory(record._id).unwrap(); // Trigger the delete mutation with the color ID
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your category has been deleted.',
                        icon: 'success',
                    });

                    // Trigger a refetch to get the updated list of sizes
                    refetch();
                } catch (error: any) {
                    console.error('Error deleting color:', error);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to Delete Color',
                        text: error.message || 'Something went wrong!',
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Edit
                    </Button>
                    <Button className="bg-red-600 text-white" onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    // Ensure the filtering uses the correct field for comparison
    const filteredData = data?.data?.filter((item: any) => item.name.toLowerCase().includes(searchText.toLowerCase()));

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
            <div className="flex justify-end gap-2">
                <Link to="/category">
                    <button className="bg-[#31A2FF] text-white h-8 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                        Add Category
                    </button>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '300px', display: 'flex', alignItems: 'center' }}
                        prefix={<CiSearch />}
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
};

export default Category;
