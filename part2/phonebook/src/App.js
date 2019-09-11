import React, { useState, useEffect } from "react";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then(res => setPersons(res.data));
  }, []);

  const handleNameChange = e => setNewName(e.target.value);
  const handlePhoneNumberChange = e => setNewPhoneNumber(e.target.value);
  const handleFilterChange = e => setNewFilter(e.target.value);

  const addName = e => {
    e.preventDefault();
    const findName = persons.find(person => person.name === newName);
    if (findName === undefined) {
      const nameObject = {
        name: newName,
        number: newPhoneNumber
      };
      personService.create(nameObject).then(response => {
        setError(false);
        setMessage(`Added ${response.data.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhoneNumber("");
      });
    } else {
      const result = window.confirm("Do you want to update the number?");
      if (result) {
        personService
          .update(findName.id, { name: findName.name, number: newPhoneNumber })
          .then(res => {
            setPersons(
              persons.map(person => (person.id !== res.id ? person : res))
            );
            setMessage(`Changed ${res.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        setNewName("");
        setNewPhoneNumber("");
      }
    }
  };

  const deletePerson = id => {
    const result = window.confirm("Are you sure you want to delete?");

    if (result) {
      personService
        .deletePerson(id)
        .then(res => setPersons(res.data))
        .catch(err => {
          const person = persons.find(person => person.id === id);
          setError(true);
          setMessage(`Information of ${person.name} has been removed already`);
          setTimeout(() => {
            setMessage(null);
            setError(false);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
