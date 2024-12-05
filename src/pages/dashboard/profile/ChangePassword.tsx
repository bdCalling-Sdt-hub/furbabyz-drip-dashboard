import { Button, Form, Input } from 'antd';
import { useChangePassMutation } from '../../../redux/features/auth/authApi';
import Swal from 'sweetalert2';
import Loading from '../../../components/shared/Loading';

function ChangePassword() {
    const [chaagePass, { isLoading }] = useChangePassMutation();

    const onFinish = async (values: any) => {
        console.log(values, 'from u');

        try {
            const res = await chaagePass(values).unwrap();

            if (res?.success) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `${res.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error: any) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to Change Password',
                text: error.message || 'Something went wrong!',
                showConfirmButton: true,
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen ">
            {/* Left Column - Image */}

            {/* Right Column - Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-10 shadow-lg rounded-md">
                <div className="max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-primary mb-6 text-center">Change Password</h2>
                    <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item
                            label={
                                <label htmlFor="currentPassword" className="block text-primaryText mb-1 text-lg">
                                    Current Password
                                </label>
                            }
                            name="currentPassword"
                            rules={[{ required: true, message: 'Please input current password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter current password"
                                className="h-12 px-6 rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="newPassword" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter new password"
                                className="h-12 px-6 rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="confirmPassword" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Please input confirm password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Confirm new password"
                                className="h-12 px-6 rounded-md border-gray-300"
                            />
                        </Form.Item>

                        <Form.Item className="flex justify-center">
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
