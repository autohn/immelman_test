import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { ICharacter } from "../../src/services/CharacterService";
import { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { relative } from "path";
import axios from "axios";
import rateLimit from "axios-rate-limit";

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

    let newpath = data.results.map((character: any) => {
      return {
        params: { id: character.url.replace(/[^0-9]/g, "") },
      };
    });

    paths = paths.concat(newpath);
  }

  /*  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }]; */

  /*   let [, p] = Object.entries(paths)[0];
  paths = [p]; */

  //paths = [[...paths][0], [...paths][1], [...paths][2]]; //TODO для теста, удалить

  console.log(paths);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch("https://swapi.dev/api/people/" + id);
  const data: ICharacter = await res.json();

  const fs = require("fs");
  const yapath = "./yaurls.json";

  if (!fs.existsSync(yapath)) {
    fs.writeFileSync(yapath, JSON.stringify([]), "utf8");
  }

  const cheerio = require("cheerio");
  var url =
    "https://yandex.com.tr/gorsel/search?text=" + data.name + "&family=yes";

  const getUrl = (): Promise<string> => {
    return new Promise((resolve) => {
      const ax = rateLimit(axios.create(), {
        maxRequests: 1,
        perMilliseconds: 1000,
      });
      ax.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let imgurl: string = "https:" + $(".serp-item__thumb").attr("src");

        if (imgurl == "https:undefined") {
          //TODO привести в порядок, блок для яндекс картинок
          fs.readFile(yapath, "utf8", (err: any, data: any) => {
            let obj = JSON.parse(data);

            const indexOfItemInArray = obj.table.findIndex(
              (q: any) => q.id === id
            );

            if (indexOfItemInArray > -1) {
              imgurl = obj.table[indexOfItemInArray].square;
            }
          });
        } else {
          fs.readFile(yapath, "utf8", (err: any, data: any) => {
            let obj = JSON.parse(data);
            let new_item = { id: id, imgurl: imgurl };

            const indexOfItemInArray = obj.table.findIndex(
              (q: any) => q.id === new_item.id
            );

            if (indexOfItemInArray > -1) {
              obj.table[indexOfItemInArray] = new_item;
            } else {
              obj.table.push(new_item);
            }

            fs.writeFileSync(yapath, JSON.stringify(obj), "utf8");
          });
        }

        console.log(imgurl);
        resolve(imgurl);
      });
    });
  };

  data.imgurl = await getUrl();

  /*   for (let i = 0; i < 9; i++) {
    if (data.imgurl == "https:undefined") {
      data.imgurl = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(getUrl());
        }, 1000);
      });
    }
  } */

  const homeworldres = await fetch(data.homeworld);
  const homeworld = await homeworldres.json();
  data.homeworld = homeworld.name;

  return {
    props: { character: data, id: id },
    /*     revalidate: 300, */
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
    : "/personn.png";

  //const router = useRouter();
  //let sv = router.query.id;

  useEffect(() => {
    let History: IHistory[] = JSON.parse(
      sessionStorage.getItem("History") || "[]"
    );

    if (!History.find((x) => x.id == id)) {
      History.push({ id: id, name: character.name, img: imgurl });
    }

    sessionStorage.setItem("History", JSON.stringify(History));
  }, [imgurl, character.name, id]);

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
