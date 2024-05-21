import FA from "react-fontawesome"
import {TableView} from "./TableView.tsx";
import {Link} from "react-router-dom";



export default function AllSchool() {



    return (<>
        <div className="px-2">
            <div className="flex flex-row flex-wrap justify-between gap-4 lg:mt-16">
                <div className="">
                    <h1 className={"text-3xl"}>All School</h1>
                    <p className={"text-dark-gray"}>All Schools, registered, unregistered & app</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-sm bg-white">
                        <FA name={"download"} />
                        Export to CSV
                    </button>
                    <Link to={"/manage-school/add-school"}>
                        <button className="btn btn-primary btn-sm">
                            <FA name={"plus"}/>
                            Add School
                        </button>
                    </Link>
                </div>
            </div>
            <section className="mt-12">
                <TableView/>
            </section>
        </div>
    </>)
}