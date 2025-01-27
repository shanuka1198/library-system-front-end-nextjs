'use client';

import Image from 'next/image';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";


export default function AdminDashboard() {

    const [isBookDetail,setIsBookDetails]=useState(false);
    const [bookDetails,setBookDetails]=useState([]);


    const routes=useRouter();

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

    function aboutUsPage() {
        routes.push("/about-us");
    };

    function barrowPage() {
        routes.push("/client/barrow");
    };

    function logout() {
        localStorage.removeItem("token");
        window.location.href="/user/login";
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex justify-end w-full h-screen ">
                <h1 className="relativetext-cyan-950 text-cyan-950 flex font-bold text-3xl mr-16 items-center "><span className="text-9xl">S.I</span>-LIBRARY</h1>
                <Image className="rounded-2xl"
                    src="/image/2.jpg"
                    alt="An example image"
                    width={1000}
                    height={1000}
                />
                <div className="absolute right-36 top-10">
                    <div className="flex gap-5">
                        <button  onClick={() => {
                            barrowPage()

                        }}
                                className="text-white transition-colors duration-500 ease-in-out font-bold underline cursor-pointer hover:bg-cyan-800 p-2 rounded-2xl">My
                            Barrow
                        </button>
                        <button onClick={() => {
                            aboutUsPage()
                        }}
                                className="text-white transition-colors duration-500 ease-in-out font-bold underline cursor-pointer hover:bg-cyan-800 p-2 rounded-2xl">About
                        </button>
                        <button onClick={() => {
                            logout()
                        }}
                                className="text-white mx-5 transition-colors duration-500 ease-in-out font-bold bg-red-400  cursor-pointer hover:bg-red-800 p-2 rounded-2xl">Log Out
                        </button>
                    </div>
                </div>
                <div className="absolute w-[800px]  h-[500px] right-24 top-24 bg-white opacity-95 rounded-2xl">
                    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left  text-cyan-950 font-bold">Book ID</th>
                                <th className="px-4 py-2 text-left font-bold text-cyan-950">Title</th>
                                <th className="px-4 py-2 text-left font-bold text-cyan-950">Description</th>
                                <th className="px-4 py-2 text-left font-bold text-cyan-950">Author</th>
                                <th className="px-4 py-2 text-left font-bold text-cyan-950">Category</th>
                                <th className="px-4 py-2 text-left font-bold text-cyan-950">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookDetails.map((data,index)=>(
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-black">{data.bookId}</td>
                                    <td className="px-4 py-2 text-black font-bold">{data.title}</td>
                                    <td className="px-4 py-2 text-black">{data.description}</td>
                                    <td className="px-4 py-2 text-black">{data.author}</td>
                                    <td className="px-4 py-2 text-black">{data.category}</td>
                                    <td className="px-4 py-2 text-black">{data.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
