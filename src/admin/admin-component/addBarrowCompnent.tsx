import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, Toaster } from "react-hot-toast";
import UserTable from "@/admin/user-table/userTable";
import { GlobalContext } from "@/context";

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

    const { userFormData } = useContext(GlobalContext) ?? {};

    useEffect(() => {
        if (!isBookDetails) {
            axios
                .get("http://localhost:3030/books")
                .then((res) => {
                    console.log(res.data);
                    setBookDetails(res.data);
                    setIssetBookDetails(true);
                })
                .catch((err) => {
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
            endDate: endDate ? endDate.toISOString() : "",
        };

        axios
            .post("http://localhost:3030/barrow/" + bookId, user)
            .then((res) => {
                console.log(res.data);
                setBarrow(res.data);
                setIssetBookDetails(false);
                setIsBarrowData(false);
                toast.success('Book Barrow Successfully Created');
            })
            .catch((err) => {
                console.log(err);
                toast.success('Book Barrow not Created');
            });
    }

    useEffect(() => {
        if (!isBarrowData) {
            axios
                .get("http://localhost:3030/barrow")
                .then((res) => {
                    console.log(res.data);
                    setBarrowData(res.data);
                    setIsBarrowData(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isBarrowData]);

    function handleBarrowDelete(bookId) {
        axios
            .delete("http://localhost:3030/barrow/" + bookId)
            .then((res) => {
                console.log(res.data);
                setIsBarrowData(false);
                setIssetBookDetails(false);
                toast.success('Book Barrow Successfully Deleted');
            })
            .catch((err) => {
                console.log(err);
                toast.success('Book Barrow Can not Deleted');
            });
    }

    useEffect(() => {
        // Initialize inputs with data from context if available
        if (userFormData) {
            setEmail(userFormData.email || "");
            setFirstName(userFormData.firstName || "");
            setLastName(userFormData.lastName || "");
            setAddress(userFormData.address || "");
        }
    }, [userFormData]);

    return (
        <div className="container mx-auto p-4">
            {/* Book Details Table */}
            <h1 className="text-xl font-bold mb-6 text-gray-800">Book Table</h1>
            <div className="w-[300px] h-[100px] overflow-y-auto bg-white shadow-md rounded-lg p-4 mb-8">
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
            <h1 className="text-xl font-bold mb-6 text-gray-800">User Table</h1>
            <div>
                <UserTable/>
            </div>
            {/* Borrower Form */}
            {isBarrow && (
                <section id="borrow" className="mb-8 my-52">
                    <h2 className="text-xl font-semibold mb-6 text-black">Borrow Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form className="space-y-4 w-[500px]">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter borrower's email"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Enter first name"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    placeholder="Enter last name"
                                    className="mt-1 block w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    value={address}
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
                                    // toast.success("Barrow Successfully Completed");
                                }}
                                type="submit"
                                className="text-white w-52 py-2 rounded bg-blue-600 hover:bg-blue-700"
                            >
                                <Toaster/>
                                Borrow Book
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* Borrow Table */}
            <h1 className="text-xl font-semibold mb-4 top-10 text-gray-700">Borrow Table</h1>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-200 rounded-lg">
                        <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-4 text-left text-black">Title</th>
                            <th className="py-3 px-4 text-left text-black">Book ID</th>
                            <th className="py-3 px-4 text-left text-black">Description</th>
                            <th className="py-3 px-4 text-left text-black">Author</th>
                            <th className="py-3 px-4 text-left text-black">Email</th>
                            <th className="py-3 px-4 text-left text-black">First Name</th>
                            <th className="py-3 px-4 text-left text-black">Last Name</th>
                            <th className="py-3 px-4 text-left text-black">Address</th>
                            <th className="py-3 px-4 text-left text-black">Start Date</th>
                            <th className="py-3 px-4 text-left text-black">End Date</th>
                            <th className="py-3 px-4 text-center text-black">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {barrowData.map((data, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                                <td className="py-3 px-4 text-black">{data.title}</td>
                                <td className="py-3 px-4 text-black">{data.bookId}</td>
                                <td className="py-3 px-4 text-black">{data.description}</td>
                                <td className="py-3 px-4 text-black">{data.author}</td>
                                <td className="py-3 px-4 text-black">{data.email}</td>
                                <td className="py-3 px-4 text-black">{data.firstName}</td>
                                <td className="py-3 px-4 text-black">{data.lastName}</td>
                                <td className="py-3 px-4 text-black">{data.address}</td>
                                <td className="py-3 px-4 text-black">
                                    {new Date(data.startDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-black">
                                    {new Date(data.endDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        className=" text-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                                        onClick={() => {
                                            handleBarrowDelete(data.bookId);
                                        }}
                                    >
                                        <MdDelete className="inline-block text-lg"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AddBorrowComponent;
