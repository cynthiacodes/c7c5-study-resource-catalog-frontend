import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Resource, User } from "./Interfaces";
import { baseURL } from "../utilities/baseURL";
import axios from "axios";

interface ResourceCardViewProps {
    allResources: Resource[];
    isSignIn: boolean;
    currentUser: User | null | undefined;
}

export function ResourceCard({
    allResources,
    isSignIn,
    currentUser,
}: ResourceCardViewProps): JSX.Element {
    const [singleResource, setSingleResource] = useState<Resource | null>();

    const resourcesSummary = allResources.map((resource) => (
        <>
            <Card maxW="sm" key={resource.resources_id}>
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">{resource.resource_name}</Heading>
                        <Text>{resource.author_name}</Text>
                        <Text>{resource.description}</Text>
                        <Text color="blue.600">
                            {resource.recommended_stage}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleViewMore(resource)}
                    >
                        See more
                    </Button>
                </CardFooter>
            </Card>
        </>
    ));

    const handleViewMore = (resource: Resource) => {
        setSingleResource(resource);
    };

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
        <>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {resourcesSummary}
            </SimpleGrid>
            {singleResource && (
                <Card maxW="sm">
                    <CardBody>
                        <Stack mt="6" spacing="3">
                            <Heading size="md">
                                {singleResource.resource_name}
                            </Heading>
                            <Text> Full View Resources Card</Text>
                            <Text>{singleResource.author_name}</Text>
                            <Text>{singleResource.description}</Text>
                            <Text color="blue.600">
                                {singleResource.recommended_stage}
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
                            </ButtonGroup>
                        )}
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
