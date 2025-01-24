import React, {useEffect, useState} from "react";
import axios from "axios";



const AddBorrowComponent = () => {

    const [bookDetails,setBookDetails]=useState([]);
    const [isBookDetails,setIssetBookDetails]=useState(false);
    const [barrow,setBarrow]=useState([]);
    const [isBarrow,setIsBarrow]=useState(false);
    const [bookId,setBookId]=useState("");

    const [email,setEmail]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [address,setAddress]=useState("");

    const [isBarrowData,setIsBarrowData]=useState(false)
    const [barrowData,setBarrowData]=useState([]);


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


    useEffect(() => {
        if (!isBarrowData){
            axios.get("http://localhost:3030/barrow").then((res)=>{
                console.log(res.data);
                setBarrowData(res.data);
                setIsBarrowData(true)
            }).catch((err)=>{
                console.log(err);
            })
        }
    }, [isBarrowData]);


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
                    {bookDetails.map((book, index) => (
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
                                        onClick={() => {
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
                <section id="borrow" className="mb-8 my-2">
                    <h2 className="text-xl font-semibold mb-4 text-black ">Borrower Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input onChange={(e) => {
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
                                <input onChange={(e) => {
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
                                <input onChange={(e) => {
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
                                <input onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                    // value={barrow.address}
                                       type="text"
                                       placeholder="Enter address"
                                       className="mt-1 block text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault()
                                barrowSubmit()
                            }} type="submit" className="text-white w-20 p-3 rounded bg-blue-600">
                                Barrow Book
                            </button>

                        </form>
                    </div>
                </section>
            )}
            <div className="overflow-x-auto my-2">
                <h2 className="text-xl font-semibold mb-4 text-black">Barrow Table</h2>
                <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white ">
                    <tr>
                        <th className="py-3 px-4 text-left  text-black">Book ID</th>
                        <th className="py-3 px-4 text-left  text-black">Title</th>
                        <th className="py-3 px-4 text-left  text-black">Description</th>
                        <th className="py-3 px-4 text-left  text-black">Author</th>
                        <th className="py-3 px-4 text-left text-black">Email</th>
                        <th className="py-3 px-4 text-left  text-black">First Name</th>
                        <th className="py-3 px-4 text-left  text-black">Last Name</th>
                        <th className="py-3 px-4 text-left  text-black">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {barrowData.map((data,index)=> (
                        <tr key={index} className="border-b 'bg-white">

                            <td className="py-2 px-4 text-black">{data.bookId}</td>
                            <td className="py-2 px-4 text-black">{data.title}</td>
                            <td className="py-2 px-4 text-black">{data.description}</td>
                            <td className="py-2 px-4 text-black">{data.author}</td>
                            <td className="py-2 px-4 text-black">{data.email}</td>
                            <td className="py-2 px-4 text-black">{data.firstName}</td>
                            <td className="py-2 px-4 text-black">{data.lastName}</td>
                            <td className="py-2 px-4 text-black">{data.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default AddBorrowComponent;
