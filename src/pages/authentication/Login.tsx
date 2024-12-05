import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hook';
import { setUser } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import Swal from 'sweetalert2';
import logo from '../../assets/image.png';
// Define the type for the form values
interface LoginFormValues {
    email: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [login] = useLoginMutation();

    // Update onFinish with the correct type for the values
    const onFinish = async (values: LoginFormValues) => {
        const userInfo = { email: values.email, password: values.password };

        try {
            // Unwrap the response here to catch errors
            const res = await login(userInfo).unwrap();

            // Verify token
            const user = verifyToken(res.data.accessToken);

            dispatch(setUser({ user: user, token: res.data.accessToken }));

            navigate('/');

            if (res.success === true) {
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
                icon: 'error',
                title: 'Oops...',
                text: `${error.data.message}`,
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
            <div className="flex bg-[#F7F7F7] items-center justify-center h-screen">
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="flex justify-center my-8">
                        <img src={logo} alt="forget-password" />
                    </div>
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl font-medium text-center mt-2">Login to Account</h1>
                        <p className="text-lg">Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
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
                            <Input placeholder="Enter your email address" type="email" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className="h-12 px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-primary text-md hover:text-primary">
                                Forget password
                            </Link>
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
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
