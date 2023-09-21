import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./LandingPage";
import { AddNewResource } from "./AddNewResource";
import { useEffect, useState } from "react";
import { Resource, User } from "./Interfaces";
import { DetailedResourceCard } from "./DetailedResourceCard";
import { fetchAllUsers } from "../utilities/fetchAllUsers";
import { Studylist } from "./Studylist";

function App() {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [singleResource, setSingleResource] = useState<Resource | null>();
    const [users, setUsers] = useState<User[]>([]);
    const [isSignIn, setIsSignIn] = useState(false);
    useEffect(() => {
        fetchAllUsers().then((allUsers) => setUsers(allUsers));
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            singleResource={singleResource}
                            setSingleResource={setSingleResource}
                            users={users}
                            isSignIn={isSignIn}
                            setIsSignIn={setIsSignIn}
                        />
                    }
                />
                <Route
                    path="/studylist/:user_id"
                    element={<Studylist currentUser={currentUser} />}
                />
                <Route
                    path={`/resource/:resource_Id`}
                    element={
                        <DetailedResourceCard
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
