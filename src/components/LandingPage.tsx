import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utilities/baseURL";
import { ResourceCard } from "./ResourceCard";
import { Resource } from "./Interfaces";

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
    const getAllResources = async () => {
        try {
            const response = await axios.get(`${baseURL}resources`);
            const resourceList = response.data;
            setAllResources(resourceList);
            console.log("resource list", resourceList);
            console.log("all resources state", allResources);
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {
        getAllResources();
    }, []);

    const filterResourceBySearchInput = (
        searchText: string,
        inputArray: Resource[]
    ): Resource[] => {
        const filteredArrayBySearch = inputArray.filter(
            (eachResource) =>
                eachResource.resource_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                eachResource.author_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                eachResource.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                eachResource.tags
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
        );
        return filteredArrayBySearch;
    };

    useEffect(() => {
        const filteredArray: Resource[] = filterResourceBySearchInput(
            input,
            allResources
        );
        setFilteredResourcesArray(filteredArray);
    }, [input, allResources]);

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
            </Flex>
            <>
                <Input
                    placeholder="Find a resource"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
