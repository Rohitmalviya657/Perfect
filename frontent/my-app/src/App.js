import './App.css';
import Create from './create';
import Login from './login';
import UserListWithDelete from './delet';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updatedelete' element={<UserListWithDelete />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
