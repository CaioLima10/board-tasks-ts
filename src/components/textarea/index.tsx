import { HTMLProps } from "react";

export default function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea className="w-full h-40 outline-none p-4 resize-none mb-2 mt-2" {...rest}></textarea>
  )
}
