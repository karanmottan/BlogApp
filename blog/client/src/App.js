import Home from "./pages/home/Home";
import { useCallback } from "react";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Categories from './pages/categories/categories';
import UserPosts from "./pages/userPosts/userPosts";
import TopPosts from "./pages/topPosts/topPosts";
import RecommendedPosts from "./pages/recommendedPosts/recommendedPosts";
import './App.css';

function App() {
  const { user } = useContext(Context);
  

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/categories/:category">{user ? <Categories /> : <Register />}</Route>
        <Route path="/userposts/:userid">{user ? <UserPosts /> : <Register />}</Route>
        <Route path="/topposts"><TopPosts /></Route>
        <Route path="/recommendedposts"><TopPosts /></Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
