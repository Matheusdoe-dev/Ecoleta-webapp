import { createGlobalStyle } from "styled-components";

const Elements = createGlobalStyle`
    body, input, button {
    font-family: var(--font-secondary);
    }

    h1, h2, h3, h4, h5, h6 {
    color: var(--title-color);
    font-family: var(--font-primary)
    }
`;

export default Elements;
