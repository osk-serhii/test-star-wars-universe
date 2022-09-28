import styled, { ThemeProvider } from "styled-components";

import theme from "./utils/theme";
import GlobalStyle from "./utils/globalStyles";
import Characters from "./components/Characters";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <GlobalStyle />
        <Characters />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;

// ========== Start styled-components =========
const StyledContainer = styled.div(
  ({ theme: { colors } }) => `
    background-color: ${colors.white};
    padding: 60px 15px;
    min-height: 100vh;
  `
);
// ========== End styled-components =========
