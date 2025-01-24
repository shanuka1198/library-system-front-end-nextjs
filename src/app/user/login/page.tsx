'use client';

import React, { useContext, useState, FormEvent } from "react";
import axios from "axios";
import { GlobalContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwt_decode from "jsonwebtoken"; // Use `jwt-decode` to decode JWT tokens

interface DecodedToken {
    email: string;
    role: string[];
    [key: string]: any;
}

export default function Login() {
    const { setUser } = useContext(GlobalContext) ?? {};
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const loginForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3030/auth/login", {
                email,
                password,
            });

            const token = response.data.token;
            if (!token) {
                throw new Error("No token received from server");
            }

            localStorage.setItem("token", token);

            const decodedToken: DecodedToken = jwt_decode.decode(token);

            setUser?.(decodedToken);

            if (decodedToken.role.includes("Admin")) {
                router.push("/admin");
            } else if (decodedToken.role.includes("Client")) {
                router.push("/client");
            }
        } catch (err: any) {
            setError(err.response?.data.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-6">
                    Please enter your credentials to log in.
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={loginForm} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full text-black py-2 px-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full text-black py-2 px-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white font-semibold rounded-md transition ${
                            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link href="/user/signup">
              <span className="text-blue-500 font-medium hover:underline">
                Sign Up
              </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
