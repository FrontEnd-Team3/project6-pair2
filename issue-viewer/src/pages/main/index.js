import { useEffect, useState } from "react";

const MainPage = () => {
  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth: "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",
  });

  const [api, setApi] = useState([]);

  useEffect(() => {
    const App = async () => {
      const data = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "angular",
        repo: "angular-cli",
        per_page: 100,
        page: parseInt(200 / 100),
        sort: "created",
      });
      setApi(data.data);
    };
    App();
  }, []);

  console.log(api);

  return (
    <div>
      {api.map((v) => (
        <div>
          <div>number : {v.number}</div>
          <div>id : {v.id}</div>
          <div>title : {v.title}</div>
          <div>user : {v.user.login}</div>
          <div>comments : {v.comments}</div>
          <div>create_date : {v.created_at}</div>
          <div>update_date : {v.updated_at}</div>
        </div>
      ))}
    </div>
  );
};
export default MainPage;
