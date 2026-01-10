import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const ANIMALS = [
  "Lion",
  "Tiger",
  "Bear",
  "Wolf",
  "Eagle",
  "Shark",
  "Panther",
  "Leopard",
  "Cheetah",
  "Falcon",
  "Hawk",
  "Phoenix",
  "Dragon",
  "Cobra",
  "Viper",
  "Raven",
  "Condor",
  "Jaguar",
  "Puma",
  "Lynx",
  "Orca",
  "Barracuda",
  "Mantis",
  "Scorpion",
  "Hornet",
  "Wasp",
  "Spider",
  "Tarantula",
  "Anaconda",
  "Python",
  "Rattlesnake",
  "Mamba",
  "Grizzly",
  "Kodiak",
  "Polar",
  "Hyena",
  "Coyote",
  "Fox",
  "Jackal",
  "Wolverine",
  "Badger",
  "Mongoose",
  "Osprey",
  "Vulture",
  "Kite",
  "Harrier",
  "Buzzard",
  "Rhino",
  "Buffalo",
  "Bison",
  "Moose",
  "Elk",
  "Stag",
  "Ram",
  "Bull",
  "Stallion",
  "Mustang",
  "Bronco",
  "Cougar",
  "Bobcat",
];

const STORAGE_KEYS = "secure-chat-username";

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const main = () => {
      const storedUsername = localStorage.getItem(STORAGE_KEYS);

      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEYS, generated);
      setUsername(generated);
    };
    main();
  }, []);

  return { username };
};
