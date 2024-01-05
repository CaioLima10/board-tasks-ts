'use client'
import { auth } from "@/services/firebase";
import { User, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useAuth } from "@/authMiddlewares";
import Textearea from "@/components/textearea";


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
    <div className="bg-zinc-950 w-full flex items-center justify-center text-zinc-200">
    { user?.displayName && <main className="md:w-3/4 w-full  px-6 flex mt-10">
        <section className="w-full">
          <div>
            <h1 className="text-2xl font-semibold">
              Qual sua tarefa 
              <span className="text-red-500">?</span> 
            </h1>
            <form>
              <Textearea
                placeholder="Digite qual sua tarefa..."
              />
              <div className="flex items-center gap-2">
                <input className="checkbox" type="checkbox"  />
                <label>Deixa tarefa publicada</label>
              </div>
              <button
                className="w-full p-2 bg-blue-500 rounded-md mt-4 text-1xl font-medium"
                type="submit">
                Confirmar
              </button>
            </form>
          </div>
        </section>
      </main> || <div>entre com sua conta google...</div>}
    </div>
  )
}

export const DashboardPage = () => {
  useAuth()
  return null
}

