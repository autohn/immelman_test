import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { characterAPI } from "../../services/CharacterService";
import { IHistory } from "../../../pages/character/[id]";
import Image from "next/image";
import Link from "next/link";

const StyledContainer = styled.div`
  text-align: center;
  padding-top: 20px;
  break-inside: avoid;
`;

const ImageWrap = styled.div`
  text-align: center;
  position: relative;
  height: 100px;
`;

const CharacterItem: FC<IHistory> = ({ id, name, img }) => {
  /*   const {
    data: character,
    error,
    isLoading,
    refetch,
  } = characterAPI.useGetCharacterQuery({
    characterid: id,
  });
 */
  useEffect(() => {}, []);

  return (
    <StyledContainer>
      <Link href={"/character/" + id}>
        <a>
          <ImageWrap>
            <Image
              src={img == "https:undefined" ? "/personn.png" : img} //TODO переделать нормально
              alt={name}
              layout={"fill"}
              objectFit={"contain"}
              priority
            />
          </ImageWrap>
          {name}
        </a>
      </Link>
    </StyledContainer>
  );
};

export default CharacterItem;
