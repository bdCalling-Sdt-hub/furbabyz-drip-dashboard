import { Table } from 'antd';

const SpaceProvider = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
            title: 'Occupation',
            dataIndex: 'occupation',
            key: 'occupation',
        },
        {
            title: 'Property Type',
            dataIndex: 'propertyType',
            key: 'propertyType',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
    ];

    // Sample data
    const data = [
        {
            key: '1',
            id: 'P001',
            name: 'Dr. Alice Carter',
            email: 'alice.carter@example.com',
            occupation: 'Dermatologist',
            propertyType: 'Office Space',
            location: '123 Business St, Springfield, USA',
        },
        {
            key: '2',
            id: 'P002',
            name: 'Dr. Brian Johnson',
            email: 'brian.johnson@example.com',
            occupation: 'Cardiologist',
            propertyType: 'Clinic',
            location: '456 Health Ave, Metropolis, USA',
        },
        {
            key: '3',
            id: 'P003',
            name: 'Dr. Catherine White',
            email: 'catherine.white@example.com',
            occupation: 'Orthopedic Surgeon',
            propertyType: 'Medical Office',
            location: '789 Wellness St, Gotham, USA',
        },
        {
            key: '4',
            id: 'P004',
            name: 'Dr. Daniel Green',
            email: 'daniel.green@example.com',
            occupation: 'Pediatrician',
            propertyType: 'Co-working Medical Space',
            location: '101 Kids Care Blvd, Smallville, USA',
        },
        {
            key: '5',
            id: 'P005',
            name: 'Dr. Ella Brown',
            email: 'ella.brown@example.com',
            occupation: 'Psychiatrist',
            propertyType: 'Therapy Room',
            location: '202 Mental Health Ln, Star City, USA',
        },
        {
            key: '6',
            id: 'P006',
            name: 'Dr. Frank Lewis',
            email: 'frank.lewis@example.com',
            occupation: 'General Practitioner',
            propertyType: 'Private Office',
            location: '303 Family Health Park, Central City, USA',
        },
        {
            key: '7',
            id: 'P007',
            name: 'Dr. Grace Wilson',
            email: 'grace.wilson@example.com',
            occupation: 'Radiologist',
            propertyType: 'Studio',
            location: '404 Imaging Center, Coast City, USA',
        },
        {
            key: '8',
            id: 'P008',
            name: 'Dr. Henry Adams',
            email: 'henry.adams@example.com',
            occupation: 'Neurologist',
            propertyType: 'Shared Workspace',
            location: '505 Neuro Hub, Blüdhaven, USA',
        },
        {
            key: '9',
            id: 'P009',
            name: 'Dr. Isabella King',
            email: 'isabella.king@example.com',
            occupation: 'Oncologist',
            propertyType: 'Meeting Room',
            location: '606 Cancer Care St, Keystone City, USA',
        },
        {
            key: '10',
            id: 'P010',
            name: 'Dr. Jack Scott',
            email: 'jack.scott@example.com',
            occupation: 'Endocrinologist',
            propertyType: 'Retail Kiosk',
            location: '707 Endocrine Ave, Fawcett City, USA',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default SpaceProvider;
