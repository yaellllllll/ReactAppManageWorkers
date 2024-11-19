import React, { FC, useEffect, useState } from 'react';
import userModel from '../../Model/userModel';
import './Full_details.scss';

interface FullDetailsProps {}

const FullDetails: FC<FullDetailsProps> = () => {
   const [users, setUsers] = useState<userModel[]>([]);

   useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const userData = await response.json();
          console.log(userData);
          const newUsers = userData.map((user: any) =>
           new userModel(user.name, user.id, user.username, user.email));
          setUsers(newUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);

   return (
      <div>
       <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                  {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    );
  };
  
  export default FullDetails;

