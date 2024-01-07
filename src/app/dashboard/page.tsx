'use client'
import { auth } from "@/services/firebase";
import { User, onAuthStateChanged } from "firebase/auth"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/authMiddlewares";
import Textarea from "@/components/textarea";

import { FiShare2 } from "react-icons/fi"
import { FaTrash } from "react-icons/fa"

import { db } from "@/services/firebase";
import { addDoc , collection, onSnapshot, orderBy, query, where, doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";

interface ITasksProps {
  id: string
  created: Date
  public: boolean
  task: string
  user: string
}

export default function Dashboard() {

  const [ user , setUser ] = useState<User | null>(null)
  const [ input , setInupt ] = useState("")
  const [ publicTasks , setPublicTasks ] = useState(false)
  const [ tasks , setTasks ] = useState<ITasksProps[]>([])

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

  const handleChangePublic = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    console.log(checked)

    setPublicTasks(checked)
  }

  const handleRegisterTasks = async (event: FormEvent) => {
    event.preventDefault()

    if(input === "") return

    try {
      await addDoc(collection(db , 'tasks'),{
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTasks
      })

      setInupt("")
      setPublicTasks(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.email) {
      const loadTasks = async () => {
        const tasksRef = collection(db, 'tasks');
        const queryTasks = query(
          tasksRef,
          orderBy("created", "desc"),
          where("user", "==", user.email)
        );
        onSnapshot(queryTasks, (snapShot) => {
          let lists = [] as ITasksProps[];
  
          snapShot.forEach((doc) => {
            lists.push({
              id: doc.id,
              user: doc.data().user,
              created: doc.data().created,
              task: doc.data().task,
              public: doc.data().public
            });
          });
          console.log(lists)
          setTasks(lists);
        });
      };
      loadTasks();
    }
  }, [user?.email]);

  const handleCopiedTasks = async (id: string) => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/tasks/${id}`
    )
    console.log("copiado com sucesso!!")
  }

  const handleDeleteTasks = async (id: string) => {
    const deleteTask =  doc(db , "tasks", id) 
    await deleteDoc(deleteTask)
  }
  

  return (
    <div className="bg-zinc-950 w-full min-h-screen  flex items-center justify-center text-zinc-200">
    { user?.displayName && <main className="mt-10 md:w-3/4 w-full  px-6 flex flex-col ">
        <section className="w-full ">
          <div>
            <h1 className="text-2xl font-semibold">
              Qual sua tarefa 
              <span className="text-red-500">?</span> 
            </h1>
            <form onSubmit={handleRegisterTasks}>
              <Textarea
                placeholder="Digite qual sua tarefa..."
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => 
                setInupt(event.target.value)}
              />
              <div className="flex items-center gap-2">
                <input 
                  className="checkbox" 
                  type="checkbox"  
                  checked={publicTasks}
                  onChange={handleChangePublic}  
                />
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
        <section className="mb-20">
          <div className="w-full flex items-center justify-center mb-4 mt-4">
            <h1 className="text-2xl">Minhas tarefas</h1>
          </div>
          { tasks.map((task) => (
          <article key={task.id} className="bg-zinc-200 text-zinc-950 rounded-md border p-3 mb-4">
            { task.public && <div className="flex items-center gap-3">
              <label className="text-sm bg-blue-500 px-6 py-1 text-zinc-100 rounded-md">PUBLICO</label>
              <button className="cursor-pointer" onClick={() => handleCopiedTasks(task.id)}>
                <FiShare2 size={22} className="text-blue-500"/>
              </button>
            </div>}
            <div className="w-full flex items-center justify-between">
              <p className="whitespace-pre-wrap">
                {task.public ? (
                  <Link href={`/task/${task.id}`}>{task.task}</Link>
                ):(
                  <p>{task.task}</p>
                )}
              </p>
              <button className="cursor-pointer" onClick={() => handleDeleteTasks(task.id)}>
                <FaTrash size={24} className="text-red-500"/>
              </button>
            </div>
            </article>
          )) }
        </section>
      </main> || <div>entre com sua conta google...</div>}
    </div>
  )
}

export const DashboardPage = () => {
  useAuth()
  return null
}

