import React, { useState, useEffect, Alert } from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const List = (props) => {
    const { user } = props;

    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    const [topicid, setTopicid] = useState([]);
    const [userid, setUserid] = useState([]);


    // switch case chuyển màn hình
    const handleClick = (action, id, id2) => {
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
                handleDelete(id, id2);
                break;
            default:
                break;
        }
    };

    // nút xóa
    const handleDelete = async (id, id2) => {
        // Hiển thị hộp thoại xác nhận
        // const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');
        // console.log("ASDASDASD", id2)
        // if (confirmDelete) {
        //     await AxiosInstance().delete(`/delete-news.php?id=${id}`);
        //     alert("Xóa tin tức thành công")
        //     window.location.reload();
        //     // Thực hiện xóa nếu người dùng xác nhận
        //     // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
        // }
        if (user.ID == id2) {
            const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

            if (confirmDelete) {
                // gọi api edit
                await AxiosInstance().delete(`/delete-news.php?id=${id}`);
                alert("Xóa tin tức thành công")
                window.location.reload();
                            // Thực hiện xóa nếu người dùng xác nhận
            // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
            }
        }
        else {
            const confirmDelete = window.confirm('Bạn không phải là chủ của bài đăng bạn có muốn tiếp tục xóa không?');

            if (confirmDelete) {
                await AxiosInstance().delete(`/delete-news.php?id=${id}`);
                alert("Xóa tin tức thành công")
                window.location.reload();
                // Thực hiện xóa nếu người dùng xác nhận
                // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
            }
        }
    };

    // load data từ api getnew và gettopic
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-news.php');
            setNews(result);
            const result2 = await AxiosInstance().get('/get-topics.php');
            setTopicid(result2);
            const result3 = await AxiosInstance().get('/get-users.php');
            setUserid(result3);
        }
        fetchData();
    }, []);

    // lấy topic_id.name
    const getTopicName = (topicId) => {
        const topic = topicid.find((topic) => topic.id === topicId);
        return topic ? topic.name : null;
    };
    const getUserName = (Id) => {
        const user = userid.find((users) => users.id === Id);
        return user ? user.name : null;
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
                                    <button className="btn btn-danger" onClick={() => handleClick('delete', item.id, item.user_id)}>Xóa</button>
                                </td>
                                <td>{item.created_at}</td>
                                <td>{getUserName(item.user_id) || 'Unknown'}</td>
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