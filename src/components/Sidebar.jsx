import { Link } from "react-router-dom"

const Sidebar = ({heading}) => {
    return (
        <div className="col-12 col-md-4 col-lg-3 sidebar p-4 d-flex flex-column">
            <h4 className="mb-4 text-warning">{heading}</h4>
            <ul className="nav flex-column fs-5 flex-grow-1">
                <li className="nav-item mb-2">
                    <Link className="nav-link custom-link" to="/">Dashboard</Link>
                </li>

            </ul>
        </div>
    )
}

export default Sidebar;
