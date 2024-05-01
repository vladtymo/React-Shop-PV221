import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { makeFirstUpper } from '../utils/utils';
import { productsService } from '../server/products';

function getColumns(deleteHandler) {
    return [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id, // less <0 equsls 0> bigger
            },
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
            render: (text) => <a href='/'>{text}</a>,
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name)
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
            sorter: {
                compare: (a, b) => a.price - b.price
            },
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
            key: 'discount',
            render: (text) => <span>{text}%</span>,
            sorter: {
                compare: (a, b) => a.discount - b.discount
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`edit/${record.id}`}>
                        <Button icon={<EditOutlined />}></Button>
                    </Link>
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
    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            const response = await productsService.get();
            const items = response.data;

            for (const i of items) {
                if (!i.imageUrl.includes("://"))
                    i.imageUrl = process.env.REACT_APP_API_HOST + i.imageUrl
            }

            setProducts(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        console.log("Deleting product: ", id);

        const res = await productsService.delete(id);

        if (res.status === 200) {
            setProducts(products.filter(x => x.id !== id));
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