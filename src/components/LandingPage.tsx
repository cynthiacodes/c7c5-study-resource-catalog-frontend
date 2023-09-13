import axios from "axios";
import { baseURL } from "../utilities/baseURL";
import { useEffect, useState } from "react";
import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { ResourceCard } from "./ResourceCard";

interface User {
    user_id: number;
    name: string;
    is_faculty: boolean;
}

export function LandingPage(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
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

    function handleSelectedUser(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentUser(event.target.value);
    }

    function handleSignInAndOut() {
        setIsSignIn(!isSignIn);
        if (isSignIn) {
            setCurrentUser("");
        }
    }

    return (
        <Flex>
            {isSignIn ? (
                <Text>Current user: {currentUser}</Text>
            ) : (
                <Select
                    placeholder="select user"
                    onChange={(event) => {
                        handleSelectedUser(event);
                    }}
                >
                    {users.map((user) => {
                        return <option key={user.user_id}>{user.name}</option>;
                    })}
                </Select>
            )}
            <Button
                onClick={handleSignInAndOut}
                isDisabled={currentUser.length === 0}
            >
                {isSignIn ? "Sign out" : "Sign in"}
            </Button>
            <ResourceCard />
        </Flex>
    );
}
