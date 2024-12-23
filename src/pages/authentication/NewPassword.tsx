import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../redux/features/reset/resetApi';
import Swal from 'sweetalert2';

const NewPassword = () => {
    const navigate = useNavigate();

    const [NewPassword] = useResetPasswordMutation();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        // navigate('/');

        try {
            const res: any = NewPassword(values).unwrap();

            if (res) {
                navigate('/');
            }

            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: `Password Updated Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: `${error.data.message}`,
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0A8FDC',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 40,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex bg-[#f3f3f3] items-center justify-center h-screen">
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText max-w-md mx-auto space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Set a new password</h1>
                        <p>Create a new password. Ensure it differs from previous ones for security</p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item>
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
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
