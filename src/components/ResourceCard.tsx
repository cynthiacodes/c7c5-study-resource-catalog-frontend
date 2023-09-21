import {
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

    return (
        <>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {resourcesSummary}
            </SimpleGrid>
            {singleResource && (
                <DetailedResourceCard
                    singleResource={singleResource}
                    isSignIn={isSignIn}
                    setSingleResource={setSingleResource}
                    currentUser={currentUser}
                />
            )}
        </>
    );
}
