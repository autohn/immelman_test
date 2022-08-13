import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { characterAPI } from "../../services/CharacterService";
import { IHistory } from "./Home";

const StyledH = styled.h1`
  text-align: center;
`;

const CharacterItem: FC<IHistory> = ({ id }) => {
  const {
    data: character,
    error,
    isLoading,
    refetch,
  } = characterAPI.useGetCharacterQuery({
    characterid: id,
  });

  useEffect(() => {}, []);

  return <p>{character?.name}</p>;
};

export default CharacterItem;
