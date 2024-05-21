import {Link} from "react-router-dom";


export default function Navbar() {

    const currentUrl = window.location.pathname;

    const getBreadcrumbs = () => {
        const breadcrumbs = currentUrl.split('/');
        return breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb === "") {
                return null;
            }
            const url = breadcrumbs.slice(0, index + 1).join('/');
            return (
                <li key={index}>
                    <Link to={url}>{breadcrumb}</Link>
                </li>
            )
        })
    }



    return (<>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <div className="text-sm breadcrumbs">
                    <ul>

{getBreadcrumbs()}

                        {/*<li><Link to={"/"}>Manage School</Link></li>*/}
                        {/*<li><Link to={"/all-school"}>All School</Link></li>*/}
                    </ul>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label htmlFor={"sidebar-menu"} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </>)
}