import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDeleteUser = (_id) => {
    console.log("delete user", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete user", data);
        if (data.deletedCount === 1) {
          alert("deleted successfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      });
  };
  return (
    <div>
      <h2>This users</h2>
      <h1>{users.length}</h1>

      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} <br />
            {user.email} <br />
            {user._id}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDeleteUser(user._id)}>Remove</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
