import { Button, Form, Input, Select, Space } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import Error from '../../components/shared/ErrorPage';
import { useGetGetSingleProductQuery } from '../../redux/features/product/productApi';
import { IoArrowBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';

const EditProduct = () => {
    const { id } = useParams();
    const { isError, isLoading, data }: any = useGetGetSingleProductQuery(id as string);
    const [availableSizes, setAvailableSizes] = useState<any[]>([]);
    const [features, setFeatures] = useState<any[]>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const renderImages = (images: string[]) => {
        return (
            <div className="flex flex-wrap justify-center">
                {images.map((image, index) => (
                    <div key={index} className="w-1/3 p-2">
                        <div className="w-[100px] h-[100px] relative mx-auto">
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                                alt={`image-${index}`}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <input
                                id={`imageUploadBanner-${index}`}
                                type="file"
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        if (data?.data?.size) {
            setAvailableSizes(data.data.size);
        }
        if (data?.data?.features) {
            setFeatures(data.data.features);
            form.setFieldsValue({ features: data.data.features });
        }
    }, [data, form]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    const images = data?.data?.image || [];

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
        form.setFieldsValue({ features: newFeatures });
    };

    const addFeature = () => {
        const newFeatures = [...features, ''];
        setFeatures(newFeatures);
        form.setFieldsValue({ features: newFeatures });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...features];
        newFeatures.splice(index, 1);
        setFeatures(newFeatures);
        form.setFieldsValue({ features: newFeatures });
    };

    return (
        <div>
            <div>
                <Link to="/products">
                    <IoArrowBack className="text-2xl" />
                </Link>
            </div>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <Form form={form} name="update_profile" layout="vertical" initialValues={{ remember: true }}>
                    <div>
                        <div>
                            {renderImages(images)}
                            <video className="w- h-full my-4 object-cover rounded-lg" controls>
                                <source src={`${import.meta.env.VITE_BASE_URL}${data?.data?.video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item label="Name" name="name" initialValue={data?.data?.name}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Price" name="price" initialValue={`$ ${data?.data?.price}`}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender" initialValue={data?.data?.gender}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category" name="category" initialValue={data?.data?.category?.name}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" initialValue={data?.data?.description}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="Color" name="color" initialValue={data?.data?.colour?.colourName}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Size"
                            name="size"
                            initialValue={data?.data?.size?.map((size: any) => size._id)}
                        >
                            <Select mode="multiple" allowClear>
                                {availableSizes.map((size: any) => (
                                    <Select.Option key={size._id} value={size._id}>
                                        {size.sizeName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Features */}
                    <Form.Item label="Features" name="features">
                        {features.map((feature, index) => (
                            <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    placeholder={`Feature ${index + 1}`}
                                />
                                <Button onClick={() => removeFeature(index)} type="primary">
                                    Remove
                                </Button>
                            </Space>
                        ))}
                        <Button onClick={addFeature} type="dashed">
                            Add Feature
                        </Button>
                    </Form.Item>
                    {/*  */}
                    <div className="flex justify-center w-full">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="lg:w-[300px] w-full">
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EditProduct;
