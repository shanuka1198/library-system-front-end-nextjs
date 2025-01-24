import React, {useEffect, useState} from "react";
import axios from "axios";



const AddBorrowComponent = () => {

    const [bookDetails,setBookDetails]=useState([]);
    const [isBookDetails,setIssetBookDetails]=useState(false);
    const [barrow,setBarrow]=useState([]);
    const [isBarrow,setIsBarrow]=useState(false);
    const [bookId,setBookId]=useState("")

    const [email,setEmail]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [address,setAddress]=useState("")




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


    function getButton() {

        setIsBarrow(true);

    }

    function barrowSubmit() {

        const user={
            email,
            firstName,
            lastName,
            address
        }

        axios.post("http://localhost:3030/barrow/"+bookId,user).then((res)=>{
            console.log(res.data);
            setBarrow(res.data);
            console.log(barrow);
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
                                            getButton();
                                            setBookId(book.bookId);
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
            {isBarrow && (
                <section id="borrow" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Borrower Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-4">

                        <form className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                    // value={barrow.email}
                                    type="email"
                                    placeholder="Enter borrower's email"
                                    className="mt-1 text-black block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input onChange={(e)=>{
                                    setFirstName(e.target.value)
                                }}
                                    // value={barrow.firstName}
                                    type="text"
                                    placeholder="Enter first name"
                                    className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input onChange={(e)=>{
                                    setLastName(e.target.value)
                                }}
                                    // value={barrow.lastName}
                                    type="text"
                                    placeholder="Enter last name"
                                    className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input onChange={(e)=>{
                                    setAddress(e.target.value)
                                }}
                                    // value={barrow.address}
                                    type="text"
                                    placeholder="Enter address"
                                    className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                barrowSubmit()
                            }} type="submit" className="text-white w-20 p-3 rounded bg-blue-600">
                                Barrow Book
                            </button>

                        </form>
                    </div>
                </section>
            )}

        </>
    );
};

export default AddBorrowComponent;
