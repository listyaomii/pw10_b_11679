import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Gamepad2, Monitor, Rocket, Heart } from "lucide-react";
import CardBackground from "./components/card/CardBackground";
import Content from "./components/content/Content";
import Materi1 from "./components/materi/Materi1";
import Materi2 from "./components/materi/Materi2";
import TebakAngkaGame from "./components/game/TebakAngkaGame";
import FlagGuessingGame from "./components/guess/FlagGuessingGame.jsx"; 
import Image from "./assets/Image.jsx";

// Content data
const content = [
  {
    title: "SPIDER-MAN 2",
    image: Image.Poster1,
    platform: "PlayStation 5",
    release_date: "October 20, 2023",
    genre: "Fighting game, Action-adventure game",
  },
  {
    title: "ELDEN RING",
    image: Image.Poster2,
    platform: "PlayStation, Xbox, Microsoft Windows",
    release_date: "February 25, 2022",
    genre: "RPG, Dark Fantasy, Open World",
  },
  {
    title: "It Takes Two",
    image: Image.Poster3,
    platform: "PlayStation, Xbox, Nitendo, Microsoft Windows",
    release_date: "March 26, 2021",
    genre: "Co-op, Multiplayer, Split Screen",
  },
  {
    title: "The Legend of Zelda Breath of The Wild",
    image: Image.Poster4,
    platform: "Nitendo Switch, Wii U",
    release_date: "March 3, 2017",
    genre: "Action-adventure game, Puzzle Video Game",
  },
  {
    title: "Super Mario Bros. Wonder",
    image: Image.Poster5,
    platform: "Nintendo Switch",
    release_date: "October 20, 2023",
    genre: "Platform game",
  },
  {
    title: "Clash of Clans",
    image: Image.Poster6,
    platform: "Android, iOS",
    release_date: "August 2, 2012",
    genre: "Real-time strategy",
  },
];

function App() {
  return (
    <>
      <ToastContainer /> {/* Tambahkan di sini untuk level global */}
      {/* Landing Page Container */}
      <div className="container container-landing">
        <div className="contentLandingPage">
          <h1 className="text-center judul">Atma Jaya Game Center</h1>
          <p className="text">
            Unleash Your Playful Spirit at Atma Jaya Game Center
          </p>
        </div>

        {/* Icons for decoration */}
        <div className="iconContainer">
          <Gamepad2 className="iconGamePad" size={32} />
          <Monitor className="iconGameConsole" size={32} />
          <Heart className="iconHealthPotion" size={32} />
          <Rocket className="iconRocket" size={32} />
        </div>
      </div>

      {/* Content Section */}
      <div className="container container-content">
        <h1 className="judulContent">Content Game</h1>
        <CardBackground>
          <div className="kolom">
            {content.map((item, index) => (
              <Content
                key={index}
                title={item.title}
                image={item.image}
                platform={item.platform}
                release_date={item.release_date}
                genre={item.genre}
              />
            ))}
          </div>
        </CardBackground>
      </div>

      {/* Materi Sections */}
      <div className="container container-content">
        <h1 className="judulContent">Materi 1</h1>
        <CardBackground>
          <Materi1 />
        </CardBackground>
      </div>
      <div className="container container-content">
        <h1 className="judulContent">Materi 2</h1>
        <CardBackground>
          <Materi2 />
        </CardBackground>
      </div>

      {/* Game Tebak Angka Section */}
      <div className="container container-content">
        <h1 className="judulContent">Game 1</h1>
        <CardBackground>
          <TebakAngkaGame />
        </CardBackground>
      </div>

      {/* Game Tebak Bendera Section */}
      <div className="container container-content">
        <h1 className="judulContent">Game 2: Tebak Bendera</h1>
        <CardBackground>
          <FlagGuessingGame />
        </CardBackground>
      </div>
    </>
  );
}

export default App;
