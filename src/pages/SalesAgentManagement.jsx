import Sidebar from '../components/Sidebar';
import usegetAgents from '../hooks/usegetAgents'
import { Link } from 'react-router-dom';

const SalesAgentManagement = () => {
    const { agents,load,err } = usegetAgents()

    //loading and error
    if (load) {
        return (
            <div className="status-box loading">
                <div className="spinner-border text-warning me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                Loading leads...
            </div>
        );
    }

    if (err) {
        return (
            <div className="status-box error">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                { "Something went wrong while fetching data."}
            </div>
        );
    }

    //agents list
    const agentList = agents.map(a => (
        <div className='col-md-3' key={a._id}>
            <div className="card lead-card-dark mb-3 bg-dark">
                <div className="card-body">
                    <h5 className="card-title">{a.name}</h5>
                    <ul className="mt-3 mb-0 lead-details">
                        <li><strong>Email:</strong> {a.email}</li>
                    </ul>
                </div>
            </div>
        </div>
    ))
    return (
        <div className="container-fluid bg-dark text-white">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <Sidebar heading={'Agent Management'} />

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 p-4 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                        <h2 className="text-warning">Sales Agent List</h2>
                        {(agents.length>0)?<div className='row mt-3'>
                            {agentList}
                        </div>:<p className='text-light'>No agents available.</p>}

                        <div className="mt-3">
                            <Link to="/agents/new" className={`btn-add-lead mt-3`}>
                                <i className="bi bi-plus-lg me-2"></i> Add Agent
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default SalesAgentManagement;