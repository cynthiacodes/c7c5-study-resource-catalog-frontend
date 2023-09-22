import { Button, Container, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Resource, User } from "./Interfaces";
import { ResourceCard } from "./ResourceCard";

interface StudylistViewProp {
    currentUser: User | null | undefined;
    singleResource: Resource | null | undefined;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
    studyListData: Resource[];
}

export function Studylist({
    currentUser,
    singleResource,
    setSingleResource,
    studyListData,
}: StudylistViewProp): JSX.Element {
    return (
        <Container
            bg={"#FFFEFD"}
            minHeight={"100vh"}
            minWidth={"100vw"}
            pt={"2rem"}
            pb={"5rem"}
        >
            <Text fontSize={"2xl"} textAlign={"center"}>
                {currentUser?.name}'s' study list
                <Button ml="1rem">
                    <Link to={"/"}>Home</Link>
                </Button>
            </Text>
            <ResourceCard
                allResources={studyListData} // takes users study list array
                singleResource={singleResource} // stays as it is
                setSingleResource={setSingleResource} // stays as it is
            />
        </Container>
    );
}
