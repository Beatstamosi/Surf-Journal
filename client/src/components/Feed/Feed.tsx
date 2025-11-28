import type { Post } from "../types/models";
import { useEffect, useState } from "react";
import style from "./Feed.module.css";
import { apiClient } from "../../utils/apiClient";
import DisplayPost from "../DisplayPost/DisplayPost";

export default function Feed() {
  const [posts, setPosts] = useState<Post[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch posts based on active filter
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = getEndpointForFilter(activeFilter);
        const data = await apiClient(endpoint);
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching posts: ", err);
      }
    };
    fetchPosts();
  }, [activeFilter]);

  const getEndpointForFilter = (filter: string) => {
    switch (filter) {
      case "liked":
        return "/posts/feed/liked";
      case "saved":
        return "/posts/feed/saved";
      case "following":
        return "/posts/feed/following";
      case "all":
      default:
        return "/posts/feed/all";
    }
  };

  // Filter based on search query
  const filteredPosts = posts?.filter((post) => {
    return post.session?.forecast?.spotName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.filterButtons}>
          <button
            className={`${style.filterButton} ${
              activeFilter === "all" ? style.active : ""
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`${style.filterButton} ${
              activeFilter === "liked" ? style.active : ""
            }`}
            onClick={() => setActiveFilter("liked")}
          >
            Liked
          </button>
          <button
            className={`${style.filterButton} ${
              activeFilter === "saved" ? style.active : ""
            }`}
            onClick={() => setActiveFilter("saved")}
          >
            Saved
          </button>
          <button
            className={`${style.filterButton} ${
              activeFilter === "following" ? style.active : ""
            }`}
            onClick={() => setActiveFilter("following")}
          >
            Following
          </button>
        </div>
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

      <div className={style.postsContainer}>
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            if (!post) return null;

            return <DisplayPost key={post.id} post={post} />;
          })
        ) : (
          <div className={style.emptyState}>
            <h3>No sessions found</h3>
            <p>{searchQuery && "Try adjusting your search"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
