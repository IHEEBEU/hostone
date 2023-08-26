import './App.css';
import Header from "./components/Header.jsx";
import UsersView from "./components/UsersView.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./components/Profile.jsx";
import Authentication from "./components/Authentication.jsx";
import Registration from "./components/Registration.jsx"; // Import the Registration component
import React, { useState } from "react"; // Remove unused useEffect import
import Home from './components/Home';

function App() {
  const [view, setView] = useState('authentication');
  const [currentuser, setCurrentuser] = useState({});
  const [ followed , setFollowed ]= useState([])
  const changenews = () => {
    setView("news");
  }

  const changeprofile = () => {
    setView("profile");
  }

  const changehome = () => {
    setView("home");
  }

  const changecontact = () => {
    setView("contact");
  }

  const login = () => {
    setView("");
  }

  const setCurrent = (user) => {
    setCurrentuser(user);
    console.log("hello this is ur current user", user);
  }
  const regist=()=>{
    setView("registration")
    console.log(view);
  }
  const auth=()=>{
   setView("authentication")
  }
  const followede = (flow) => {
    const newFlow = flow.filter(item => !followed.some(followedItem => followedItem._id === item._id));
  
    if (newFlow.length > 0) {
      setFollowed(prevFollowed => [...prevFollowed, ...newFlow]);
    }
  };
  return (
    <div className="App">
      {view === "authentication" ? (
        <Authentication 
          change={changehome}
          current={setCurrent}
          regist={regist}

        />
      ) : view === "registration" ? ( // Check if the view is registration
        <Registration auth={auth} /> // Display the Registration component
      ) : (
        <>
          <Header 
            changes={{
              changenews: changenews,
              changeprofile: changeprofile,
              changehome: changehome,
              changecontact: changecontact,
              pic: currentuser.image
            }}
          />
          <UsersView fol = {followede} />
          {view === "home" && <Home followed={followed}/>}
          {view === "news" && <News />}
          {view === "contact" && <Contact />}
          {view === "profile" && <Profile currentuser={currentuser}/>}
        </>
      )}
    </div>
  );
}

export default App;
