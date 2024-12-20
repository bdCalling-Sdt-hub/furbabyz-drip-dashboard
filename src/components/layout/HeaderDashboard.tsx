import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/features/auth/authApi';
import logo from '../../../public/user1.png';

import Loading from '../shared/Loading';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useGetANotificationQuery } from '../../redux/features/notification/notificationApi';

const { Header } = Layout;

const HeaderDashboard = () => {
    const { data, isLoading } = useGetProfileQuery(undefined);
    const { data: notification } = useGetANotificationQuery(undefined);

    const [, setNotifications] = useState<any[]>([]);
    const [notificationCount, setNotificationCount] = useState<number>(0);

    // Fetch notification count and store in state and localStorage
    useEffect(() => {
        if (notification?.data?.meta?.unread !== undefined) {
            const unreadCount = notification.data.meta.unread;
            setNotificationCount(unreadCount);

            // Persist to localStorage
            // localStorage.setItem('notificationCount', unreadCount.toString());
        }
    }, [notification]);

    // Check if the count is in localStorage on initial render
    useEffect(() => {
        const savedCount = localStorage.getItem('notificationCount');
        if (savedCount) {
            setNotificationCount(parseInt(savedCount, 10));
        }
    }, []);

    useEffect(() => {
        if (!data) return;

        // Create a socket connection
        const socket = io(import.meta.env.VITE_BASE_URL, {
            transports: ['websocket'],
        });

        // Listen for 'get-notification::ADMIN' event
        socket.on('get-notification::ADMIN', (newNotification) => {
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
            setNotificationCount((prevCount) => prevCount + 1); // Increment notification count
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [data]);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (!data) return null;

    return (
        <Header
            style={{
                height: 80,
                background: 'white',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            <div className="flex justify-between w-full mt-2 ">
                <div className="flex flex-col flex-grow gap-2">
                    <h1 className="mt-5 text-lg font-">
                        Welcome <span className="text-[#31A2FF] font-semibold">{data?.data?.name}</span>
                    </h1>
                </div>
                <div className="flex items-center justify-end h-full gap-5">
                    <div>
                        {/* Notification Icon */}
                        <Link to={'/notification'}>
                            <div className="size-10 bg-[#fff] rounded-full flex items-center justify-center ">
                                <button className="relative px-1 py-4 text-gray-800 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500">
                                    <span className="absolute inset-0 -mr-6 -top-4">
                                        <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-primary text-white">
                                            {notificationCount}
                                        </div>
                                    </span>
                                    <svg
                                        width={14}
                                        height={16}
                                        viewBox="0 0 14 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.66634 2.78667C7.48234 2.78667 7.33301 2.63733 7.33301 2.45333V1.33333C7.33301 0.966 7.03367 0.666667 6.66634 0.666667C6.29901 0.666667 5.99967 0.966 5.99967 1.33333V2.45333C5.99967 2.63733 5.85034 2.78667 5.66634 2.78667C5.48234 2.78667 5.33301 2.638 5.33301 2.45333V1.33333C5.33301 0.598 5.93101 0 6.66634 0C7.40167 0 7.99967 0.598 7.99967 1.33333V2.45333C7.99967 2.638 7.85034 2.78667 7.66634 2.78667Z"
                                            fill="#333333"
                                        />
                                        <path
                                            d="M6.66634 16.0007C5.37967 16.0007 4.33301 14.954 4.33301 13.6673C4.33301 13.4833 4.48234 13.334 4.66634 13.334C4.85034 13.334 4.99967 13.4833 4.99967 13.6673C4.99967 14.586 5.74767 15.334 6.66634 15.334C7.58501 15.334 8.33301 14.586 8.33301 13.6673C8.33301 13.4833 8.48234 13.334 8.66634 13.334C8.85034 13.334 8.99967 13.4833 8.99967 13.6673C8.99967 14.954 7.95301 16.0007 6.66634 16.0007Z"
                                            fill="#333333"
                                        />
                                        <path
                                            d="M12.3333 14H1C0.448667 14 0 13.5513 0 13C0 12.7073 0.127333 12.4307 0.35 12.24C1.40067 11.352 2 10.06 2 8.692V6.66667C2 4.09333 4.09333 2 6.66667 2C9.24 2 11.3333 4.09333 11.3333 6.66667V8.692C11.3333 10.0607 11.9327 11.352 12.978 12.2353C13.206 12.4307 13.3333 12.7073 13.3333 13C13.3333 13.5513 12.8853 14 12.3333 14ZM6.66667 2.66667C4.46067 2.66667 2.66667 4.46067 2.66667 6.66667V8.692C2.66667 10.2573 1.98133 11.734 0.786 12.7447C0.709333 12.81 0.666667 12.9027 0.666667 13C0.666667 13.184 0.816 13.3333 1 13.3333H12.3333C12.5173 13.3333 12.6667 13.184 12.6667 13C12.6667 12.9027 12.624 12.81 12.55 12.7467C11.3527 11.734 10.6667 10.2567 10.6667 8.692V6.66667C10.6667 4.46067 8.87267 2.66667 6.66667 2.66667Z"
                                            fill="#333333"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </Link>
                    </div>
                    <div>
                        {/* Profile */}
                        <Link
                            to={'/profile'}
                            style={{
                                height: '42px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                margin: '10px',
                            }}
                        >
                            <img
                                src={data?.data?.image ? `${import.meta.env.VITE_BASE_URL}${data.data.image}` : logo}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    borderColor: '#DBB162',
                                    borderWidth: 2,
                                }}
                                alt=""
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <h2
                                    style={{
                                        color: 'black',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '-40px', // Negative margin to reduce spacing
                                    }}
                                >
                                    {data?.data?.name}
                                </h2>
                                <h2
                                    style={{
                                        color: 'black',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {data?.data?.role}
                                </h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default HeaderDashboard;

// import { Layout } from 'antd';
// import { Link } from 'react-router-dom';
// import { useGetProfileQuery } from '../../redux/features/auth/authApi';
// import logo from '../../../public/user1.png';
// import Loading from '../shared/Loading';
// import { useGetANotificationQuery } from '../../redux/features/notification/notificationApi';
// import { useEffect } from 'react';

// const { Header } = Layout;

// const HeaderDashboard = () => {
//     const { data, isLoading } = useGetProfileQuery(undefined);
//     const { data: notification, isLoading: isNotificationLoading, refetch } = useGetANotificationQuery(undefined);

//     // useEffect(() => {
//     //     const intervalId = setInterval(() => {
//     //         refetch(); // Trigger manual refetch
//     //     }, 1000);

//     //     return () => clearInterval(intervalId); // Cleanup on unmount
//     // }, [refetch]);

//     // Show loading if profile data is loading
//     if (isLoading) {
//         return (
//             <div>
//                 <Loading />
//             </div>
//         );
//     }

//     // Return null if profile data is not available
//     if (!data) return null;

//     // Show loading if notification data is loading
//     if (isNotificationLoading) {
//         return <Loading />;
//     }

//     console.log(notification?.data?.meta?.unread, 'sdfjsdklfhsdklfhskdfhjsdhfkdsyh');

//     return (
//         <Header
//             style={{
//                 height: 80,
//                 background: 'white',
//                 width: '100%',
//                 overflow: 'hidden',
//             }}
//         >
//             <div className="flex justify-between w-full mt-2 ">
//                 <div className="flex flex-col flex-grow gap-2">
//                     <h1 className="mt-5 text-xl font-semibold">Welcome {data?.data?.name}</h1>
//                 </div>
//                 <div className="flex items-center justify-end h-full gap-5">
//                     <div>
//                         {/* Notification icons */}
//                         <Link to={'/notification'}>
//                             <div className="size-10 bg-[#fff] rounded-full flex items-center justify-center ">
//                                 <button className="relative px-1 py-4 text-gray-800 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500">
//                                     <span className="absolute inset-0 -mr-6 -top-4">
//                                         <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-primary text-white">
//                                             {notification?.data?.meta?.unread || 0}
//                                         </div>
//                                     </span>
//                                     <svg
//                                         width={14}
//                                         height={16}
//                                         viewBox="0 0 14 16"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             d="M7.66634 2.78667C7.48234 2.78667 7.33301 2.63733 7.33301 2.45333V1.33333C7.33301 0.966 7.03367 0.666667 6.66634 0.666667C6.29901 0.666667 5.99967 0.966 5.99967 1.33333V2.45333C5.99967 2.63733 5.85034 2.78667 5.66634 2.78667C5.48234 2.78667 5.33301 2.638 5.33301 2.45333V1.33333C5.33301 0.598 5.93101 0 6.66634 0C7.40167 0 7.99967 0.598 7.99967 1.33333V2.45333C7.99967 2.638 7.85034 2.78667 7.66634 2.78667Z"
//                                             fill="#333333"
//                                         />
//                                         <path
//                                             d="M6.66634 16.0007C5.37967 16.0007 4.33301 14.954 4.33301 13.6673C4.33301 13.4833 4.48234 13.334 4.66634 13.334C4.85034 13.334 4.99967 13.4833 4.99967 13.6673C4.99967 14.586 5.74767 15.334 6.66634 15.334C7.58501 15.334 8.33301 14.586 8.33301 13.6673C8.33301 13.4833 8.48234 13.334 8.66634 13.334C8.85034 13.334 8.99967 13.4833 8.99967 13.6673C8.99967 14.954 7.95301 16.0007 6.66634 16.0007Z"
//                                             fill="#333333"
//                                         />
//                                         <path
//                                             d="M12.3333 14H1C0.448667 14 0 13.5513 0 13C0 12.7073 0.127333 12.4307 0.35 12.24C1.40067 11.352 2 10.06 2 8.692V6.66667C2 4.09333 4.09333 2 6.66667 2C9.24 2 11.3333 4.09333 11.3333 6.66667V8.692C11.3333 10.0607 11.9327 11.352 12.978 12.2353C13.206 12.4307 13.3333 12.7073 13.3333 13C13.3333 13.5513 12.8853 14 12.3333 14ZM6.66667 2.66667C4.46067 2.66667 2.66667 4.46067 2.66667 6.66667V8.692C2.66667 10.2573 1.98133 11.734 0.786 12.7447C0.709333 12.81 0.666667 12.9027 0.666667 13C0.666667 13.184 0.816 13.3333 1 13.3333H12.3333C12.5173 13.3333 12.6667 13.184 12.6667 13C12.6667 12.9027 12.624 12.81 12.55 12.7467C11.3527 11.734 10.6667 10.2567 10.6667 8.692V6.66667C10.6667 4.46067 8.87267 2.66667 6.66667 2.66667Z"
//                                             fill="#333333"
//                                         />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </Link>
//                     </div>
//                     <div>
//                         {/* Profile */}
//                         <Link
//                             to={'/profile'}
//                             style={{
//                                 height: '42px',
//                                 cursor: 'pointer',
//                                 borderRadius: '5px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '10px',
//                                 margin: '10px',
//                             }}
//                         >
//                             <img
//                                 src={data?.data?.image ? `${import.meta.env.VITE_BASE_URL}${data.data.image}` : logo}
//                                 style={{
//                                     width: '44px',
//                                     height: '44px',
//                                     borderRadius: '50%',
//                                     borderColor: '#DBB162',
//                                     borderWidth: 2,
//                                 }}
//                                 alt=""
//                             />
//                             <div
//                                 style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'flex-start',
//                                 }}
//                             >
//                                 <h2
//                                     style={{
//                                         color: 'black',
//                                         fontSize: '16px',
//                                         fontWeight: '600',
//                                         marginBottom: '-40px',
//                                     }}
//                                 >
//                                     {data?.data?.name}
//                                 </h2>
//                                 <h2
//                                     style={{
//                                         color: 'black',
//                                         fontSize: '12px',
//                                         fontWeight: '600',
//                                     }}
//                                 >
//                                     {data?.data?.role}
//                                 </h2>
//                             </div>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </Header>
//     );
// };

// export default HeaderDashboard;
