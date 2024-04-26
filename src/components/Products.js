import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { makeFirstUpper } from '../utils/utils';
import { productsService } from '../server/products';

function getColumns(deleteHandler) {
    return [
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
            key: 'name',
            render: (text) => <a href='/'>{text}</a>
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
                        onConfirm={() => deleteHandler(record.id)}
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
}

export default function Products() {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await productsService.get();
        const items = response.data;

        for (const i of items) {
            if (!i.imageUrl.includes("://"))
                i.imageUrl = process.env.REACT_APP_API_HOST + i.imageUrl
        }

        setProducts(response.data);
    }

    const deleteProduct = async (id) => {
        console.log("Deleting product: ", id);

        const res = await productsService.delete(id);

        if (res.status == 200) {
            setProducts(products.filter(x => x.id != id));
            message.success('Product deleted successfully!');
        }
    };

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
            <Table columns={getColumns(deleteProduct)} dataSource={products} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
}

const imageStyles = {
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: 6
}