import { Button, Input } from "@chakra-ui/react";
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
            <Button key={index} onClick={() => handleFilterTags(tag)}>
                {tag}
            </Button>
        ));
    }

    const handleFilterTags = (tag: string) => {
        setInput(tag);
    };

    const tagFilters = createTag(allResources);

    return (
        <>
            <Input
                placeholder="Find a resource"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            {tagFilters}
        </>
    );
}
