import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
 
  const [isLoading, setIsLoading] = useState(true);
  
  /* get jokes if there are no jokes */

  useEffect(function () {
    async function getJokes() {
      let j = [...jokes];
    
      let seenJokes = new Set(jokes.map(j=> j.id));
      console.log(seenJokes, 'seenjokes')
      try {
        while (j.length < numJokesToGet) {
          let res = await axios.get(process.env.REACT_APP_KEY, {
            headers: { Accept: "application/json" }
          });
          let { ...jokeObj } = res.data;
            if(jokeObj && !seenJokes.has(jokeObj.id)){
                seenJokes.add(jokeObj.id)
                j.push({...jokeObj, votes: 0})
            } else{
              console.log("duplicate data")
            }
        }
        setJokes(j);
        setIsLoading(false)
      } catch (err) {
        console.error(err);
      }
    }
      // Load jokes from local storage if available
      // const storedJokes = localStorage.getItem("jokes");
      // if (storedJokes) {
      //   setJokes(JSON.parse(storedJokes));
      //   setIsLoading(false);
      // } else 
      if (jokes.length === 0) {
        getJokes();
      }

  }, [jokes, numJokesToGet]);



  /* empty joke list and then call getJokes */

  function generateNewJokes() {
    setJokes([]);
    setIsLoading(true);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, num) {
    setJokes(jokes => {
       const updateJokes = jokes.map(j => {
              if(j.id === id){
                let newVotes = j.votes + num;
                newVotes = Math.max(0, newVotes)
                return {...j, votes: newVotes}
              }
              return j;
       });
      //  localStorage.setItem("jokes", JSON.stringify(updateJokes))
       return updateJokes;
    }
      
    );
  }

  /* render: either loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
      )
  }

  // let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
console.log(jokes, 'jokesobj')
  return (
    <div className="JokeList">
      <button className="btn bg-success mt-4 mb-4 text-white fw-bold" onClick={generateNewJokes}>
        Get New Jokes
        </button>

      {jokes.map((joke) => ( <Joke joke={joke} key={joke.id} votes={joke.votes} vote={vote} /> ))}
    </div>
  );
}

export default JokeList;
