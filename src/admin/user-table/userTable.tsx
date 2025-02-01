
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {GlobalContext} from "@/context";


const UserTable = () => {

    const [isUser,setIsUser]=useState(false);
    const [userData,setUserData]=useState([]);
     const {setUserFormData} = useContext(GlobalContext) ?? {};

   //   console.log("******")
   // console.log(userFormData);
   //  console.log("******")

    useEffect(() => {
        if (!isUser) {
            axios.get("http://localhost:3030/auth/user").then((res) => {
                // console.log(res.data);
                setUserData(res.data);
                setIsUser(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isUser]);


    function getUser(email:string) {
        axios.get("http://localhost:3030/auth/user/"+email).then((res) => {
            // console.log(res.data);
            setUserFormData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="w-[300px] h-[100px] overflow-y-auto bg-white shadow-md rounded-lg p-4 mb-8">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Username</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">First Name</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Last Name</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Address</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((user, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-black">{user.email}</td>
                            <td className="px-4 py-2 text-black">{user.username}</td>
                            <td className="px-4 py-2 text-black">{user.firstName}</td>
                            <td className="px-4 py-2 text-black">{user.lastName}</td>
                            <td className="px-4 py-2 text-black">{user.address}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="text-white rounded font-bold bg-blue-500 hover:bg-blue-600 px-4 py-2"
                                    onClick={() => {
                                        alert(`Fetching user: ${user.username}`);
                                        getUser(user.email);
                                    }}
                                >
                                    Get User
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default UserTable;
