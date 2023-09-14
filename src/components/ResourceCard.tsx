import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utilities/baseURL";

interface Resource {
    resources_id: number;
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    tags: string;
    content_type: string;
    recommended_stage: string;
    date_created: string;
    user_id: number;
    creator_opinion: string;
    creator_reason: string;
}
export function ResourceCard(): JSX.Element {
    const [allResources, setAllResources] = useState<Resource[]>([]);
    const getAllResources = async () => {
        try {
            const response = await axios.get(`${baseURL}resources`);
            const resourceList = response.data;
            setAllResources(resourceList);
            console.log("resource list", resourceList);
            console.log("all resources state", allResources);
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {
        getAllResources();
    }, []);

    const resources = allResources.map((resource) => (
        <Card maxW="sm" key={resource.resources_id}>
            <CardBody>
                <Stack mt="6" spacing="3">
                    <Heading size="md">{resource.resource_name}</Heading>
                    <Text>{resource.author_name}</Text>
                    <Text>{resource.description}</Text>
                    <Text color="blue.600">{resource.recommended_stage}</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button variant="solid" colorScheme="blue">
                    See more
                </Button>
            </CardFooter>
        </Card>
    ));
    return <>{resources}</>;
}
