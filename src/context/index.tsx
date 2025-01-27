'use client';
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface GlobalContextType {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
}


export const GlobalContext = createContext<GlobalContextType | null>(null);


interface GlobalStateProps {
    children: ReactNode;
}


export default function GlobalState({ children }: GlobalStateProps) {
    const [user, setUser] = useState([]);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
}
