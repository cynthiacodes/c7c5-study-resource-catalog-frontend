import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAllResources } from "../utilities/fetchAllResources";
import { fetchAllUsers } from "../utilities/fetchAllUsers";
import { Resource } from "./Interfaces";
import { ResourceCard } from "./ResourceCard";
import { Search } from "./Search";
import { Link } from "react-router-dom";

interface User {
    user_id: number;
    name: string;
    is_faculty: boolean;
}

export function LandingPage(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
    const [allResources, setAllResources] = useState<Resource[]>([]);
    const [input, setInput] = useState<string>("");
    const [filteredResourcesArray, setFilteredResourcesArray] = useState<
        Resource[]
    >([]);

    useEffect(() => {
        fetchAllUsers().then((allUsers) => setUsers(allUsers));
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

    useEffect(() => {
        fetchAllResources().then((allResources) =>
            setAllResources(allResources)
        );
    }, []);

    return (
        <>
            <Flex w="50%">
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
                            return (
                                <option key={user.user_id}>{user.name}</option>
                            );
                        })}
                    </Select>
                )}

                <Button
                    onClick={handleSignInAndOut}
                    isDisabled={currentUser.length === 0}
                >
                    {isSignIn ? "Sign out" : "Sign in"}
                </Button>
                {isSignIn && (
                    <Button>
                        <Link to="/newresource">Add new resource</Link>
                    </Button>
                )}
            </Flex>
            <>
                <Search
                    setFilteredResourcesArray={setFilteredResourcesArray}
                    input={input}
                    setInput={setInput}
                    allResources={allResources}
                />
                {input.length === 0 ? (
                    <ResourceCard allResources={allResources} />
                ) : (
                    <ResourceCard allResources={filteredResourcesArray} />
                )}
            </>
        </>
    );
}
