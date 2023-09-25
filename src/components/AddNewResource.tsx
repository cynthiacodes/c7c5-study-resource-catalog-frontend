import {
    Box,
    Button,
    ButtonGroup,
    Container,
    FormControl,
    FormLabel,
    Input,
    Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    contentTypeArray,
    creatorReasonsArray,
    stageArray,
    tagsArray,
} from "../utilities/AddNewResourcesSelectOptions";
import { NewResource, User } from "../utilities/Interfaces";
import { baseURL } from "../utilities/baseURL";

interface currentUserProps {
    currentUser: User | null | undefined;
}

export function AddNewResource({ currentUser }: currentUserProps): JSX.Element {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setIsLoading(true);
        try {
            await axios.post(`${baseURL}resources`, resourceData);

            setIsLoading(false);
            setSubmitted(true);
        } catch (error) {
            alert(`error, your resource failed to add, ${error}`);
            console.error(error);
            setIsLoading(false);
        }
    }
    function handleResourceInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setResourceData({
            ...resourceData,

            [e.target.name]: value,
        });
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
            <Container
                bg={"#FFFEFD"}
                minHeight={"100vh"}
                minWidth={"100vw"}
                pt={"2.5rem"}
                pb={"5rem"}
            >
                <Box
                    w={"50%"}
                    p={"1em"}
                    m={"auto"}
                    textAlign={"center"}
                    shadow={"base"}
                >
                    <FormControl isRequired>
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Resource Name:
                        </FormLabel>
                        <Input
                            placeholder="Type here..."
                            name="resource_name"
                            value={resourceData.resource_name}
                            onChange={handleResourceInput}
                            focusBorderColor="orange.100"
                            maxLength={100}
                            type="text"
                        />
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Author Name:
                        </FormLabel>
                        <Input
                            name="author_name"
                            value={resourceData.author_name}
                            onChange={handleResourceInput}
                            focusBorderColor="orange.100"
                            maxLength={50}
                            type="text"
                        />

                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            URL:
                        </FormLabel>
                        <Input
                            name="url"
                            value={resourceData.url}
                            onChange={handleResourceInput}
                            focusBorderColor="orange.100"
                            type="url"
                            maxLength={255}
                        />
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Description:
                        </FormLabel>
                        <Input
                            name="description"
                            value={resourceData.description}
                            onChange={handleResourceInput}
                            focusBorderColor="orange.100"
                        />

                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Tag:
                        </FormLabel>

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
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Content Type:
                        </FormLabel>
                        <Select
                            name="content_type"
                            value={resourceData.content_type}
                            onChange={handleResourceSelect}
                            placeholder="select content type"
                        >
                            {contentTypeArray.map((contentType, index) => (
                                <option value={contentType} key={index}>
                                    {contentType}
                                </option>
                            ))}
                        </Select>
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Recommended Stage:
                        </FormLabel>
                        <Select
                            name="recommended_stage"
                            value={resourceData.recommended_stage}
                            onChange={handleResourceSelect}
                            placeholder="select stage"
                        >
                            {stageArray.map((stage, index) => (
                                <option value={stage} key={index}>
                                    {stage}
                                </option>
                            ))}
                        </Select>
                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            Your Opinion:
                        </FormLabel>

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

                        <FormLabel mt={"0.5rem"} ml={"0.5rem"} fontSize={"xl"}>
                            {" "}
                            Reason:
                        </FormLabel>

                        <Input
                            name="creator_reason"
                            value={resourceData.creator_reason}
                            onChange={handleResourceInput}
                            focusBorderColor="orange.100"
                        />
                        <ButtonGroup spacing="6" mt={"1em"}>
                            <Button
                                type="submit"
                                colorScheme="green"
                                size="md"
                                width="250px"
                                isLoading={!isLoading}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                height="48px"
                                width="250px"
                            >
                                <Link to="/">Cancel</Link>
                            </Button>
                        </ButtonGroup>
                        {submitted && <Navigate to="/" />}
                    </FormControl>
                </Box>
            </Container>
        </form>
    );
}
