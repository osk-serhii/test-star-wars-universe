import { useState } from "react";
import styled from "styled-components";

interface CharacterFilterFormProps {
  onChange: (value: string) => void;
  isLoading: boolean;
}

const CharacterFilterForm = (props: CharacterFilterFormProps) => {
  const [searchVal, setSearchVal] = useState<string>("");

  const onSearchValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    props.onChange(searchVal);
  };

  return (
    <StyledWrapper onSubmit={handleFormSubmit}>
      <StyledLabel htmlFor="character-filter">Filter by name</StyledLabel>
      <StyledInputContainer>
        <StyledInput
          type="search"
          autoFocus
          placeholder="Enter name here"
          id="character-filter"
          value={searchVal}
          onChange={onSearchValChange}
          disabled={props.isLoading}
        />
        <StyledButton>Search</StyledButton>
      </StyledInputContainer>
    </StyledWrapper>
  );
};

export default CharacterFilterForm;

// ========== Start styled-components =========
const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 38px;
`;
const StyledLabel = styled.label`
  margin-bottom: 10px;
`;
const StyledInputContainer = styled.div(
  ({ theme: { breakPoints } }) => `
    display: flex;
    flex-direction: column;
    column-gap: 15px;
    row-gap: 10px;

    @media (min-width: ${breakPoints.mobileM}) {
      flex-direction: row;
    }
  `
);
const StyledInput = styled.input(
  ({ theme: { colors, breakPoints } }) => `
    padding: 12px 17px;
    width: 100%;
    border: solid 1px ${colors.doveGray};
    border-radius: 4px;
    font-size: 16px;

    &:focus-visible {
      outline: none;
    }

    @media (min-width: ${breakPoints.mobileM}) {
      max-width: 253px;
    }
  `
);
const StyledButton = styled.button(
  ({ theme: { colors } }) => `
    padding: 10px 25px;
    border-radius: 4px;
    border: solid 1px ${colors.doveGray};
    cursor: pointer;
  `
);
// ========== End styled-components =========
