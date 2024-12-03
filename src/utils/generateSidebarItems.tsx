// import { ReactNode } from 'react';
// import { NavLink } from 'react-router-dom';

// // Sidebar Item Type
// export type TSidebarItem = {
//     key: string;
//     label: ReactNode;
//     path?: string;
//     icon?: ReactNode;
//     children?: TSidebarItem[];
//     onClick?: () => void;
//     component?: ReactNode;
// };

// // Sidebar Generator for Ant Design Menu
// export const sidebarItemsGenerator = (items: TSidebarItem[]) => {
//     const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
//         // If the item has children, create a parent item with nested children
//         if (item.children && item.children.length > 0) {
//             acc.push({
//                 key: item.key,
//                 icon: item.icon,
//                 label: <>{item.label}</>,
//                 children: item.children.map((child) => ({
//                     key: child.key,
//                     icon: child.icon,
//                     label: (
//                         <>
//                             <NavLink to={`/${child.path}`}>{child.label}</NavLink>
//                         </>
//                     ),
//                 })),
//             });
//         } else if (item.label) {
//             acc.push({
//                 key: item.key,
//                 icon: item.icon,
//                 label: (
//                     <>
//                         <NavLink to={`/${item.path}`}>{item.label}</NavLink>
//                     </>
//                 ),
//             });
//         }

//         return acc;
//     }, []);

//     return sidebarItems;
// };

import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

// Sidebar Item Type
export type TSidebarItem = {
    key: string;
    label: ReactNode;
    path?: string;
    icon?: ReactNode;
    children?: TSidebarItem[];
};

// Sidebar Generator for Ant Design Menu
export const sidebarItemsGenerator = (items: TSidebarItem[], handleLogout?: () => void) => {
    const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
        if (item.key === '6') {
            // Special case for "Log Out"
            acc.push({
                key: item.key,
                icon: item.icon,
                label: (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '', // Match sidebar padding
                            display: 'flex',
                            alignItems: 'center',
                            color: 'inherit',
                            fontSize: 'inherit',
                        }}
                    >
                        {item.label}
                    </button>
                ),
            });
        } else if (item.children && item.children.length > 0) {
            acc.push({
                key: item.key,
                icon: item.icon,
                label: <>{item.label}</>,
                children: item.children.map((child) => ({
                    key: child.key,
                    icon: child.icon,
                    label: <NavLink to={`/${child.path}`}>{child.label}</NavLink>,
                })),
            });
        } else if (item.label) {
            acc.push({
                key: item.key,
                icon: item.icon,
                label: <NavLink to={`/${item.path}`}>{item.label}</NavLink>,
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
