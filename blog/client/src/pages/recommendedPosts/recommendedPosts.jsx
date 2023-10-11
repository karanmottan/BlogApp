import Post from "../../components/post/Post";
import "./recommendedPosts.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
// import axios from "axios";
// import {url} from "../../config/config"
export default function RecommendedPosts() {
    const { user } = useContext(Context);  
    const data = [
      {
        "_id" : 1,
        "category" : "karan",
        "topic" : "one",
        "desc" : "thisisdecription",
        "likes" : 10,
        "comments" : 20 ,
        "author" : "karan",
        "date" : "15-11-2000",
        "photo" : '/1200px-RedCat_8727.jpg',
        "title" : "cat1",
      },
      {
        "_id" : 2,
        "category" : "mario",
        "topic" : "two",
        "desc" : "thisisdecription",
        "likes" : 40,
        "comments" : 50,
        "author" : "mario",
        "date" : "5-11-2000",
        "photo" : "/download.jpg",
        "title" : "cat2"
      },
      {
        "_id" : 3,
        "category" : "luigi",
        "topic" : "three",
        "desc" : "thisisdecription",
        "likes" : 5,
        "comments" : 6,
        "author" : "luigi",
        "date" : "4-12-2000",
        "photo" : "/images (1).jpg",
        "title" : "cat3"
      }
    ];
    const [posts, setPosts] = useState(data);
    
    const getRecommended = () => {
        const follows = user.followed;
        let temp = [];
        for(let i = 0; i < follows.length; i++){
            const followedId = follows[i]._id
            const res = axios.get(`/getTopPosts:${followedId}`);
            temp.push(res);
        }
        setPosts(temp);
    }

    useEffect(() => {      
          const topPostsAlgo = () => {
            let temp = posts;
            temp.sort(function(a,b){
                const Alikes = a.likes;
                const Acomments = a.comments;
                const Blikes = b.likes;
                const Bcomments = b.comments;
                
                const Aperi = Alikes * 10 + Acomments;
                const Bperi = Blikes * 10 + Bcomments;
    
                return Bperi - Aperi;
            });
    
            setPosts(temp);
        }
          //fetchPosts();
          topPostsAlgo();
          //getRecommended();
    },[posts]);

  return (
    <div className="posts">
      {posts && posts.map((p) => (
        <Post post={p} key={p._id}/>
      ))}
    </div>
  );
}
