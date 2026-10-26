
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trimEnd() + "...";
};

const PostCard = ({ post, compact = false }) => {
  const isTruncated = post.body.length > 95;

  return (
    <article
      className={`post-card ${
        compact ? "compact-card" : ""
      }`}
    >
      <Link
        to={`/item/${post.id}`}
        className="post-image-link"
        aria-label={`View ${post.title}`}
      >
        <img
          src={`https://picsum.photos/seed/travel-${post.id}/600/400`}
          alt={post.title}
          className="post-image"
          loading="lazy"
        />
      </Link>

      <div className="post-content">
        <Link
          to={`/item/${post.id}`}
          className="post-title-link"
        >
          <h3>{truncateText(post.title, 48)}</h3>
        </Link>

        {!compact && (
          <p className="post-description">
            {truncateText(post.body, 95)}

            {isTruncated && (
              <>
                {" "}
                <Link
                  to={`/item/${post.id}`}
                  className="read-more"
                >
                  Read More...
                </Link>
              </>
            )}
          </p>
        )}

        {!compact && (
          <Link
            to={`/item/${post.id}`}
            className="card-arrow"
            aria-label={`Read post ${post.id}`}
          >
            <ArrowRight size={19} />
          </Link>
        )}
      </div>
    </article>
  );
};

export default PostCard;
