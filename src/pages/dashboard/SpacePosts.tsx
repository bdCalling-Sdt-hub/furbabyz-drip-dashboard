import { Table } from 'antd';

const SpacePost = () => {
    const columns = [
        {
            title: 'Post ID',
            dataIndex: 'postId',
            key: 'postId',
        },
        {
            title: 'Provider Name',
            dataIndex: 'providerName',
            key: 'providerName',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: string) => <span className="font-bold">${text}</span>,
        },
        {
            title: 'Practice Type',
            dataIndex: 'practiceType',
            key: 'practiceType',
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <span
                    className={`inline-block px-2 py-1 rounded-full ${
                        text === 'Active' ? 'bg-primary text-white' : 'bg-red-500 text-white'
                    }`}
                >
                    {text}
                </span>
            ),
        },
    ];

    // Sample data for posts
    const data = [
        {
            key: '1',
            postId: 'SP001',
            providerName: 'Dr. Alice Carter',
            title: 'Available Office Space for Dermatology Practice',
            description:
                'A modern office space available for lease in downtown Springfield, equipped with all necessary facilities.',
            location: '123 Business St, Springfield, USA',
            price: '1500',
            practiceType: 'Dermatology',
            dateCreated: '2024-10-01',
            status: 'Active',
        },
        {
            key: '2',
            postId: 'SP002',
            providerName: 'Dr. Brian Johnson',
            title: 'Clinic Space for Rent',
            description: 'Looking for a reliable tenant for my clinic space, ideal for cardiology practices.',
            location: '456 Health Ave, Metropolis, USA',
            price: '2000',
            practiceType: 'Cardiology',
            dateCreated: '2024-10-05',
            status: 'Active',
        },
        {
            key: '3',
            postId: 'SP003',
            providerName: 'Dr. Catherine White',
            title: 'Medical Office Available',
            description: 'Fully furnished medical office available for short-term rental.',
            location: '789 Wellness St, Gotham, USA',
            price: '2500',
            practiceType: 'Orthopedics',
            dateCreated: '2024-10-10',
            status: 'Occupied',
        },
        {
            key: '4',
            postId: 'SP004',
            providerName: 'Dr. Daniel Green',
            title: 'Co-working Medical Space for Pediatricians',
            description: 'Co-working space available in a child-friendly environment.',
            location: '101 Kids Care Blvd, Smallville, USA',
            price: '1200',
            practiceType: 'Pediatrics',
            dateCreated: '2024-10-15',
            status: 'Active',
        },
        {
            key: '5',
            postId: 'SP005',
            providerName: 'Dr. Ella Brown',
            title: 'Therapy Room for Rent',
            description: 'Serene therapy room available for mental health professionals.',
            location: '202 Mental Health Ln, Star City, USA',
            price: '1800',
            practiceType: 'Psychiatry',
            dateCreated: '2024-10-20',
            status: 'Occupied',
        },
        {
            key: '6',
            postId: 'SP006',
            providerName: 'Dr. Frank Lewis',
            title: 'Private Office Space Available',
            description: 'Private office for rent in a family health park.',
            location: '303 Family Health Park, Central City, USA',
            price: '1600',
            practiceType: 'General Practice',
            dateCreated: '2024-10-22',
            status: 'Active',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default SpacePost;
