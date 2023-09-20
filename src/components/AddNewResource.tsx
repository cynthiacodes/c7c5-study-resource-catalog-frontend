import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../utilities/baseURL";
import { User } from "./Interfaces";
import { Link } from "react-router-dom";

export interface NewResource {
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    tags: string;
    content_type: string;
    recommended_stage: string;
    user_id: number | undefined;
    creator_opinion: string;
    creator_reason: string;
}

interface currentUserProps {
    currentUser: User | null | undefined;
}
const tagsArray: string[] = [
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

const creatorReasonsArray: string[] = [
    "I recommend this resource after having used it",
    "I do not recommend this resource, having used it",
    "I haven't used this resource but it looks promising",
];

export function AddNewResource({ currentUser }: currentUserProps): JSX.Element {
    const [resourceData, setResourceData] = useState<NewResource>({
        resource_name: "",
        author_name: "",
        url: "",
        description: "",
        tags: "",
        content_type: "",
        recommended_stage: "",
        user_id: currentUser?.user_id,
        creator_opinion: "",
        creator_reason: "",
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseURL}resources`,
                resourceData
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    function handleResourceInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setResourceData({
            ...resourceData,

            [e.target.name]: value,
        });
        console.log("resourceData", resourceData);
    }
    function handleResourceSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        setResourceData({
            ...resourceData,

            [e.target.name]: value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel>Resource Name:</FormLabel>
                <Input
                    placeholder="Type here..."
                    name="resource_name"
                    value={resourceData.resource_name}
                    onChange={handleResourceInput}
                    maxLength={100}
                    type="text"
                />
                <FormLabel>Author Name:</FormLabel>
                <Input
                    name="author_name"
                    value={resourceData.author_name}
                    onChange={handleResourceInput}
                    maxLength={50}
                    type="text"
                />

                <FormLabel>URL:</FormLabel>
                <Input
                    name="url"
                    value={resourceData.url}
                    onChange={handleResourceInput}
                    type="url"
                    maxLength={255}
                />
                <FormLabel>Description:</FormLabel>
                <Input
                    name="description"
                    value={resourceData.description}
                    onChange={handleResourceInput}
                />

                <FormLabel>Tag:</FormLabel>

                <Select
                    name="tags"
                    value={resourceData.tags}
                    onChange={handleResourceSelect}
                    placeholder="select tag"
                >
                    {tagsArray.map((tag, index) => (
                        <option value={tag} key={index}>
                            {tag}
                        </option>
                    ))}
                </Select>
                <FormLabel>Content Type:</FormLabel>
                <Input
                    name="content_type"
                    value={resourceData.content_type}
                    onChange={handleResourceInput}
                />
                <FormLabel>Recommended Stage:</FormLabel>
                <Input
                    name="recommended_stage"
                    value={resourceData.recommended_stage}
                    onChange={handleResourceInput}
                />
                <FormLabel>Your Opinion:</FormLabel>

                <Select
                    name="creator_opinion"
                    value={resourceData.creator_opinion}
                    onChange={handleResourceSelect}
                    placeholder="select opinion"
                >
                    {creatorReasonsArray.map((opinion, index) => (
                        <option value={opinion} key={index}>
                            {opinion}
                        </option>
                    ))}
                </Select>

                <FormLabel> Reason:</FormLabel>

                <Input
                    name="creator_reason"
                    value={resourceData.creator_reason}
                    onChange={handleResourceInput}
                />
                <Button type="submit">Submit</Button>
                <Button>
                    <Link to="/">Cancel</Link>
                </Button>
            </FormControl>
        </form>
    );
}
