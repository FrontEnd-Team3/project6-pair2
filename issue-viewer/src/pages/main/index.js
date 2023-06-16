import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./componetns/pagination";
import { useDispatch, useSelector } from "react-redux";
import { setApi } from "../../reducer/detail";

const MainPage = () => {
  const octokit = new Octokit({
    // auth: "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",
    // auth: "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",
  });

  // const [api, setApi] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("created");
  const pageCount = parseInt(200 / limit);
  const api = useSelector((state) => state.api.apis);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setApi({ limit, sort }));
  }, [limit, sort]);

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
