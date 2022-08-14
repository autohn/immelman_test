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
  position: relative;
  top: 40px;
`;

const StyledText = styled.div`
  vertical-align: top;
  display: inline-block;
  text-align: left;
  position: relative;
  left: 10px;
`;

const ImageWrap = styled.div`
  display: inline-block;
  position: relative;
  height: 225px;
  width: 300px;
`;

export interface IHistory {
  id: string;
  name: string;
  img: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let res = await fetch("https://swapi.dev/api/people/");
  let data = await res.json();

  let paths = data.results.map((character: any) => {
    return {
      params: { id: character.url.replace(/[^0-9]/g, "") },
    };
  });

  while (data.next) {
    res = await fetch(data.next);
    data = await res.json();

    console.log("запрос" + data.next);

    let newpath = data.results.map((character: any) => {
      return {
        params: { id: character.url.replace(/[^0-9]/g, "") },
      };
    });

    paths = paths.concat(newpath);
  }

  /*  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }]; */

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch("https://swapi.dev/api/people/" + id);
  const data: ICharacter = await res.json();

  const yandeximages = require("yandex-images");
  yandeximages.Search(data.name, false, function (url: any) {
    data.imgurl = url;
    console.log(url);
  });
  while (!data.imgurl) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); //TODO как-то нормально можно?
  }

  const homeworldres = await fetch(data.homeworld);
  const homeworld = await homeworldres.json();
  data.homeworld = homeworld.name;

  return {
    props: { character: data, id: id },
    revalidate: 300,
    notFound: data.name ? false : true,
  };
};

export default function PeopleId({
  character,
  id,
}: {
  character: ICharacter;
  id: string;
}) {
  const imgurl = character.imgurl.includes("avatars.mds.yandex.net")
    ? character.imgurl
    : "/sw_big.png";

  //const router = useRouter();
  //let sv = router.query.id;

  useEffect(() => {
    let History: IHistory[] = JSON.parse(
      sessionStorage.getItem("History") || "[]"
    );

    if (!History.find((x) => x.id == id)) {
      History.push({ id: id, name: character.name, img: character.imgurl });
    }

    sessionStorage.setItem("History", JSON.stringify(History));
  }, [character.imgurl, character.name, id]);

  return (
    <>
      <StyledContainer>
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

        <StyledText>
          <p>Имя: {character.name}</p>
          <p>Год рождения: {character.birth_year}</p>
          <p>Домашняя планета: {character.homeworld}</p>
        </StyledText>
      </StyledContainer>
    </>
  );
}
