import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Personal() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const handleFormSubmit = () => {
        // Gather all data here
        const formData = {
            imageUrl,
            name,
            email,
            phone,
        };
        console.log(formData);
        // You can now send formData to your backend or use it as needed
    };

    return (
        <div>
            <div className="flex justify-start gap-2">
                <h1>
                    <IoArrowBackCircleOutline size={24} />
                </h1>
                <h1 className="mt-[2px]">Back</h1>
            </div>
            {/* Main form section */}
            <div className="flex items-center space-x-8 p-8 rounded-md">
                {/* Avatar Upload Section */}
                <div className="border w-60 h-60 flex justify-center items-center rounded-md">
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
                            <img src={imageUrl} alt="avatar" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>

                {/* Input Fields Section */}
                <div className="flex flex-col space-y-4 p-8 w-[500px]">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="name1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name1"
                            placeholder="Enter your name"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="phone">
                            Phone Number
                        </label>
                        <PhoneInput
                            country="us" // Default country
                            value={phone}
                            onChange={setPhone}
                            inputClass="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:border-blue-500"
                            containerClass="!w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleFormSubmit}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Personal;
