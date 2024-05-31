import React from 'react';
import './Search.css'; // Importing the CSS file
import '../fonts.css'; // Import the new CSS file with the font-face rule

function Search() {
  return (
    <div className="Search">
      <div className="checkbox-table">
        <h1>검색 페이지</h1>
        <div className="input-text-group">
          <input className="form-field" type="text" placeholder="인장 강도" />
          <input className="form-field" type="text" placeholder="항복 강도" />
          <input className="form-field" type="text" placeholder="경도" />
          <input className="form-field" type="text" placeholder="연신율" />
          <button className="input-button">입력</button>
        </div>
      </div>
    </div>





















  );
}

export default Search;
