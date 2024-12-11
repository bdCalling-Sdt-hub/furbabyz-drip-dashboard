import { useState, useEffect } from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetGetSingleProductQuery, useUpdateProductMutation } from '../../redux/features/product/productApi';
import { useGetAllCategoryQuery } from '../../redux/features/category/categoryApi';
import { useGetAllSizeQuery } from '../../redux/features/size/sizeApi';
import { useGetAllColorQuery } from '../../redux/features/color/colorApi';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const router = useNavigate();
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const { data: categoriesData } = useGetAllCategoryQuery([]);
    const [updateProduct] = useUpdateProductMutation();

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
    const { id } = useParams();
    const { data: productData } = useGetGetSingleProductQuery(id);
    const product = productData?.data;

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState<any>([]);

    useEffect(() => {
        if (product) {
            // Convert image URLs to Upload component format
            const formattedImages = product?.image?.map((url: string, index: number) => ({
                uid: `-${index}`,
                name: `image-${index}`,
                status: 'done',
                url: `${import.meta.env.VITE_BASE_URL}${url}`,
            }));
            setImageList(formattedImages);

            // Convert video URL to Upload component format
            if (product.video) {
                setVideoList([
                    {
                        uid: '-1',
                        name: 'video',
                        status: 'done',
                        url: `${import.meta.env.VITE_BASE_URL}${product.video}`,
                    },
                ]);
            }

            // Set form values
            form.setFieldsValue({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category._id,
                colour: product.colour._id,
                size: product.size.map((s: any) => s._id),
                gender: product.gender,
                features: product.features,
                productImage: formattedImages,
                video: product.video
                    ? [
                          {
                              uid: '-1',
                              name: 'video',
                              status: 'done',
                              url: `${import.meta.env.VITE_BASE_URL}${product.video}`,
                          },
                      ]
                    : undefined,
            });
        }
    }, [product, form]);

    const handleImageChange = ({ fileList }: any) => {
        setImageList(fileList);
    };

    const handleVideoChange = ({ fileList }: any) => {
        setVideoList(fileList);
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleRemove = (file: any) => {
        if (file.url) {
            const removedUrl = file.url.replace(`${import.meta.env.VITE_BASE_URL}`, '');
            setRemovedImages((prev) => [...prev, removedUrl]);
        }
        return true; // Allow removal in the UI
    };
    const onFinish = async (values: any) => {
        const formData = new FormData();
        const numericPrice = parseFloat(values.price);
        if (isNaN(numericPrice)) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Invalid price value!',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        values.price = numericPrice;

        const newImagesArray = values?.productImage?.fileList
            ?.map((file: { originFileObj?: File }) => file.originFileObj)
            .filter(Boolean) as File[];

        if (newImagesArray?.length > 0) {
            newImagesArray.forEach((image: File) => {
                formData.append('image', image);
            });
        }

        if (removedImages) {
            removedImages?.forEach((image: string) => {
                formData.append('imagesToDelete[]', image);
            });
        }
        if (values?.video.file) {
            formData.append('media', values.video.file);
        }
        formData.append('data', JSON.stringify(values));

        const updatedInfo = {
            id: id,
            data: formData,
        };

        try {
            const res = await updateProduct(updatedInfo).unwrap();
            if (res?.success) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `${res.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            router('/products');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <Link to="/products">
                    <IoArrowBackCircleOutline className="text-4xl" onClick={goBack} />
                </Link>
            </div>
            <Form onFinish={onFinish} form={form} layout="vertical" name="basic" autoComplete="off" colon={false}>
                <div className="grid grid-cols-3 gap-3">
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input style={{ height: '42px' }} />
                    </Form.Item>

                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <Input type="number" style={{ height: '42px' }} />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea style={{ height: '42px' }} />
                    </Form.Item>

                    <Form.Item label="Category" name="category">
                        <Select options={categoryOptions} style={{ height: '42px' }} />
                    </Form.Item>

                    <Form.Item label="Size" name="size">
                        <Select mode="multiple" style={{ height: '42px' }} options={sizeOptions} />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender">
                        <Select style={{ height: '42px' }}>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="male">Male</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Features" name="features">
                        <Select mode="tags" style={{ height: '42px' }} placeholder="Please select features">
                            <Select.Option value="Hat">Hat</Select.Option>
                            <Select.Option value="Gloves">Gloves</Select.Option>
                            <Select.Option value="Socks">Socks</Select.Option>
                            <Select.Option value="Shoes">Shoes</Select.Option>
                            <Select.Option value="Boots">Boots</Select.Option>
                            <Select.Option value="Sandals">Sandals</Select.Option>
                            <Select.Option value="Accessories">Accessories</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Colour" name="colour">
                        <Select options={colourOptions} style={{ height: '42px' }} />
                    </Form.Item>
                </div>

                <div className="flex gap-4">
                    <Form.Item
                        label="Image"
                        name="productImage"
                        rules={[{ required: true, message: 'Please upload product image!' }]}
                    >
                        <Upload
                            onRemove={handleRemove}
                            multiple
                            maxCount={3}
                            listType="picture-card"
                            fileList={imageList}
                            onChange={handleImageChange}
                            beforeUpload={() => false}
                        >
                            {imageList.length < 3 && (
                                <div>
                                    <p className="ant-upload-hint">Upload at least 3 images</p>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Video"
                        name="video"
                        rules={[{ required: true, message: 'Please upload product video!' }]}
                    >
                        <Upload
                            maxCount={1}
                            listType="picture-card"
                            fileList={videoList}
                            onChange={handleVideoChange}
                            beforeUpload={() => false}
                            accept=".mp4,.mov,.avi,.mkv,.wmv"
                        >
                            {videoList.length === 0 && (
                                <div>
                                    <p className="ant-upload-text">Upload</p>
                                    <p className="ant-upload-hint">Upload product video</p>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
                    <Button type="primary" htmlType="submit" style={{ height: '42px' }}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProduct;
