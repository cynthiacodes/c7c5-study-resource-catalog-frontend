import {
    Stack,
    Heading,
    Divider,
    Text,
    Card,
    CardBody,
    CardFooter,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";
import { Resource, User } from "./Interfaces";
import axios from "axios";
import { baseURL } from "../utilities/baseURL";

interface DetailedResourceCardViewProps {
    singleResource: Resource | null | undefined;
    isSignIn: boolean;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
    currentUser: User | null | undefined;
    users: User[];
}

export function DetailedResourceCard({
    singleResource,
    isSignIn,
    setSingleResource,
    currentUser,
    users,
}: DetailedResourceCardViewProps): JSX.Element {
    const handleCloseView = () => {
        setSingleResource(null);
    };

    const handleLikeDislike = async (likeOrDislike: string) => {
        if (likeOrDislike === "like") {
            try {
                const likeData = {
                    user_id: currentUser?.user_id,
                    resource_id: singleResource?.resources_id,
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
                    resource_id: singleResource?.resources_id,
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

    function getCreatorName(user_id: number | undefined): string | undefined {
        const creator = users.find((user) => user.user_id === user_id);
        return creator?.name;
    }
    return (
        <Card maxW="sm" m={"5rem auto"}>
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
                    <Button
                        variant="outline"
                        colorScheme="yellow"
                        onClick={() => handleCloseView()}
                    >
                        Close Full View
                    </Button>
                    {isSignIn && (
                        <ButtonGroup spacing={"1rem"}>
                            <Button onClick={() => handleLikeDislike("like")}>
                                Like
                            </Button>
                            <Button
                                onClick={() => handleLikeDislike("dislike")}
                            >
                                Dislike
                            </Button>
                        </ButtonGroup>
                    )}
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}
