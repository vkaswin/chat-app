import React, { useState } from "react";

import "./DragAndDrop.scss";

const DragAndDrop = () => {
  const [frameWorks, setFrameWorks] = useState([
    "React Js",
    "Angular",
    "Vue Js",
    "Next Js",
    "React Native",
    "Flutter",
    "Javascript",
  ]);

  let [, setState] = useState();

  let [destination, setDestination] = useState(null);

  let [source, setSource] = useState(null);

  let [draggableId, setDraggableId] = useState();

  const onDragStart = (event, index) => {
    document.getElementById(event.target.id).style.cursor = "grabbing";
    setTimeout(() => {
      document.getElementById(event.target.id).style.display = "none";
    }, 0);
    setSource(index);
    setDraggableId(event.target.id);
  };

  const onDrop = () => {
    document.getElementById(draggableId).style.display = "block";
    if (destination !== null) {
      let data = frameWorks;
      data.splice(destination, 0, frameWorks.splice(source, 1)[0]);
      setFrameWorks(data);
      setState(Math.random());
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="droppable-container" onDrop={() => onDrop()}>
            {frameWorks.map((item, index) => {
              return (
                <div
                  key={index}
                  id={`draggable-${index}`}
                  className="draggable"
                  draggable={true}
                  onDragStart={(event) => onDragStart(event, index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDragEnter={() => setDestination(index)}
                >
                  <b>{item}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
