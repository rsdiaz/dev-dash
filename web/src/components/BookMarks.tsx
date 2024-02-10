import useSWR from "swr";

const fetcher = () => fetch('http://localhost:4000/bookmarks', { method: 'GET'}).then((response) => response.json())

const BookMarks = () => {
  const {data: bookmarks, error, isValidating } = useSWR('http://localhost:4000/bookmarks', fetcher)

  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {bookmarks &&
        bookmarks.map((bookmark: any, index: number) => (
          <p key={index}>Marcador: {bookmark.url}</p>
        ))}
    </div>
  );
}

export default BookMarks
