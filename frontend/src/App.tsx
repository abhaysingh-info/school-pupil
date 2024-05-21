import './App.css'
import Sidebar from "./components/Sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import AllSchool from "./components/all-school";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddSchool from "./components/all-school/AddSchool.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index={true} element={<Layout children={<AllSchool/>}/>}/>
                <Route path="/manage-school/add-school" element={<Layout children={<AddSchool />}/>}/>
                <Route path="*" element={<Layout children={<AllSchool/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

function Layout({children}: {children: React.ReactElement}) {
    return <div className="flex flex-row">
        <section className="flex max-w-max">
            <Sidebar/>
        </section>
        <section className={"w-full lg:pl-10 "}>
            <Navbar/>
            <section>
                {children}
            </section>
        </section>
    </div>
}

export default App
