import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  let imageUrl = '';
  if(user && user.data && user.data.profilePic !== ''){
    imageUrl = PF + user.data.profilePic;
  }else{
    imageUrl = 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png';
  }
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

  };
  return (
    <div className="top">
      
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>

          <li className="topListItem">
            {user && <Link className="link" to={`/userposts/${user.data._id}`}>
              USER POSTS
            </Link>}
          </li>

          <li className="topListItem">
            {user && <Link className="link" to={`/topposts`}>
              TOP POSTS
            </Link>}
          </li>

          <li className="topListItem">
            {user && <Link className="link" to={`/recommendedposts`}>
              RECOMMENDED POSTS
            </Link>}
          </li>

          <li className="topListItem" onClick={handleLogout}>
            {user && (<Link className="link" to="/login">
              LOGOUT
            </Link>)}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={imageUrl} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        
      </div>
    </div>
  );
}
