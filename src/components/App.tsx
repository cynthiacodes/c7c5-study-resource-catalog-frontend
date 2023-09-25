import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Resource, User } from "../utilities/Interfaces";
import { baseURL } from "../utilities/baseURL";
import { fetchAllResources } from "../utilities/fetchAllResources";
import { fetchAllUsers } from "../utilities/fetchAllUsers";
import { AddNewResource } from "./AddNewResource";
import { DetailedResourceCard } from "./DetailedResourceCard";
import { LandingPage } from "./LandingPage";
import { Studylist } from "./Studylist";

function App() {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [allResources, setAllResources] = useState<Resource[]>([]);
    const [singleResource, setSingleResource] = useState<Resource | null>();
    const [users, setUsers] = useState<User[]>([]);
    const [isSignIn, setIsSignIn] = useState(false);
    const [studyListData, setStudyListData] = useState<Resource[]>([]);
    useEffect(() => {
        fetchAllUsers().then((allUsers) => setUsers(allUsers));
    }, []);
    useEffect(() => {
        fetchAllResources().then((allResourceFromDB) =>
            setAllResources(allResourceFromDB)
        );
    }, []);

    const fetchStudyList = async () => {
        const response = await axios.get(
            `${baseURL}to-study/${currentUser?.user_id}`
        );
        const userStudyListData = response.data;
        return userStudyListData;
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            allResources={allResources}
                            singleResource={singleResource}
                            setSingleResource={setSingleResource}
                            users={users}
                            isSignIn={isSignIn}
                            setIsSignIn={setIsSignIn}
                        />
                    }
                />
                <Route
                    path="/to-study/:user_id"
                    element={
                        <Studylist
                            currentUser={currentUser}
                            singleResource={singleResource}
                            setSingleResource={setSingleResource}
                            studyListData={studyListData}
                        />
                    }
                />
                <Route
                    path={`/resource/:resource_Id`}
                    element={
                        <DetailedResourceCard
                            setStudyListData={setStudyListData}
                            fetchStudyList={fetchStudyList}
                            singleResource={singleResource}
                            users={users}
                            isSignIn={isSignIn}
                            setSingleResource={setSingleResource}
                            currentUser={currentUser}
                        />
                    }
                />
                <Route
                    path="/newresource"
                    element={<AddNewResource currentUser={currentUser} />}
                />
            </Routes>
        </div>
    );
}

export default App;
