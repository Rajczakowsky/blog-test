import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
  --max-width: 900px;
  --text-color: white;
  --spacing: 20px;
  --gap: 10px;
  --input-padding: 15px;
  --border-color: #ddd;
  --border-radius: 4px;
  --header-height: 230px;
  --sm: 10px;
  --sl: 20px;
  --background-color: #f9f9f9;
  --blue-color: #2399f9;
}
  
html,
body {
    padding: 0;
    margin: 0;
    font-family: robotoregular, Arial, Helvetica, sans-serif;
    background-color: var(--blue-color);

}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}

legend {
  border: 0; /* 1 */
  padding: 0; /* 2 */
}
`;
