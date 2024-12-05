import { useState, useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from '../../redux/features/category/categoryApi';

function EditCategory() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const { data, isError, isLoading } = useGetSingleCategoryQuery(id);
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    useEffect(() => {
        if (data && data.data && data.data.name) {
            setName(data.data.name); // Ensure sizeName from API is uppercase
        } else {
            console.error('Error: sizeName not found or data structure is incorrect');
        }
    }, [data]);

    const handleFormSubmit = async () => {
        if (!name) {
            alert('Please enter a size name.');
            return;
        }

        const formData = { name };

        try {
            const response = await updateCategory({ id, formData }).unwrap();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message || 'Size Updated Successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/add-category');
        } catch (error: any) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.message || 'Failed to update size.',
                showConfirmButton: true,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            <Link to="/colors">
                <div className="flex justify-start gap-2">
                    <h1>
                        <IoArrowBackCircleOutline size={24} />
                    </h1>
                    <h1 className="mt-[2px]">Back</h1>
                </div>
            </Link>
            <div className="flex flex-wrap items-center justify-center p-10">
                <div className="flex flex-col space-y-6 w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="name">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter category Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-transform-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Convert input to uppercase
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleFormSubmit}
                            className="mt-6 w-36 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;
