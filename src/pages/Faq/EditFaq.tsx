import { useState, useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';
import { Link, useParams } from 'react-router-dom';
import { useGetSingleFaqQuery } from '../../redux/features/faq/faqApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';

function EditFaq() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [answer, setAnswer] = useState('');

    const { data, isLoading, isError } = useGetSingleFaqQuery(id as string);

    useEffect(() => {
        if (data?.data) {
            // Check if data is available
            setName(data.data.question); // Set the state with question data
            setAnswer(data.data.answer); // Set the state with answer data
        }
    }, [data]); // Re-run whenever data changes

    const handleFormSubmit = () => {
        const formData = {
            name,
            answer,
        };
        console.log(formData);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
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
            <div className="flex flex-wrap items-center justify-center p-10">
                <div className="flex flex-col space-y-6 w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="question">
                            Question
                        </label>
                        <input
                            type="text"
                            id="question"
                            placeholder="Enter question"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="answer">
                            Answer
                        </label>
                        <input
                            type="text"
                            id="answer"
                            placeholder="Enter answer"
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

export default EditFaq;
