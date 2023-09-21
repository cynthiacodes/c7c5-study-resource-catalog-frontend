import { Button, Container, Text } from "@chakra-ui/react";
import { User } from "./Interfaces";
import { Link } from "react-router-dom";
// import { ResourceCard } from "./ResourceCard";

interface StudylistViewProp {
    currentUser: User | null | undefined;
}

export function Studylist({ currentUser }: StudylistViewProp): JSX.Element {
    //fetch current users study list from database in App.tsx, set state in app.tsx and pass down as props
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
            {/* <ResourceCard
                        allResources={filteredResourcesArray} // takes users study list array
                        singleResource={singleResource} // stays as it is
                        setSingleResource={setSingleResource} // stays as it is
                    /> */}
        </Container>
    );
}
