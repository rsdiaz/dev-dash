import useSWR from "swr";

const fetcher = () =>
  fetch("http://localhost:4000/tools", { method: "GET" }).then((response) =>
    response.json()
  );

const DevTools = () => {
  const {
    data: tools,
    error,
    isValidating,
  } = useSWR("http://localhost:4000/tools", fetcher);

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  console.log(tools)

  return (
    <ul className="flex items-center gap-2">
      {tools &&
        tools.map((tool: any, index: number) => (
          <li key={index} className="flex items-center rounded px-3 h-10 dark:border-white/5 bg-white/10 backdrop-blur-md">
            <div className="flex gap-2 text-sm font-medium">
              <div className="tools-logo" dangerouslySetInnerHTML={{__html: tool.svg  }} />
              <p>{tool.current_version}</p>
              {tool.is_outdated === true && (
                <p>
                  -{">"} <span className="text-green-300">{tool.latest_version}</span>
                </p>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default DevTools;
