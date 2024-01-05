'use client'
import { auth } from "@/services/firebase";
import { User, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useAuth } from "@/authMiddlewares";


export default function Dashboard() {

  const [ user , setUser ] = useState<User | null>(null)

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <span className="flex -mt-5 p-2 px-4 rounded-md bg-zinc-300
          text-zinc-950">{user?.displayName}</span>
          <p>next dashboard</p>
    </div>
  )
}

export const DashboardPage = () => {
  useAuth()
  return null
}

