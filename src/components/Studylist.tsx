import { Button, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Resource, User } from "./Interfaces";
import { ResourceCard } from "./ResourceCard";

interface StudylistViewProp {
    currentUser: User | null | undefined;
    singleResource: Resource | null | undefined;
    setSingleResource: React.Dispatch<
        React.SetStateAction<Resource | null | undefined>
    >;
    fetchStudyList: () => Promise<Resource[]>;
    isChecked: boolean;
}

export function Studylist({
    currentUser,
    singleResource,
    setSingleResource,
    fetchStudyList,
    isChecked,
}: StudylistViewProp): JSX.Element {
    const [studyListData, setStudyListData] = useState<Resource[]>([]);

    useEffect(() => {
        fetchStudyList().then((data) => {
            setStudyListData(data);
        });
    }, [fetchStudyList, isChecked]);

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
