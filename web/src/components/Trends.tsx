import useSWR from "swr";

const fetcher = () =>
  fetch("http://localhost:4000/trends", { method: "GET" }).then((response) =>
    response.json()
  );


function Trend ({ trend }: any) {
  return (
    <article
      className="border shadow-sm break-inside flex justify-between flex-col p-4 mb-3 text-sm gap-4 rounded-lg dark:border-white/5 bg-white/10 backdrop-blur-md"
      data-filter="social"
    >
      <div className="flex justify-start items-center gap-3">
        <figure className="relative w-12 h-12 flex-none">
          <img src={trend.avatar_url} />
          <figcaption className="sr-only">Avatar</figcaption>
        </figure>
        <h2 className="font-medium text-sm">
          {trend.name}
          <br />
          <span className="text-gray-500 text-xs"></span>
        </h2>
      </div>
      <div className="flex justify-between items-center gap-2">
        <section className="flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white">
        <svg width="18" height="18" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
        </svg>
          <span>{trend.stars}</span>
        </section>
        <section className="flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            ></path>
          </svg>
          <span>{trend.forks}</span>
        </section>
      </div>
    </article>
  )
}  


function Trends() {
  const {
    data: trends,
    error,
    isValidating,
  } = useSWR("http://localhost:4000/trends", fetcher);

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  console.log(trends, 'containers')

  return (
    trends?.map((trend: any) => <Trend trend={trend} />)
  )
}

export default Trends
