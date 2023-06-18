import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
    }
    body {
        background-color: white
    }
    button {
        border: none;
    }
    ul > li {
        list-style: none;
    }
    h3 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        /* Add additional styles as needed */
    }
      
    p {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        /* Add additional styles as needed */
    }
      
    code {
        font-family: Consolas, monospace !important;
        font-size: 0.9rem;
        line-height: 1.5;
        background-color: #f0f0f0;
        padding: 0.2rem 0.4rem;
        /* Add additional styles as needed */
    }
      
`;
export default GlobalStyles;
