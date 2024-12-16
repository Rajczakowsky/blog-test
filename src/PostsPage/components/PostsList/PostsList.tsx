import {
  PostsListContainer,
  PostsWrapper,
  Post,
  PostContent,
  PostTitle,
  PostActions,
  PostBody,
  Button,
} from "./styles";

import { PostType } from "../../../types";

type PostsListProps = {
  posts: PostType[];
  onDelete: (id: number) => void;
};

/**
 * The `PostsList` component renders a list of posts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.posts - The list of posts to display.
 * @param {Function} props.onDelete - The function to call when a post is deleted.
 *
 * @example
 * return (
 *   <PostsList posts={posts} onDelete={handleDelete} />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */

export const PostsList = ({ posts, onDelete }: PostsListProps) => (
  <>
    {posts.map((post) => (
      <Post key={post.id}>
        <PostContent>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
        </PostContent>
        <PostActions>
          <Button
            onClick={() => onDelete(post.id)}
            aria-label={`Delete post titled ${post.title}`}
          >
            Remove
          </Button>
        </PostActions>
      </Post>
    ))}
  </>
);
