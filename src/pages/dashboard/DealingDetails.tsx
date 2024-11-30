import { Table } from 'antd';

const DealingDetails = () => {
    const columns = [
        {
            title: 'Owner Name',
            dataIndex: 'ownerName',
            key: 'ownerName',
        },
        {
            title: 'Seeker Name',
            dataIndex: 'seekerName',
            key: 'seekerName',
        },
        {
            title: 'Post Title',
            dataIndex: 'postTitle',
            key: 'postTitle',
        },
        {
            title: 'Practice Type',
            dataIndex: 'practiceType',
            key: 'practiceType',
        },
        {
            title: 'Opening Date',
            dataIndex: 'openingDate',
            key: 'openingDate',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <span
                    className={`inline-block px-2 py-1 rounded-full ${
                        text === 'Confirmed' ? 'bg-primary text-white' : 'bg-orange-500 text-white'
                    }`}
                >
                    {text}
                </span>
            ),
        },
    ];

    // Sample data for dealing details
    const data = [
        {
            key: '1',
            ownerName: 'Dr. Alice Carter',
            seekerName: 'John Doe',
            postTitle: 'Office Space for Rent',
            practiceType: 'Dermatology',
            openingDate: '2024-01-15',
            price: '$1500/month',
            status: 'Confirmed',
        },
        {
            key: '2',
            ownerName: 'Dr. Brian Johnson',
            seekerName: 'Jane Smith',
            postTitle: 'Clinic Space Available',
            practiceType: 'Cardiology',
            openingDate: '2024-02-20',
            price: '$2000/month',
            status: 'Pending',
        },
        {
            key: '3',
            ownerName: 'Dr. Catherine White',
            seekerName: 'Alex Brown',
            postTitle: 'Medical Office for Lease',
            practiceType: 'Orthopedics',
            openingDate: '2024-03-05',
            price: '$1800/month',
            status: 'Confirmed',
        },
        {
            key: '4',
            ownerName: 'Dr. Daniel Green',
            seekerName: 'Emily White',
            postTitle: 'Co-working Medical Space',
            practiceType: 'Pediatrics',
            openingDate: '2024-04-10',
            price: '$1600/month',
            status: 'Confirmed',
        },
        {
            key: '5',
            ownerName: 'Dr. Ella Brown',
            seekerName: 'Michael Johnson',
            postTitle: 'Therapy Room for Rent',
            practiceType: 'Psychiatry',
            openingDate: '2024-05-22',
            price: '$1200/month',
            status: 'Pending',
        },
        {
            key: '6',
            ownerName: 'Dr. Frank Lewis',
            seekerName: 'Sara Lee',
            postTitle: 'Private Office Available',
            practiceType: 'General Practice',
            openingDate: '2024-06-30',
            price: '$1400/month',
            status: 'Confirmed',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default DealingDetails;
