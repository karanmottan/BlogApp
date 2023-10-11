import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { url } from "../../config/config";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [draftText, setTextDraft] = useState("");
  const [draftTitle, setTitleDraft] = useState("");
  const [draftCat, setDraftCat] = useState("");
  const { user } = useContext(Context);
  
  useEffect(() => {
    let draftText;
    let draftTitle;
    let draftCat;
    if(localStorage.getItem(user.data.username + "text") !== null){
      draftText = localStorage.getItem(user.data.username + "text");
    }
    if(localStorage.getItem(user.data.username + "title") !== null){
      draftCat = localStorage.getItem(user.data.username + "title");
    }
    if(localStorage.getItem(user.data.username + "cat") !== null){
      draftTitle = localStorage.getItem(user.data.username + "cat");
    }

    setTextDraft(draftText);
    setTitleDraft(draftTitle);
    setDraftCat(draftCat);

  },[]);

  const handleText = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
    localStorage.setItem(user.data.username + "text",desc);
    //console.log(localStorage.getItem(user.data.username));
  }

  const handleCat = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    localStorage.setItem(user.data.username + "cat",category);
  }

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.data.username,
      title,
      desc,
      category,
      date : "5-8-2023",
      likes : 10,
      comments : 50
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${url}/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(`${url}/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={handleTitle}
            value={draftTitle}
          />
          <input
            type="text"
            placeholder="Category"
            className="writeInput"
            autoFocus={true}
            onChange={handleCat}
            value={draftCat}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={handleText}
            defaultValue={draftText}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
