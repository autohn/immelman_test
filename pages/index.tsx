import type { NextPage } from "next";
import Home from "../src/components/home/Home";

export async function getStaticProps() {
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();

  const paths = Array.from(Array(data.count.toStering()).keys(), (x) => {
    return {
      params: {
        id: (x + 1).toString(),
      },
    };
  });

  let charsimgs;
  for (const id in paths) {
    const resc = await fetch("https://swapi.dev/api/people/" + id);
    const datac = await res.json();

    const yandeximages = require("yandex-images");
    yandeximages.Search(data.name, false, function (url: any) {
      charsimgs.push(url);
    });
    /*     while (!data.imgurl) {
      await new Promise((resolve) => setTimeout(resolve, 100)); //TODO как-то нормально можно?
    } */
  }

  return { props: { data: data.imgurl } };
}

const IndexPage: NextPage = () => {
  return <Home />;
};

export default IndexPage;
