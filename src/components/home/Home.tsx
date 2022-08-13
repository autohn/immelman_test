import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import CharacterItem from "./CharacterItem";


const StyledH = styled.h1`
  text-align: center;
`;

const StyledContent = styled.div`
  text-align: center;
`;

export interface IHistory {
  id: string;
}





const Home: FC = () => {
  const [history, historyString] = useState(Array<IHistory>);


  useEffect(() => {
    historyString(JSON.parse(sessionStorage.getItem("History") || "[]"));


  }, []);

  return (
    <>
      <StyledH>История просмотра</StyledH>

      {history.map((h: IHistory, key) => (
        <StyledContent>
          <CharacterItem key={h.id} id={h.id} />
        </StyledContent>
      ))}
    </>
  );
};

export default Home;
