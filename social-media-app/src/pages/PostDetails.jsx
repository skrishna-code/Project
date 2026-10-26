
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  Share2,
  Bookmark,
  UserRound,
} from "lucide-react";

import { fetchPosts } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("details");
  const [saved, setSaved] = useState(false);

  const { items, loading, error, loaded } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!loaded && !loading && !error) {
      dispatch(fetchPosts());
    }
  }, [dispatch, loaded, loading, error]);

  useEffect(() => {
    setActiveTab("details");
    setSaved(false);
  }, [id]);

  const post = items.find(
    (item) => item.id === Number(id)
  );

  const morePosts = items
    .filter((item) => item.id !== Number(id))
    .slice(0, 6);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Post link copied!");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        alert("Unable to share the post.");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchPosts())}
      />
    );
  }

  if (!loaded) {
    return <Loader />;
  }

  if (!post) {
    return (
      <main className="page-container not-found">
        <h1>Post not found</h1>
        <p>The requested post does not exist.</p>
        <Link to="/" className="primary-link">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container details-page">
      <div className="details-heading">
        <Link
          to="/"
          className="back-link"
          aria-label="Go back home"
        >
          <ArrowLeft size={18} />
        </Link>

        <h1>Post Number #{post.id}</h1>
      </div>

      <section className="featured-section">
        <div className="featured-image-card">
          <img
            src={`https://picsum.photos/seed/travel-${post.id}/800/600`}
            alt={post.title}
            className="featured-image"
          />

          <div className="featured-overlay">
            <h2>{post.title}</h2>

            <div className="featured-actions">
              <button
                onClick={handleShare}
                aria-label="Share post"
                title="Share post"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={() => setSaved(!saved)}
                aria-label={
                  saved ? "Unsave post" : "Save post"
                }
                aria-pressed={saved}
                title="Save post"
              >
                <Bookmark
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="featured-information">
          <div className="tabs">
            <button
              className={`tab ${
                activeTab === "details" ? "active" : ""
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>

            <button
              className={`tab ${
                activeTab === "user" ? "active" : ""
              }`}
              onClick={() => setActiveTab("user")}
            >
              User Info
            </button>
          </div>

          {activeTab === "details" ? (
            <div className="tab-content">
              <h2 className="detail-title">
                {post.title}
              </h2>

              <p className="detail-body">
                {post.body}
              </p>

              <div className="post-meta">
                <span>Post ID: {post.id}</span>
                <span>Author ID: {post.userId}</span>
              </div>
            </div>
          ) : (
            <div className="tab-content">
              <div className="user-info">
                <div className="user-avatar">
                  <UserRound size={26} />
                </div>

                <div>
                  <h2>User #{post.userId}</h2>
                  <p>
                    Post was created by User ID:
                    {" "}{post.userId}
                  </p>
                  <p>
                    Published Post #{post.id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="more-posts-section">
        <h2>More Posts</h2>

        <div className="posts-grid more-posts-grid">
          {morePosts.map((item) => (
            <PostCard
              key={item.id}
              post={item}
              compact
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostDetails;
