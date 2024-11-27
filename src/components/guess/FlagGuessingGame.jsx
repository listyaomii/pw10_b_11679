import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FlagGuessingGame.css"; // Pastikan file CSS ini sudah benar terhubung

const FlagGuessingGame = () => {
  // Data bendera dan negara
  const flagsData = [
    { country: "Indonesia", flag: "https://flagcdn.com/id.svg" },
    { country: "United States", flag: "https://flagcdn.com/us.svg" },
    { country: "Japan", flag: "https://flagcdn.com/jp.svg" },
    { country: "Brazil", flag: "https://flagcdn.com/br.svg" },
    { country: "France", flag: "https://flagcdn.com/fr.svg" },
    { country: "South Africa", flag: "https://flagcdn.com/za.svg" },
    { country: "Australia", flag: "https://flagcdn.com/au.svg" },
    { country: "India", flag: "https://flagcdn.com/in.svg" },
    { country: "Germany", flag: "https://flagcdn.com/de.svg" },
    { country: "Canada", flag: "https://flagcdn.com/ca.svg" },
  ];

  // Maksimal pertanyaan yang ingin ditanyakan (5 pertanyaan)
  const maxQuestions = 5;
  // Maksimal kesalahan yang diizinkan
  const maxWrongAnswers = 3;

  // State untuk pertanyaan saat ini, skor, jumlah kesalahan, dan opsi jawaban
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [options, setOptions] = useState(shuffleOptions(currentQuestion));

  // Fungsi untuk mengacak opsi jawaban
  function shuffleOptions(index) {
    const correctCountry = flagsData[index].country;
    const otherCountries = flagsData
      .filter((_, i) => i !== index)
      .map((data) => data.country);
    let randomOptions = shuffleArray(otherCountries).slice(0, 3);

    // Tambahkan pemeriksaan untuk menghindari duplikasi
    if (!randomOptions.includes(correctCountry)) {
      randomOptions.push(correctCountry);
    }

    return shuffleArray(randomOptions);
  }

  // Fungsi untuk mengacak array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Fungsi untuk menangani jawaban
  const handleAnswer = (selectedCountry) => {
    const correctCountry = flagsData[currentQuestion].country;
    if (selectedCountry === correctCountry) {
      toast.success("Benar!");
      setScore(score + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      toast.error(`Salah! Jawaban yang benar adalah ${correctCountry}`);
    }

    // Jika sudah salah 3 kali, game berakhir
    if (wrongAnswers + 1 === maxWrongAnswers) {
      toast.error("Game Over! Anda sudah salah 3 kali. Game akan diulang!");
      // Reset game ke kondisi awal
      setCurrentQuestion(0);
      setScore(0);
      setWrongAnswers(0);
      setOptions(shuffleOptions(0));
    } else {
      // Lanjut ke pertanyaan berikutnya jika belum mencapai batas maksimal
      if (currentQuestion < maxQuestions - 1) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setOptions(shuffleOptions(nextQuestion));
      } else {
        // Jika sudah mencapai batas pertanyaan, game kembali ke awal
        if (score === maxQuestions) {
          toast.info(`Selamat! Skor Anda: ${score}/${maxQuestions}. Game akan diulang!`);
        }
        // Reset game ke kondisi awal
        setCurrentQuestion(0);
        setScore(0);
        setWrongAnswers(0);
        setOptions(shuffleOptions(0));
      }
    }
  };

  return (
    <div className="game-container">
      <h2 className="materi-title">Tebak Bendera Negara</h2> {/* Gaya judul */}
      <p className="materi-subtitle2">Point: {score}</p> {/* Gaya subtitle, menampilkan Point: {score} */}
      <p className="materi-subtitle2">Kesalahan Anda: {wrongAnswers}/{maxWrongAnswers}</p> {/* Gaya kesalahan */}

      {currentQuestion < maxQuestions && wrongAnswers < maxWrongAnswers ? (
        <div>
          <img
            src={flagsData[currentQuestion].flag}
            alt="Flag"
            className="flag-image"
          />
          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={() => window.location.reload()} className="restart-btn">
          Restart Game
        </button>
      )}
    </div>
  );
};

export default FlagGuessingGame;
