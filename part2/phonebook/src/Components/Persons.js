import React from "react";

const Persons = ({ newFilter, persons, deletePerson }) => {
  const personsToShow = newFilter
    ? persons.filter(
        person =>
          person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
      )
    : persons;
  const personList = personsToShow.map(person => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
  ));

  return personList;
};

export default Persons;
