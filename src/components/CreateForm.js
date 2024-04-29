import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Space, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { productsService } from '../server/products';
import { useNavigate, useParams } from 'react-router-dom';

let product = null;

export default function CreateForm() {

    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const params = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const loadCategories = async () => {
        const response = await productsService.getCategories();

        // change property names: id -> value, name -> label
        const mapped = response.data.map(function (x) { return { value: x.id, label: x.name } });
        setCategories(mapped);
    }

    const loadInitialProduct = async () => {
        if (params.id) {
            setEditMode(true);

            const res = await productsService.getById(params.id);

            if (res.status !== 200) return; // todo: throw exception

            product = res.data;
            form.setFieldsValue(res.data);
        }
    }

    useEffect(() => {
        loadCategories();
        loadInitialProduct();
    }, []);

    const onFinish = async (values) => {
        console.log(values);

        if (editMode) {
            values.id = product.id;
            values.imageUrl = product.imageUrl;

            const res = await productsService.edit(values);

            if (res.status === 200) {
                message.success("Product edited successfully!");
            }
        }
        else {
            values.image = values.image.originFileObj;
            // send to server
            const res = await productsService.create(values);

            if (res.status === 200) {
                message.success("Product created successfully!");
            }
        }

        navigate(-1);
    };
    const onReset = () => {
        form.resetFields();
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{editMode ? 'Edit' : 'Create'} Product</h1>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "auto"
                }}
                layout="vertical"
            >
                {/* <Form.Item hidden={true} name="id" label="id" /> */}

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <div style={col2}>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="$"
                            placeholder="Enter product price"
                        />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        label="Discount"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="%"
                            placeholder="Enter product discount"
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a product category"
                        options={categories}>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    initialValue={null}
                >
                    <TextArea rows={4}
                        placeholder="Enter product description"
                        minLength={10} maxLength={3000} showCount />
                </Form.Item>

                <Form.Item
                    name="inStock"
                    valuePropName="checked"
                    label="In Stock"
                    initialValue={true}>
                    <Checkbox>
                        In Stock
                    </Checkbox>
                </Form.Item>

                <Form.Item style={{
                    textAlign: "center"
                }}>

                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? "Edit" : "Create"}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

const col2 = {
    display: "flex",
    gap: 10
}