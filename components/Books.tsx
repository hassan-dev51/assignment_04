import Link from "next/link";

export interface Book {
  id: any;
  bookName: string;
  bookAuthor: string;
  bookPrice: string;
  available: string;
  description: string;
}
export const getBooks = async () => {
  const res = await fetch("http://localhost:3000/api/books", {
    method: "GET",
  });
  const data = await res.json();

  return data;
};
const Books = async () => {
  const books = await getBooks();

  return (
    <section id="books" className="gradient text-black p-4">
      <h2 className="my-5 text-6xl text-gray-600 font-bold text-center">
        Our Products
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
        {books.map((book: Book) => (
          <div
            key={book.id}
            className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-[#000814] bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px]"
          >
            <Link href={`/book/${book.id}`}>
              <div className="justify-between items-start gap-5">
                <div className="flex-1  justify-start items-center gap-3  cursor-pointer ">
                  <div className="flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-600 text-4xl  capitalize">
                      {book.bookName}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 mt-4">
                      {book.available ? "Available" : "unavailable"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Books;
