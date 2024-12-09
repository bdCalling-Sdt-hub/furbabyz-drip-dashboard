import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router';

import logo from '../../assets/image.png';
import { IoArrowBack } from 'react-icons/io5';
import { useResetEmailMutation } from '../../redux/features/reset/resetApi';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [sendData] = useResetEmailMutation();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values: any) => {
        console.log('Received values of form: ', values);

        try {
            const res: any = sendData(values).unwrap();
            if (res) {
                navigate('/verify-otp');
                navigate(`/verify-otp?email=${values.email}`);
            }

            if (res) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Forgot Password Successfully`,
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
            <div>
                {/* information */}
                <div>
                    <div className="flex bg-[#F7F7F7] items-center justify-center h-screen">
                        <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                            <div className="flex justify-center my-8">
                                <img src={logo} alt="forget-password" />
                            </div>
                            <div className="flex gap-2 text-start">
                                <IoArrowBack className="text-2xl cursor-pointer mt-3" />
                                <h1 className="text-2xl  font-medium text-start mt-2">Forget Password</h1>
                            </div>
                            <p className="my-6">Please enter your email address to reset your password </p>

                            <Form
                                name="normal_ForgetPassword"
                                className="ForgetPassword-form"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label={
                                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                            Email
                                        </label>
                                    }
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input placeholder="Enter your email address" type="email" className="h-12" />
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
                                        Send OPT
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
