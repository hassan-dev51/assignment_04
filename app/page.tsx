import Books from "@/components/Books";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main>
      <div className="hero-section">
        <Navbar />
        <Hero />
      </div>
      <div>
        {/* @ts-expect-error */}
        <Books />
      </div>
    </main>
  );
}
