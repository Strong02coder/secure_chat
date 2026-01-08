"use client";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ANIMALS = ["Lion", "Tiger", "Bear", "Wolf", "Eagle", "Shark", "Panther", "Leopard", "Cheetah", "Falcon", "Hawk", "Phoenix", "Dragon",
  "Cobra", "Viper", "Raven", "Condor", "Jaguar", "Puma", "Lynx", "Orca", "Barracuda", "Mantis", "Scorpion", "Hornet", "Wasp", "Spider",
  "Tarantula", "Anaconda", "Python", "Rattlesnake", "Mamba", "Grizzly", "Kodiak", "Polar", "Hyena", "Coyote", "Fox", "Jackal", "Wolverine","Badger", "Mongoose", "Osprey", "Vulture", "Kite", "Harrier", "Buzzard", "Rhino", "Buffalo", "Bison", "Moose", "Elk", "Stag", "Ram", "Bull", "Stallion", "Mustang", "Bronco", "Cougar", "Bobcat",
];

const STORAGE_KEYS = "secure-chat-username";

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(7)}`;
};

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

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
    }
    main();
  }, []);

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
      
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">{">"}private_chat</h1>
          <p className="text-zinc-500 text-sm">A private, self-destructing chat room.</p>
        </div>
        <div className="border border-zinc-800 bg-zinc-800/50 p-6 backdrop-blur-md rounded-xl">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex-itemx-center text-zinc-500">
                Your Identity
              </label>
              <div className="flex-items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono rounded-xl">
                  {username}
                </div>
              </div>
            </div>

            <button onClick={() => createRoom()} className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50 rounded-xl">
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
