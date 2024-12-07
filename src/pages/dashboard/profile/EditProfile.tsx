import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/features/auth/authApi';
import Loading from '../../../components/shared/Loading';
import logo from '../../../../public/user1.png';
import Swal from 'sweetalert2';

const EditProfile: React.FC = () => {
    const [form] = Form.useForm(); // Bind the form instance
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const { data, isLoading } = useGetProfileQuery(undefined);

    const [updateProfile] = useUpdateProfileMutation();

    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue({
                name: data.data.name,
                address: data.data.address, // Assuming `address` exists in `data`
                phone: data.data.phone, // Assuming `phone` exists in `data`
                email: data.data.email, // Assuming `phone` exists in `data`
                postCode: data.data.postCode, // Assuming `phone` exists in `data`
                country: data.data.country, // Assuming `phone` exists in `data`
            });

            // Check if the image exists, and set it in the state
            const imageUrl = data?.data?.image ? `${import.meta.env.VITE_BASE_URL}${data.data.image}` : logo; // Default to '/user.svg' if image doesn't exist
            setImagePreview(imageUrl);
        }
    }, [data, form]);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            // Create a new FormData instance
            const formData = new FormData();

            // Append the form values (title and description)
            formData.append('data', JSON.stringify(values));

            if (file) {
                formData.append('image', file);
            }

            const res = await updateProfile(formData).unwrap();

            if (res?.success) {
                // Handle success and return the updated data
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `${res.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Failed to update blog',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log('Error updating blog:', error);
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'An error occurred',
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoading(false);
        }
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <Form form={form} name="update_profile" layout="vertical" onFinish={onFinish}>
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

                {/* Address */}
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address' }]}
                >
                    <Input placeholder="Enter your address" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item label="Phone Number" name="phone">
                    <PhoneInput
                        country="us"
                        inputClass="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400"
                        containerClass="!w-full"
                    />
                </Form.Item>

                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please enter your country' }]}
                >
                    <Input placeholder="Enter your country" />
                </Form.Item>

                <Form.Item
                    label="Post Code"
                    name="postCode"
                    rules={[{ required: true, message: 'Please enter your post code' }]}
                >
                    <Input placeholder="Enter your post code" />
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
