import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from 'react-toastify'
const AddAgent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const handleForm = async (e) => {
        e.preventDefault()
        try {
            if (name && email) {
                const formData = {
                    name,email
                }
                const res =await fetch(`https://webapp-crm.vercel.app/agents/new`,{
                    method:'POST',
                    body:JSON.stringify(formData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(!res.ok){
                    const error = await res.json()
                    throw new Error(error.message || 'Failed to add agent.')
                }
                const data = await res.json()
                if(data){
                    toast.success('Agent added successfully!')
                    setName('')
                    setEmail('')
                }
            }
        } catch (error) {
            toast.error('could not add agent')
            throw error.message;
        }

    }
    return (
        <div className="container-fluid bg-dark text-white">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <Sidebar heading={'Add New Sales Agent'} />

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="add-lead-card">

                                    <h3 className="mb-4 text-warning text-center fw-bold">Details</h3>

                                    <form onSubmit={handleForm}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control" placeholder="Enter lead name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="timeToclose" className="form-label">Email</label>
                                            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="timeToclose" className="form-control" />
                                        </div>
                                        <div className="d-grid mt-4">
                                            <button type="submit" className="add-lead-btn">Add Agent</button>
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
    )
}

export default AddAgent;