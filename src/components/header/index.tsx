"use client"
import Link from "next/link";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const GoogleSignInButton = () => {

  const router = useRouter()

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        router.push("/dashboard")
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (

    <button
      onClick={handleGoogleSignIn}
      className="border px-6 text-zinc-200 rounded-sm cursor-pointer 
          duration-300 hover:scale-110 hover:bg-green-600
        hover:text-zinc-950 hover:border-none"
    >
      Acessar
    </button>
  );
};

export default function Header() {

  const [ user , setUser ] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });

    return () => unsubscribe()
  }, [router])

  const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          setUser(null)
          router.push("/")
        })
        .catch((error) => {
          console.log("Erro ao fazer logout:", error);
        });
  }

  return (
    <header className="bg-zinc-950 w-full h-20 flex items-center justify-center">
      <section className="md:w-3/4 w-full px-6 flex justify-between items-center">
        <nav className="flex items-center gap-6">
          <Link href={"/"}>
            <h1 className="text-zinc-200 text-2xl font-semibold">
              Tarefa
              <span className="text-red-500 text-2xl font-semibold">+</span>
            </h1>
          </Link>
          { user && (
            <Link className="px-6 bg-zinc-300 text-zinc-950 cursor-pointer" href="/dashboard">
              <span>Meu Painel</span>
            </Link>
          ) }
        </nav>
        {user ? (
            <button onClick={handleSignOut}
              className="text-red-500 border border-red-500 px-6">Sair</button>
          ):(
            <GoogleSignInButton />
        )}
      </section>  
    </header>
  );
}
