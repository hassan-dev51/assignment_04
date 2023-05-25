import Link from "next/link";

const Hero = () => {
  return (
    <section className=" flex justify-center items-center flex-col h-2/3 gap-6">
      <h1 className="text-4xl mb-6 text-white">Discover a World of Books</h1>
      <div className="text-2xl text-gray-300 text-center">
        <p>
          Immerse yourself in captivating stories, expand your knowledge, and
          indulge your imagination.
        </p>
        <p>
          Explore our vast collection of books, from bestsellers to hidden gems,
          and find your next literary adventure.
        </p>
      </div>
      <button className="bg-white py-1 px-6 rounded-3xl">
        <Link href="#books"> Explore Books</Link>
      </button>
    </section>
  );
};

export default Hero;
