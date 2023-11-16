import React, { useState, useEffect, Alert } from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const List = (props) => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    const handleClick = (action, id) => {
        switch (action) {
            case 'add':
                console.log("test");
                navigate('/add');
                break;
            case 'edit':
                console.log("test");
                navigate(`/edit/${id}`);
                break;
            case 'delete':
                handleDelete(id);
                break;
            default:
                break;
        }
    };
    const handleDelete = async (id) => {
        // Hiển thị hộp thoại xác nhận
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

        if (confirmDelete) {
            await AxiosInstance().delete(`/delete-news.php?id=${id}`);
            alert("Xóa tin tức thành công")
            window.location.reload();
            // Thực hiện xóa nếu người dùng xác nhận
            // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-news.php');
            setNews(result);
            console.log("asd",result)
        }
        fetchData();
    }, []);

    return (
        <div className="containerlist mt-5">
            <h1>List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Ảnh</th>
                        <th>Chỉnh sửa</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        news.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>
                                    <img src={item.image} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                </td>
                                <td>
                                    <a className="btn btn-primary" style={{ marginRight: '5%' }} onClick={() => handleClick('edit', item.id)}>Sửa</a>
                                    <button className="btn btn-danger" onClick={() => handleClick('delete', item.id)}>Xóa</button>
                                </td>
                                <td>{item.created_at}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => handleClick('add')} className="btn btn-primary" style={{ width: '100%', height: '40px' }}>Thêm</button>
        </div>
    )
}
export default List;