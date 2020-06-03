import { createGlobalStyle } from "styled-components";

const Fonts = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Ubuntu:wght@700&display=swap');
    
    :root {
        --font-primary: Ubuntu, sans-serif;
        --font-secondary: Roboto, Arial, Helvetica, sans-serif;
    }

`;

export default Fonts;
