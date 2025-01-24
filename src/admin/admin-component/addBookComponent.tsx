import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeletePopup from "@/admin/admin-component/deletePopup";

interface Book {
    bookId: string;
    title: string;
    description: string;
    author: string;
    price: number;
    category: string;
}





function AddBookComponent() {
    const [bookDetail, setBookDetails] = useState<Book[]>([]);
    const [isBookDetail, setIsBookDetails] = useState<boolean>(false);

    const [bookId, setBookId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState<string>("Client");

    function createBook(e: FormEvent) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("*********1")
        if (!token) {
            alert("Unauthorized! Please log in.");
            return;
        }
        console.log("*********2")
        if (!price || isNaN(Number(price))) {
            alert("Please enter a valid price.");
            return;
        }
        console.log("*********3")
        if (!category) {
            alert("Please select a category.");
            return;
        }
        console.log("*********4")

        const newBook: Book = {
            bookId,
            title,
            description,
            author,
            price,
            category,
        };
        console.log("*********5")
        axios
            .post("http://localhost:3030/books", newBook, {
                headers: {
                    Authorization: "Bearer "+token,
                },
            })
            .then((res) => {
                console.log("*********6")
                console.log("Book created successfully:", res.data);
                alert("Book created successfully!");
                setIsBookDetails(false); // Refresh the book list
                setBookId("")
                setTitle("")
                setDescription("")
                setAuthor("")
                setPrice("")
                setCategory("")
            })
            .catch((err) => {
                console.log("*********7")
                console.error("Error creating book:", err);
                alert("Failed to create book.");
            });
    }

    useEffect(() => {
        if (!isBookDetail) {
            axios
                .get("http://localhost:3030/books")
                .then((res) => {
                    setBookDetails(res.data);
                    setIsBookDetails(true);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to fetch book details.");
                });
        }
    }, [isBookDetail]);

    function handleUpdate(bookId: string) {

        const books: Book = {
            bookId,
            title,
            description,
            author,
            price,
            category,
        };

        axios.put("http://localhost:3030/books/"+bookId,books)
    }

    function handleDelete(bookId: string) {
        console.log(bookId);
        axios.delete("http://localhost:3030/books/"+bookId).then((res)=>{
            console.log(res);
            setIsBookDetails(false);
        }).catch((err)=>{
            console.log(err);
        });

    }

    return (
        <>
            <section id="books" className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Books</h2>
                <div className="bg-white shadow-md rounded-lg p-4">
                {/*<DeletePopup/>*/}
                    <form
                        onSubmit={(e) => createBook(e)}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Book ID
                            </label>
                            <input
                                onChange={(e) => setBookId(e.target.value)}
                                type="text"
                                placeholder="Enter unique book ID"
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Enter book title"
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter book description"
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <input
                                onChange={(e) => setAuthor(e.target.value)}
                                type="text"
                                placeholder="Enter author name"
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                min="0"
                                placeholder="Enter price"
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select a category</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Classics">Classics</option>
                                <option value="Crime">Crime</option>
                                <option value="Fantasy">Fantasy</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add Book
                        </button>

                    </form>
                </div>
            </section>

            <section id="books" className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Books List</h2>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Book ID</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Author</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Category</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookDetail.map((book, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-black">{book.bookId}</td>
                                <td className="px-4 py-2 text-black">{book.title}</td>
                                <td className="px-4 py-2 text-black">{book.description}</td>
                                <td className="px-4 py-2 text-black">{book.author}</td>
                                <td className="px-4 py-2 text-black">${book.price}</td>
                                <td className="px-4 py-2 text-black">{book.category}</td>
                                <td className="px-4 py-2 flex gap-3">

                                    <div>
                                        <button
                                            className="text-blue-600"
                                            onClick={() => handleUpdate(book.bookId)}
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDelete(book.bookId)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
}

export default AddBookComponent;
