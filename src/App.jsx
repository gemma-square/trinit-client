import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from './components/navbar.jsx'; // Use PascalCase for component names
import Header from './components/header.jsx';
import About from './components/about.jsx';
import Login from "./components/signin.jsx";
import HelloWorld from "./components/HelloWorld.jsx";
import History from "./components/history.jsx";
import Models from "./components/models.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <div>
//       <HelloWorld />
//     </div>
//   );
// }

function HomePage() {
  return (
    <>
      <Header />
      <About />
    </>
  );
}

export default App;
