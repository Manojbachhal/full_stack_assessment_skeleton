import React from "react";
import { UserSelectProps } from "../interfaces/interfaces";

const UserSelect = ({ selectedUser, users, onUserChange }: UserSelectProps) => {
  return (
    <div className="mb-4 flex justify-end items-center">
      <label htmlFor="user-select" className="mr-2">
        Select User:
      </label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={onUserChange}
        className="border p-2 rounded"
      >
        <option value="" disabled>
          None
        </option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
