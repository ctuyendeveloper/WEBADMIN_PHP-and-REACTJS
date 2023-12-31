import React, { useState, useEffect, Alert } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../helper/AxiosInstance';
import { format } from 'date-fns';


const Edit = (props) => {
  const { user } = props;

  // css
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

  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [picture, setPicture] = useState();
  const [date, setDate] = useState('');
  const [userid, setUserid] = useState(user);
  const [userid2, setUserid2] = useState();
  const [topicid, setTopicid] = useState([]);
  const [topic_id, setTopic_id] = useState();


//   const [imagePreview, setimagePreview] = useState(null);

  // hàm nhận diện sự thay đổi của image
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setimagePreview(URL.createObjectURL(file))
//     const formData = new FormData();
//     formData.append('image', file);
//     const uploadResponse = await fetch("http://10.0.2.25:8686/upload-file.php", {
//       method: "POST",
//       body: formData,
//     });
//     // console.log("asdasd2", uploadResponse)
//     const uploadResult = await uploadResponse.json();
//     setPicture(uploadResult.path);
//   }

  // load data của api getnews và api gettopic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AxiosInstance().get(`/get-topic-detail.php?id=${id}`);
        // console.log("TEst", result);
        const newsItem = Array.isArray(result) ? result[0] : result;
        // console.log("TEst?????????/", newsItem);

        // const formattedDate = format(new Date, 'HH:mm:ss dd-MM-yyyy');
        // // const fileName = newsItem.image.split('/').pop();
        // // console.log("asdasdasd", fileName)
        // const result2 = await AxiosInstance().get('/get-topics.php');
        // setTopicid(result2);

        setEditedTitle(newsItem.name);
        setEditedContent(newsItem.description);
        // setPicture('asdasd');
        // setimagePreview(newsItem.image);
        // setTopic_id(newsItem.id);
        setUserid2(newsItem.user_id);
        // console.log("ASDASDASDASDASD", userid2)
        // setPicture(newsItem.image); // nó đang là null
        // setDate(formattedDate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  // Hàm click button save
  const handleSave = async () => {
    try {
      if (userid.ID == userid2) {
        // gọi api edit
        await AxiosInstance().put(`/update-topics.php?id=${id}`, {
          name: editedTitle,
          description: editedContent,
          // created_at: date,
          // image: picture,
          // topic_id: topic_id,
          user_id: userid.ID,
        });
        // console.log("test", a)
        // Handle success, maybe redirect or show a success message
        alert("Cập nhật thành công")
        window.location.href = '/list-topic';
      }
      else {
        const confirmDelete = window.confirm('Bạn không phải là chủ của bài đăng bạn có muốn tiếp tục sửa không?');

        if (confirmDelete) {
          await AxiosInstance().put(`/update-topics.php?id=${id}`, {
            name: editedTitle,
            description: editedContent,
            // created_at: date,
            // image: picture,
            // topic_id: topic_id,
            user_id: userid.ID,
          });
          // console.log("test", a)
          // Handle success, maybe redirect or show a success message
          alert("Cập nhật thành công")
          window.location.href = '/list-topic';
        }
        else {
          window.location.href = '/list-topic';
        }
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div style={containeraddStyles}>
      <h2>Edit News</h2>
      <p>Editing news with ID: {id}</p>
      <label style={labeladdStyles}>Name:</label>
      <input style={inputaddStyles} type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
      <br />
      <label style={labeladdStyles}>Description:</label>
      <input style={inputaddStyles} value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
      {/* <label style={labeladdStyles}>Image</label>
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <img src={imagePreview} width={100} height={100} />
      <br />
      <label style={labeladdStyles}>Date</label>
      <input style={inputaddStyles} value={date} onChange={(e) => setDate(e.target.value)} />
      <br />
      <label style={labeladdStyles}>Topic ID</label>
      <br />
      <select value={topic_id} onChange={(e) => setTopic_id(e.target.value)}>
        {
          topicid.map((item, index) => (
            <option value={item.id} key={index}>{item.name}</option>
          ))
        }
      </select>
      <br />
      <br /> */}
      <label>Người sửa: {userid.NAME}</label>
      <br />
      <button className="btn btn-primary" style={btnaddhoverStyles} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleSave}>Sửa</button>
      {/* Add your edit form or other components here */}
    </div>
  );
};
export default Edit;