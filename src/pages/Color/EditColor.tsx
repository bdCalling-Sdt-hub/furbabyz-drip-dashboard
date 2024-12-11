import { useState, useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetSingleColorQuery, useUpdateColorMutation } from '../../redux/features/color/colorApi';
import Swal from 'sweetalert2';

function EditColor() {
    const { id } = useParams();
    const [colourName, setName] = useState('');

    const { data, isError, isLoading } = useGetSingleColorQuery(id);
    const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.data) {
            setName(data.data.colourName); // Set initial value from API response
        }
    }, [data]);

    const handleFormSubmit = async () => {
        if (!colourName) {
            alert('Please enter a color name.');
            return;
        }

        const formData = {
            colourName: colourName, // Pass only the updated data here (without the `id`)
        };

        try {
            // Call the update mutation with the `id` and updated `formData`
            const response = await updateColor({ id, formData }).unwrap();

            // Show success alert after successful update
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message || 'Colour Updated Successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect after success
            navigate('/colors');
        } catch (error: any) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.message || 'Failed to update color.',
                text: error.data.message || 'Failed to update color.',
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
            {/* Main form section */}
            <div className="flex flex-wrap items-center justify-center p-10">
                {/* Input Fields Section */}
                <div className="flex flex-col space-y-6 w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10 bg-white p-8 rounded-lg shadow-md">
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="name">
                            Color Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Color Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={colourName} // Controlled input value
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleFormSubmit}
                            className="mt-6 w-36 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                            disabled={isUpdating} // Disable the button if the request is in progress
                        >
                            {isUpdating ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditColor;
