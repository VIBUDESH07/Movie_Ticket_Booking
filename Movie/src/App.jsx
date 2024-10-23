
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* import Login from './Components/Login/Login'; */
import SignUp from './Components/Login/SignUp';
import { AddTheatre } from './Components/Theatres/AddTheatre';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTheatre/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<h1>Welcome to the Dashboard!</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
