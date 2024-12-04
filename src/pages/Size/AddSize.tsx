import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAddSizeMutation } from '../../redux/features/size/sizeApi';
import Swal from 'sweetalert2';
import Error from '../../components/shared/ErrorPage';
import Loading from '../../components/shared/Loading';

function AddSize() {
    const [sizeName, setName] = useState('');
    const [addSize, { isLoading, isError, isSuccess }] = useAddSizeMutation(); // Destructure the hook

    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        if (!sizeName) {
            // Optional: Validate the input before submitting
            alert('Please enter a color name.');
            return;
        }

        const formData = {
            sizeName: sizeName.toUpperCase(), // Data to send to the API
        };

        try {
            // Call the mutation and get the response from the server
            const response = await addSize(formData).unwrap();

            // Reset input field
            setName('');

            navigate('/colors');

            // Check if the response is successful
            if (response.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response.message || 'Colour Added Successfully', // Use the response message from the server
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                // Optionally handle server-side validation errors or failure
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: response.message || 'Failed to add color',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${error.data.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (isSuccess) {
        navigate('/size');
    }

    if (isError) {
        return (
            <div>
                <Error />
            </div>
        );
    }
    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <Link to="/size">
                <div className="flex justify-start gap-2">
                    <h1>
                        <IoArrowBackCircleOutline size={24} />
                    </h1>
                    <h1 className="mt-[2px]">Back</h1>
                </div>
            </Link>
            {/* Main form section */}
            <div className="flex flex-wrap items-center justify-center  p-10">
                {/* Input Fields Section */}
                <div className="flex flex-col space-y-6 w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10 bg-white p-8 rounded-lg shadow-md">
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="name">
                            Size Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="enter Size Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={sizeName}
                            onChange={(e) => setName(e.target.value.toUpperCase())}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleFormSubmit}
                            className="mt-6 w-36 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSize;
