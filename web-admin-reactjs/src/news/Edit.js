import React, { useState, useEffect, Alert } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../helper/AxiosInstance';
import { format } from 'date-fns';


const Edit = () => {

    const containeraddStyles = {
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#ecf0f1',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      };
    
      const labeladdStyles = {
        fontWeight: 'bold',
      };
    
      const inputaddStyles = {
        resize: 'vertical', // Đặt thuộc tính resize
        width: '100%',
      };
      const [isHovered, setIsHovered] = useState(false);
      const btnaddhoverStyles = {
        marginTop: '2%',
        backgroundColor: isHovered ? '#e74c3c' : '#c0392b', // Màu nền thay đổi khi hover
        color: '#fff',
      };

    const { id } = useParams();

    const [news, setNews] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [picture, setPicture] = useState(null);
    const [date, setDate] = useState('');
    const [userid, setUserid] = useState('');
    const [topicid, setTopicid] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AxiosInstance().get(`/get-news-detail.php?id=${id}`);
                console.log("TEst", result);
                const newsItem = Array.isArray(result) ? result[0] : result;
                
                const formattedDate = format(new Date, 'HH:mm:ss dd-MM-yyyy');

                setEditedTitle(newsItem.title);
                setEditedContent(newsItem.content);
                setTopicid(newsItem.topic_id);
                setUserid(newsItem.user_id);
                // setPicture(newsItem.image); // nó đang là null
                setDate(formattedDate);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('image', picture);
            const uploadResponse = await fetch("http://127.0.0.1:8686/upload-file.php", {
              method: "POST",
              body: formData,
          });
          console.log("asdasd2", uploadResponse.url)
            const uploadResult = await uploadResponse.json();
            const uploadResult2 = uploadResult.path;
            console.log("asdasd", uploadResult2)
            

          await AxiosInstance().put(`/update-news.php?id=${id}`, {
            title: editedTitle,
            content: editedContent,
            created_at : date,
            image : uploadResult2,
            topic_id : topicid,
            user_id : userid,
          });
          // console.log("test", a)
          // Handle success, maybe redirect or show a success message
          alert("Cập nhật thành công")
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

    return (
        <div style={containeraddStyles}>
            <h2>Edit News</h2>
            <p>Editing news with ID: {id}</p>
            <label style={labeladdStyles}>Title:</label>
            <input style={inputaddStyles} type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            <br />
            <label style={labeladdStyles}>Content:</label>
            <input style={inputaddStyles} value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
            <br />
            <label style={labeladdStyles}>Date</label>
            <input style={inputaddStyles} value={date} onChange={(e) => setDate(e.target.value)} />
            <br />
            <label style={labeladdStyles}>Topic ID</label>
            <input style={inputaddStyles} value={topicid} onChange={(e) => setTopicid(e.target.value)} />
            <br />
            <label style={labeladdStyles}>User ID</label>
            <input style={inputaddStyles} value={userid} onChange={(e) => setUserid(e.target.value)} />
            <br />
            <button className="btn btn-primary" style={btnaddhoverStyles} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleSave}>Save</button>
            {/* Add your edit form or other components here */}
        </div>
    );
};
export default Edit;