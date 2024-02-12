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
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            ></path>
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
