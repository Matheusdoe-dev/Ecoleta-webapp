import styled from "styled-components";
import bgImg from "../../assets/home-background.svg";

export const HomeWrapper = styled.div`
  & {
    height: 100vh;

    background: url(${bgImg}) no-repeat 40vw 15vh;

    @media (max-width: 900px) {
      background: none;
    }
  }
`;

export const Content = styled.div`
  & {
    width: 100%;
    height: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 30px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  & main {
    flex: 1;
    max-width: 560px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 900) {
      padding-top: 218px;
    }
  }

  & main h1 {
    font-size: 54px;
    color: var(--title-color);
  }

  & main p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }

  & main a {
    width: 100%;
    max-width: 360px;
    height: 72px;
    background: var(--primary-color);
    border-radius: 8px;
    text-decoration: none;
    transition: 0.2s;

    display: flex;
    align-items: center;
    overflow: hidden;

    margin-top: 40px;
  }

  & main a span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 72px;
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  & main a span svg {
    color: #fff;
    width: 20px;
    height: 20px;
  }

  & main a strong {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  & main a:hover {
    transition: 0.2s;
    background: #2fb86e;
  }

  @media (max-width: 900px) {
    & {
      align-items: center;
      text-align: center;
    }

    & main {
      align-items: center;
    }

    & main h1 {
      font-size: 42px;
    }

    & main p {
      font-size: 24px;
    }
  }
`;
