import React from "react";

const SearchBox = ({ value, onChange, style, placeholder }) => {
  console.log("PROPS: ", style);
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      style={style}
    ></input>
  );
};

export default SearchBox;
