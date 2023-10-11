import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          
            <span className="postCat" key={post._id}>Category : {post.category}</span>
         
        </div>
        <Link to={`/post/${post._id}`} className="link" onClick={()=>{console.log('here')}}>
          <span className="postTitle">Title : {post.title}</span>
        </Link>
        <hr />
        {/* <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span> */}
      </div>
      
    </div>
  );
}
