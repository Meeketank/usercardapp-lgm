import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

const Navbar = styled.nav`
  background-color: #8E7F01;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const BrandName = styled.h1`
  font-size: 1.5rem;
`;

const Button = styled.button`
  background-color: #fff;
  color: #8E7F01;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: aliceblue;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  padding: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CardBody = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  color: #3498db;
  height: 30px;
  animation: rotate 2s linear infinite;
  margin: 2rem auto;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetUsers = async () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    }, 2000);
  };
  

  return (
    <>
      <Navbar>
        <BrandName>Tech.Meeket</BrandName>
        <Button onClick={handleGetUsers}>Get Users</Button>
      </Navbar>
      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <Grid>
          {users.map((user) => (
            <Card key={user.id}>
              <CardTitle>{`${user.first_name} ${user.last_name}`}</CardTitle>
              <CardBody>
                <p>{`Email: ${user.email}`}</p>
                <p>{`Avatar: ${user.avatar}`}</p>
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <p>     No users found, Click on "Get Users" to checkout     </p>
      )}
    </>
  );
}

export default App;
