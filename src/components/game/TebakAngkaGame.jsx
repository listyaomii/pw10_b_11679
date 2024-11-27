import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Eye, EyeOff, Brain } from "lucide-react";
import "./TebakAngkaGame.css";

const TebakAngkaGame = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [chances, setChances] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [buttonText, setButtonText] = useState("Tebak");

  // Fungsi untuk menghasilkan angka random antara 1-10
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  // Fungsi untuk menangani proses tebakan
  const handleGuess = () => {
    if (!guess || isNaN(guess) || guess < 1 || guess > 10) {
      toast.error("Masukkan angka antara 1-10!");
      return;
    }

    const userGuess = parseInt(guess, 10);

    if (userGuess === randomNumber) {
      toast.success("Tebakan Anda benar!");
      resetGame();
      return;
    }

    const remainingChances = chances - 1;
    setChances(remainingChances);

    if (remainingChances === 0) {
      toast.error(`Game Over! Jawaban benar adalah ${randomNumber}`);
      resetGame();
      return;
    }

    if (userGuess < randomNumber) {
      toast.warning("Tebakan terlalu rendah!");
    } else {
      toast.warning("Tebakan terlalu tinggi!");
    }

    setGuess("");
    setButtonText("Coba Lagi");
  };

  const resetGame = () => {
    setRandomNumber(generateRandomNumber());
    setChances(5);
    setGuess("");
    setButtonText("Tebak");
    toast.info("Game Baru Dimulai!");
  };

  return (
    <div className="game-container1">
      <div className="game-card">
        <h2>
          <Brain size={32} style={{ marginRight: "10px" }} />
          Tebak Angka
        </h2>

        {/* Tombol untuk menampilkan jawaban dan kotak angka */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`show-answer-btn ${showAnswer ? "active" : ""}`}
          >
            {showAnswer ? (
              <EyeOff size={20} color="#000" />
            ) : (
              <Eye size={20} color="#fff" />
            )}
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {showAnswer && (
            <div className="hidden-answer-box">{randomNumber}</div>
          )}
        </div>

        {/* Informasi dan input tebakan */}
        <p>Tebak angka antara 1 - 10</p>
        <p>Kesempatan: {chances}/5</p>
        <input
          type="number"
          value={guess}
          onChange={handleInputChange}
          placeholder="Masukkan tebakan..."
          className="input-box"
        />
        <br />

        {/* Tombol untuk menebak */}
        <button onClick={handleGuess} className="guess-btn">
          {buttonText}
        </button>

        {/* Progress Dots */}
        <div className="progress-dots">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`dot ${index < 5 - chances ? "" : "active"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TebakAngkaGame;
