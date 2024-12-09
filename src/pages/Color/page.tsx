import { Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteColorMutation, useGetAllColorQuery } from '../../redux/features/color/colorApi';
import Swal from 'sweetalert2';

const Colour = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Use the API hook to fetch data
    const { isError, isLoading, data: color } = useGetAllColorQuery(undefined);
    const [deleteColor, { isLoading: isDeleting }] = useDeleteColorMutation();

    const [colorList, setColorList] = useState(color?.data || []);

    useEffect(() => {
        setColorList(color?.data || []);
    }, [color]);

    const handleDetails = (record: any) => {
        navigate(`/editcolor/${record._id}`); // Navigate to the details page with the color ID
    };

    // Handle the delete action with confirmation
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
                    await deleteColor(record._id).unwrap(); // Trigger the delete mutation with the color ID
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your color has been deleted.',
                        icon: 'success',
                    });

                    // Optimistically remove the deleted color from the table
                    setColorList((prevState: any) => prevState.filter((item: any) => item._id !== record._id));
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

    // Columns for the Ant Design Table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'colourName', // Use 'colourName' as dataIndex to fetch the color name
            key: 'colourName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button className="bg-[#F6FAFF] text-[#023F86]" onClick={() => handleDetails(record)}>
                        Edit
                    </Button>
                    <Button
                        className="bg-red-600 text-white"
                        onClick={() => handleDelete(record)}
                        loading={isDeleting} // Show loading state while deleting
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    // Filter data based on search text
    const filteredData = colorList.filter((item: any) =>
        item.colourName.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
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
                <Link to="/addcolour">
                    <button className="bg-[#31A2FF] text-white h-10 w-32 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                        Add Color
                    </button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="_id" // Assuming each color has a unique '_id' field
            />
        </div>
    );
};

export default Colour;
