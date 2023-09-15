import { Resource } from "../components/Interfaces";

export const filterResourceBySearchInput = (
    searchText: string,
    inputArray: Resource[]
): Resource[] => {
    const filteredArrayBySearch = inputArray.filter(
        (eachResource) =>
            eachResource.resource_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            eachResource.author_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            eachResource.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            eachResource.tags.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredArrayBySearch;
};
