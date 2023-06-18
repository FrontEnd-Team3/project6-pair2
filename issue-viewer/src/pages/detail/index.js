import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../styles/common";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPost } from "../../reducer/detail";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DetailPage = () => {
  const params = useParams();
  const postId = parseInt(params.postId);
  const currPost = useSelector((state) => state.api.currPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrPost(postId));
  }, [currPost]);

  return (
    currPost && (
      <>
        <S.Title>{currPost.title}</S.Title>
        <S.Wrapper>
          <S.Container>
            <S.Info>
              <S.Bold>{currPost.user.login}</S.Bold> commented at{" "}
              {String(new Date(currPost.created_at))
                .split(" ")
                .slice(0, 5)
                .join(" ")}{" "}
              and edited at{" "}
              {String(new Date(currPost.updated_at))
                .split(" ")
                .slice(0, 5)
                .join(" ")}
            </S.Info>
            <S.Content>
              <ReactMarkdown
                children={currPost.body}
                remarkPlugins={[remarkGfm]}
              />
            </S.Content>
          </S.Container>
        </S.Wrapper>
        <S.Comments>댓글 수: {currPost.comments}개</S.Comments>
      </>
    )
  );
};

export default DetailPage;

// Rest of your styled components...

const Wrapper = styled.div`
  // height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Bold = styled.b`
  font-weight: 500;
`;

const Container = styled.div`
  /* Media query for screens with a maximum width of 768px */
  @media (min-width: 768px) {
    /* Media query specific styles */
    width: 420px;
  }

  /* Media query for screens with a minimum width of 1024px */
  @media (min-width: 1024px) {
    /* Media query specific styles */
    width: 700px;
  }
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  /* background-color: ${({ theme }) => theme.PALETTE.primary[300]}; */
  /* color: ${({ theme }) => theme.PALETTE.fontColor}; */
  padding: 32px;
  font-weight: 600;
  font-size: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Info = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  width: 100%;
  padding-bottom: 10px;
  overflow: scroll;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[300]};
  padding: 4px;
  ::-webkit-scrollbar {
    display: none;
  }
  /* &::before {
    content: "";
    display: block; // Add this line
    position: absolute;
    background-color: blue;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[300]};
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #ffffff;
  } */
`;

const Content = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[300]};
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Comments = styled.div`
  font-size: 24px;
`;

const S = {
  Wrapper,
  Bold,
  Container,
  Info,
  Title,
  ButtonBox,
  Content,
  Comments,
};
