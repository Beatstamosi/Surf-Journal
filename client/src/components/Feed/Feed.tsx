import type { Post } from "../types/models";
import { useEffect, useState } from "react";
import style from "./Feed.module.css";
import { apiClient } from "../../utils/apiClient";
import DisplayPost from "../DisplayPost/DisplayPost";

export default function Feed() {
  const [posts, setPosts] = useState<Post[] | null>();
  const [displayPosts, setDisplayPosts] = useState<Post[] | null>();
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiClient("/posts/user/all");
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching posts: ", err);
      }
    };
    fetchPosts();
  }, []);

  // useEffect set displayPosts based on view
  useEffect(() => {
    setDisplayPosts(posts);
  }, [posts]);

  // Filter based on search query
  const filteredSessions = displayPosts?.filter((item) => {
    return item.session?.forecast?.spotName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.searchWrapper}>
          <input
            type="search"
            className={style.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Spot Name"
          />
        </div>
      </div>

      <div className={style.sessionsGrid}>
        {filteredSessions && filteredSessions.length > 0 ? (
          filteredSessions.map((item) => {
            if (!item) return null;

            return <DisplayPost key={item.id} post={item} />;
          })
        ) : (
          <div className={style.emptyState}>
            <h3>No sessions found</h3>
            <p>
              {searchQuery
                ? "Try adjusting your search"
                : "Start by adding your first surf session!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
