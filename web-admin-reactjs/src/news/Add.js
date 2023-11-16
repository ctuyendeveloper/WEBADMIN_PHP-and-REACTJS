import React, { useState, Alert } from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { format } from 'date-fns';


const Add = () => {

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


  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [picture, setPicture] = useState(null);

  const formattedDate = format(new Date, 'HH:mm:ss dd-MM-yyyy');
  const [date, setDate] = useState(formattedDate);
  const [userid, setUserid] = useState('');
  const [topicid, setTopicid] = useState('');


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setNewData((prevData) => ({ ...prevData, image: file }));
  // };


  const handleAddData = async () => {
    try {

      const formData = new FormData();
      formData.append('image', picture);
      const uploadResponse = await fetch("http://127.0.0.1:8686/upload-file.php", {
        method: "POST",
        body: formData,
    });
    // console.log("asdasd2", uploadResponse)
      const uploadResult = await uploadResponse.json();
      const uploadResult2 = uploadResult.path;
      // console.log("asdasd", uploadResult2)
      // const uploadResult2 = uploadResult.path;
      // console.log("asdasd", uploadResult2)

      const response = await AxiosInstance().post('/add-news.php', {
        title: editedTitle,
        content: editedContent,
        created_at : date,
        image : uploadResult2,
        topic_id : topicid,
        user_id : userid,
      });
      console.log("test res: ", response.data.image)
      // response.data.image = uploadResult2

      if (response.status === 200) {
        // console.log("test status: ", response.data)
        alert("Thêm thành công")


        setEditedTitle('')
        setEditedContent('')
        setPicture('')
        setDate(formattedDate)
        setUserid('')
        setTopicid('')
      } else {
        // console.log("a", response)
        console.error('Lỗi khi thêm dữ liệu:1', response.data);
        // alert("Thêm thất bại 1", response.data)
      }
    } catch (error) {
      alert("Thêm thất bại 2", error.message)
      // console.error('Lỗi khi thêm dữ liệu:2', error.message);
    }
  };

  return (
    <div className="container mt-5" style={containeraddStyles}>
      {/* Input fields for the new data */}
      <label className="form-label" style={labeladdStyles}>Tiêu đề:</label>
      <input
        style={inputaddStyles}
        className="form-control-add"
        type="text"
        name="title"
        value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}
      />

      <label className="form-label" style={labeladdStyles}>Nội dung:</label>
      <textarea
        style={inputaddStyles}
        name="content"
        className="form-control-add"
        value={editedContent} onChange={(e) => setEditedContent(e.target.value)}
      />
      <label className="form-label" style={labeladdStyles}>iamge test:</label>
      <input type="file" src="" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
      <br />
      <label className="form-label" style={labeladdStyles}>Date</label>
      <textarea
        name="user_id"
        style={inputaddStyles}
        className="form-control-add"
        value={date} onChange={(e) => setDate(e.target.value)}
      />
      <label className="form-label" style={labeladdStyles}>user_id:</label>
      <textarea
        name="user_id"
        style={inputaddStyles}
        className="form-control-add"
        value={userid} onChange={(e) => setUserid(e.target.value)}
      />
      <label className="form-label" style={labeladdStyles}>topic_id:</label>
      <textarea
        name="topic_id"
        style={inputaddStyles}
        className="form-control-add"
        value={topicid} onChange={(e) => setTopicid(e.target.value)}
      />


      {/* Button to trigger the API call */}
      <button className="btn btn-primary-add" onClick={handleAddData} style={btnaddhoverStyles} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>Thêm Dữ Liệu</button>
    </div>
  );
}
export default Add;