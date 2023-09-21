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
}

export function DetailedResourceCard({
    singleResource,
    isSignIn,
    setSingleResource,
    currentUser,
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
    return (
        <Card maxW="sm">
            <CardBody>
                <Stack mt="6" spacing="3">
                    <Heading size="md">{singleResource?.resource_name}</Heading>
                    <Text> Full View Resources Card</Text>
                    <Text>{singleResource?.author_name}</Text>
                    <Text>{singleResource?.description}</Text>
                    <Text color="blue.600">
                        {singleResource?.recommended_stage}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleCloseView()}
                >
                    Close Full View
                </Button>
                {isSignIn && (
                    <ButtonGroup>
                        <Button onClick={() => handleLikeDislike("like")}>
                            Like
                        </Button>
                        <Button onClick={() => handleLikeDislike("dislike")}>
                            Dislike
                        </Button>
                    </ButtonGroup>
                )}
            </CardFooter>
        </Card>
    );
}
