import React from "react";
import styled from "styled-components";

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar = ({ isLoading }: LoadingBarProps) => {
  if (!isLoading) return null;

  return <StyledLoadingBar>Loading ...</StyledLoadingBar>;
};

export default React.memo(LoadingBar);

// ========== Start styled-components =========
const StyledLoadingBar = styled.div`
  text-align: center;
  font-style: italic;
`;
// ========== End styled-components =========
