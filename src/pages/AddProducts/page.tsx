import { message, Upload } from 'antd';
import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';

function AddProducts() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [size, setSize] = useState<string[]>([]); // State to hold selected sizes
    const [color, setColor] = useState<string[]>([]); // State to hold selected colors

    // Handle size selection
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value;

        // Only add the size if it's not already selected
        if (!size.includes(selectedSize)) {
            setSize((prevSizes) => [...prevSizes, selectedSize]);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedColor = e.target.value;

        // Only add the size if it's not already selected
        if (!color.includes(selectedColor)) {
            setColor((prevColors) => [...prevColors, selectedColor]);
        }
    };

    const handleUploadChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const uploadedUrl = info.file.response?.data?.url;
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
                message.success('Upload successful!');
            } else {
                message.error('Upload failed. Please try again.');
            }
            setLoading(false);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="mt-2 text-sm text-gray-500">Upload</div>
        </button>
    );

    const handleFormSubmit = () => {
        // Gather all data here
        const formData = {
            imageUrl,
            name,
            email,
        };
        console.log(formData);
        // You can now send formData to your backend or use it as needed
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Link to={'/products'}>
                <div className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                    <IoArrowBackCircleOutline size={24} />
                    <span className="text-xl font-semibold">Back</span>
                </div>
            </Link>

            <div className="mt-8 w-full mx-auto bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar Upload Section */}
                    <div className="col-span-1 flex justify-center items-center">
                        <div className="border-4 border-gray-300 rounded-full w-40 h-40 flex justify-center items-center overflow-hidden">
                            <Upload
                                name="file" // Adjust based on your API requirements
                                listType="picture-circle"
                                showUploadList={false}
                                action={`https://api.imgbb.com/1/upload?key=sdasdsad`}
                                onChange={handleUploadChange}
                                headers={{
                                    authorization: 'Bearer <token>', // Set token if needed
                                }}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </div>
                    </div>

                    {/* Input Fields Section */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="name1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name1"
                                placeholder="Enter your name"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="price">
                                Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Enter the price"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="gender">
                                Gender
                            </label>
                            <input
                                type="text"
                                id="gender"
                                placeholder="Enter your gender"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                placeholder="Enter description"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="features">
                                Features
                            </label>
                            <input
                                type="text"
                                id="features"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter features"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="size">
                                Size
                            </label>
                            <select
                                id="size"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleSizeChange}
                                value={size}
                            >
                                <option value="">Select Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <div className="mt-2 text-sm text-gray-600">
                                {size.length > 0 ? size.join(', ') : 'None selected'}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="color">
                                Color
                            </label>
                            <select
                                id="color"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleColorChange}
                                value={color}
                            >
                                <option value="">Select Color</option>
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                                <option value="Blue">Blue</option>
                                <option value="Purple">Purple</option>
                                <option value="Green">Green</option>
                            </select>
                            <div className="mt-2 text-sm text-gray-600">
                                {color.length > 0 ? color.join(', ') : 'None selected'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleFormSubmit}
                        className="mt-6  w-44 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
