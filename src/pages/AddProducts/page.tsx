import { GetProp, Image, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd'; // Corrected import here
import { useAddProductMutation } from '../../redux/features/product/productApi';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function AddProducts() {
    const [name, setName] = useState('');

    const [size, setSize] = useState<string[]>([]);
    const [color, setColor] = useState<string[]>([]);

    const [addProduct] = useAddProductMutation();

    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');

    const handleAddFeature = () => {
        if (newFeature && !features.includes(newFeature)) {
            setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
            setNewFeature(''); // Clear the input field after adding
        }
    };

    // Handle size selection
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value;

        // Only add the size if it's not already selected
        if (!size.includes(selectedSize)) {
            setSize((prevSizes) => [...prevSizes, selectedSize]);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedColor = e.target.value;

        // Only add the size if it's not already selected
        if (!color.includes(selectedColor)) {
            setColor((prevColors) => [...prevColors, selectedColor]);
        }
    };

    const handleFormSubmit = () => {
        const formData = {
            name,
            size,
            color,
            features, // Include the features array here
        };
        console.log(formData);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 3 }}>Upload</div>
        </button>
    );

    // video upload
    const props: UploadProps = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        previewFile(file) {
            console.log('Your upload file:', file);
            // Your process logic. Here we just mock to the same file
            return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
                method: 'POST',
                body: file,
            })
                .then((res) => res.json())
                .then(({ thumbnail }) => thumbnail);
        },
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Link to={'/products'}>
                <div className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                    <IoArrowBackCircleOutline size={24} />
                    <span className="text-xl font-semibold">Back</span>
                </div>
            </Link>

            <div className="mt-8 w-full mx-auto bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar Upload Section */}
                    <div className="flex flex-col gap-2">
                        <p>image upload</p>
                        <div>
                            <div className="flex gap-2">
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>video upload</p>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Upload</Button> {/* Corrected Button usage */}
                            </Upload>
                        </div>
                    </div>

                    {/* Input Fields Section */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="name1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name1"
                                placeholder="Enter your name"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="price">
                                Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Enter the price"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="gender">
                                Gender
                            </label>
                            <input
                                type="text"
                                id="gender"
                                placeholder="Enter your gender"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="color">
                                Color
                            </label>
                            <input
                                type="text"
                                id="color"
                                placeholder="Enter your color"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                placeholder="Enter description"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="features">
                                Features
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="features"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    placeholder="Enter feature"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button onClick={handleAddFeature} type="primary">
                                    Add Feature
                                </Button>
                            </div>

                            {/* Displaying Selected Features */}
                            <div className="mt-2 text-sm text-gray-600">
                                {features.length > 0 ? features.join(', ') : 'No features added'}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full lg:w-[630px]">
                            {/* Other Input Fields */}

                            <div className="flex flex-col">
                                <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="size">
                                    Size
                                </label>
                                <select
                                    id="size"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleSizeChange}
                                    value={size}
                                >
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                <div className="mt-2 text-sm text-gray-600">
                                    {size.length > 0 ? size.join(', ') : 'None selected'}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="color">
                                    Color
                                </label>
                                <select
                                    id="color"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleColorChange}
                                    value={color}
                                >
                                    <option value="">Select Color</option>
                                    <option value="White">White</option>
                                    <option value="Black">Black</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Green">Green</option>
                                </select>
                                <div className="mt-2 text-sm text-gray-600">
                                    {color.length > 0 ? color.join(', ') : 'None selected'}
                                </div>
                            </div>
                            {/*  */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleFormSubmit}
                        className="mt-6  w-72 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
