import React from 'react';

export const SearchPanel = ({ users, param, setParam }) => {
  const handleInput = (event) => {
    setParam({
      ...param,
      name: event.target.value
    });
  };

  const handleSelect = (event) => {
    setParam({
      ...param,
      personId: event.target.value
    });
  };

  return (
    <>
      <input value={param.name} onChange={handleInput} />
      <select value={param.personId} onChange={handleSelect}>
        <option value="">负责人</option>
        {
          users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))
        }
      </select>
    </>
  );
};