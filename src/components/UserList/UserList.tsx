import React, { FC, useEffect, useState, useRef } from 'react';
import ApiService from '../../services/Api.service';
import userModel from '../../Model/userModel';
import User_Details from '../User_Details/User_Details';
import My_Modal from '../My_Modal/My_Modal';
import FullDetails from '../Full_details/Full_details'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ReactDOM from 'react-dom';
import UserMesseges from '../UserMesseges/UserMesseges';


interface UserListProps { }

const UserList: FC<UserListProps> = () => {
  const [users, setUsers] = useState<userModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<userModel | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [IsShowMesseges, setShowMesseges] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const addUser = (userToAdd: userModel) => {
    alert("User added");
    const updatedUsers = [...users, userToAdd];
    const FilteredUsers = [...filteredUsers, userToAdd];
    setUsers(updatedUsers);
    setFilteredUsers(FilteredUsers);
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await ApiService.getListApi();
      const data = response.data;
      const usersData = data.map((user: any) =>
        new userModel(user.name, user.id, user.username, user.email)
      );
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = (searchTerm: string) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearchInputChange = () => {
    if (searchInputRef.current) {
      filterUsers(searchInputRef.current.value);
    }
  };


  const handleDeleteUser =  () => {
    try {
      if (selectedUser) {
        const updatedUsers=  ApiService.deleteApi(selectedUser.id);
        const updatedUsers1 = users.filter(user => user.id !== selectedUser.id);
        setUsers(updatedUsers1);
        setFilteredUsers(updatedUsers1);
        console.log(`Deleting user: ${selectedUser.name}`);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  };

  const handleShowModal = (user: userModel) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleFullDetailsClick = () => {
    ReactDOM.render(<FullDetails />, document.getElementById('root'));
  };

  const showMesseges = (user: any) => {
    setSelectedUser(user);
    setShowMesseges(true);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <User_Details addUser={addUser} />
        </div>
        <div className="col-md-6">
          <div>
            <My_Modal
              modalTitle="Delete User"
              onApproveClick={handleDeleteUser}
              showModal={showModal}
              onClose={() => setShowModal(false)}
            >
              {selectedUser && `Are you sure you want to delete ${selectedUser.name}?`}
            </My_Modal>
          </div>
           {/* Render UserMesseges component conditionally based on IsShowMesseges state */}
        {IsShowMesseges && selectedUser && (
          <div>
            <UserMesseges idUser={selectedUser.id} nameUser={selectedUser.name} />
          </div>
        )}
          <div className="user-list-container">
            <input
              type="text"
              placeholder="Search by name"
              ref={searchInputRef}
              onChange={handleSearchInputChange}
              className="form-control"
            />
            {loading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading...</p>
              </div>
            )}
            {!loading && (
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th color='#03e9f4'>UserName</th>
                    <th color='#03e9f4'>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td><button onClick={() => handleShowModal(user)} className="btn btn-warning">Delete</button></td>
                      <td><button className="btn btn-danger" onClick={() => showMesseges(user)}>watch messeges</button></td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="text-center">
              <button onClick={handleFullDetailsClick} className="btn btn-primary">Full details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
