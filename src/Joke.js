import React from "react";
import "./Joke.css";

/** Presentational joke component with voting buttons */

function Joke({ joke, vote, votes }) {



  return (
    <div className="row">
        <div className="grid col-lg-12 col-xs-12 p-3 fw-bold text-white">
        <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={(e)=>vote(joke.id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={(e)=> vote(joke.id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{joke.joke}</div>
    </div>
        </div>
    </div>
  );
}

export default Joke;
