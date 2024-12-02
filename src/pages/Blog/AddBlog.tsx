import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import 'react-phone-input-2/lib/style.css';
import { IoArrowBack } from 'react-icons/io5';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
    phone: string;
}

const AddBlog: React.FC = () => {
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
        <div>
            <div>
                <p className="text-2xl font-bold cursor-pointer">
                    <IoArrowBack onClick={() => window.history.back()} size={26} />
                </p>
            </div>
            <div>
                <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                    <Form
                        name="update_profile"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
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
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please enter your title' }]}
                        >
                            <Input placeholder="enter your title" />
                        </Form.Item>

                        {/*  Address */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter your description' }]}
                        >
                            <Input placeholder="enter your description" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
