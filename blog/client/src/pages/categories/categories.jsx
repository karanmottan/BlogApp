import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import {url} from '../../config/config';
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./categories.css";
export default function Categories(){
   
    const params = useParams('');
    const categoryTitle = params.category;
    
    const [post,setPosts] = useState('');
    
    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await fetch(`${url}/categories/getCategoryPost?title=${categoryTitle}`)
            const temp = await res.json();
            
            setPosts({
                post : temp.data
            });
            
            
        }
            
        fetchPosts();

        
    },[categoryTitle])

    return(
        <>
            <div className="homeCategories">
                
               {post ? <Posts posts={post.post}/> : <></>} 
        
        
      </div>
        </>
    )
}
