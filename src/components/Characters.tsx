import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import CharacterFilterForm from "./CharacterFilterForm";
import LoadingBar from "./LoadingBar";
import CharacterList from "./CharacterList";
import { Person } from "../@types/character";
import { API_BASE_URL } from "../utils/config";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";

const Characters = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [charactersInfo, setCharactersInfo] = useState<{
    totalCount: number;
    currentPage: string;
    nextPage: string;
    characters: Person[];
  }>({
    totalCount: 0,
    currentPage: "",
    nextPage: "",
    characters: [],
  });

  const handleSearchValChange = useCallback((val: string) => {
    setSearchVal(val);
    setCharactersInfo({
      totalCount: 0,
      currentPage: "",
      nextPage: "",
      characters: [],
    });
  }, []);

  const fetchCharacterList = async () => {
    try {
      const targetPageUrl =
        charactersInfo.nextPage ||
        `${API_BASE_URL}/people/?search=${searchVal}&page=1`;

      if (
        isLoading ||
        (charactersInfo.currentPage &&
          charactersInfo.currentPage === charactersInfo.nextPage) ||
        (charactersInfo.currentPage && !charactersInfo.nextPage)
      ) {
        setScrolledDown(false);
        return;
      }

      setLoading(true);
      const res = await axios.get(targetPageUrl).then((res) => res.data);
      setCharactersInfo((prev) => ({
        totalCount: res.count,
        currentPage: targetPageUrl,
        nextPage: res.next,
        characters: [...prev.characters, ...res.results],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setScrolledDown(false);
    }
  };

  const setScrolledDown = useInfiniteScroll(fetchCharacterList);

  useEffect(() => {
    fetchCharacterList();
  }, [searchVal]);

  return (
    <StyledWrapper>
      <StyledHeadingContainer>
        <img alt="Hero Character" src="/images/character-example.png" />

        <StyledHeading>Star Wars Characters</StyledHeading>
      </StyledHeadingContainer>

      <CharacterFilterForm onChange={handleSearchValChange} isLoading={isLoading} />

      <CharacterList characters={charactersInfo.characters} />

      <LoadingBar isLoading={isLoading} />
    </StyledWrapper>
  );
};

export default Characters;

// ========== Start styled-components =========
const StyledWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
`;
const StyledHeadingContainer = styled.div`
  text-align: center;
`;
const StyledHeading = styled.h1`
  font-weight: bold;
  font-size: 38px;
  margin: 35px;
`;
// ========== End styled-components =========
