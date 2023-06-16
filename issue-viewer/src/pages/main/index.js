import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./componetns/pagination";

const MainPage = () => {
  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth: "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",
    // auth: "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",
  });

  const [api, setApi] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const pageCount = parseInt(200 / limit);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const requests = Array.from({ length: pageCount }).map(async (_, i) => {
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner: "angular",
            repo: "angular-cli",
            per_page: limit,
            page: i + 1,
            sort: "created",
          }
        );
        return response.data;
      });
      const data = await Promise.all(requests);
      setApi(data);
    };
    fetchData();
  }, [limit]);

  // return (
  //   <div>
  //     {api.length > 0 &&
  //       api[currPage - 1] &&
  //       api[currPage - 1].map((v) => (
  //         <div onClick={() => navigate(`/${v.id}`)}>
  //           <div>number : {v.number}</div>
  //           <div>id : {v.id}</div>
  //           <div>title : {v.title}</div>
  //           <div>user : {v.user.login}</div>
  //           <div>comments : {v.comments}</div>
  //           <div>create_date : {v.created_at}</div>
  //           <div>update_date : {v.updated_at}</div>
  //         </div>
  //       ))}
  //   </div>
  // );
  return (
    <div>
      <div>
        <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      {api.length &&
        api[page - 1] &&
        api[page - 1].map((v) => (
          <div onClick={() => navigate(`/${v.id}`)}>
            <div>number : {v.number}</div>
            <div>id : {v.id}</div>
            <div>title : {v.title}</div>
            <div>user : {v.user.login}</div>
            <div>comments : {v.comments}</div>
            <div>create_date : {v.created_at}</div>
            <div>update_date : {v.updated_at}</div>
          </div>
        ))}
      {console.log(api.length)}
      <Pagination numPages={pageCount} page={page} setPage={setPage} />
    </div>
  );
};
export default MainPage;
