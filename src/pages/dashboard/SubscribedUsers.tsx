import { Table } from 'antd';

const SubscribedUsers = () => {
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Subscription Plan',
            dataIndex: 'subscriptionPlan',
            key: 'subscriptionPlan',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
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

    // Sample data for subscribed users with Basic and Pro plans
    const data = [
        {
            key: '1',
            userId: 'U001',
            name: 'Alice Carter',
            email: 'alice.carter@example.com',
            subscriptionPlan: 'Pro',
            startDate: '2024-01-15',
            endDate: '2025-01-15',
            status: 'Active',
        },
        {
            key: '2',
            userId: 'U002',
            name: 'Brian Johnson',
            email: 'brian.johnson@example.com',
            subscriptionPlan: 'Basic',
            startDate: '2024-02-20',
            endDate: '2025-02-20',
            status: 'Active',
        },
        {
            key: '3',
            userId: 'U003',
            name: 'Catherine White',
            email: 'catherine.white@example.com',
            subscriptionPlan: 'Pro',
            startDate: '2024-03-05',
            endDate: '2025-03-05',
            status: 'Inactive',
        },
        {
            key: '4',
            userId: 'U004',
            name: 'Daniel Green',
            email: 'daniel.green@example.com',
            subscriptionPlan: 'Basic',
            startDate: '2024-04-10',
            endDate: '2025-04-10',
            status: 'Active',
        },
        {
            key: '5',
            userId: 'U005',
            name: 'Ella Brown',
            email: 'ella.brown@example.com',
            subscriptionPlan: 'Pro',
            startDate: '2024-05-22',
            endDate: '2025-05-22',
            status: 'Inactive',
        },
        {
            key: '6',
            userId: 'U006',
            name: 'Frank Lewis',
            email: 'frank.lewis@example.com',
            subscriptionPlan: 'Basic',
            startDate: '2024-06-30',
            endDate: '2025-06-30',
            status: 'Active',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default SubscribedUsers;
