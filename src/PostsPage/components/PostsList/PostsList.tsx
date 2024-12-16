import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { PostType } from "../../../types";
import { Link } from "react-router-dom";
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
  <div className="flex-1 p-3 bg-white h-full">
    <AutoSizer>
      {({ height, width }) => {
        return (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={posts.length}
            itemSize={150}
          >
            {({ index, style }) => {
              const post = posts[index];

              return (
                <div
                  key={post.id}
                  className="flex p-4 border border-slate-300 rounded-md gap-4"
                  style={{
                    ...style,
                    height:
                      typeof style.height === "number"
                        ? style.height - 10
                        : "auto",
                  }}
                >
                  <div className="flex-1">
                    <Link to={`post/${post.id}`}>
                      <h2 className="text-l uppercase mb-2">{post.title}</h2>
                    </Link>
                    <p className=" line-clamp-2">{post.body}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-slate-200 border border-slate-400 px-2.5 py-1 cursor-pointer rounded-md"
                      onClick={() => onDelete(post.id)}
                      aria-label={`Delete post titled ${post.title}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            }}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  </div>
);
