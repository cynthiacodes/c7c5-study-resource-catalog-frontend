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
import { Navigate } from "react-router-dom";
import { Resource } from "../utilities/Interfaces";

interface ResourceCardViewProps {
    allResources: Resource[];
    singleResource: Resource | null | undefined;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
}

export function ResourceCard({
    allResources,
    singleResource,
    setSingleResource,
}: ResourceCardViewProps): JSX.Element {
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
                    <Card maxW="sm" key={resource.resource_id}>
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
                <Navigate to={`/resource/${singleResource.resource_id}`} />
            )}
        </Box>
    );
}
