import React, { useState, Alert, useEffect } from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { format } from 'date-fns';


const Add = (props) => {
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


  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [picture, setPicture] = useState(null);

  const formattedDate = format(new Date, 'HH:mm:ss dd-MM-yyyy');
  const [date, setDate] = useState(formattedDate);
  const [userid, setUserid] = useState(user);
  const [topicid, setTopicid] = useState([]);
  const [topic_id, setTopic_id] = useState(1);

  const [imagePreview, setimagePreview] = useState(null);


  // hàm nhận diện sự thay đổi của image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimagePreview(URL.createObjectURL(file))
    const formData = new FormData();
    formData.append('image', file);
    const uploadResponse = await fetch("http://127.0.0.1:8686/upload-file.php", {
      method: "POST",
      body: formData,
    });
    // console.log("asdasd2", uploadResponse)
    const uploadResult = await uploadResponse.json();
    setPicture(uploadResult.path);
  }


  // load data của api get topic
  useEffect(() => {
    const fetchtopics = async () => {
      const result = await AxiosInstance().get('/get-topics.php');
      setTopicid(result);
      // const newsItem = Array.isArray(user) ? user[0] : user;
    }
    fetchtopics();
  }, [])



  // hàm thêm dữ liệu
  const handleAddData = async () => {
    try {

      // bắt validate
      if (!editedContent || !editedTitle || !picture) {
        alert('Nhap du thong tin di')
        return;
      }
      // console.log("asdasd", uploadResult2)
      // const uploadResult2 = uploadResult.path;
      // console.log("asdasd", uploadResult2)

      // gọi api thêm dữ liệu
      const response = await AxiosInstance().post('/add-news.php', {
        title: editedTitle,
        content: editedContent,
        created_at: date,
        image: picture,
        topic_id: topic_id,
        user_id: userid.ID,
      });
      // console.log("test res: ", response.data.image)
      // response.data.image = uploadResult2

      // status thêm thành công
      if (response.status === 200) {
        // console.log("test status: ", response.data)
        alert("Thêm thành công")


        setEditedTitle('')
        setEditedContent('')
        setPicture('')
        setDate(formattedDate)
        // setUserid('')
        window.location.href = '/';
      } else {
        // console.log("a", response)
        // console.error('Lỗi khi thêm dữ liệu:1', response.data);
        alert("Thêm thất bại 1", response.data)
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
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <img src={imagePreview} width={100} height={100} />
      <br />
      <label className="form-label" style={labeladdStyles}>Date</label>
      <textarea
        name="user_id"
        style={inputaddStyles}
        className="form-control-add"
        value={date} onChange={(e) => setDate(e.target.value)}
      />
      <label className="form-label" style={labeladdStyles}>topic_id:</label>
      <br />
      <select value={topic_id} onChange={(e) => setTopic_id(e.target.value)}>
        {
          topicid.map((item, index) => (
            <option value={item.id} key={index}>{item.name}</option>
          ))
        }
      </select>
      <br />
      <br />
      <label className="form-label">Người đăng: {userid.NAME}</label>
      <br />


      {/* Button to trigger the API call */}
      <button className="btn btn-primary-add" onClick={handleAddData} style={btnaddhoverStyles} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>Thêm Dữ Liệu</button>
    </div>
  );
}
export default Add;