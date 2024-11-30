import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image.png';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/new-password');
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
                                <h1 className="text-2xl  font-medium text-start mt-2">Verify Email</h1>
                            </div>
                            <p className="my-6">Please enter the OTP we have sent you in your email.</p>
                            <Form
                                name="normal_VerifyOtp"
                                className="my-5"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    className="flex items-center justify-center mx-auto"
                                    name="otp"
                                    rules={[{ required: true, message: 'Please input otp code here!' }]}
                                >
                                    <Input.OTP
                                        style={{
                                            width: 500,
                                            height: 45, // Add height here
                                        }}
                                        variant="filled"
                                        length={5}
                                    />
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
                                        // onClick={() => navigate('/')}
                                    >
                                        Verify OTP Code
                                    </Button>
                                </Form.Item>
                                <div className="text-center text-lg flex items-center justify-between gap-2">
                                    <p className="text-primaryText">Didn’t receive the code?</p>
                                    <p className="text-primary">Resend code</p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
