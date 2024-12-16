
import { useParams } from "react-router-dom";

/**
 * The `Post` component is responsible for displaying a single blog post with its title, body, and actions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.id - The ID of the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.body - The body content of the post.
 * @param {Function} props.onDelete - The function to call when the delete button is clicked.
 *
 * @example
 * return (
 *   <Post id={1} title="Post Title" body="Post body content" onDelete={handleDelete} />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */

const generateRandomName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    return names[Math.floor(Math.random() * names.length)];
  };
  
  const generateRandomUsers = (count: number) => {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push({ name: generateRandomName(), calls: Math.floor(Math.random() * 100) });
    }
    return users;
  };

const Post = () => {
  const { id } = useParams();

  
  const generated = generateRandomUsers(10);

  const combined = generated.reduce((acc, user) => {
    acc[user.name] = acc[user.name] ? acc[user.name] + user.calls : user.calls;
    return acc;
  }, []);

  const sorted = Object.entries(combined).sort((a, b) => {
    console.log('a', a);
    console.log('b', b);
    return a[0].localeCompare(b[0])
});


  console.log('bom', sorted.reduce((a, v) => {
     return [...a, {name: v[0], calls:  v[1]}]

}, []))

  return (
    <div className="flex p-4 border border-slate-300 rounded-md gap-4">
      <div className="flex-1">
        <h2 className="text-l uppercase mb-2">{`Post id: ${id}`} </h2>
        <p className="line-clamp-2">Body</p>
      </div>
      <div className="flex items-center">
        <button
          className="bg-[var(--background-color)] border border-[var(--border-color)] px-2.5 py-1 cursor-pointer hover:bg-[var(--border-color)] rounded-[var(--border-radius)]"
          onClick={() => {}}
          aria-label={`Delete post titled test`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Post;
