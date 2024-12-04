import { Button, Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import { useGetGetSingleBlogQuery } from '../../redux/features/blog/blogApi';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaBackward } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const BlogDetails = () => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const { id } = useParams();
    const { isError, isLoading, data }: any = useGetGetSingleBlogQuery(id as string);

    // Render function for the image
    const renderImage = (image: string) => {
        const isExternalImage = image.startsWith('http') || image.startsWith('https');
        return isExternalImage ? (
            <img src={image} alt="User Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
            <img
                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                alt="User Profile"
                className="w-full h-full object-cover rounded-full"
            />
        );
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <Error />
            </div>
        );
    }

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
                <Link to="/blog">
                    <IoArrowBack size={30} />
                </Link>
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <Form name="update_profile" layout="vertical" initialValues={{ remember: true }}>
                    {/* Banner Image */}
                    <div className="flex justify-center mb-6">
                        <div className="w-[150px] h-[150px] relative">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="User Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                renderImage(data?.data?.image)
                            )}
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
                    <Form.Item label="Title" name="title" initialValue={data?.data?.title}>
                        <Input />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item label="Description" name="des" initialValue={data?.data?.des}>
                        <Input.TextArea rows={8} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default BlogDetails;
