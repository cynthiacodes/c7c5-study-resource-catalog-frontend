export interface Resource {
    resources_id: number;
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
