import React, {useEffect, useState} from "react";
import axios from "axios";
import {flag} from "arg";


const AddBorrowComponent = () => {

    const [bookDetails,setBookDetails]=useState([]);
    const [isBookDetails,setIssetBookDetails]=useState(false);
    const [barrow,setBarrow]=useState([]);




    useEffect(() => {
        if (!isBookDetails){
            axios.get("http://localhost:3030/books").then((res)=>{
                console.log(res.data);
                setBookDetails(res.data)
                setIssetBookDetails(true)
            }).catch((err)=>{
                console.log(err);
            })
        }
        }, [isBookDetails]);


    function getButton(bookId:string) {
        console.log(bookId)

        axios.get("http://localhost:3030/books/"+bookId).then((res)=>{
            console.log(res.data);
            setBarrow(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Book ID</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Author</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookDetails.map((book,index)=>(
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-black">{book.bookId}</td>
                            <td className="px-4 py-2 text-black">{book.title}</td>
                            <td className="px-4 py-2 text-black">{book.description}</td>
                            <td className="px-4 py-2 text-black">{book.author}</td>
                            <td className="px-4 py-2 text-black">{book.category}</td>
                            <td className="px-4 py-2">
                                <div>
                                    <button
                                        className="text-black rounded font-bold bg-blue-500 hover:bg-blue-600 w-full text-center"
                                        onClick={() =>{
                                            getButton(book.bookId);
                                        }}
                                    >
                                        Get
                                    </button>
                                </div>
                            </td> 
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
                <section id="borrow" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Borrower Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-4">

                            <form className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        value={barrow.email}
                                        type="email"
                                        placeholder="Enter borrower's email"
                                        className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        value={barrow.username}
                                        type="text"
                                        placeholder="Enter username"
                                        className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        value={barrow.firstName}
                                        type="text"
                                        placeholder="Enter first name"
                                        className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        value={barrow.lastName}
                                        type="text"
                                        placeholder="Enter last name"
                                        className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        value={barrow.address}
                                        type="text"
                                        placeholder="Enter address"
                                        className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Borrow Book
                                </button>
                            </form>

                    </div>
                </section>
        </>
    );
};

export default AddBorrowComponent;
