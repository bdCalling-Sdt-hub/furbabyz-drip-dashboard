import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';
import logo from '../../assets/image.png';
import { useAppDispatch } from '../../redux/hook';
import { logout } from '../../redux/features/auth/authSlice';
import Swal from 'sweetalert2';

const { Sider } = Layout;
const Sidebar = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Dispatch the logout action if confirmed
                dispatch(logout());

                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                });
            }
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#FFFFFF', // Global text color set to white
                    colorPrimary: '#0A8FDC',
                },
                components: {
                    Menu: {
                        itemBg: '#023F86', // Menu background color
                        itemColor: '#FFFFFF', // Menu item text color
                        itemHoverColor: '#FFFFFF', // Text color on hover
                        itemSelectedBg: '#0A8FDC', // Background color for selected item
                        itemSelectedColor: '#FFFFFF', // Selected item text color
                        itemBorderRadius: '30px 0px 0px 30px' as any,
                    },
                },
            }}
        >
            <Sider
                width={280}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
                style={{ backgroundColor: '#31A2FF' }} // Sidebar background color
            >
                <Link to="/">
                    <div
                        style={{
                            margin: '0 20px',
                            padding: '20px 0',
                        }}
                    >
                        <img src={logo} alt="" />
                    </div>
                </Link>

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={sidebarItemsGenerator(sidebarItems, handleLogout)}
                    style={{
                        backgroundColor: '#31A2FF', // Menu background color
                        color: '#FFFFFF', // Ensures white text color
                    }}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
