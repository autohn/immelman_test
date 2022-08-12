import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const StyledH = styled.h1`
  text-align: center;
`;

const Home: FC = () => {
  const [history, historyString] = useState("");
  useEffect(() => {
    historyString(JSON.parse(sessionStorage.getItem("History") || "[]"));
  }, []);

  return <StyledH>История просмотра {JSON.stringify(history)} </StyledH>;
};

export default Home;
