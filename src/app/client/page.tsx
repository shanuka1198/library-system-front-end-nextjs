'use client';

import AddBookComponent from "@/admin/admin-component/addBookComponent";
import {useState} from "react";
import AddBarrowComponent from "@/admin/admin-component/addBarrowCompnent";

export default function AdminDashboard() {

    const [bookFieldActive,setBookFieldActive]=useState(true)
    const [barrowFieldActive,setBarrowFieldActive]=useState(false)

    function bookSectionHandle(){
        setBookFieldActive(!bookFieldActive)
        setBarrowFieldActive(false)
    }
    function barrowSectionHandle(){
        setBarrowFieldActive(!barrowFieldActive)
        setBookFieldActive(false)
    }

    function logOut(){
        localStorage.clear();
        window.location.href="/user/login";
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <button  onClick={()=>{
                                    logOut()
                                }}  className="hover:underline">
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md p-4">
                    <ul className="space-y-4">
                        <li>
                            <p onClick={bookSectionHandle}

                                className="block py-2 px-4 rounded hover:bg-blue-100"
                            >
                                Books
                            </p>
                        </li>
                        <li>
                            <a onClick={barrowSectionHandle}
                                href="#borrow"
                                className="block py-2 px-4 rounded hover:bg-blue-100"
                            >
                                Borrow
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Main Section */}
                <main className="flex-grow p-6">
                    {bookFieldActive && (
                        <div>
                            <AddBookComponent />
                        </div>

                    )}
                    {barrowFieldActive && (
                        <div>
                            <AddBarrowComponent />
                        </div>

                    )}

                </main>
            </div>
        </div>
    );
}
