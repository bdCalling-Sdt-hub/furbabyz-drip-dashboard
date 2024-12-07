import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useState } from 'react';
import { useAddProductMutation } from '../../redux/features/product/productApi';
import { BiImage, BiVideo } from 'react-icons/bi';
import { useGetAllCategoryQuery } from '../../redux/features/category/categoryApi';
import { useGetAllSizeQuery } from '../../redux/features/size/sizeApi';
import { useGetAllColorQuery } from '../../redux/features/color/colorApi';
import Swal from 'sweetalert2';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const AddProducts = () => {
    const { data: categoriesData } = useGetAllCategoryQuery([]);

    const { data: sizesData } = useGetAllSizeQuery([]);
    const { data: coloursData } = useGetAllColorQuery([]);

    const categoryOptions = categoriesData?.data?.map((category: { _id: string; name: string }) => ({
        value: category._id,
        label: category.name,
    }));
    const sizeOptions = sizesData?.data?.result?.map((size: { _id: string; sizeName: string }) => ({
        value: size._id,
        label: size.sizeName,
    }));

    const colourOptions = coloursData?.data?.map((colour: { _id: string; colourName: string }) => ({
        value: colour._id,
        label: colour.colourName,
    }));
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [addProduct, { isLoading }] = useAddProductMutation();

    const handleImageChange = ({ fileList }: any) => {
        setImageList(fileList);
    };

    const handleVideoChange = ({ fileList }: any) => {
        setVideoList(fileList);
    };

    const onFinish = async (values: any) => {
        const images = values?.productImage?.fileList.map((image: any) => image.originFileObj);
        const video = values?.video?.file;
        const formData = new FormData();
        if (images.length < 3) {
            message.error('Please upload at least 3 images');
            return;
        }
        images.forEach((image: File) => {
            formData.append('image', image);
        });
        formData.append('media', video);
        delete values.productImage;
        delete values.video;
        formData.append('data', JSON.stringify(values));

        try {
            const res = await addProduct(formData).unwrap();

            if (res?.success) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `${res.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.resetFields();
                setImageList([]);
                setVideoList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex justify-end text-3xl">
                <Link to="/products">
                    <p>
                        <IoArrowBack />
                    </p>
                </Link>
            </div>
            <Form form={form} name="add-product" layout="vertical" onFinish={onFinish} autoComplete="off">
                <div className="flex items-center gap-5">
                    <Form.Item
                        label="Product Image"
                        name="productImage"
                        rules={[{ required: true, message: 'Please upload product image!' }]}
                    >
                        <Upload
                            multiple
                            accept=".jpg,.jpeg,.png"
                            maxCount={3}
                            listType="picture-card"
                            fileList={imageList}
                            onChange={handleImageChange}
                            beforeUpload={() => false}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <div>
                                <BiImage style={{ fontSize: '2rem' }} />
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Video" name="video" rules={[{ required: true, message: 'Please upload video!' }]}>
                        <Upload
                            maxCount={1}
                            listType="picture-card"
                            fileList={videoList}
                            onChange={handleVideoChange}
                            beforeUpload={() => false}
                            accept=".mp4,.mov,.avi,.mkv,.wmv"
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <div>
                                <BiVideo style={{ fontSize: '2rem' }} />
                            </div>
                        </Upload>
                    </Form.Item>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                        style={{ height: '42px' }}
                    >
                        <Input style={{ height: '42px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input product price!' }]}
                        style={{ height: '42px' }}
                    >
                        <Input type="number" style={{ height: '42px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select product category!' }]}
                        style={{ height: '42px' }}
                    >
                        <Select placeholder="Select category" style={{ height: '42px' }} options={categoryOptions} />
                    </Form.Item>
                    <Form.Item
                        label="Colour"
                        name="colour"
                        rules={[{ required: true, message: 'Please select product colour!' }]}
                        style={{ height: '42px' }}
                    >
                        <Select placeholder="Select colour" style={{ height: '42px' }} options={colourOptions} />
                    </Form.Item>
                    <Form.Item
                        label="Size"
                        name="size"
                        rules={[{ required: true, message: 'Please select product size!' }]}
                        style={{ height: '42px' }}
                    >
                        <Select
                            placeholder="Select size"
                            mode="multiple"
                            style={{ height: '42px' }}
                            options={sizeOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please select product gender!' }]}
                        style={{ height: '42px' }}
                    >
                        <Select
                            placeholder="Select gender"
                            style={{ height: '42px' }}
                            options={[
                                { value: 'female', label: 'Female' },
                                { value: 'male', label: 'Male' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input product description!' }]}
                        style={{ height: '42px' }}
                    >
                        <Input.TextArea style={{ height: '42px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Features"
                        name="features"
                        rules={[{ required: true, message: 'Please input product features!' }]}
                        style={{ height: '42px' }}
                    >
                        <Select
                            maxCount={4}
                            mode="tags"
                            allowClear
                            placeholder="Please select features"
                            style={{ height: '42px' }}
                        >
                            <Select.Option value="Hat">Hat</Select.Option>
                            <Select.Option value="Gloves">Gloves</Select.Option>
                            <Select.Option value="Socks">Socks</Select.Option>
                            <Select.Option value="Shoes">Shoes</Select.Option>
                            <Select.Option value="Boots">Boots</Select.Option>
                            <Select.Option value="Sandals">Sandals</Select.Option>
                            <Select.Option value="Accessories">Accessories</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="flex justify-start my-5">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading} style={{ height: '42px' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddProducts;
