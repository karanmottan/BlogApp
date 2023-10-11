import { useEffect, useState } from "react";
import React from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { url } from "../../config/config";
import {useContext} from 'react';
import { Context } from "../../context/Context";
import Post from "../../components/post/Post";



export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const {user,dispatch} = useContext(Context);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [field,setField] = useState();
  const [order,setOrder] = useState();
  const [filterAuthor,setFilterAuthor] = useState();
  const [filterDate, setFilterDate] = useState();
  const [updatedData, setUpdatedData] = useState([]);


  const handleOpen1 = () => {
    setOpen1(!open1);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  }

  const handleField = (e) => {
    setField(e.target.innerHTML);
    setOpen1(!open1);
  }

  const handleOrder = (e) => {
    setOrder(e.target.innerHTML);
    setOpen2(!open2);
  }

  const handleSort = (e) => {
    let temp = posts;
    if(updatedData.length !== 0) temp = updatedData;
    
    if(field === 'Comments'){
      if(order === 'Ascending'){
        temp.sort(function(a,b){
          console.log(a.comments);
          return a.comments - b.comments;
        });
      }else{
        temp.sort(function(a,b){
          return b.comments - a.comments;
        });
      }
    }else{
      if(order === 'Ascending'){
        temp.sort(function(a,b){
          console.log(a.likes);
          return a.likes - b.likes;
        });
      }else{
        console.log('desc');
        temp.sort(function(a,b){
          console.log(b.likes);
          return b.likes - a.likes;
        });
      }
    }
    console.log(temp);
    setUpdatedData(temp);
    console.log(updatedData);

  }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    setFilterAuthor(e.target[0].value);
    setFilterDate(e.target[1].value);
    console.log(filterDate)
    let temp = [];
    let arr = posts;
    console.log(arr);
    if(updatedData.length !== 0) arr = updatedData;
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
      console.log(arr[i].date);
      console.log(filterDate);
      if(arr[i].username === filterAuthor && arr[i].date === filterDate){
        temp.push(arr[i]);
      }
    }
    //console.log(temp);
    setUpdatedData(temp);
  }

  useEffect(() => {
    
    // const data = [
    //   {
    //     "_id" : 1,
    //     "category" : "karan",
    //     "topic" : "one",
    //     "desc" : "thisisdecription",
    //     "likes" : 10,
    //     "comments" : 20 ,
    //     "author" : "karan",
    //     "date" : "15-11-2000"
    //   },
    //   {
    //     "_id" : 2,
    //     "category" : "mario",
    //     "topic" : "two",
    //     "desc" : "thisisdecription",
    //     "likes" : 40,
    //     "comments" : 50,
    //     "author" : "mario",
    //     "date" : "5-11-2000"
    //   },
    //   {
    //     "_id" : 3,
    //     "category" : "luigi",
    //     "topic" : "three",
    //     "desc" : "thisisdecription",
    //     "likes" : 5,
    //     "comments" : 6,
    //     "author" : "luigi",
    //     "date" : "4-12-2000"
    //   }
    // ]

    const fetchPosts = async () => {
      const res = await axios.get(`${url}/posts` + search);
      setPosts(res.data);
    };
    
    const fetchUser = async () => {
      const res = await axios.get(`${url}/users/` + user.data._id);
        //console.log(res.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
        
    }
    fetchPosts();
    //setPosts(data);
    if(user && user.data) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedData]);
  return (
    <>
    {posts ? <Sidebar data={posts}/> : <></>}
      <Header />
      
      <div className="home">
        <div className="filterContainer">
          <div className="filterBox">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder="Author" className="filterInput"></input>
              <input type="text" placeholder="Date" className="filterInput"></input>
              <button className="submitButton formSubmit">Submit</button>
            </form>
          </div>
          <div className="dropdown">
      <button  className="submitButton fieldSelect" onClick={handleOpen1}>Field Select</button>
        {open1 ? (
          <ul className="menu1" id="remove">
            <li className="menu-item">
              <button className="submitButton" id="field" onClick={(e) => handleField(e)}>Likes</button>
            </li>
            <li className="menu-item">
              <button className="submitButton" id="field" onClick={(e) => handleField(e)} >Comments</button>
            </li>
          </ul>
        ) : null}
        <button className="submitButton optionSelect" onClick={handleOpen2}>Option Select</button>
        {open2 ? (
          <ul className="menu2" id="remove">
            <li className="menu-item">
              <button className="submitButton" id="option" onClick={(e) => handleOrder(e)} >Ascending</button>
            </li>
            <li className="menu-item">
              <button className="submitButton" id="option" onClick={(e) => handleOrder(e)} >Descending</button>
            </li>
          </ul>
        ) : null}
        <button className="submitButton sortButton" onClick={(e) => handleSort()}>Sort</button>
        </div>
        </div>
        {(updatedData.length !== 0) ? <Posts posts={updatedData}/> : < Posts posts={posts}/>}
        
        
      </div>
        
    </>
  );
}
