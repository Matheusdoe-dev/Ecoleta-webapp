import { createGlobalStyle } from "styled-components";

const Fonts = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
    background: #F0F0F5;
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
    }
`;

export default Fonts;
