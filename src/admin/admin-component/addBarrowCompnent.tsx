import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast, Toaster} from "react-hot-toast";
import UserTable from "@/admin/user-table/userTable";

const AddBorrowComponent = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const [isBookDetails, setIssetBookDetails] = useState(false);
    const [barrow, setBarrow] = useState([]);
    const [isBarrow, setIsBarrow] = useState(false);
    const [bookId, setBookId] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const [isBarrowData, setIsBarrowData] = useState(false);
    const [barrowData, setBarrowData] = useState([]);



    useEffect(() => {
        if (!isBookDetails) {
            axios.get("http://localhost:3030/books").then((res) => {
                console.log(res.data);
                setBookDetails(res.data);
                setIssetBookDetails(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isBookDetails]);

    function getButton() {
        setIsBarrow(true);
    }

    function barrowSubmit() {
        const user = {
            email,
            firstName,
            lastName,
            address,
            startDate: startDate ? startDate.toISOString() : "",
            endDate: endDate ? endDate.toISOString() : ""
        };

        axios.post("http://localhost:3030/barrow/" + bookId, user).then((res) => {
            console.log(res.data);
            setBarrow(res.data);
            console.log(barrow);
            setIssetBookDetails(false);
            setIsBarrowData(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (!isBarrowData) {
            axios.get("http://localhost:3030/barrow").then((res) => {
                console.log(res.data);
                setBarrowData(res.data);
                setIsBarrowData(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isBarrowData]);

    function handleBarrowDelete(bookId) {
        axios.delete("http://localhost:3030/barrow/" + bookId).then((res) => {
            console.log(res.data);
            setIsBarrowData(false);
            setIssetBookDetails(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="container mx-auto p-4">
            {/* Book Details Table */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Book ID</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Author</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Category</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Quantity</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookDetails.map((book, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-black">{book.bookId}</td>
                            <td className="px-4 py-2 text-black">{book.title}</td>
                            <td className="px-4 py-2 text-black">{book.description}</td>
                            <td className="px-4 py-2 text-black">{book.author}</td>
                            <td className="px-4 py-2 text-black">{book.category}</td>
                            <td className="px-4 py-2 text-black">{book.quantity}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="text-white rounded font-bold bg-blue-500 hover:bg-blue-600 px-4 py-2"
                                    onClick={() => {
                                        getButton();
                                        setBookId(book.bookId);
                                    }}
                                >
                                    Get
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <UserTable/>
            </div>

            {/* Borrower Form */}
            {isBarrow && (
                <section id="borrow" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-black">Borrower Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form className="space-y-4 w-[500px]">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter borrower's email"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Enter first name"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    placeholder="Enter last name"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    placeholder="Enter address"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Start Date Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <DatePicker
                                    onChange={(date) => setStartDate(date)}
                                    selected={startDate}
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* End Date Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <DatePicker
                                    onChange={(date) => setEndDate(date)}
                                    selected={endDate}
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    barrowSubmit();
                                    toast.success('Barrow Successfully Completed');
                                }}
                                type="submit"
                                className="text-white w-52 py-2 rounded bg-blue-600 hover:bg-blue-700"
                            >
                                <Toaster />
                                Borrow Book
                            </button>

                        </form>
                    </div>
                </section>
            )}

            {/* Borrow Table */}
            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-black">Borrow Cards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {barrowData.map((data, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-black mb-2">{data.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Book ID:</span> {data.bookId}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Description:</span> {data.description}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Author:</span> {data.author}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Email:</span> {data.email}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">First Name:</span> {data.firstName}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Last Name:</span> {data.lastName}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Address:</span> {data.address}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">Start Date:</span> {new Date(data.startDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold text-black">End Date:</span> {new Date(data.endDate).toLocaleDateString()}
                            </p>
                            <button
                                className="text-red-500 border border-red-500 p-3 hover:text-red-800"
                                onClick={(()=>{
                                    handleBarrowDelete(data.bookId)
                                    toast.success('Barrow Deleted');
                                    <Toaster/>
                                })}
                            >
                                <MdDelete />
                            </button>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AddBorrowComponent;
