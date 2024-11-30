import { TSidebarItem } from './generateSidebarItems';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';
import { LuUser } from 'react-icons/lu';
import { MdOutlinePersonalInjury } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoGear } from 'react-icons/go';
import { RxDashboard } from 'react-icons/rx';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
const sidebarItems: TSidebarItem[] = [
    {
        key: '1',
        label: 'Dashboard',
        path: '',
        icon: <RxDashboard size={24} />,
    },
    {
        key: '2e',
        label: 'Transactions',
        path: 'transactions',
        icon: <FaRegMoneyBillAlt size={24} />,
    },
    {
        key: '22',
        label: 'Users',
        path: 'space-seeker',
        icon: <LuUser size={24} />,
    },

    {
        key: '3',
        label: 'Settings',
        icon: <GoGear size={24} />,
        children: [
            {
                key: '33',
                label: 'Personal Information',
                path: 'personal',
                icon: <MdOutlinePersonalInjury size={24} />,
            },

            {
                key: '42',
                label: 'Terms & Conditions',
                path: 'terms',
                icon: <IoDocumentTextOutline size={24} />,
            },
            {
                key: '48',
                label: 'Return Policy',
                path: 'retrun-policy',
                icon: <IoDocumentTextOutline size={24} />,
            },
            {
                key: '45',
                label: 'Change Password',
                path: 'chnage-password',
                icon: <RiLockPasswordFill size={24} />,
            },
        ],
    },
    {
        key: '6',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
