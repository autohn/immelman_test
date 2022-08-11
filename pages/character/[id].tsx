import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { ICharacter } from "../../src/services/CharacterService";

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

  console.log(paths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch("https://swapi.dev/api/people/" + id);
  const data = await res.json();

  return { props: { character: data } };
};

export default function PeopleId({ character }: { character: ICharacter }) {
  //const { query } = useRouter();

  return <>{character.name}</>;
}
