'use client';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import jwt_decode from "jsonwebtoken";
import {GlobalContext} from "@/context";
interface DecodedToken {
    email: string;
    role: string[];
    [key: string]: any;
}

export default function MyBarrow(){

    const [isBarrowData,setIsBarrowData]=useState(false);
    const [barrowData,setBarrowData]=useState([]);
    const token=localStorage.getItem("token");
    // const { user,setUser } = useContext(GlobalContext) ?? {};




    console.log(token);

    const decodedToken: DecodedToken = jwt_decode.decode(token);

console.log(decodedToken)


    useEffect(() => {
        if (!isBarrowData) {
            axios.get("http://localhost:3030/barrow/"+decodedToken.email).then((res) => {
                console.log("*********")
                console.log(res.data);
                console.log("*********")
                setBarrowData(res.data);
                setIsBarrowData(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isBarrowData]);
    return(
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div className="w-[1300px] m-7">
                    <h2 className="text-xl font-semibold mb-4 text-black ">Borrow Table</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border  rounded-3xl">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Title</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Book ID</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Description</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Author</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Email</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">First Name</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Last Name</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Address</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">Start Date</th>
                                <th className="text-left px-4 py-2 text-sm font-bold text-black">End Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {barrowData.map((data,index)=> (
                                <tr key={index} className="hover:bg-gray-50 border-b last:border-none">
                                    <td className="px-4 py-2 text-sm text-gray-700 font-bold">{data.title}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.bookId}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.description}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.author}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.firstName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.lastName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{data.address}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {new Date(data.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {new Date(data.endDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};