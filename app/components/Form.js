import React from "react";

const Form = props => (
  <form onSubmit={props.fetchData} className="form">
    <div className="search-input">
      <input
        type="text"
        name="streamer"
        placeholder="Search streamer"
        autoComplete="off"
        className="input"
      />
      <button type="submit">
        <i className="fa fa-search" aria-hidden="true" />
      </button>
    </div>
  </form>
);

export default Form;
