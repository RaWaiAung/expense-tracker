import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './page/Auth/SignUp';
import Login from './page/Auth/Login';
import Expense from './page/Dashboard/Expense';
import Income from './page/Dashboard/Income';
import Home from './page/Dashboard/Home';
import ProtectRoute from './ui/ProtectRoute';
import UserProvider from './context/useContext';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={
            <ProtectRoute />
          }>
            <Route index path="/dashboard" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/income" element={<Income />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <Toaster
       toastOptions={{
        // className="",
        style: {
          fontSize: "13px"
        }
       }}
      />
    </UserProvider>
  )
}

export default App