import {useEffect, useState} from "react";
import {getSchools} from "../../services/school.service.ts";


export function TableView() {

    const [schools, setSchools] = useState<Element[]>([])

    let start = 0
    const [name, setName] = useState<string>("")


    function getSchoolByName(){
        getSchools(start, name).then(resp => {
            console.log(resp)
            start += 10
            setSchools(resp)
        }).catch(err => {
            console.log(err)

        })
    }

    function onInput(event) {
        setName(event.target.value)
        getSchoolByName()
    }


    useEffect(() => {
        // fetch all schools
        getSchoolByName()

    }, [])
    console.log(start)
    return (<>
    <div>

        <div className="flex mb-6 gap-4 lg:gap-12 items-center flex-wrap">
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" onInput={onInput} className="grow input-sm" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-70">
                        <path fill-rule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clip-rule="evenodd"/>
                    </svg>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary"/>
                    <span className="label-text">Show only School Clients (18)</span>
                </label>
            </div>
        </div>
    </div>
    <div>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr className={"uppercase"}>
                    <th>
                        <input type="checkbox" className="checkbox checkbox-primary"/>
                    </th>
                    <th>ID</th>
                    <th>School Name</th>
                    <th>FileMaker ID</th>
                    <th>Date Created</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>App Clinet?</th>
                    <th>No. Past Pupils</th>
                </tr>
                </thead>
                <tbody>
                {schools.length ? schools.map((obj:any, index: number) => <tr key={obj.email}>
                    <th>
                        <input type="checkbox" className="checkbox checkbox-primary"/>
                    </th>
                    <th>{index+1}</th>
                    <td>{obj.name}</td>
                    <td>{obj.filemaker}</td>
                    <td>{obj.createdAt}</td>
                    <td>{obj.updatedAt}</td>
                    <td>
                        <div className={obj.status === 'pending' ? "badge badge-warning badge-lg" : "badge success-badge badge-lg"}>{obj.status}</div>
                    </td>
                    <td>{obj.appClient ? 'Yes': 'No'}</td>
                    <td>{obj.noOfStudents}</td>
                </tr>) : <tr>
                    <td colSpan={9} className="text-center ">
                        No data found
                    </td>
                </tr>}
                </tbody>
            </table>
        </div>
    </div>
</>)
}