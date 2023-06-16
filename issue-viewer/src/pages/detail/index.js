import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../styles/common";
import "react-toastify/dist/ReactToastify.css";

const DetailPage = () => {
  const params = useParams();
  console.log(params.postId);
  const { title, author, createTime, editTime, content, comments } = {
    title: "Mock",
    author: "Mock",
    createTime: "Mock",
    editTime: "Mock",
    content: "Mock",
    comments: 1,
  };
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Title>{title}</S.Title>
          <S.Info>
            {author} | {createTime} | {editTime}
          </S.Info>
          <S.Content>{content}</S.Content>
          <S.Info>댓글 수: {comments}개</S.Info>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
export default DetailPage;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Info = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
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

const S = {
  Wrapper,
  Container,
  Info,
  Title,
  ButtonBox,
  Content,
};
