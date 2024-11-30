import { Button, Form, Input } from 'antd';
import logo from '../../assets/imageU.png';

function ChangeInfo() {
    const onFinish = (values: any) => {
        console.log(values, 'from u');
    };
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen ">
            {/* Left Column - Image */}
            {/* <div className="md:w-1/2 w-full flex items-center justify-center  p-10">
                <img src={logo} alt="Logo" className="max-w-full h-auto rounded-md shadow-md" />
            </div> */}

            {/* Right Column - Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-10 shadow-lg rounded-md">
                <div className="max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-primary mb-6 text-center">Change Password</h2>
                    <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item
                            label={
                                <label htmlFor="current_password" className="block text-primaryText mb-1 text-lg">
                                    Current Password
                                </label>
                            }
                            name="current_password"
                            rules={[{ required: true, message: 'Please input current password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter current password"
                                className="h-12 px-6 rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="new_password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="new_password"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter new password"
                                className="h-12 px-6 rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="confirm_password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirm_password"
                            rules={[
                                { required: true, message: 'Please input confirm password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('new_password') === value) {
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

export default ChangeInfo;
