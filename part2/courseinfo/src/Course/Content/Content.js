import React from "react";

import Part from "./Part/Part";

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Content;
