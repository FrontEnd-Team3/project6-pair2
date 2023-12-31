import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "./componetns/pagination";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrPost, setApi } from "../../reducer/detail";
import styled from "styled-components";
import "./index.css";
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
  const [params, setParams] = useState({ page, sort, limit });

  const api = useSelector((state) => state.api.apis);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const redirect = (newParams) => {
    setSearchParams({ limit, page, sort, ...newParams });
  };

  const navigate = useNavigate();
  useEffect(() => {
    setPage(parseInt(searchParams.get("page")) || 1);
    setLimit(parseInt(searchParams.get("limit")) || 20);
    setSort(searchParams.get("sort") || "created");
    redirect();
    dispatch(setApi({ limit, sort }));
    dispatch(resetCurrPost());
  }, [limit, page, sort]);

  return (
    <High_Container>
      <Word className="word">
        <Wrapper_page>
          Select the number of pages
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => {
              setLimit(Number(value));
              redirect({ limit: Number(value) });
            }}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </Wrapper_page>
        <Wrapper_filter>
          Select a Page Filter
          <select
            value={sort}
            onChange={({ target: { value } }) => {
              setSort(value);
              redirect({ sort: value });
            }}
          >
            <option value="created">created</option>
            <option value="updated">updated</option>
            <option value="comments">comments</option>
          </select>
        </Wrapper_filter>
      </Word>
      <Container>
        {api.length &&
          api[page - 1] &&
          api[page - 1].map((v) => (
            <Wrapper_post onClick={() => navigate(`/${v.id}`)} className="body">
              <div>{v.title}</div>
              <div>
                <div>#{v.id}</div>
                <div>comments({v.comments})</div>
              </div>
              <div>{v.body}</div>
              <div>
                create {v.created_at} , update {v.updated_at}
              </div>
            </Wrapper_post>
          ))}
      </Container>
      {console.log(api.length)}
      <Pagination
        numPages={pageCount}
        page={page}
        setPage={setPage}
        redirect={redirect}
      />
    </High_Container>
  );
};
export default MainPage;

const High_Container = styled.div``;
const Container = styled.div`
  position: relative;
  top: 30px;
`;

const Wrapper_post = styled.div`
  margin: 0 auto;
  border: 1px solid darkgray;
  box-shadow: 1px 3px 1px darkgray;
  text-align: center;
  line-height: 2;
  width: 60%;
  margin-top: 30px;
  border-radius: 30px;
  font-weight: 600;
  color: #666666;
  div:nth-child(2) {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
    color: darkgray;
  }
  div:nth-child(3) {
    width: 800px;
    white-space: nowrap;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  div:nth-child(4) {
    color: darkgray;
    position: relative;
    right: 20px;
    text-align: right;
    font-weight: 600;
  }
`;

const Word = styled.div`
  position: relative;
  top: 30px;
  width: 70%;
  margin: 0 auto;
  text-align: center;
`;

const Wrapper_page = styled.label`
  padding: 10px 10px;
  margin: 0 auto;
  font-size: 18px;
  color: gray;
  font-weight: 500;
  select {
    margin-left: 10px;
    padding: 2px;
    font-size: 15px;
    position: relative;
    bottom: 1px;
    background-color: gray;
    border-radius: 4px;
    color: white;
  }
`;

const Wrapper_filter = styled.label`
  padding: 10px 10px;
  font-size: 18px;
  color: gray;
  font-weight: 500;
  select {
    margin-left: 10px;
    padding: 2px;
    font-size: 15px;
    position: relative;
    bottom: 1px;
    background-color: gray;
    border-radius: 4px;
    color: white;
  }
`;

