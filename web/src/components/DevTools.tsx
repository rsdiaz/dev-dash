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
    <ul className="flex space-x-8">
      {tools &&
        tools.map((tool: any, index: number) => (
          <li key={index}>
            <div className="flex gap-1">
              <div dangerouslySetInnerHTML={{__html: tool.svg}} />
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
