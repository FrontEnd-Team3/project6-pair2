import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./componetns/pagination";

function MainPage() {
  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    // auth: "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",
  });

  const [api, setApi] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const navigate = useNavigate();
  useEffect(() => {
    // 처음 데이터 불러오기
    const fetchData = async () => {
      const data = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "angular",
        repo: "angular-cli",
        per_page: 200,
        page: 1,
        sort: "created",
      });
      setApi(data.data);
    };
    fetchData();
  }, []);

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
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      {api.slice(offset, offset + limit).map((v) => (
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
      <Pagination
        total={api.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default MainPage;
