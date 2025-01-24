'use client';

import Link from "next/link";
import axios from "axios";
import { useState, FormEvent, useContext } from "react";
import { GlobalContext } from "@/context";
import jwt_decode from "jsonwebtoken"; // Correct import for decoding JWT

function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("Client");

    // const { setUser } = useContext(GlobalContext) ?? {}; // Ensure `setUser` exists

    // User object
    const user = {
        email,
        username,
        firstName,
        lastName,
        address,
        password,
        role: [role],
    };

    const signUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate required fields
        if (!email || !username || !firstName || !lastName || !address || !password) {
            console.log("Please fill all the fields.");
            return;
        }

        try {
            // Send sign-up request
            const res = await axios.post("http://localhost:3030/auth/signup", user);
            console.log("Signup success:", res);

            const token = res.data.token; // Extract token from response
            localStorage.setItem("token", token); // Save token to localStorage

            // Decode JWT token
            const decodedToken: any = jwt_decode.decode(token);
            console.log("Decoded token:", decodedToken);

            // Update global user context if available


            // Redirect user based on role
            if (decodedToken?.role?.includes("Admin")) {
                window.location.href = "/admin"; // Redirect to admin page
            } else if (decodedToken?.role?.includes("Client")) {
                window.location.href = "/client"; // Redirect to client page
            }
        } catch (err: any) {
            console.error("Signup error:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Join us today and enjoy exclusive benefits!
                </p>

                <form onSubmit={signUp} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                            placeholder="Choose a password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md"
                        >
                            <option value="Client">Client</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link href="/user/login">
                            <span className="text-blue-600 font-medium">Login</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
