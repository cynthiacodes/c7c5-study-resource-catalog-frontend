import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { baseURL } from "../utilities/baseURL";
import axios from "axios";
import { number } from "prop-types";
import { User } from "./Interfaces";

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

interface currentUserProps {
    currentUser: User | null | undefined;
}

export function AddNewResource({ currentUser }: currentUserProps): JSX.Element {
    const [resourceName, setResourceName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [contentType, setContentType] = useState("");
    const [recommendedStage, setRecommendedStage] = useState("");
    const [userId, setUserId] = useState<number>();
    const [creatorOpinion, setCreatorOpinion] = useState("");
    const [creatorReason, setCreatorReason] = useState("");

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
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Resource Name:</FormLabel>
                <Input
                    placeholder="Type here..."
                    value={resourceData?.author_name}
                    onChange={(e) => {
                        setResourceName(e.target.value);
                    }}
                />
                <FormLabel>Author Name:</FormLabel>
                <Input
                    value={authorName}
                    onChange={(e) => {
                        setAuthorName(e.target.value);
                    }}
                />

                <FormLabel>URL:</FormLabel>
                <Input
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                    }}
                />
                <FormLabel>Description:</FormLabel>
                <Input
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />

                {/* dropdown */}
                <FormLabel>Tag:</FormLabel>
                <Input
                    value={tag}
                    onChange={(e) => {
                        setTag(e.target.value);
                    }}
                />
                <FormLabel>Content Type:</FormLabel>
                <Input
                    value={contentType}
                    onChange={(e) => {
                        setContentType(e.target.value);
                    }}
                />
                <FormLabel>Recommended Stage:</FormLabel>
                <Input
                    value={recommendedStage}
                    onChange={(e) => {
                        setRecommendedStage(e.target.value);
                    }}
                />
                <FormLabel>Your Opinion:</FormLabel>

                {/* dropdown */}
                <Input
                    value={creatorOpinion}
                    onChange={(e) => {
                        setCreatorOpinion(e.target.value);
                    }}
                />
                <FormLabel> Reason:</FormLabel>

                <Input
                    value={creatorReason}
                    onChange={(e) => {
                        setCreatorReason(e.target.value);
                    }}
                />
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
