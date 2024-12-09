import { Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { Link, useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../../redux/features/users/userApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const UserDetailsPage = () => {
    const { id } = useParams();
    const { isError, isLoading, data }: any = useGetSingleUserQuery(id as string);

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

    return (
        <div>
            {/* Back Link Section */}
            <div className="mb-6">
                <Link to="/space-seeker">
                    <div className="flex items-center gap-2 text-gray-800">
                        <IoArrowBackCircleOutline size={24} />
                        <h1 className="font-semibold text-lg mt-[2px]">Back</h1>
                    </div>
                </Link>
            </div>

            {/* Profile Card Section */}
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden border-4 border-blue-500">
                        {data?.data?.image ? (
                            renderImage(data?.data?.image)
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-white font-semibold text-2xl">
                                <span>{data?.data?.name?.[0]}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Items */}
                <Form name="update_profile" layout="vertical" initialValues={{ remember: true }}>
                    {/* Full Name */}
                    <Form.Item label="Full Name" name="name" initialValue={data?.data?.name} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item label="Email" name="email" initialValue={data?.data?.email} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>

                    {/* Phone Number */}
                    <Form.Item label="Phone Number" name="phone" initialValue={data?.data?.phone} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>

                    {/* Address */}
                    <Form.Item label="Address" name="address" initialValue={data?.data?.address} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>

                    {/* Country */}
                    <Form.Item label="Country" name="country" initialValue={data?.data?.country} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>

                    {/* Post Code */}
                    <Form.Item label="Post Code" name="postCode" initialValue={data?.data?.postCode} className="mb-4">
                        <Input readOnly className="border-gray-300 rounded-lg py-2 px-4 bg-gray-50" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UserDetailsPage;
