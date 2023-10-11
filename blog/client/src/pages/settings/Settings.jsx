import "./settings.css";

import { useContext, useState,useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { url } from "../../config/config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm/checkoutForm";
const publicKey = 'pk_test_51NbhQMSA9ymhq6NvjMSazkbDxFwiILG3LzYc8bpxGZbTEi2MzwMJhaEDze3pw32cQ4BrB4ifofivqsTpc5BBSpDu00EDou82lV';
const privateKey = 'sk_test_51NbhQMSA9ymhq6NvyGCHbOdkrOQmwWExrdbsipTVWPJQAC60d5do0XaRJsKc3WYDpsDCO71ZHltHpHfzBZFW55Zq00Jg3EZz4Q';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  let imageUrl = '';
  if(user && user.data && user.data.profilePic !== ''){
    imageUrl = PF + user.data.profilePic;
  }else{
    imageUrl = 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png';
  }
  
  useEffect(() => {
    setStripePromise(loadStripe(publicKey));
    const util = async() => {
      fetch("http://localhost:5000/api/auth/create_payment_intent", {
        method: "POST",
        body: JSON.stringify({}),
      }).then(async (result) => {
        var { clientSecret } = await result.json();
        console.log(clientSecret)
        setClientSecret(clientSecret);
      });
    }
    util();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    console.log(user);
    const updatedUser = {
      userId: user.data._id,
      username,
      email,
  
    };
    console.log(updatedUser);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${url}/upload`, data);
      } catch (err) {}
    }
    try {
      if(updatedUser.email === ''){
        updatedUser.email = user.data.email;
      }
      if(updatedUser.username === ''){
        updatedUser.username = user.data.username;
      }
      
      const res = await axios.put(`${url}/users/` + user.data._id, updatedUser);
      console.log(res);
      setSuccess(true);
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : imageUrl}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>

            <div className="userPosts">

            </div>
            {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
      
    </div>
  );
}
