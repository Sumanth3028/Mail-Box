import Empty from "./components/Empty/Empty";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { Routes,Route } from "react-router-dom";
import MailBox from "./components/mailbox/MailBox";
import Sent from "./components/mailbox/Sent";
import SingleSent from "./components/mailbox/SingleSent";
import Inbox from "./components/mailbox/Inbox";
import SingleEmail from "./components/mailbox/SingleEmail";

function App() {
  return (
    <div >
     <Routes>
      <Route path="/" element={ <SignUpForm />}></Route>
      <Route path="/login" element={ <LoginForm />}></Route>
      <Route path="/empty" element={ <Empty />}></Route>
      <Route path="/mailbox" element={<MailBox/>}> </Route>
      <Route path="/sent" element={<Sent/>}> </Route>
      <Route path="/sent/:id" element={<SingleSent/>}> </Route>
      <Route path="/inbox" element={<Inbox/>}> </Route>
      <Route path="/inbox/:id" element={<SingleEmail/>}> </Route>
     </Routes>
     
    </div>
  );
}

export default App;
