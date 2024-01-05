import Image from "next/image";
import Astronaut from "../../public/assets/astronaut.png"

export default function Home() {
  return (  
      <div className="bg-zinc-950 flex justify-center items-center text-zinc-200 h-screen ">
        <header>
          <title>tarefa+ | Organize suas tarefas de forma facil</title>
        </header>

        <main className="flex flex-col items-center justify-center">
            <div>
              <Image 
                width={300}
                src={Astronaut} 
                alt="ASTRONAUTA" 
                priority
              />
            </div>
            <h1 className="text-center xl:text-1xl sm:text-2xl md:text-3xl font-medium">
              Sistema feito para você organizar <br />
              seus estudos e tarefas</h1>

              <div className="flex items-center justify-center gap-4 md:gap-8 mt-4">
                <section 
                  className=" p-1 sm:p-2 w-40 md:w-44  bg-zinc-200 text-zinc-950 
                    flex justify-center hover:scale-105 duration-300 mb-28">
                  <span>+12 posts</span>
                </section>

                <section 
                  className=" p-1 sm:p-2 w-40 md:w-44 bg-zinc-200 text-zinc-950 
                    flex justify-center hover:scale-105  duration-300 mb-28">
                  <span>+90 comentarios</span>
                </section>
              </div>
        </main>
      </div>
  )
}
