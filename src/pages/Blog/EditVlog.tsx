import { Button, Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import { useEditBlogMutation, useGetGetSingleBlogQuery } from '../../redux/features/blog/blogApi';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoArrowBack } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface FormValues {
    image: File | null;
    des: string;
    title: string;
}

const BlogDetails = () => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | undefined>();
    const [file, setFile] = useState<File | null>(null);
    const { id } = useParams();
    const { isError, isLoading, data }: any = useGetGetSingleBlogQuery(id as string);

    const [editBlog, { isLoading: isUpdating }] = useEditBlogMutation();

    const router = useNavigate();

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
        return <Loading />;
    }

    if (isError) {
        return <Error />;
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

    const onFinish = async (values: any) => {
        setLoading(true);
        console.log(values, 'values'); // For debugging

        try {
            // Create a new FormData instance
            const formData = new FormData();

            // Append the form values (title and description)
            formData.append('data', JSON.stringify(values));

            // Append the image file if one is selected
            if (file) {
                formData.append('image', file);
            }

            // Call the updateBlog mutation and pass the formData
            // const res = await editBlog({ id, formData }).unwrap();
            const res = await editBlog({ id, formData }).unwrap();

            router('/blog');

            console.log(res, 'res');

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

    return (
        <div>
            <div>
                <Link to="/blog">
                    <IoArrowBack size={30} />
                </Link>
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <Form name="update_profile" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
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

                    {/* Title */}
                    <Form.Item label="Title" name="title" initialValue={data?.data?.title}>
                        <Input />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item label="Description" name="des" initialValue={data?.data?.des}>
                        <Input.TextArea rows={8} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading || isUpdating} className="w-full">
                            {loading || isUpdating ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default BlogDetails;
