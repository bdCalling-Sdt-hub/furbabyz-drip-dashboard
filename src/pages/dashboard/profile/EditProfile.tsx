import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
    phone: string;
}

const EditProfile: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: FormValues) => {
        console.log('Received values of form: ', values);
        setLoading(true);

        // Simulating an API call
        setTimeout(() => {
            values.image = file;
            console.log('Form Data Submitted:', values);
            setLoading(false);
        }, 1500);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const isValidImage = selectedFile.type.startsWith('image/');
            if (!isValidImage) {
                alert('Please upload a valid image file.');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <Form name="update_profile" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                {/* Banner Image */}
                <div className="flex justify-center mb-6">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[10%] cursor-pointer right-[5%] bg-blue-600 rounded-full p-2 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={20} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                {/* Full Name */}
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="John Doe" />
                </Form.Item>

                {/*  Address */}
                <Form.Item
                    label=" Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address' }]}
                >
                    <Input placeholder="enter your address" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item label="Phone Number" name="phone">
                    <PhoneInput
                        country="us"
                        inputClass="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400"
                        containerClass="!w-full"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
