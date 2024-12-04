import { useState, useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetSingleSizeQuery, useUpdateSizeMutation } from '../../redux/features/size/sizeApi';

function EditSize() {
    const { id } = useParams();
    const [sizeName, setName] = useState('');
    const navigate = useNavigate();

    const { data, isError, isLoading } = useGetSingleSizeQuery(id);
    const [updateSize, { isLoading: isUpdating }] = useUpdateSizeMutation();

    useEffect(() => {
        if (data && data.data && data.data.sizeName) {
            setName(data.data.sizeName.toUpperCase()); // Ensure sizeName from API is uppercase
        } else {
            console.error('Error: sizeName not found or data structure is incorrect');
        }
    }, [data]);

    const handleFormSubmit = async () => {
        if (!sizeName) {
            alert('Please enter a size name.');
            return;
        }

        const formData = { sizeName };

        try {
            const response = await updateSize({ id, formData }).unwrap();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message || 'Size Updated Successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/size');
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
                            Size Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Size Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-transform-none"
                            value={sizeName}
                            onChange={(e) => setName(e.target.value.toUpperCase())} // Convert input to uppercase
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

export default EditSize;
