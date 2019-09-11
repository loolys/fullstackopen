import React from "react";

import Header from "./Header/Header";
import Content from "./Content/Content";

const Course = ({ course }) => {
  const courses = course.map(item => {
    return (
      <div key={item.id}>
        <Header title={item.name} />
        <Content parts={item.parts} />
      </div>
    );
  });
  return <div>{courses}</div>;
};

export default Course;
