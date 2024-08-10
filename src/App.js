import logo from "./logo.svg";
import "./App.css";
import Auth0ProviderWithHistory from "./auth0Provider";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <div className="App ">
        <header className="flex flex-col justify-between items-center">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </header>
      </div>
    </Auth0ProviderWithHistory>
  );
}

export default App;
