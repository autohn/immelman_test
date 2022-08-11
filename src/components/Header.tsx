import styled from "styled-components";
import { changeSearch, changeType } from "../app/SearchReducer";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../app/store";
import { SingleValue } from "react-select";
import { useId, useState } from "react";
import { ActionMeta } from "react-select";
import { characterAPI, ICharacters } from "../services/CharacterService";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import AsyncSelect from "react-select/async";

const StyledContainer = styled.div`
  text-align: center;
`;

type MyOptionType = { value: string; label: string };
let options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchString, setsearchString] = useState("");
  const router = useRouter();

  const {
    data: characters,
    error,
    isLoading,
    refetch,
  } = characterAPI.useSearchCharactersQuery({
    search: searchString,
  });

  console.log(characters?.results);

  const CharToOpt = (characters: ICharacters): MyOptionType[] => {
    /*     const options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
    ]; */

    const options = characters?.results.map((x) => {
      return { label: x.name, value: "1" }; //TODO правильное value
    });

    return options;
  };

  options = CharToOpt(characters);

  const getAsyncOptions = (inputText: any) => {
    const candidate = inputText.toLowerCase();
    const byLabel = ({ label }: any) => label.toLowerCase().includes(candidate);
    // remove this line and uncomment below to try with your impementation
    return new Promise((resolve) => {
      setTimeout(resolve, 1, CharToOpt(characters));
    });
  };

  const loadOptions = useCallback(
    debounce((inputText, callback) => {
      //getAsyncOptions(inputText).then((options) => callback(options));
      //setsearchString(inputText);
      callback(options);
    }, 500),
    []
  );

  const onChangeopt = debounce((inputText) => {
    setsearchString(inputText);
    console.log("opt");
    console.log(options);
  }, 500);

  const [inputValue, setInputValue] = useState("");

  return (
    <StyledContainer>
      Header
      {
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
      <>{JSON.stringify(options)}</>
      {/*       <AsyncSelect
        defaultValue={null}
        onInputChange={(newValue: string) => {
          console.log(newValue);
          setsearchString(newValue);
        }}
        onChange={(
          value: SingleValue<MyOptionType>,
          actionMeta: ActionMeta<MyOptionType>
        ) => {
          console.log(value);
          //dispatch(changeSearch("123"));
          router.push("/character/1");
        }}
        options={options}
        instanceId={useId()}
        isSearchable={true}
        loadOptions={loadOptions}
        defaultOptions={options}
      /> */}
    </StyledContainer>
  );
}
