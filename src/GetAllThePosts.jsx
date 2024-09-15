import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormatDate from './FormateDate'
import Logo from './header.jpg'
import './index.css';
const GetListView = () => {
  const [posts, setpost] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?fields=slug,categories,post_thumbnail,title,date&number=20&page=${currentPage}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("network not responded");
        }
        const data = await response.json();
        setpost(data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error in posts:", error);
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories"
        );
        if (!response.ok) {
          throw new Error("network not responded");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error in categories:", error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, [currentPage, selectedCategory]);

  const categoryChangeHandled = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const renderPosts = () => {
    return (
      <div className="posts-container">
        {posts.map((post) => (
          <Link key={post.slug} to={`/post/${post.slug}`}>
            <div
              className="post-card"
            >
              <div className="post-thumbnail">
                {post.post_thumbnail && (
                  <img src={post.post_thumbnail.URL} alt={post.title} />
                )}
              </div>
              <div className="post-details">
                <div className="post-categories">
                  {Object.keys(post.categories)
                    .map((category) => category.name)
                    .join(", ")}
                </div>
                <h2 className="title">{post.title}</h2>
                <div className="date">{FormatDate(post.date)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="logo-container">
        <img className='logo-img' src={Logo} alt='This is Logo' />
        <div class="centered">The Trucaller Blog</div>
      </div>
      <div className="wordpress-posts">
        <div className="post-artical">Latest acrticals</div>
        <select className="select-category" value={selectedCategory} onChange={categoryChangeHandled}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        {load ? <p>loading...</p> : renderPosts()}
        <button className="load-more-btn" onClick={loadMorePosts}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default GetListView;
