import { useState, useCallback } from "react";
import styled from "styled-components";

import { Person } from "../@types/character";
import CharacterDetailModal from "./CharacterDetailModal";

interface CharacterListProps {
  characters: Person[];
}

const CharacterList = ({ characters }: CharacterListProps) => {
  const [openedCharacter, setOpenedCharacter] = useState<Person | null>(null);

  const handleDetailModalClose = useCallback(() => {
    setOpenedCharacter(null);
  }, []);

  const handleItemClick = (character: Person) => {
    setOpenedCharacter(character);
  };

  return (
    <StyledCharactersContainer>
      {characters.map((character) => (
        <StyledCharacterItem
          key={character.url}
          onClick={() => handleItemClick(character)}
        >
          {character.name}
        </StyledCharacterItem>
      ))}

      <CharacterDetailModal
        open={Boolean(openedCharacter)}
        character={openedCharacter}
        onClose={handleDetailModalClose}
      />
    </StyledCharactersContainer>
  );
};

export default CharacterList;

// ========== Start styled-components =========

const StyledCharactersContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  margin-bottom: 40px;
`;
const StyledCharacterItem = styled.div(
  ({ theme: { colors } }) => `
    background-color: ${colors.millbrook};
    border-radius: 4px;
    color: white;
    padding: 12px 17px;
    font-size: 16px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  `
);
// ========== End styled-components =========
