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

const StyledContainer = styled.div`
  text-align: center;
`;

interface IHistory {
  id: string;
}

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
  }, []);

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

    let sv = singleValue?.value;

    if (sv) {
      let History: IHistory[] = JSON.parse(
        sessionStorage.getItem("History") || "[]"
      );

      if (!History.find((x) => x.id == sv)) {
        History.push({ id: sv });
      }

      sessionStorage.setItem("History", JSON.stringify(History));
    }
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
      Header
      {/*       {
        <form>
          <input
            type="text"
            placeholder="Поиск персонажей"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //dispatch(changeSearch(e.target.value));
              onChangeopt(e.target.value);
            }}
          ></input>

          <BsSearch />
        </form>
      }
      <>{JSON.stringify(options)}</> */}
      {
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
        />
      }
    </StyledContainer>
  );
}
