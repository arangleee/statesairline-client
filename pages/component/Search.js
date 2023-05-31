import { useState } from "react";

function Search({ onSearch }) {
  const [textDestination, setTextDestination] = useState("");

  const handleSearchButton = () => {
    const departure = "ICN";
    const destination = textDestination === "" ? null : textDestination;
    onSearch({
      departure,
      destination,
    });
  };

  const handleChange = (e) => {
    setTextDestination(e.target.value.toUpperCase());
  };

  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.code === "Enter") {
      handleSearchButton();
    }
  };

  return (
    <fieldset>
      <legend>공항 코드를 입력하고, 검색하세요</legend>
      <span>출발지</span>
      <input id="input-departure" type="text" disabled value="ICN"></input>
      <span>도착지</span>
      <input
        id="input-destination"
        type="text"
        value={textDestination}
        onChange={handleChange}
        placeholder="CJU, BKK, PUS 중 하나를 입력하세요"
        onKeyDown={handleKeyDown}
      />
      <button id="search-btn" onClick={handleSearchButton}>
        검색
      </button>
    </fieldset>
  );
}

export default Search;
