import {
    Box,
    Button,
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
import { DetailedResourceCard } from "./DetailedResourceCard";
import { Resource, User } from "./Interfaces";

interface ResourceCardViewProps {
    allResources: Resource[];
    isSignIn: boolean;
    currentUser: User | null | undefined;
    users: User[];
}

export function ResourceCard({
    allResources,
    isSignIn,
    currentUser,
    users,
}: ResourceCardViewProps): JSX.Element {
    const [singleResource, setSingleResource] = useState<Resource | null>();

    const handleViewMore = (resource: Resource) => {
        setSingleResource(resource);
    };

    return (
        <Box>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {allResources.map((resource) => (
                    <Card maxW="sm" key={resource.resources_id}>
                        <CardBody>
                            <Stack mt="6" spacing="3">
                                <Heading size="md">
                                    {resource.resource_name}
                                </Heading>
                                <Text>{resource.author_name}</Text>
                                <Text>{resource.description}</Text>
                                <Text color="yellow.700">
                                    {resource.recommended_stage}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Button
                                variant="outline"
                                colorScheme="yellow"
                                onClick={() => handleViewMore(resource)}
                            >
                                See more
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
            {singleResource && (
                <DetailedResourceCard
                    singleResource={singleResource}
                    isSignIn={isSignIn}
                    setSingleResource={setSingleResource}
                    currentUser={currentUser}
                    users={users}
                />
            )}
        </Box>
    );
}
