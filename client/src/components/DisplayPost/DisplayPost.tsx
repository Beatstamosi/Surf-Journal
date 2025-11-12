import type { Post } from "../types/models";

export default function DisplayPost({ post }: { post: Post }) {
  return <div>{post.id}</div>;
}
