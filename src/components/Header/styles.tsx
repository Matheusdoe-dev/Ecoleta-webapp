import styled from "styled-components";

export const HeaderWrapper = styled.header`
  & {
    margin: 48px 0 0;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & a {
    color: var(--title-color);
    font-weight: bold;
    text-decoration: none;
    transition: 0.2s;

    display: flex;
    align-items: center;
  }

  & a:hover {
    filter: brightness(80%);
    transition: 0.2s;
  }

  & a svg {
    margin-right: 16px;
    color: var(--primary-color);
  }

  @media (max-width: 900px) {
    & {
      margin: 48px auto 0;
    }
  }
`;
