
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";

import { fetchPosts } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { items, loading, error, loaded } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!loaded && !loading && !error) {
      dispatch(fetchPosts());
    }
  }, [dispatch, loaded, loading, error]);

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return items;

    return items.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
  }, [items, search]);

  return (
    <main className="page-container home-page">
      <div className="page-heading">
        <h1>Social Media For Travellers</h1>
        <p>
          Explore travel stories and discover new places.
        </p>
      </div>

      <div className="search-container">
        <Search size={18} className="search-icon" />

        <input
          type="search"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search posts"
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {loading && <Loader />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchPosts())}
        />
      )}

      {!loading && !error && (
        <>
          <div className="results-bar">
            <span>
              Showing {filteredPosts.length} posts
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={35} />
              <h2>No posts found</h2>
              <p>
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
