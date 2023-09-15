import { useEffect, useState } from "react";
import { filterResourceBySearchInput } from "../utilities/filterResultsBySearchText";
import { Resource } from "./Interfaces";
import { Button, Input } from "@chakra-ui/react";

interface searchViewProps {
    setFilteredResourcesArray: React.Dispatch<React.SetStateAction<Resource[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    allResources: Resource[];
}

const tagCategories = [
    "PostgreSQL",
    "React",
    "Frontend",
    "Backend",
    "TypeScript",
    "JavaScript",
    "GitHub",
    "Express.js",
    "CSS",
    "HTML",
    "Jest",
    "CI/CD",
    "Node.js",
];

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

    const tagFilters = tagCategories.map((tag) => <Button>{tag}</Button>);
    return (
        <>
            {tagFilters}
            <Input
                placeholder="Find a resource"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </>
    );
}
