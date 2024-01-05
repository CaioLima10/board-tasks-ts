import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-zinc-950 w-full h-20 flex items-center justify-center">
      <section className="md:w-3/4 w-full px-6 flex justify-between items-center">
        <nav className="flex items-center gap-6">
          <Link href={"/"}>
            <h1 className="text-zinc-200 text-2xl font-semibold ">Tarefa 
              <span className="text-red-500 text-2xl font-semibold">+</span>
            </h1>
          </Link>
          <Link className="px-6 bg-zinc-300 text-zinc-950 cursor-pointer" href="/dashboard">
            <span>Meu Painel</span>
          </Link>
        </nav>
        <button 
          className="border px-6 text-zinc-200 rounded-sm cursor-pointer duration-300
          hover:scale-110 hover:bg-green-600 hover:text-zinc-950 hover:border-none
          "
        >Acessar
        </button>
      </section>
    </header>
  )
}
