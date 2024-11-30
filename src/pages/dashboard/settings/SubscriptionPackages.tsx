import React, { useState } from 'react';
import { Table, Form, Input, Button, Modal, Select, message } from 'antd';

// Define types for the package
interface SubscriptionPackage {
    key: number;
    name: string;
    price: string;
    features: string[];
}

const { Option } = Select;

const SubscriptionPackages: React.FC = () => {
    const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>(false);
    const [editingPackage, setEditingPackage] = useState<SubscriptionPackage | null>(null);

    const openModal = (pkg: SubscriptionPackage | null) => {
        setEditingPackage(pkg);
        setVisible(true);
        if (pkg) {
            form.setFieldsValue({
                packageName: pkg.name,
                price: pkg.price,
                features: pkg.features,
            });
        } else {
            form.resetFields();
        }
    };

    const onFinish = (values: { packageName: string; price: string; features: string[] }) => {
        if (editingPackage) {
            // Edit existing package
            const updatedPackages = packages.map((pkg) =>
                pkg.key === editingPackage.key
                    ? { ...pkg, name: values.packageName, price: values.price, features: values.features }
                    : pkg,
            );
            setPackages(updatedPackages);
            message.success('Package updated successfully!');
        } else {
            // Add new package
            if (packages.length >= 2) {
                message.error('You can only add a maximum of 2 packages.');
                return;
            }

            const newPackage: SubscriptionPackage = {
                key: packages.length + 1,
                name: values.packageName,
                price: values.price,
                features: values.features,
            };

            setPackages([...packages, newPackage]);
            message.success('Package added successfully!');
        }

        setVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Package Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Features',
            dataIndex: 'features',
            key: 'features',
            render: (features: string[]) => features.join(', '),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_text: any, pkg: SubscriptionPackage) => <Button onClick={() => openModal(pkg)}>Edit</Button>,
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center my-5">
                <h3 className="text-3xl text-primary font-semibold">Subscription Packages</h3>
                <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: 20, height: 42 }}>
                    Add Package
                </Button>
            </div>

            <Table columns={columns} dataSource={packages} pagination={false} />

            <Modal
                title={editingPackage ? 'Edit Package' : 'Add Package'}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Package Name"
                        name="packageName"
                        rules={[{ required: true, message: 'Please enter package name!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter package name (e.g., Basic, Pro)"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter package price!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter package price"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Features"
                        name="features"
                        rules={[{ required: true, message: 'Please enter package features!' }]}
                    >
                        <Select
                            style={{
                                height: 42,
                                borderRadius: 100,
                                width: '100%',
                            }}
                            mode="tags"
                            placeholder="Select or create package features"
                            tokenSeparators={[',']}
                            maxTagCount={1}
                            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`}
                        >
                            <Option value="One space post">One space post</Option>
                            <Option value="Valid for as long as space is listed">
                                Valid for as long as space is listed
                            </Option>
                            <Option value="Priority Support">Priority Support</Option>
                            <Option value="Easy Listing Management">Easy Listing Management</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{
                                height: 42,
                            }}
                            type="primary"
                            htmlType="submit"
                        >
                            {editingPackage ? 'Update Package' : 'Add Package'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubscriptionPackages;
