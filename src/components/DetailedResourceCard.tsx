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
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Resource, User } from "../utilities/Interfaces";
import { baseURL } from "../utilities/baseURL";

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
    const handleCloseView = () => {
        setSingleResource(null);
    };
    const handleAddToStudyList = async () => {
        try {
            await axios.post(`${baseURL}to-study`, {
                user_id: currentUser?.user_id,
                resource_id: singleResource?.resource_id,
            });
            alert(
                `Resource: ${singleResource?.resource_name} added to study list!`
            );
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteFromStudyList = async () => {
        try {
            await axios.delete(
                `${baseURL}to-study/${currentUser?.user_id}/${singleResource?.resource_id}`
            );
            alert(
                `Resource: ${singleResource?.resource_name} delete from study list!`
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAndDeleteFromStudyList = () => {
        updateCheckStatus();
        if (singleResource?.checked === false) {
            handleDeleteFromStudyList();
        } else {
            handleAddToStudyList();
        }
    };

    const updateCheckStatus = () => {
        if (!singleResource) return;
        setSingleResource({
            ...singleResource,
            checked: !singleResource.checked,
        });
    };

    const handleLikeDislike = async (likeOrDislike: string) => {
        if (likeOrDislike === "like") {
            try {
                const likeData = {
                    user_id: currentUser?.user_id,
                    resource_id: singleResource?.resource_id,
                };
                await axios.put(`${baseURL}opinions/like`, likeData);
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
                await axios.put(`${baseURL}opinions/dislike`, dislikeData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchStudyList().then((data) => {
            setStudyListData(data);
        });
    }, [fetchStudyList, singleResource?.checked, setStudyListData]);

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
                                    isChecked={!singleResource?.checked}
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
