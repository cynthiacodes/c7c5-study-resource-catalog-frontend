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
import { Resource } from "./Interfaces";

interface ResourceCardViewProps {
    allResources: Resource[];
}

export function ResourceCard({
    allResources,
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
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
