import getPosts from "@/server/action/get-post";
import insertPost from "@/server/action/insert-post";

export default async function home() {
  const data = await getPosts();

  return (
    <main>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
      <form action={insertPost}>
        <input type="text" name="title" placeholder="Title" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
