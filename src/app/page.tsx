"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit=()=>
  {
    console.log(email)
    setEmail("")
  }

  return (
  <main className="main-container font-Sans bg-black h-screen p-10">
   <section className="nav flex justify-between items-center">
<div>
 <Image src="/logo-white.svg" width={150} height={100} alt="revise-logo"/>
</div>
<div className="flex justify-center items-center gap-4">
  <form onSubmit={handleSubmit}>
  <input 
  className="outline-none p-3 border border-primary bg-black placeholder-primary text-primary w-72" 
  placeholder="Enter your email" 
  type="email" 
  name="email" 
  value={email} 
  onChange={(e: any): void => setEmail(e.target.value)} 
/>
  </form>
  
  <button className="bg-primary text-black px-5 py-[0.75rem] text-sm font-semibold rounded-md">
<Link href="">
    Join The Waitlist
</Link>
  </button>
</div>
   </section>
   <section  className="  flex flex-col justify-center items-center text-center gap-2 mt-28">
    <h1 className="text-white  text-[4rem] w-4/5 leading-[1.25] font-medium"> Get <span className="text-primary">accurate</span> 💡 code reviews  in <span className="text-primary">seconds</span>⏱️</h1>
      <p className="text-lg light text-white w-3/5 italic">Revise is an AI-powered code review assistant designed to seamlessly integrate with your version control systems like GitHub and GitLab. Our tool provides automated code reviews, offering actionable suggestions to improve code quality, optimize performance, and ensure adherence to coding standards.
<br/>
With Revise, developers and teams can streamline their code review process, catching issues early and maintaining high-quality codebases effortlessly. Whether you&apos;re a solo developer or part of a larger team, Revise helps you code with confidence.</p>
   </section>
  </main >
   
   
  );
}
