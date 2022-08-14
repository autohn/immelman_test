import styled from "styled-components";
import { changeSearch, changeType } from "../app/SearchReducer";
import { BsChevronCompactLeft, BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../app/store";
import { useEffect, useId, useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { characterAPI, ICharacters } from "../services/CharacterService";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";

const StyledContainer = styled.div`
  margin: auto;
`;
const ImageWrap = styled.div`
  text-align: center;
  position: absolute;
  display: inline-block;
  top: 5px;
  left: 10px;
`;

const StyledSearch = styled.div`
  margin: auto;
  text-align: center;
  position: relative;
  top: 5px;
  width: 40%;
`;

const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    border: "1px solid white",
    background: "black",
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    background: "black",
    "&:hover": {
      background: "grey",
    },
  }),

  control: (provided: any, state: any) => ({
    ...provided,
    border: "2px solid #fbe609",
    boxShadow: "3px solid #fbe609",
    background: "black",
    color: "white",
    "&:hover": {
      borderColor: "white",
    },
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    color: "#fbe609",
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#fbe609",
    "&:hover": {
      color: "white",
    },
  }),

  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "black",
  }),
};

type MyOptionType = { value: string; label: string };

export default function Header() {
  /*   const dispatch = useAppDispatch();
  const [searchString, setsearchString] = useState(""); */
  const router = useRouter();

  const [trigger, { data: characters }, lastPromiseInfo] =
    characterAPI.useLazySearchCharactersQuery();

  useEffect(() => {
    trigger(
      {
        search: "",
      },
      true
    );
  }, [trigger]);

  const CharToOpt = (characters: ICharacters): MyOptionType[] => {
    const options = characters?.results.map((x) => {
      return { label: x.name, value: x.url.replace(/[^0-9]/g, "") };
    });

    return options;
  };

  let options: MyOptionType[] = characters ? CharToOpt(characters) : [];

  const [inputValue, setInputValue] = useState(null);

  const handleChange = (
    singleValue: SingleValue<MyOptionType>,
    actionMeta: ActionMeta<MyOptionType>
  ) => {
    router.push("/character/" + singleValue?.value);
    setInputValue(null);

    /*     let sv = singleValue?.value;

    if (sv) {
      let History: IHistory[] = JSON.parse(
        sessionStorage.getItem("History") || "[]"
      );

      if (!History.find((x) => x.id == sv)) {
        History.push({ id: sv });
      }

      sessionStorage.setItem("History", JSON.stringify(History));
    } */
  };

  const getAsyncOptions = (inputText: string) => {
    return trigger(
      {
        search: inputText,
      },
      true
    ).unwrap();
  };

  const handleLoadOptions = debounce((inputText, callback) => {
    getAsyncOptions(inputText).then((characters) =>
      callback(characters ? CharToOpt(characters) : [])
    );
  }, 500);

  return (
    <StyledContainer>
      <Link href="/">
        <a>
          <ImageWrap>
            <Image
              src={"/sw_logo.png"}
              alt={"logo"}
              width={"50px"}
              height={"38px"}
              objectFit={"contain"}
              priority
            />
          </ImageWrap>
        </a>
      </Link>

      <StyledSearch>
        <AsyncSelect
          defaultValue={null}
          //onInputChange={handleInputChange}
          value={inputValue}
          onChange={handleChange}
          options={options}
          instanceId={useId()}
          isSearchable={true}
          placeholder="Поиск..."
          noOptionsMessage={() => "Больше ничего..."}
          loadOptions={handleLoadOptions}
          defaultOptions={options}
          loadingMessage={() => "Загрузка..."}
          styles={customStyles}
          //menuIsOpen={true}
          /*           theme={(theme) => ({
            ...theme,
            //borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "grey",

              //neutral0: "black",
              //neutral80: "white",
              neutral20: "pink",
              neutral30: "pink",
              neutral40: "pink",
              neutral50: "pink",
              neutral60: "pink",
              neutral70: "pink",
              neutral80: "pink",
              neutral90: "pink",
            },
          })} */
        />
      </StyledSearch>
    </StyledContainer>
  );
}
