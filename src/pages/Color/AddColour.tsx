import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAddColorMutation } from '../../redux/features/color/colorApi';
import Swal from 'sweetalert2';

function AddColour() {
    const [colourName, setName] = useState('');
    const [addColor, { isLoading, isSuccess }] = useAddColorMutation(); // Destructure the hook

    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        if (!colourName) {
            // Optional: Validate the input before submitting
            alert('Please enter a color name.');
            return;
        }

        const formData = {
            colourName, // Data to send to the API
        };

        try {
            // Call the mutation and get the response from the server
            const response = await addColor(formData).unwrap();

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
                            value={colourName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleFormSubmit}
                            className="mt-6 w-36 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                            disabled={isLoading} // Disable the button if the request is in progress
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>

                    {/* Success or Error message */}
                    {isSuccess && <p className="text-green-600">Color added successfully!</p>}
                </div>
            </div>
        </div>
    );
}

export default AddColour;
