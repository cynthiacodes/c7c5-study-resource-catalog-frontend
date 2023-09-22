import { Box, Button, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { filterResourceBySearchInput } from "../utilities/filterResultsBySearchText";
import { Resource } from "./Interfaces";

interface searchViewProps {
    setFilteredResourcesArray: React.Dispatch<React.SetStateAction<Resource[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    allResources: Resource[];
}

export function Search({
    setFilteredResourcesArray,
    setInput,
    input,
    allResources,
}: searchViewProps): JSX.Element {
    useEffect(() => {
        const filteredArray: Resource[] = filterResourceBySearchInput(
            input,
            allResources
        );
        setFilteredResourcesArray(filteredArray);
    }, [input, allResources, setFilteredResourcesArray]);

    function createTag(resources: Resource[]) {
        const cloudOfTags: string[] = [];

        for (const resource of resources) {
            const tag: string = resource.tags;

            if (!cloudOfTags.includes(tag)) {
                cloudOfTags.push(resource.tags);
            }
        }
        return cloudOfTags.map((tag, index) => (
            <Button
                key={index}
                onClick={() => handleFilterTags(tag)}
                m={"1em 0.5rem"}
                borderRadius="full"
                border={"none"}
                textAlign={"center"}
                bg="yellow.500"
                color={"#FFFEFD"}
                variant="outline"
            >
                {tag}
            </Button>
        ));
    }

    const handleFilterTags = (tag: string) => {
        setInput(tag);
    };

    const tagFilters = createTag(allResources);

    return (
        <Box
            textAlign={"center"}
            boxShadow="base"
            p={"0.5rem"}
            mb={"1rem"}
            borderRadius={"1rem"}
        >
            {tagFilters}
            <Box display={"block"}>
                <Input
                    m={"1em auto"}
                    w={"50%"}
                    focusBorderColor="orange.100"
                    placeholder="Find a resource"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {input && (
                    <Button
                        ml={"1rem"}
                        onClick={() => {
                            setInput("");
                        }}
                    >
                        Show all
                    </Button>
                )}
            </Box>
        </Box>
    );
}
