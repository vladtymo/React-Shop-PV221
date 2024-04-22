import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Rate, Space, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { makeFirstUpper } from '../utils/utils';

const confirm = (id) => {
    console.log("Deleting product: ", id);
    message.success('Deleting product...');
};

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Image',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (text) => <img style={imageStyles} src={text} alt='Product Image' />
    },
    {
        title: 'Name',
        dataIndex: 'title',
        key: 'name'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span>{text}$</span>
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (text) => <span>{makeFirstUpper(text)}</span>
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: (text) => <Rate allowHalf disabled defaultValue={text} />
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Show</a>
                <Popconfirm
                    title="Delete the product"
                    description={`Are you sure to delete ${record.title}?`}
                    onConfirm={() => confirm(record.id)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <Button danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const api = "https://dummyjson.com/products";

export default function Products() {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await fetch(api);
        const data = await response.json();

        setProducts(data.products);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <Space>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="create">Create New Product</Link>
                </Button>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="edit">Test Edit</Link>
                </Button>
            </Space>
            <Table columns={columns} dataSource={products} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
}

const imageStyles = {
    width: 100,
    height: 50,
    objectFit: "cover",
    borderRadius: 6
}