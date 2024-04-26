import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { makeFirstUpper } from '../utils/utils';
import { getProducst } from '../services/products';

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
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, record) => <img style={imageStyles} src={text} alt={record.name} />
    },
    {
        title: 'Name',
        dataIndex: 'name',
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
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text) => <span>{makeFirstUpper(text)}</span>
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount'
        //render: (text) => <Rate allowHalf disabled defaultValue={text} />
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href='/'>Show</a>
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

export default function Products() {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        //const response = await fetch(api);
        //const data = await response.json();

        const response = await getProducst();
        setProducts(response.data);
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
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: 6
}