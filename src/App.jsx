import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import AllContacts from "./components/All-Contacts.jsx";
import USAContacts from "./components/USA-Contacts.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2/" element={<Problem2 />}>
            <Route path="all-contacts" element={<AllContacts />} />
            <Route path="usa-contacts" element={<USAContacts />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
