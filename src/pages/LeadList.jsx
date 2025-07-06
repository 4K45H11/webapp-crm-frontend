import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import usegetAgents from "../hooks/usegetAgents";

const LeadList = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { agents } = usegetAgents();

    const [leads, setLeads] = useState([]);
    const { data, loading, error, errorMsg, setUrl } = useFetch(); // no initial url

    //fetch leads based on query params
    //searchParams is an object of query params
    //when ever I try to do something outside useEffect It gives infinite 
    // rerender error because react blocks updation of state during component 
    // rendering
    useEffect(() => {
        const status = searchParams.get("status");
        const agent = searchParams.get("agent");

        let updatedUrl = "https://webapp-crm.vercel.app/leads";

        if (status) {
            updatedUrl += `?status=${status}`;
            setFilter("status");
            setShowFilter(true);
        } else if (agent) {
            updatedUrl += `?salesAgent=${agent}`;
            setFilter("sales agent");
            setShowFilter(true);
        } else {
            setFilter("All");
            setShowFilter(false);
        }

        setUrl(updatedUrl);
    }, [searchParams]);

    // update leads when data arrives
    useEffect(() => {
        if (data) {
            setLeads(data);
        }
    }, [data]);

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

    const validStatus = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];

    const handleRemoveFilter = () => {
        setFilter('All');
        setShowFilter(false);
        navigate(`/leads`);
        setUrl(`https://webapp-crm.vercel.app/leads`);
    };

    const handleFilter = (value) => {
        if (validStatus.includes(value)) {
            setSearchParams({ status: value });
            return;
        }

        setSearchParams({ agent: value });
    };

    const handleSort = (e) => {
        const { value } = e.target;
        if (value === 'time') {
            const sorted = [...leads].sort((a, b) => a.timeToClose - b.timeToClose);
            return setLeads(sorted);
        }

        if (value === 'priority') {
            const priorityOrder = ['High', 'Medium', 'Low'];
            const sorted = [...leads].sort(
                (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
            );
            return setLeads(sorted);
        }

        setLeads(data); // reset sort
    };

    const handleLeadDetails = (id) => {
        return navigate(`/leads/${id}`);
    };

    const leadList = leads.map((l) => (
        <div onClick={() => handleLeadDetails(l._id)} className="col-md-3" key={l._id}>
            <div className="card lead-card-dark mb-3 bg-dark">
                <div className="card-body">
                    <h5 className="card-title">{l.name}</h5>
                    <span className={`badge status-badge bg-${(l.status.toLowerCase() !== 'proposal sent') ? l.status.toLowerCase() : 'proposal'}`}>
                        {l.status}
                    </span>
                    <ul className="mt-3 mb-0 lead-details">
                        <li><strong>Priority:</strong> {l.priority}</li>
                        <li><strong>Agent:</strong> {l.salesAgent.name}</li>
                    </ul>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="app-container bg-dark text-white">
            <div className="row no-gutters w-100">
                <Sidebar heading={'Lead list'} />
                <div className="col-12 col-md-8 col-lg-9 p-4 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                        <h2 className="text-warning mb-3">Leads</h2>
                        {showFilter && (
                            <h4 className="mb-3">
                                Filter: {filter}
                                <button onClick={handleRemoveFilter} className="btn btn-sm bg-warning mx-3">remove</button>
                            </h4>
                        )}
                        {leads.length > 0 ? (
                            <div className="row mt-2">{leadList}</div>
                        ) : (
                            <div><h4 className="text-warning">No leads available</h4></div>
                        )}

                        <section>
                            <h2 className="text-warning mb-3">Sort & Filter</h2>

                            <p>Status</p>
                            <ul className="d-flex flex-wrap gap-3 p-3 lead-status-list" style={{ cursor: 'pointer' }}>
                                {validStatus.map(status => (
                                    <li key={status} onClick={() => handleFilter(status)}>{status}</li>
                                ))}
                            </ul>

                            <p>Agents</p>
                            <ul className="d-flex flex-wrap gap-3 p-3 lead-status-list" style={{ cursor: 'pointer' }}>
                                {agents.length > 0 ? agents.map(a => (
                                    <li key={a._id} onClick={() => handleFilter(a._id)}>{a.name}</li>
                                )) : <p>No agents found.</p>}
                            </ul>

                            <section className="sort-options-section mt-4 bg-dark">
                                <label className="form-check-label me-4">
                                    <input onChange={handleSort} type="radio" className="form-check-input me-2" name="sort" value="priority" />
                                    Sort by Priority
                                </label>
                                <label className="form-check-label me-4">
                                    <input onChange={handleSort} type="radio" className="form-check-input me-2" name="sort" value="time" />
                                    Sort by Closing Time
                                </label>
                                <label className="form-check-label me-4">
                                    <input onChange={handleSort} type="radio" className="form-check-input me-2" name="sort" value="none" />
                                    None
                                </label>
                            </section>

                            <div className="mt-3">
                                <Link to="/leads/new" className="btn-add-lead mt-3">
                                    <i className="bi bi-plus-lg me-2"></i> Add Lead
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadList;
