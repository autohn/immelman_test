import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { ICharacter } from "../../src/services/CharacterService";
import { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { relative } from "path";

const StyledContainer = styled.div`
  text-align: center;
`;

const ImageWrap = styled.div`
  text-align: center !important;
  position: relative;
  height: 225px;
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();

  /*   const paths = data.results.map((character: any) => {
    return {
      params: { id: character.url.replace(/[^0-9]/g, "") },
    };
  }); */

  const paths = Array.from(Array(10).keys(), (x) => {
    //поставить data.count.toStering()
    return {
      params: {
        id: (x + 1).toString(),
      },
    };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch("https://swapi.dev/api/people/" + id);
  const data = await res.json();

  const yandeximages = require("yandex-images");
  yandeximages.Search(data.name, false, function (url: any) {
    data.imgurl = url;
  });
  while (!data.imgurl) {
    await new Promise((resolve) => setTimeout(resolve, 100)); //TODO как-то нормально можно?
  }

  return { props: { character: data, id: id } };
};

export default function PeopleId({ character }: { character: ICharacter }) {
  const imgurl = character.imgurl.includes("avatars.mds.yandex.net")
    ? character.imgurl
    : "/sw.png";

  return (
    <>
      <StyledContainer>
        {character.name}

        {/*  <div style={{ position: "relative", width: "300px", height: "225px" }}> */}
        <ImageWrap>
          <Image
            src={imgurl}
            alt={character.name}
            layout={"fill"}
            objectFit={"contain"}
            priority
          />
        </ImageWrap>
        {/*  </div> */}
      </StyledContainer>
    </>
  );
}
