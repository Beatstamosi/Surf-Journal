import type { Session, Post } from "../types/models";
import { useEffect, useState } from "react";
import style from "./MySessions.module.css";
import { apiClient } from "../../utils/apiClient";
import DisplayPost from "../DisplayPost/DisplayPost";
import DisplayMySession from "../DisplaySession/DisplayMySession/DisplayMySession";

export default function MySessions() {
  const [view, setView] = useState<"sessions" | "posts">("sessions");
  const [displaySessionsOrPosts, setDisplaySessionsOrPosts] = useState<
    Session[] | Post[] | null
  >();
  const [searchQuery, setSearchQuery] = useState("");

  const isPost = (item: Session | Post): item is Post => {
    return "creatorId" in item;
  };

  const updateSession = () => {
    if (view === "posts") {
      fetchPosts();
    } else {
      fetchSessions();
    }
  };

  const fetchSessions = async () => {
    try {
      const data = await apiClient("/sessions/user/all");
      setDisplaySessionsOrPosts(data.sessions);
    } catch (err) {
      console.error("Error fetching sessions: ", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await apiClient("/posts/feed/all");
      setDisplaySessionsOrPosts(data.posts);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };

  // useEffect set displaySessions based on view
  useEffect(() => {
    if (view === "sessions") {
      fetchSessions();
    } else if (view === "posts") {
      fetchPosts();
    }
  }, [view]);

  // Filter based on search query
  const filteredSessions = displaySessionsOrPosts?.filter((item) => {
    if (isPost(item)) {
      // Post has a session relation
      return item.session?.forecast?.spotName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else {
      // Session
      return item.forecast?.spotName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.filterButtons}>
          <button
            className={`${style.filterButton} ${
              view === "sessions" ? style.filterBtnActive : ""
            }`}
            onClick={() => setView("sessions")}
          >
            Private Sessions
          </button>
          <button
            className={`${style.filterButton} ${
              view === "posts" ? style.filterBtnActive : ""
            }`}
            onClick={() => setView("posts")}
          >
            Shared Sessions
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

      <div className={style.sessionsGrid}>
        {filteredSessions && filteredSessions.length > 0 ? (
          filteredSessions.map((item) => {
            if (!item) return false;

            if (isPost(item)) {
              return (
                <DisplayPost
                  key={item.id}
                  post={item}
                  onSessionUpdate={updateSession}
                />
              );
            } else {
              return (
                <DisplayMySession
                  key={item.id}
                  session={item}
                  onSessionUpdate={updateSession}
                />
              );
            }
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
