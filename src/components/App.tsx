import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./LandingPage";
import { AddNewResource } from "./AddNewResource";
import { useState } from "react";
import { User } from "./Interfaces";

function App() {
    const [currentUser, setCurrentUser] = useState<User | null>();
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
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
