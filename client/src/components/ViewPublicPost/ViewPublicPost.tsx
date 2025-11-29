import { useState, useEffect } from "react";
import type { Post, Comment } from "../types/models";
import style from "./ViewPublicPost.module.css";
import {
  FaRegHeart,
  FaRegBookmark,
  FaShare,
  FaRegComment,
} from "react-icons/fa";
import { apiClient } from "../../utils/apiClient";
import { useAuth } from "../Authentication/useAuth";
import DisplayMySession from "../DisplaySession/DisplayMySession/DisplayMySession";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewPublicPost() {
  const { user } = useAuth();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await apiClient(`/posts/${postId}`);
        setPost(data.post);
      } catch (err) {
        console.error("Error fetching post: ", err);
        navigate("/error");
      }
    };
    fetchPost();
  }, [postId, navigate]);

  useEffect(() => {
    if (post) {
      // Safely handle likes - use empty array if undefined
      setLikesCount(post.likes?.length || 0);
      // Safely handle comments - use empty array if undefined
      setComments(post.comments || []);
    }
  }, [post]);

  const creator = post?.creator;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={style.publicPostWrapper} >
      <div className={style.postContainer}>
        {/* Post Header with Creator Info */}

        <div className={style.postHeader}>
          <Link to={`/user/${user?.id}`}>
            <div className={style.creatorInfo}>
              <img
                src={creator?.profilePicture}
                alt={`${creator?.firstName} ${creator?.lastName}`}
                className={style.avatar}
              />

              <div className={style.creatorDetails}>
                <span className={style.creatorName}>
                  {creator?.firstName} {creator?.lastName}
                </span>
                <span className={style.postTime}>
                  {formatTimeAgo(post.posted)}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div>{post.session && <DisplayMySession session={post.session} />}</div>

        {/* Action Buttons (Like, Comment, Save, Share) */}
        <div className={style.actionBar}>
          <div className={style.leftActions}>
            <button className={style.actionButton}>
              <FaRegHeart />
              {likesCount > 0 && (
                <span className={style.likesCount}>({likesCount})</span>
              )}
            </button>
            <button
              className={style.actionButton}
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >
              <FaRegComment />
              <span className={style.commentsCount}>
                {comments.length > 0 ? `(${comments.length})` : ""}
              </span>
            </button>
            <button className={style.actionButton}>
              <FaShare />
            </button>
            <button className={style.actionButton}>
              <FaRegBookmark />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className={style.commentsSection}>
          {isCommentsOpen && (
            <div className={style.commentsList}>
              {comments.map((comment) => (
                <div key={comment.id} className={style.commentItem}>
                  <img
                    src={comment.author?.profilePicture}
                    alt={`${comment.author?.firstName}`}
                    className={style.commentAvatar}
                  />
                  <div className={style.commentContent}>
                    <div className={style.commentText}>
                      <span className={style.commentAuthor}>
                        {comment.author?.firstName} {comment.author?.lastName}
                      </span>{" "}
                      {comment.content}
                    </div>
                    <span className={style.commentTime}>
                      {formatTimeAgo(comment.posted)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Link to={"/login"}>Login to interact with session.</Link>
      </div>
    </div>
  );
}
