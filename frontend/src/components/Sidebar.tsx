import FA from "react-fontawesome"
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="sidebar-menu" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu z-50 bg-primary work-sans-600 text-lg leading-7 p-4 pl-0 w-80 min-h-full gap-5 text-base-content">
                        <li className="menu-item flex items-center justify-center my-16">
                            <a href={"/"}>
                                <div className="bg-white p-8 rounded-full flex items-center justify-center ">
                                    <img src={"/logo.svg"} alt="logo" className={"w-10"}/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a>
                                <FA name={"rocket"}/> Dashboard
                            </a>
                        </li>
                        <li>
                            <a>
                                <FA name={"graduation-cap"}/> Manage School <FA name={"chevron-down"}/>
                            </a>
                        </li>
                        <li className="menu-item bg-base-content text-base-100 rounded-r-[2rem] pt-2 h-min max-h-max">
                            <a>
                                    <FA name={"graduation-cap"}/> Manage School <FA name={"chevron-down"}/>
                            </a>
                            <ManageSchoolDropDownMenu />

                        </li>
                        <li>
                            <a>
                                <FA name={"gear"}/> App Setting
                            </a>
                        </li>
                        <li>
                            <a>
                            <FA name={"user"}/> Past Pupils
                            </a>
                        </li>
                        <li>
                            <a>
                                <FA name={"comments"}/> SMS
                            </a>
                        </li>
                        <li>
                            <a>
                                <FA name={"lock"}/> 2FA
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
        </>
    )
}

function ManageSchoolDropDownMenu(){
    return (
        <div className="max-w-[80%]">
            <ul
                className="shadow rounded-box">
                <li className={"text-primary"}><Link to={"/manage-school/all-school"} >All School</Link></li>
                <li><a>School Admin</a></li>
                <li><a>School Contacts</a></li>
            </ul>
        </div>
    )
}