import useSWR from "swr";

const fetcher = () =>
  fetch("http://localhost:4000/trends", { method: "GET" }).then((response) =>
    response.json()
  );

function Trend({ trend }: any) {
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
          <a href={trend.url} rel="nofollow" target="_blank">
            {trend.name}
          </a>
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
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            ></path>
          </svg>
          <span>{trend.stars}</span>
        </section>
        <section className="flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
          >
            <path fill="currentColor" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
          <span>{trend.forks}</span>
        </section>
      </div>
    </article>
  );
}

function Trends() {
  const {
    data: trends,
    error,
    isValidating,
  } = useSWR("http://localhost:4000/trends", fetcher);

  if (error)
    return (
      <div className="border shadow-sm break-inside flex justify-between flex-col p-4 mb-3 text-sm gap-4 rounded-lg dark:border-white/5 bg-white/10 backdrop-blur-md max-w-[10rem]">
        <div className="flex flex-col items-center gap-2">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            ></path>
          </svg>
          <span className="text-sm font-medium">failed to load</span>
          <p className="text-xs text-center text-red-500">
            An error occurred try to connect again
          </p>
        </div>
      </div>
    );
  if (isValidating) return <div className="Loading">Loading...</div>;

  console.log(trends, "containers");

  return trends?.map((trend: any) => <Trend trend={trend} />);
}

export default Trends;
