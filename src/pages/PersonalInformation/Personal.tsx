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
            <div className="flex flex-wrap items-center justify-center  p-10">
                {/* Avatar Upload Section */}
                <div className="border w-64 h-64 flex justify-center items-center rounded-lg bg-white shadow-inner">
                    <Upload
                        name="file"
                        listType="picture-circle"
                        showUploadList={false}
                        action={`https://api.imgbb.com/1/upload?key=sdasdsad`}
                        onChange={handleUploadChange}
                        headers={{
                            authorization: 'Bearer <token>',
                        }}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>

                {/* Input Fields Section */}
                <div className="flex flex-col space-y-6 w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10 bg-white p-8 rounded-lg shadow-md">
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="name1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name1"
                            placeholder="John Doe"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Address Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="123 Main St, City, State"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600" htmlFor="phone">
                            Phone Number
                        </label>
                        <PhoneInput
                            country="us"
                            value={phone}
                            onChange={setPhone}
                            inputClass="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400"
                            containerClass="!w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleFormSubmit}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Personal;
