export interface Resource {
    resource_id: number;
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    tags: string;
    content_type: string;
    recommended_stage: string;
    date_created: string;
    user_id: number;
    creator_opinion: string;
    creator_reason: string;
}

export interface User {
    user_id: number;
    name: string;
    is_faculty: boolean;
}

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
