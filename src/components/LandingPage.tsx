import {
    Button,
    ButtonGroup,
    Container,
    Divider,
    Flex,
    Select,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Resource, User } from "../utilities/Interfaces";
import { ResourceCard } from "./ResourceCard";
import { Search } from "./Search";

interface LandingPageViewProp {
    currentUser: User | null | undefined;
    setCurrentUser: React.Dispatch<
        React.SetStateAction<User | null | undefined>
    >;
    allResources: Resource[];
    singleResource: Resource | null | undefined;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
    users: User[];
    isSignIn: boolean;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LandingPage({
    currentUser,
    setCurrentUser,
    allResources,
    singleResource,
    setSingleResource,
    users,
    isSignIn,
    setIsSignIn,
}: LandingPageViewProp): JSX.Element {
    const [input, setInput] = useState<string>("");
    const [filteredResourcesArray, setFilteredResourcesArray] = useState<
        Resource[]
    >([]);

    function handleSelectedUser(event: React.ChangeEvent<HTMLSelectElement>) {
        const currentUserName = event.target.value;
        const currentUserObject = users.find(
            (user) => user.name === currentUserName
        );
        setCurrentUser(currentUserObject);
    }

    function handleSignInAndOut() {
        setIsSignIn(!isSignIn);
        if (isSignIn) {
            setCurrentUser(null);
        }
    }

    return (
        <Container
            bg={"#FFFEFD"}
            minHeight={"100vh"}
            minWidth={"100vw"}
            pb={"5rem"}
        >
            <Container minWidth={"80vw"} pb={"5rem"}>
                <Flex alignItems="center" pt="1em">
                    <Text as="b" fontSize="2xl">
                        Study resource catalog
                    </Text>
                    <Spacer />
                    {isSignIn ? (
                        <Text fontSize="2xl">
                            Current user:{" "}
                            <Text as="b">
                                {currentUser && currentUser.name}
                            </Text>
                        </Text>
                    ) : (
                        <Select
                            w={"30%"}
                            placeholder="select user"
                            onChange={(event) => {
                                handleSelectedUser(event);
                            }}
                        >
                            {users.map((user) => {
                                return (
                                    <option key={user.user_id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </Select>
                    )}

                    <Button
                        ml="1em"
                        onClick={handleSignInAndOut}
                        isDisabled={
                            currentUser === null || currentUser === undefined
                        }
                    >
                        {isSignIn ? "Sign out" : "Sign in"}
                    </Button>
                </Flex>
                <Flex alignItems="center" pt="1em">
                    <Spacer />
                    {isSignIn && (
                        <ButtonGroup>
                            <Button>
                                <Link to="/newresource">Add new resource</Link>
                            </Button>
                            <Button>
                                <Link to={`/to-study/${currentUser?.user_id}`}>
                                    My Study List
                                </Link>
                            </Button>
                        </ButtonGroup>
                    )}
                </Flex>
                <Divider mt={"1rem"} mb={"1rem"} />
                <Search
                    setFilteredResourcesArray={setFilteredResourcesArray}
                    input={input}
                    setInput={setInput}
                    allResources={allResources}
                />

                {input.length > 0 && filteredResourcesArray.length === 0 && (
                    <Text fontSize={"2xl"}>No Result Found</Text>
                )}

                {input.length === 0 ? (
                    <ResourceCard
                        allResources={allResources}
                        singleResource={singleResource}
                        setSingleResource={setSingleResource}
                    />
                ) : (
                    <ResourceCard
                        allResources={filteredResourcesArray}
                        singleResource={singleResource}
                        setSingleResource={setSingleResource}
                    />
                )}
            </Container>
            <Container minWidth={"80vw"} pb={"1rem"}>
                <Divider mt={"1rem"} mb={"1rem"} />
                <Text fontSize={"sm"}>
                    This is a team project for{" "}
                    <Text as="b">Software Engineering Training Program</Text> at
                    Academy
                </Text>
                <Text fontSize={"sm"}>
                    <Text as="b"> Team C7C5</Text>{" "}
                    <Text>Team members: Cynthia, Stephanie, Ho Kei</Text>
                    <Text>
                        Checkout{" "}
                        <a
                            href="https://github.com/cynthiacodes/c7c5-study-resource-catalog-frontend"
                            target="_blank"
                            rel="noreferrer"
                        >
                            frontend repo
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://github.com/cynthiacodes/c7c5-study-resource-catalog-backend"
                            target="_blank"
                            rel="noreferrer"
                        >
                            backend repo
                        </a>{" "}
                        here!
                    </Text>
                </Text>
            </Container>
        </Container>
    );
}
