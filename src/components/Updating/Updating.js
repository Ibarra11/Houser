import React from "react";
import { FadeLoader } from "react-spinners";
let Updating = function(props) {
  if (props.isUpdating) {
    return (
      <div className="updating-component">
        <h2>{props.title}</h2>
        <FadeLoader size={50} color={"#fff"} loading={props.isUpdating} />
      </div>
    );
  } else {
    return <div className="nonUpdating-component">{props.children}</div>;
  }
};

export default Updating;
