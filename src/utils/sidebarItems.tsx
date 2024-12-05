import { TSidebarItem } from './generateSidebarItems';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbCategoryPlus, TbLogout } from 'react-icons/tb';
import { LuUser } from 'react-icons/lu';
import { MdOutlinePersonalInjury, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { RxDashboard } from 'react-icons/rx';
import { FaBloggerB, FaQuestion, FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoIosColorPalette } from 'react-icons/io';
import { GiResize } from 'react-icons/gi';

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
        key: '455',
        label: 'Colors',
        path: 'colors',
        icon: <IoIosColorPalette size={24} />,
    },
    {
        key: '45',
        label: 'Size',
        path: 'size',
        icon: <GiResize size={24} />,
    },
    {
        key: '29',
        label: 'Products',
        path: 'products',
        icon: <MdOutlineProductionQuantityLimits size={24} />,
    },
    {
        key: '32',
        label: 'Blog',
        path: 'blog',
        icon: <FaBloggerB size={24} />,
    },
    {
        key: '102',
        label: 'Category',
        path: 'add-category',
        icon: <TbCategoryPlus size={24} />,
    },
    {
        key: '39',
        label: 'Faq',
        path: 'faq',
        icon: <FaQuestion size={24} />,
    },

    {
        key: '3',
        label: 'Settings',
        icon: <GoGear size={24} />,
        children: [
            // {
            //     key: '33',
            //     label: 'Personal Information',
            //     path: 'personal',
            //     icon: <MdOutlinePersonalInjury size={24} />,
            // },

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
            // {
            //     key: '45',
            //     label: 'Change Password',
            //     path: 'chnage-password',
            //     icon: <RiLockPasswordFill size={24} />,
            // },
            // {
            //     key: '49',
            //     label: 'Forget Password',
            //     path: 'forget-password',
            //     icon: <RiLockPasswordFill size={24} />,
            // },
        ],
    },
    // {
    //     key: '6',
    //     label: 'Log Out',
    //     path: 'login',
    //     icon: <TbLogout size={24} />,
    // },

    {
        key: '6',
        label: 'Log Out',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
