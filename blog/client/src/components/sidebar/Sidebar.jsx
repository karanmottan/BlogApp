
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

import React from "react";



export default function Sidebar({data}) {
  const [cats, setCats] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [topics, setTopics] = useState([]);
  

  useEffect(() => {
    
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    let map1 = new Map();
    let map2 = new Map();
    let map3 = new Map();
    for(const d of data){

      console.log(d);
        if(!map1.has(d.category)){
          temp1.push(d.category);
          map1.set(d.category,d.category);
        }
        if(!map2.has(d.username)){
          console.log(d.username);
          temp2.push(d.username);
          map2.set(d.username,d.username);
        }
        if(!map3.has(d.title)){
          temp3.push(d.title);
          map3.set(d.title,d.title);
        }
    }
    console.log(temp2);
    
    setCats(temp1);
    setAuthors(temp2);
    setTopics(temp3);
    
  },[data]);
  return (
    <div className="sidebar">
      <div className="searchTitle">Search</div>
      <div className="sidebarContent">
        <div className="categoryClass">
          <div className="title">Category</div>
          {cats && cats.map((c) => (
              
              <div key={Math.random()} className="listItem">
              <Link to={`/categories/${c}`} className="link" >
              <div className="sidebarListItem">{c}</div>
              </Link>
              </div>

            ))}
        </div>
        <div className="authorClass">
        <div className="title">Author</div>
          {authors && authors.map((c) => (
              
              <div key={Math.random()} className="listItem">
              <Link to={`/categories/${c}`} className="link" >
              <div className="sidebarListItem">{c}</div>
              </Link>
              </div>

            ))}
        </div>
        <div className="topicClass">
        <div className="title">Topic</div>
          {topics && topics.map((c) => (
              
              <div key={Math.random()} className="listItem">
              <Link to={`/categories/${c}`} className="link" >
              <div className="sidebarListItem">{c}</div>
              </Link>
              </div>

            ))}
        </div>
      </div>
      <div className="listContainer">
      
      </div>
      {/* <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
        <div className="sidebarList">
          {cats && cats.map((c) => (
            // <Link to={`/?cat=${c.name}`} className="link">
            <div className="sidebarListItem" key={id++}>{cats}</div>
            
          ))}
        </div> */}
      </div>
      
        
      
      

  );
}


