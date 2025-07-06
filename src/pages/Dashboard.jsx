import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from 'react'
const DashBoard = () => {
    const [leads, setLeads] = useState([])
    const { data, loading, error, errorMsg } = useFetch(`https://webapp-crm.vercel.app/leads`)
    const navigate = useNavigate();

    useEffect(() => {
        if (data) setLeads(data)
    }, [data])

    //always perform return after calling all hooks
    if (loading) {
        return (
            <div className="status-box loading">
                <div className="spinner-border text-warning me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                Loading leads...
            </div>
        );
    }

    if (error) {
        return (
            <div className="status-box error">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMsg || "Something went wrong while fetching data."}
            </div>
        );
    }

    //lead details navigation
    const handleLeadDetails = (id)=>{
        return navigate(`/leads/${id}`)
    }

    //lead listing

    if (leads.length > 0) leads.sort((item1, item2) => new Date(item2.createdAt) - new Date(item1.createdAt))

    const leadList = leads.map((l, index) => (
        (index <= 3) && <div onClick={()=>handleLeadDetails(l._id)} className='col-md-3' key={l._id}>
            <div className="card lead-card-dark mb-3 bg-dark">
                <div className="card-body">
                    <h5 className="card-title">{l.name}</h5>
                    <span className={`badge status-badge bg-${(l.status.toLowerCase() !== `proposal sent`) ? l.status.toLowerCase() : `proposal`}`}>{l.status}</span>

                    <ul className="mt-3 mb-0 lead-details">
                        <li><strong>Priority:</strong> {l.priority}</li>
                        <li><strong>Agent:</strong> {l.salesAgent.name}</li>
                    </ul>
                </div>
            </div>
        </div>
    ))

    //status section
    const newLeads = leads.filter(l => l.status === 'New')
    const contactedLeads = leads.filter(l => l.status === 'Contacted')
    const qualifiedLeads = leads.filter(l => l.status === 'Qualified')
    const proposalLeads = leads.filter(l => l.status === 'Proposal Sent')
    const closedLeads = leads.filter(l => l.status === 'Closed')

    const handleFilter = (value) => {
        return navigate(`/leads?status=${value}`)
    }

    return (
        <div className="container-fluid bg-dark text-white app-container">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <div className="col-12 col-md-4 col-lg-3 sidebar p-4 d-flex flex-column">
                    <h4 className="mb-4 text-warning">CRM Dashboard</h4>
                    <ul className="nav flex-column fs-5 flex-grow-1">
                        <li className="nav-item mb-2">
                            <Link className="nav-link custom-link" to="/leads">Leads</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link custom-link" to="/agents">Sales Agents</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link custom-link" to="/reports">Reports</Link>
                        </li>
                    </ul>
                </div>

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 p-4 main-content d-flex align-items-start ">
                    <div className="content-box p-5 shadow rounded w-100">
                        <h2 className="text-warning mb-3">Latest leads</h2>
                        <div className='row'>
                            {leadList}
                        </div>
                        <section>
                            <h2 className="text-warning mb-3">Lead status</h2>

                            <ul className="d-flex flex-wrap gap-3 p-3 lead-status-list">
                                <li><span className="status-label new">New:</span> {newLeads.length}</li>
                                <li><span className="status-label contacted">Contacted:</span> {contactedLeads.length}</li>
                                <li><span className="status-label qualified">Qualified:</span> {qualifiedLeads.length}</li>
                                <li><span className="status-label proposal">Proposal Sent:</span> {proposalLeads.length}</li>
                                <li><span className="status-label closed">Closed:</span> {closedLeads.length}</li>
                            </ul>

                        </section>
                        <section>
                            <h2 className="text-warning mb-3">Quick filters</h2>
                            <ul className="d-flex flex-wrap gap-3 p-3 lead-status-list" style={{cursor:'pointer'}}>
                                <li onClick={() => handleFilter('New')}>New</li>
                                <li onClick={() => handleFilter('Contacted')}>Contacted</li>
                                <li onClick={() => handleFilter('Qualified')}>Qualified</li>
                                <li onClick={() => handleFilter('Proposal Sent')}>Proposal Sent</li>
                                <li onClick={() => handleFilter('Closed')}>Closed</li>
                            </ul>
                            <Link to="/leads/new" className={`btn-add-lead mt-3`}>
                                <i className="bi bi-plus-lg me-2"></i> Add Lead
                            </Link>

                        </section>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default DashBoard;