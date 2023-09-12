import axios from "axios";
import { baseURL } from "../utilities/baseURL";
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

interface User {
    user_id: number;
    name: string;
    is_faculty: boolean;
}

export function LandingPage(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}users`);
            const usersList = response.data;
            setUsers(usersList);
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <Select placeholder="select user">
                {users.map((user) => {
                    return <option key={user.user_id}>{user.name}</option>;
                })}
            </Select>
        </>
    );
}
