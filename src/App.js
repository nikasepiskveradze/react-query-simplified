import useQuery from "./react-query/useQuery";

const fetchPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default function App() {
  const { data, error, status, isFetching } = useQuery("posts", fetchPosts);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>Title: {item.title}</div>
      ))}
    </div>
  );
}
