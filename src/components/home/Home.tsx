import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { IHistory } from "../../../pages/character/[id]";
import CharacterItem from "./CharacterItem";


const StyledH = styled.h1`
  text-align: center;
`;

const StyledContent = styled.div`
  text-align: center;
`;






const Home: FC = () => {
  const [history, historyString] = useState(Array<IHistory>);


  useEffect(() => {
    historyString(JSON.parse(sessionStorage.getItem("History") || "[]"));


  }, []);

  return (
    <>
      <StyledH>История просмотра:</StyledH>

      {history.map((h: IHistory, key) => (
        <StyledContent key={h.id}>
          <CharacterItem  {...h} />
        </StyledContent>
      ))}
    </>
  );
};

export default Home;
