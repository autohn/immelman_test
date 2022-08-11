import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

const StyledH = styled.h1`
  text-align: center;
`;

const Home: FC = () => {
  return <StyledH>История просмотра</StyledH>;
};

export default Home;
