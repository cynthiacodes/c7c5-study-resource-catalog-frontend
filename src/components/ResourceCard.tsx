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

export function ResourceCard(): JSX.Element {
    return (
        <Card maxW="sm">
            <CardBody>
                <Stack mt="6" spacing="3">
                    <Heading size="md">(Title)</Heading>
                    <Text>
                        ( This sofa is perfect for modern tropical spaces,
                        baroque inspired spaces, earthy toned spaces and for
                        people who love a chic design with a sprinkle of vintage
                        design.)
                    </Text>
                    <Text color="blue.600">(recommended stage)</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button variant="solid" colorScheme="blue">
                    See more
                </Button>
            </CardFooter>
        </Card>
    );
}
