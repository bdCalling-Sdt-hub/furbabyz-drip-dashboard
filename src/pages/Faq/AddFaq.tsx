import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAddFaqMutation } from '../../redux/features/faq/faqApi';
import Swal from 'sweetalert2';
import Error from '../../components/shared/ErrorPage';
import Loading from '../../components/shared/Loading';

function AddFaq() {
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [addSize, { isLoading, isError, isSuccess }] = useAddFaqMutation(); // Destructure the hook

    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        if (!answer) {
            // Optional: Validate the input before submitting
            alert('Please enter a color name.');
            return;
        }

        const formData = {
            answer: answer,
            question: question,
        };

        try {
            // Call the mutation and get the response from the server
            const response = await addSize(formData).unwrap();

            // Reset input field
            setAnswer('');
            setQuestion('');

            navigate('/faq');

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
        navigate('/faq');
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
            <Link to="/faq">
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
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="question">
                            Question
                        </label>
                        <input
                            type="text"
                            id="question"
                            placeholder="enter question"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="answer">
                            Answer
                        </label>
                        <input
                            type="text"
                            id="answer"
                            placeholder="enter answer"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
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

export default AddFaq;
