import React, { useState, useEffect, Alert } from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const List = (props) => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    const [topicid, setTopicid] = useState([]);


    // switch case chuyển màn hình
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
    
    // nút xóa
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

    // load data từ api getnew và gettopic
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-news.php');
            setNews(result);
            const result2 = await AxiosInstance().get('/get-topics.php');
            setTopicid(result2);
        }
        fetchData();
    }, []);

    // lấy topic_id.name
    const getTopicName = (topicId) => {
        const topic = topicid.find((topic) => topic.id === topicId);
        return topic ? topic.name : null;
      };

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
                        <th>Topic</th>
                        <th>Chỉnh sửa</th>
                        <th>Ngày tạo</th>
                        <th>Người tạo</th>
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
                                <td>{getTopicName(item.topic_id) || 'Unknown'}</td>
                                {/* <td>{topicid.find((topic) => topic.id === item.topic_id)?.name || 'Unknown'}</td> */}
                                <td>
                                    <a className="btn btn-primary" style={{ marginRight: '5%' }} onClick={() => handleClick('edit', item.id)}>Sửa</a>
                                    <button className="btn btn-danger" onClick={() => handleClick('delete', item.id)}>Xóa</button>
                                </td>
                                <td>{item.created_at}</td>
                                <td>{item.user_id}</td>
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