"use client";
import { Book } from "@/components/Books";
import Navbar from "@/components/Navbar";

export const getBooks = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/books?id=${id}`, {
    method: "GET",
  });
  const data = await res.json();

  return data;
};
const SingleBook = async ({ params }: { params: { id: string } }) => {
  const book = await getBooks(params.id);
  const reserverd = () => {
    alert("reserverd");
  };
  return (
    <div className="bg-[#000814] h-screen">
      <Navbar />
      <div>
        {book.map((book: Book) => (
          <div
            key={book.id}
            className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-[#000814] bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter w-full"
          >
            <div className="justify-between items-start gap-5">
              <div className="flex-1  justify-start items-center gap-3  cursor-pointer ">
                <div className="flex-col">
                  <h3 className="font-satoshi font-semibold text-gray-600 text-4xl  capitalize">
                    {book.bookName}
                  </h3>
                  <p className="font-inter text-sm text-gray-500 mt-4">
                    Price | ${book.bookPrice} <br />
                    {book.available ? "Available" : "unavailable"}
                  </p>
                  <p className="text-gray-500 mt-4">{book.description}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={reserverd}
              className="text-[#000814] bg-blue-600 px-4 py-2 rounded-3xl mt-6"
            >
              Reserve Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBook;
