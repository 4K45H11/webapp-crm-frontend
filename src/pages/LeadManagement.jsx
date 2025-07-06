import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from 'react';
import usegetAgents from "../hooks/usegetAgents";
import { ToastContainer, toast } from 'react-toastify'
import usegetCommnets from '../hooks/usegetCommnets'

const LeadManagement = () => {
    const { id = 'none' } = useParams()
    const [update, setUpdate] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(true)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const navigate = useNavigate()

    const { data, loading, error } = useFetch(`https://webapp-crm.vercel.app/leads/${id}`)

    //update lead section codes
    const { agents } = usegetAgents();
    const [leadDetails, setLeadDetails] = useState()
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

    useEffect(() => {
        if (data) {
            setLeadDetails(data)
            setLeadName(data.name)
            setLeadSource(data.source)
            setSalesAgent(data.salesAgent.name)
            setLeadStatus(data.status)
            setLeadPriority(data.priority)
            setTimeToClose(data.timeToClose)
            setLeadTags(data.tags)
        }
        if (data?.closedAt) {
            setUpdateBtn(false)
        }
    }, [data])

    //comment section
    const { comments } = usegetCommnets(id)
    const [newComment, setNewComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const [author, setAuthor] = useState('')

    useEffect(() => {
        if (comments) {
            setCommentList(comments)
        }
    }, [comments])

    // console.log(commentList)

    //loading and error section
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

    //utility functions
    const handleUpdate = async (e) => {
        e.preventDefault();
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

                const res = await fetch(`https://webapp-crm.vercel.app/leads/${id}`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to update lead');
                }

                const data = await res.json()

                if (data) {
                    toast.success('Lead updated successfully!')
                    //console.log('submitted data:', formData)
                    setLeadDetails(data)

                }
            }
        }
        catch (error) {
            toast.error('could not update lead')
            throw error;
        }
        finally {
            setUpdate(false)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`https://webapp-crm.vercel.app/leads/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to update lead');
            }

            const data = await res.json()

            if (data) {
                toast.success('Lead deleted successfully!')

            }
        }
        catch (error) {
            toast.error('could not delete lead')
            throw error;
        }
        finally {
            setTimeout(() => {
                navigate('/leads')
            }, 3000)
        }
    }

    const handleComment = async () => {
        try {

            if (newComment && author) {
                const commentInput = {
                    lead: id,
                    author,
                    commentText: newComment
                }
                const res = await fetch(`https://webapp-crm.vercel.app/leads/comments/${id}`, {
                    method: 'POST',
                    body: JSON.stringify(commentInput),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to add comment');
                }

                const data = await res.json()

                if (data) {
                    toast.success('Comment added successfully!')
                    setCommentList(prev=>([...prev,data]))
                }
            }

        } catch (error) {
            toast.error('could not add comment')
            throw error;
        }
        finally{
            setNewComment('')
            setAuthor('')
        }
    }

    return (
        <div className="container-fluid bg-dark text-white">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <Sidebar heading={'Lead Management'} />

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 p-4 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                        {/* lead details */}
                        <h2 className="text-warning">Lead Information</h2>
                        {
                            leadDetails ? (
                                <div className="lead-card p-3 my-3">
                                    <div className='mb-2'>
                                        <strong className="label">Lead Name:</strong> {leadDetails.name}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Sales Agent:</strong> {leadDetails.salesAgent.name}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Lead Source:</strong> {leadDetails.source}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Lead Status:</strong> {leadDetails.status}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Priority:</strong> {leadDetails.priority}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Time to Close:</strong> {leadDetails.timeToClose} Days
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Created:</strong> {new Date(leadDetails.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className='mb-2'>
                                        <strong className="label">Updated:</strong> {new Date(leadDetails.updatedAt).toLocaleDateString()}
                                    </div>
                                    {leadDetails.closedAt && <div className='mb-2'>
                                        <strong className="label">Closed:</strong> {new Date(leadDetails.closedAt).toLocaleDateString()}
                                    </div>}
                                </div>
                            ) : <p>No details available</p>
                        }
                        {/* update and delete btn */}
                        {updateBtn && <div className={`btn-add-lead me-3 mt-3`} onClick={() => setUpdate(true)} style={{ cursor: 'pointer' }}>Update Lead</div>}

                        <div onClick={() => setShowDeleteConfirm(true)} className={`btn-add-lead bg-danger mt-3`} style={{ cursor: 'pointer' }}>Delete Lead</div>

                        {showDeleteConfirm && (
                            <div className="overlay">
                                <div className="delete-popup">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="text-warning mb-0">Confirm Deletion</h5>
                                        <button className="btn-close btn-close-white" onClick={() => setShowDeleteConfirm(false)}></button>
                                    </div>
                                    <p className="text-light">Are you sure you want to delete this lead? This action cannot be undone.</p>
                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* update box */}
                        {update &&
                            <div className="overlay">
                                <div className="update-popup">
                                    <div className="popup-header d-flex justify-content-between align-items-center">
                                        <h5 className="text-warning mb-0">Update Lead</h5>
                                        <button className="btn-close btn-close-white" onClick={() => setUpdate(false)}></button>
                                    </div>

                                    <div className='popup-form-body mt-3'>
                                        <form onSubmit={handleUpdate} className="mt-3">
                                            <div className="mb-3">
                                                <label className="form-label">Lead Name</label>
                                                <input type="text"
                                                    value={leadName}
                                                    onChange={(e) => setLeadName(e.target.value)}
                                                    className="form-control" placeholder="Update name" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor='leadSource' className="form-label">Source</label>
                                                <select required value={leadSource} onChange={(e) => setLeadSource(e.target.value)} id="leadSource" className="form-select">
                                                    <option value="">Select</option>
                                                    {validSource.map(source => (
                                                        <option key={source} value={source}>{source}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor='salesAgent' className="form-label">Sales Agent</label>
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



                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-warning fw-bold text-dark">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* comment section */}

                        <div className="comment-section my-3">
                            <h5 className="text-orange">Comments</h5>

                            {commentList.length > 0 ? commentList.map((c, i) => (
                                <div key={i} className="comment mb-3 p-2 rounded">
                                    <div className="d-flex justify-content-between">
                                        <strong className="label">{c.author.name}</strong>
                                        <small >
                                            {new Date(c.createdAt).toLocaleDateString()} | {new Date(c.createdAt).toLocaleTimeString()}
                                        </small>
                                    </div>
                                    <div className="text-light mt-1">{c.commentText}</div>
                                </div>
                            )) : <p>No Comments : {`(`}</p>}

                            {/* comment box area */}
                            <div className="mt-3">

                                <textarea
                                    required
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />

                                <label htmlFor='salesAgent' className="form-label"><span className='me-2'>Author:</span></label>
                                <select className='mb-3 mt-2' required value={author} onChange={(e) => setAuthor(e.target.value)} id="salesAgent" >
                                    <option value="">Select</option>
                                    {agents.map(agent => (
                                        <option key={agent._id} value={agent._id}>{agent.name}</option>
                                    ))}
                                </select> <br />
                                <button onClick={() => handleComment()} className="btn btn-warning" >
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </div>
    )
}

export default LeadManagement;