import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import FormatDate from './FormateDate'
import './GetFullDeatils.css'
const GetDetailView = () => {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/slug:${params.id}?fields=featured_image,post_thumbnail,title,author,content,date`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network not responded');
                }
                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
                
            }    
            

        };
        fetchPost();
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }
    return (
        <div>
             <div className="post-container">
              {post.featured_image && (
                <div className="post-header">
                    <img src={post.featured_image} alt={post.title} />
                </div>
            )}
      </div>
        <div className="single-post">
            <div className="post-details">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                    <span className="post-author">By {post.author.name}</span>
                    <span className='post-slug'>{post.slug}</span>
                    <span className="post-date">{FormatDate(post.date)}</span>
                </div>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            </div>  </div>
    );
};


export default GetDetailView;
