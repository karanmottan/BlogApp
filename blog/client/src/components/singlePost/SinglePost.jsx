import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { url } from "../../config/config";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState('');
  const [followed, setFollowed] = useState(false);
  const [readingTime, setReadingTime] = useState();
  console.log(user)
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${url}/posts/` + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
    const wordsPerMinute = 200; // Average case.
    let textLength = desc.split(" ").length; // Split by words
    if(textLength > 0){
      let value = Math.ceil(textLength / wordsPerMinute);
      
      let result = `~${value} min read`;
      setReadingTime(result);
    };
    //console.log(post)
  }, [path]);

  const handleUnFollow = async() => {
    // const followedUser = post.userid;
    // const currentId = user.data._id;
    // const data = {
    //   currentId,
    //   followedUser
    // };
    setFollowed(false);
    // try{
    //   const res = await axios.post(`${url}/unfollow`, data);
    //   if(res.status === 'ok'){
    //     setFollowed(false)
    //   }
    // }catch(err){
    //   console.log(err);
    // }
  }

  const handleFollow = async () => {
    // const followedUser = post.userid;
    // const currentId = user.data._id;
    // const data = {
    //   currentId,
    //   followedUser
    // };
    setFollowed(true);
    // try{
    //   const res = await axios.post(`${url}/follow`, data);
    //   if(res.status === 'ok'){
    //     setFollowed(true)
    //   }
    // }catch(err){
    //   console.log(err);
    // }

  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/posts/${post._id}`, {
        data: { username: user.data.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {

      const newPost = {
        username : user.data.username,
        title,
        desc,
        isAdmin : 'false'
      }

      if(file){
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post(`${url}/upload`, data);
        } catch (err) {console.log(err)}
      }else{
        newPost.photo = post.photo;
      }
      
      if(user.data.isAdmin){
        newPost.isAdmin = user.data.isAdmin;
        newPost.username = post.username;
      }
    
      //console.log(newPost);
      await axios.put(`${url}/posts/${post._id}`, newPost);
      setUpdateMode(false);
      setPost(newPost);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {followed ? <div className="followButton unfollow" onClick={handleUnFollow}>
          Unfollow {post.username}
          </div> : 
          <div className="followButton follow" onClick={handleFollow}>
          Follow {post.username}
        </div>
        }
        {post.photo && !updateMode ? (
          
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        ) : <div>
            <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {(post.username === user.data.username || (user && user.data && user.data.isAdmin === 'true')) && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <>
            <p className="readingTime">{readingTime} </p>
            <p className="singlePostDesc">Description : {desc}</p>
          </>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
