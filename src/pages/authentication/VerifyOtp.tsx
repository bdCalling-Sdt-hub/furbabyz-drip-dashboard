import { Button, ConfigProvider, Form, FormProps } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image.png';
import { useVerifyOtpMutation } from '../../redux/features/reset/resetApi';
import Swal from 'sweetalert2';
import { useState } from 'react';
import OTPInput from 'react-otp-input';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<any>('');
    const [verifyOtp] = useVerifyOtpMutation();
    const email = new URLSearchParams(location.search).get('email');

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async () => {
        const otpData = {
            email,
            oneTimeCode: parseInt(otp),
        };

        try {
            // const res: any = verifyOtp({ ...values, email }).unwrap();
            const response = await verifyOtp(otpData).unwrap();

            if (response) {
                localStorage.setItem('Authorization', response.data);
                navigate(`/new-password?email=${email}`);
            }

            if (response) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Verify Otp Successfully`,
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
                                <div className="flex items-center justify-center mb-6">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        inputStyle={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: '8px',
                                            margin: '16px',
                                            fontSize: '20px',
                                            border: '1px solid #007BA5',
                                            color: '#2B2A2A',
                                            outline: 'none',
                                            marginBottom: 10,
                                        }}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>

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
                                    <Link to="/forget-password" className="text-primaryText">
                                        Resend
                                    </Link>
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
