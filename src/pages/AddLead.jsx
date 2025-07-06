import { useState } from "react";
import usegetAgents from "../hooks/usegetAgents";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from 'react-toastify'

const AddLead = () => {
    const { agents } = usegetAgents();

    const [leadName, setLeadName] = useState('')
    const [leadSource, setLeadSource] = useState('')
    const [salesAgent, setSalesAgent] = useState('')
    const [leadStatus, setLeadStatus] = useState('')
    const [leadPriority, setLeadPriority] = useState('')
    const [timeToClose, setTimeToClose] = useState(0)
    const [leadTags, setLeadTags] = useState([])


    const validStatus = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
    const validTags = ['High Value', 'Follow-up', 'Urgent'];
    const validPriority = ['High', 'Medium', 'Low'];
    const validSource = ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'];

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            if (leadName && leadSource && salesAgent && leadStatus && leadPriority && timeToClose && leadTags) {
                const formData = {
                    name: leadName,
                    source: leadSource,
                    salesAgent: salesAgent,
                    status: leadStatus,
                    tags: leadTags,
                    timeToClose: timeToClose,
                    priority: leadPriority,
                }

                //post data to the server

                const res = await fetch(`https://webapp-crm.vercel.app/leads/new`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to submit lead');
                }

                const data = await res.json()

                if (data) {
                    toast.success('Lead added successfully!')
                    //console.log('submitted data:', formData)

                    setLeadName("");
                    setLeadSource("");
                    setSalesAgent("");
                    setLeadStatus("");
                    setLeadPriority("");
                    setTimeToClose(0);
                    setLeadTags([]);
                    //visual reset
                    // e.target.reset()
                }
            }

        } catch (error) {
            toast.error('could not add lead')
            throw error;
        }

    }
    return (
        <div className="container-fluid bg-dark text-white">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <Sidebar heading={'Add New Lead'} />

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="add-lead-card">

                                        <h3 className="mb-4 text-warning text-center fw-bold">Details</h3>

                                        <form onSubmit={handleForm}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Lead Name</label>
                                                <input required value={leadName} onChange={(e) => setLeadName(e.target.value)} type="text" id="name" className="form-control" placeholder="Enter lead name" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="leadSource" className="form-label">Lead Source</label>
                                                <select required value={leadSource} onChange={(e) => setLeadSource(e.target.value)} id="leadSource" className="form-select">
                                                    <option value="">Select</option>
                                                    {validSource.map(source => (
                                                        <option key={source} value={source}>{source}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="salesAgent" className="form-label">Sales Agent</label>
                                                <select required value={salesAgent} onChange={(e) => setSalesAgent(e.target.value)} id="salesAgent" className="form-select">
                                                    <option value="">Select</option>
                                                    {agents.map(agent => (
                                                        <option key={agent._id} value={agent._id}>{agent.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="leadStatus" className="form-label">Lead Status</label>
                                                <select required value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)} id="leadStatus" className="form-select">
                                                    <option value="">Select</option>
                                                    {validStatus.map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="leadPriority" className="form-label">Lead Priority</label>
                                                <select required value={leadPriority} id="leadPriority" onChange={(e) => setLeadPriority(e.target.value)} className="form-select">
                                                    <option value="">Select</option>
                                                    {validPriority.map(priority => (
                                                        <option key={priority} value={priority}>{priority}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="timeToclose" className="form-label">Time to Close (in days)</label>
                                                <input required value={timeToClose} onChange={(e) => setTimeToClose(e.target.value)} type="number" id="timeToclose" className="form-control" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="leadTags" className="form-label">Tags</label>
                                                <select required value={leadTags} onChange={(e) => setLeadTags(Array.from(e.target.selectedOptions, option => option.value))} id="leadTags" multiple className="form-select">
                                                    {validTags.map(tag => (
                                                        <option key={tag} value={tag}>{tag}</option>
                                                    ))}
                                                </select>
                                                <small className="form-text text-light">Hold Ctrl (or Shift) to select multiple tags</small>
                                            </div>

                                            <div className="d-grid mt-4">
                                                <button type="submit" className="add-lead-btn">Add Lead</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

            </div>
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </div>
    );
};

export default AddLead;
