import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { baseURL } from "../utilities/baseURL";
import axios from "axios";

export interface NewResource {
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    tags: string;
    content_type: string;
    recommended_stage: string;
    user_id: number;
    creator_opinion: string;
    creator_reason: string;
}

export function AddNewResource(): JSX.Element {
    const [resourceName, setResourceName] = useState(Array(10).fill(null));
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const resourceInput = {
                resource_name: string,
                author_name: string,
                url: string,
                description: string,
                tags: string,
                content_type: string,
                recommended_stage: string,
                user_id: number,
                creator_opinion: string,
                creator_reason: string,
            };
            const response = await axios.post(
                `${baseURL}resources`,
                resourceInput
            );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Resource Name:</FormLabel>
                <Input
                    placeholder="Type here..."
                    value={resourceName}
                    onChange={(e) => {
                        setResourceName(e.target.value);
                    }}
                />
                <FormLabel>URL:</FormLabel>
                <Input />
                <FormLabel>Description:</FormLabel>
                <Input placeholder="Type here..." />
            </FormControl>
        </form>
    );
}

/*
resource_name,
            author_name,
            url,
            description,
            tags,
            content_type,
            recommended_stage,
            user_id,
            creator_opinion,
            creator_reason,
*/
