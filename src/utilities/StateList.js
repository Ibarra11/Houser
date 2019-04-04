import React from "react";
import States from "../data/states";
export default function stateList() {
  return States.map(state => {
    return (
      <option key={state.abbreviation} value={state.abbreviation}>
        {state.abbreviation}
      </option>
    );
  });
}
