import logo from './logo.svg';
import './App.css';
import Create from './create';
import Login from './login';
import UpdateImageByEmail from './Update';
import UserListWithDelete from './delet';
function App() {
  return (

    <>
      {/* <Create></Create> */}
      <UserListWithDelete></UserListWithDelete>
      {/* <Login></Login> */}
      {/* <UpdateImageByEmail></UpdateImageByEmail> */}
    </>
  );
}

export default App;
