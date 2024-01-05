import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const useAuth = () => {
    const router = useRouter()

    useEffect(() => {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (!user && router.pathname === "/dashboard") {
          router.replace("/");
        }
        return () => {
          unsubscribe()
        } 
      });        
    },[router ])
}