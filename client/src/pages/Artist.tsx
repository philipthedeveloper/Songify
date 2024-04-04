import styled from "styled-components";
import alphabets from "@/data/alphabets.json";
import genres from "@/data/genres.json";
import { DivWithoutScrollBar } from "@/components/DivWithoutScrollBar";

const Artist = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-dvh md:h-dvh md:overflow-hidden md:min-h-full">
      <LeftSection className="col-span-1 md:col-span-2 bg-[var(--faded-white)] h-full overflow-y-auto">
        <Filter />
      </LeftSection>
      <RightSection className="col-span-1 md:col-span-3 bg-[var(--auth-bg)]">
        <Artists />
      </RightSection>
    </div>
  );
};

const LeftSection = styled(DivWithoutScrollBar)``;

const RightSection = styled.div``;

const Artists = () => {
  return <div>Artis</div>;
};

const Filter = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-12">
      <AlphabetFilter /> <GenreFilter />
    </div>
  );
};

const AlphabetFilter = () => {
  return (
    <div>
      <FilterHeader>By Alphabet</FilterHeader>
      <Alpabets>
        {alphabets.map((alphabet) => (
          <Alphabet alphabet={alphabet} />
        ))}
      </Alpabets>
    </div>
  );
};

const Alpabets = styled.div`
  display: grid;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0 1rem;
  grid-template-columns: repeat(auto-fit, 40px);
`;

interface AlphabetProps {
  alphabet: string;
}

const Alphabet = ({ alphabet }: AlphabetProps) => {
  return (
    <button
      className="w-9 h-9 aspect-square rounded-full grid place-items-center bg-white hover:bg-[var(--auth-bg)] hover:text-white text-sm"
      style={{ transition: "0.4s ease" }}
    >
      {alphabet}
    </button>
  );
};

const GenreFilter = () => {
  return (
    <div>
      <FilterHeader>By Genre</FilterHeader>
      <Genres>
        {genres.map((genre) => (
          <Genre genre={genre} />
        ))}
      </Genres>
    </div>
  );
};

const Genres = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  padding: 0rem 1rem;
  align-items: flex-start;
`;

interface GenreProps {
  genre: string;
}

const Genre = ({ genre }: GenreProps) => {
  return (
    <button
      className="px-4 py-2 rounded-full grid place-items-center bg-white hover:bg-[var(--auth-bg)] hover:text-white text-xs"
      style={{ transition: "0.4s ease" }}
    >
      {genre}
    </button>
  );
};

const FilterHeader = styled.h3`
  padding: 0.5rem 1rem;
  // background: #fff;
  color: #fff;
  width: max-content;
  border-radius: 5rem;
  cursor: pointer;
  background-color: var(--base-color);
  // color: var(--base-color);
  // box-shadow: var(--box-shadow);
`;

export default Artist;
