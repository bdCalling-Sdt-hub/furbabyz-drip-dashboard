import { Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../../redux/features/users/userApi';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';

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
    console.log(data);
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <Form name="update_profile" layout="vertical" initialValues={{ remember: true }}>
                {/* Banner Image */}
                <div className="flex justify-center mb-6">
                    <div className="w-[150px] h-[150px] relative">
                        {data?.data?.image && renderImage(data?.data?.image)}

                        <input id="imageUploadBanner" type="file" style={{ display: 'none' }} accept="image/*" />
                    </div>
                </div>

                {/* Full Name */}
                <Form.Item label="Full Name" name="name" initialValue={data?.data?.name}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Email" name="email" initialValue={data?.data?.email}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone" initialValue={data?.data?.phone}>
                    <Input readOnly />
                </Form.Item>

                {/* Address */}
                <Form.Item label="Address" name="address" initialValue={data?.data?.address}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Country" name="country" initialValue={data?.data?.country}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Post Code" name="postCode" initialValue={data?.data?.postCode}>
                    <Input readOnly />
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserDetailsPage;
