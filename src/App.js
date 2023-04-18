import Empty from "./components/Empty/Empty";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <div >
     <Routes>
      <Route path="/" element={ <SignUpForm />}></Route>
      <Route path="/login" element={ <LoginForm />}></Route>
      <Route path="/empty" element={ <Empty />}></Route>
     </Routes>
     
    </div>
  );
}

export default App;
