"use client";

import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import dataSet from "@/constants/khodam-dataset.json";

const texts = [
  "Selamat datang di Khodam-Checker!",
  "Cek Khodam anda sekarang,",
  "Jadikan Khodam anda sebagai Keberuntungan.",
];

interface KhodamType {
  id: number;
  name: string;
  power: string;
  element: string;
  origin: string;
  description: string;
}

export default function Home() {
  const [dataKhodam, setDataKhodam] = useState<KhodamType | null>(null);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      const khodamKosong: KhodamType = {
        id: 0,
        description: "-",
        name: "Kosong",
        origin: "-",
        power: "-",
        element: "-",
      };
      const khodam = dataSet?.[Math.floor(Math.random() * 160)] ?? khodamKosong;
      setDataKhodam(khodam);
      Swal.fire({
        title: `Hai ${values.name}, Khodam anda adalah ${khodam.name}`,
        text: `${khodam.description}`,
        imageUrl: `https://picsum.photos/id/${khodam.id}/200/300`,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
  });

  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeText = () => {
      if (charIndex < texts[textIndex].length) {
        setCurrentText((prev) => prev + texts[textIndex].charAt(charIndex));
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setCurrentText("");
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000); // Delay sebelum mengetik kalimat berikutnya
      }
    };

    const typingTimeout = setTimeout(typeText, 100); // Kecepatan mengetik

    return () => clearTimeout(typingTimeout);
  }, [charIndex, textIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-horror-black to-horror-darkRed">
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg p-10 bg-horror-black bg-opacity-70 rounded-lg shadow-lg border border-horror-darkRed">
        <div className="flex flex-col items-center justify-center min-h-[50%] p-4">
          <h1 className="text-4xl font-horror text-horror-red mb-6">
            Mystic Horror
          </h1>
          <div className="typing-container">
            <p className="typing-text">{currentText}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Nama"
              className="w-full text-black px-4 py-2 border border-mystic-dark rounded-lg bg-horror-black text-mystic-light focus:outline-none focus:ring-2 focus:ring-horror-red"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <button
            type="submit"
            className="w-full hover:bg-slate-700 py-1 px-4 bg-horror-red text-mystic-light font-bold rounded-lg hover:bg-horror-darkRed transition duration-200"
          >
            Submit
          </button>
        </form>

        {dataKhodam && (
          <div className="p-5">
            <div
              aria-label="card-item-v3"
              className="flex flex-col w-[400px] rounded-xl bg-white border border-gray-100 p-5"
            >
              <div className="relative flex-shrink-0 mb-5 h-[250px]">
                <img
                  src={`https://picsum.photos/id/${dataKhodam.id}/200/300`}
                  alt={dataKhodam.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 text-black">
                <h3 className="text-lg font-bold">{dataKhodam.name}</h3>
                <span className="text-sm font-sans text-gray-700 italic">
                  Element: {dataKhodam.element}
                </span>
                <span className="text-sm font-sans text-gray-700 italic">
                  Habitat: {dataKhodam.origin}
                </span>
                <span className="mb-3 text-sm font-sans text-gray-700 italic">
                  Kekuatan: {dataKhodam.power}
                </span>
                <p>{dataKhodam.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
