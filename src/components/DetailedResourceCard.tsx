import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Container,
    Divider,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { baseURL } from "../utilities/baseURL";
import { Resource, User } from "./Interfaces";

interface DetailedResourceCardViewProps {
    singleResource: Resource | null | undefined;
    isSignIn: boolean;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
    currentUser: User | null | undefined;
    users: User[];
    fetchStudyList: () => Promise<Resource[]>;
    setStudyListData: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function DetailedResourceCard({
    setStudyListData,
    singleResource,
    isSignIn,
    setSingleResource,
    currentUser,
    users,
    fetchStudyList,
}: DetailedResourceCardViewProps): JSX.Element {
    const [isChecked, setIsChecked] = useState<boolean>(true);

    const handleCloseView = () => {
        setSingleResource(null);
    };
    const handleAddToStudyList = async () => {
        try {
            const response = await axios.post(`${baseURL}to-study`, {
                user_id: currentUser?.user_id,
                resource_id: singleResource?.resource_id,
            });
            alert(
                `Resource: ${singleResource?.resource_name} added to study list!`
            );
            console.log("resource added to study list", response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteFromStudyList = async () => {
        try {
            const response = await axios.delete(
                `${baseURL}to-study/${currentUser?.user_id}/${singleResource?.resource_id}`
            );
            alert(
                `Resource: ${singleResource?.resource_name} delete from study list!`
            );
            console.log("resource to delete from study list", response);
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddAndDeleteFromStudyList = () => {
        setIsChecked(!isChecked);
        if (isChecked) {
            handleAddToStudyList();
        } else {
            handleDeleteFromStudyList();
        }
    };

    const handleLikeDislike = async (likeOrDislike: string) => {
        if (likeOrDislike === "like") {
            try {
                const likeData = {
                    user_id: currentUser?.user_id,
                    resource_id: singleResource?.resource_id,
                };
                const response = await axios.put(
                    `${baseURL}opinions/like`,
                    likeData
                );
                console.log("like", response);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const dislikeData = {
                    user_id: currentUser?.user_id,
                    resource_id: singleResource?.resource_id,
                    is_dislike: true,
                };
                const response = await axios.put(
                    `${baseURL}opinions/dislike`,
                    dislikeData
                );
                console.log("dislike", response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchStudyList().then((data) => {
            setStudyListData(data);
        });
    }, [fetchStudyList, isChecked, setStudyListData]);

    function getCreatorName(user_id: number | undefined): string | undefined {
        const creator = users.find((user) => user.user_id === user_id);
        return creator?.name;
    }
    return (
        <Container
            bg={"#FFFEFD"}
            minHeight={"100vh"}
            minWidth={"100vw"}
            pb={"5rem"}
            pt={"5rem"}
        >
            <Card maxW="sm" m={"auto"}>
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">
                            <a
                                href={singleResource?.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {singleResource?.resource_name}
                            </a>
                        </Heading>
                        <Text>{singleResource?.author_name}</Text>
                        <Text>{singleResource?.description}</Text>
                        <Text color="yellow.700">
                            {singleResource?.recommended_stage}
                        </Text>
                        <Text>
                            Creator: {getCreatorName(singleResource?.user_id)}
                        </Text>
                        <Text>
                            Creator_opinion: {singleResource?.creator_opinion}
                        </Text>
                        <Text>
                            Creator_reason: {singleResource?.creator_reason}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing={"1rem"}>
                        {!singleResource && <Navigate to="/" />}
                        <Button
                            variant="outline"
                            colorScheme="yellow"
                            onClick={() => handleCloseView()}
                        >
                            Home
                        </Button>
                        {isSignIn && (
                            <ButtonGroup spacing={"1rem"}>
                                <Button
                                    onClick={() => handleLikeDislike("like")}
                                >
                                    Like
                                </Button>
                                <Button
                                    onClick={() => handleLikeDislike("dislike")}
                                >
                                    Dislike
                                </Button>

                                <Checkbox
                                    isChecked={!isChecked}
                                    onChange={() =>
                                        handleAddAndDeleteFromStudyList()
                                    }
                                >
                                    Add To Study
                                </Checkbox>
                            </ButtonGroup>
                        )}
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Container>
    );
}
