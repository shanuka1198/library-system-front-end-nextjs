
import React from "react";

interface User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
}

const users: User[] = [
    {
        email: "john.doe@example.com",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St, Springfield",
    },
    {
        email: "jane.smith@example.com",
        username: "janesmith",
        firstName: "Jane",
        lastName: "Smith",
        address: "456 Oak Ave, Metropolis",
    },
];

const UserTable = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-blue-100">
                        <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-medium">
                            Email
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-medium">
                            Username
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-medium">
                            First Name
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-medium">
                            Last Name
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-medium">
                            Address
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-center text-gray-700 font-medium">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <td className="border border-gray-300 px-6 py-3 text-gray-800">
                                {user.email}
                            </td>
                            <td className="border border-gray-300 px-6 py-3 text-gray-800">
                                {user.username}
                            </td>
                            <td className="border border-gray-300 px-6 py-3 text-gray-800">
                                {user.firstName}
                            </td>
                            <td className="border border-gray-300 px-6 py-3 text-gray-800">
                                {user.lastName}
                            </td>
                            <td className="border border-gray-300 px-6 py-3 text-gray-800">
                                {user.address}
                            </td>
                            <td className="border border-gray-300 px-6 py-3 text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                    onClick={() => alert(`Fetching user: ${user.username}`)}
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
