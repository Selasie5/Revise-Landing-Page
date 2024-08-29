"use client"
import Link from "next/link";
import Image from "next/image";
import { ReactEventHandler, useState } from "react";
import { useStyleRegistry } from "styled-jsx";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const mailerApiKey= process.env.NEXT_PUBLIC_MAILERLITE_API_KEY;
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>
  {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${mailerApiKey}`, 
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: "Subscriber", 
          },
          // groups: ["4243829086487936"], // Optional: add group IDs here
        }),
      });

      if (response.ok) {
        setSuccess("You have successfully joined the waitlist!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
      setEmail(""); // Clear the input field after submission
    }
   
  }

  return (
    <main className="main-container font-Sans bg-black  md:h-screen p-10">
      <section className="nav flex flex-col gap-10 md:gap-0 md:flex-row justify-between items-center">
        <div>
          <Image src="/logo-white.svg" width={150} height={100} alt="revise-logo" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col justify-between items-start gap-2">
              <div className="flex justify-center items-center gap-4">
              <input
              className="rounded-md outline-none p-3 border border-primary bg-black placeholder-primary text-primary w-72"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e: any): void => setEmail(e.target.value)}
              required
            />
            <button
              className="bg-primary text-black px-5 py-[0.75rem] text-sm font-semibold rounded-md"
              type="submit"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join The Waitlist"}
            </button>
              </div>
              <div className="w-full">
              {error && <p className="bg-red-200 px-5 py-3 rounded-full text-red-500 mt-4">❗{error}</p>}
              {success && <p className="bg-primary/10 px-5 py-2 rounded-full text-primary mt-4">✅ {success}</p>}
              </div>
            </div>
           
          
          </form>
        </div>
      </section>

      

      <section className="flex flex-col justify-center items-center text-center gap-2 mt-28">
        <h1 className="text-white text-[4rem] w-4/5 leading-[1.25] font-medium">
          Get <span className="text-primary">accurate</span> 💡 code reviews in <span className="text-primary">seconds</span>⏱️
        </h1>
        <p className="text-lg light text-white md:w-3/5 italic">
          Revise is an AI-powered code review assistant designed to seamlessly integrate with your version control systems like GitHub and GitLab. Our tool provides automated code reviews, offering actionable suggestions to improve code quality, optimize performance, and ensure adherence to coding standards.
          <br />
          With Revise, developers and teams can streamline their code review process, catching issues early and maintaining high-quality codebases effortlessly. Whether you&apos;re a solo developer or part of a larger team, Revise helps you code with confidence.
        </p>
      </section>
    </main>
  );
}
