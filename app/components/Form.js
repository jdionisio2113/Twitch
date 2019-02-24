var React = require("react");

const Form = props => (
  <form onSubmit={props.fetchData} className="searchInput">
    <input
      type="text"
      name="streamer"
      placeholder="streamer"
      autoComplete="off"
    />
    <button type="submit">
      {/* <i className="fa fa-search" aria-hidden="true" /> */}
      Search
    </button>
  </form>
);

module.exports = Form;
