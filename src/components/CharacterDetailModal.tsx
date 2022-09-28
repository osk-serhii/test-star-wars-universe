import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Person, Film, Planet } from "../@types/character";

interface CharacterDetailModalProps {
  open: boolean;
  character: Person | null;
  onClose: () => void;
}

const CharacterDetailModal = ({
  open,
  character,
  onClose,
}: CharacterDetailModalProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [characterDetail, setCharacterDetail] = useState<{
    films: Film[];
    planet: Planet;
  } | null>();

  useEffect(() => {
    if (!open || !character) return;

    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const promiseUrls = [character.homeworld, ...character.films];
        const [planet, ...films] = await Promise.all(
          promiseUrls.map((item) =>
            axios
              .get(item)
              .then((res) => res.data)
              .catch((err) => console.log(err))
          )
        );
        setCharacterDetail({
          planet,
          films,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [character?.url]);

  useEffect(() => {
    if (!open) {
      setCharacterDetail(null);
    }
  }, [open]);

  // prevent closing modal when clicking modal-body
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // handle close-modal
  const handleCloseModal = (e: React.MouseEvent<HTMLHyperlinkElementUtils>) => {
    e.preventDefault();
    onClose();
  };

  if (!open) return null;

  return (
    // close modal when clicking outside of the modal window
    <StyledWrapper onClick={onClose}>
      <StyledModalContainer onClick={handleContainerClick}>
        <StyledName>{character?.name}</StyledName>

        {!isLoading && (
          <StyledDetailsContainer>
            {/* Start films */}
            <StyledSubHeadingText>Appeared in</StyledSubHeadingText>
            {characterDetail?.films.map((film) => (
              <StyledDetailItem key={film.url}>{film.title}</StyledDetailItem>
            ))}
            {/* End films */}

            {/* Start planet */}
            <StyledSubHeadingText>Home Planet</StyledSubHeadingText>
            <StyledDetailItem>{characterDetail?.planet?.name}</StyledDetailItem>
            {/* End planet */}

            {/* Start DOB */}
            <StyledSubHeadingText>Year of birth</StyledSubHeadingText>
            <StyledDetailItem>{character?.birth_year}</StyledDetailItem>
            {/* End DOB */}

            {/* Start eye-colour */}
            <StyledSubHeadingText>Eye color</StyledSubHeadingText>
            <StyledDetailItem>{character?.eye_color}</StyledDetailItem>
            {/* End eye-colour */}
          </StyledDetailsContainer>
        )}

        {isLoading && <StyledLoadingBar>Loading...</StyledLoadingBar>}

        {/* Start close-button */}
        <StyledCloseLink href="/" onClick={handleCloseModal}>
          Close
        </StyledCloseLink>
        {/* End close-button */}
      </StyledModalContainer>
    </StyledWrapper>
  );
};

export default CharacterDetailModal;

// ========== Start styled-components =========
const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const StyledModalContainer = styled.div(
  ({ theme: { colors } }) => `
    width: 100%;
    max-width: 410px;
    min-height: 400px;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
  `
);
const StyledName = styled.h3`
  font-weight: bold;
  font-size: 30px;
  margin: 0 0 10px;
`;
const StyledDetailsContainer = styled.div`
  flex: 1;
`;
const StyledSubHeadingText = styled.h6(
  ({ theme: { colors } }) => `
    margin: 20px 0 0;
    font-weight: bold;
    font-size: 16px;
    color: ${colors.mineShaft};
  `
);
const StyledDetailItem = styled.p(
  ({ theme: { colors } }) => `
    margin: 5px 0px;
    color: ${colors.mineShaft};
  `
);
const StyledLoadingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-style: italic;
`;
const StyledCloseLink = styled.a(
  ({ theme: { colors } }) => `
    color: ${colors.millbrook};
    text-decoration: underline;
    margin-top: 20px;
    display: inline-block;
  `
);
// ========== End styled-components =========
