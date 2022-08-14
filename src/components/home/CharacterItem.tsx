import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { characterAPI } from "../../services/CharacterService";
import { IHistory } from "../../../pages/character/[id]";
import Image from "next/image";
import Link from "next/link";

const StyledContainer = styled.div`
  text-align: center;
  white-space: nowrap;
`;

const ImageWrap = styled.div`
  text-align: center;
  position: relative;
  height: 50px;
`;

const StyledLink = styled(Link)`
  white-space: normal;
  display: inline-block;
  width: 48%;
  vertical-align: top;
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
      <StyledLink href={"/character/" + id}>
        <a>
          <ImageWrap>
            <Image
              src={img}
              alt={name}
              layout={"fill"}
              objectFit={"contain"}
              priority
            />
          </ImageWrap>
          {name}
        </a>
      </StyledLink>
    </StyledContainer>
  );
};

export default CharacterItem;
