import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement,
    LineElement,
    PointElement,
    LineController,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement,
    LineElement,
    PointElement,
    LineController,)

import Sidebar from '../components/Sidebar'
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { usegetInPipeLine, usegetLastWeekReport } from "../hooks/usegetReport";
import usegetAgents from '../hooks/usegetAgents'

const Report = () => {
    const { lastWeekClosed } = usegetLastWeekReport()
    const { inPipeLine } = usegetInPipeLine()
    const { agents } = usegetAgents()

    const [closed, setClosed] = useState('')
    const [open, setOpen] = useState('')
    const [salesAgents, setSalesAgents] = useState('')

    useEffect(() => {
        if (lastWeekClosed && inPipeLine && agents) {
            setSalesAgents(agents)
            setOpen(inPipeLine)
            setClosed(lastWeekClosed)
        }

    }, [lastWeekClosed, inPipeLine, agents])

    const [leads, setLeads] = useState([])
    const { data, loading, error, errorMsg } = useFetch(`https://webapp-crm.vercel.app/leads`)

    useEffect(() => {
        if (data) setLeads(data)
    }, [data])

    //status data
    const validStatus = ['New', 'Contacted', 'Qualified', 'Proposal Sent']
    const newLeads = leads.filter(l => l.status === 'New')
    const contactedLeads = leads.filter(l => l.status === 'Contacted')
    const qualifiedLeads = leads.filter(l => l.status === 'Qualified')
    const proposalLeads = leads.filter(l => l.status === 'Proposal Sent')

    //agent wise lead distribution
    const agentList = (salesAgents || []).map(a => {
        const noOfleads = (leads || []).filter(l => l.salesAgent._id === a._id).length;
        return noOfleads
    })

    //all data sets to show in visually
    const agentWiseLeadData = {
        labels: (salesAgents || []).map(a => a.name),
        datasets: [{
            label: 'Total Leads',
            data: [...agentList],
            backgroundColor: 'rgba(255, 140, 0, 0.7)',
            borderColor: 'rgba(255, 140, 0, 1)',
            borderWidth: 1,
        }]
    };
    const agentWiseLeadOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff', // white text
                },
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#ffa500',
                bodyColor: '#ffffff',
            },
        },
        scales: {
            x: {
                ticks: { color: '#ffffff' },
                grid: { color: '#444' },
            },
            y: {
                ticks: { color: '#ffffff' },
                grid: { color: '#444' },
            },
        },
    };
    const statusWiseLeadData = {
        labels: [...validStatus],
        datasets: [{
            label: 'Total Leads',
            data: [newLeads.length, contactedLeads.length, qualifiedLeads.length, proposalLeads.length],
            backgroundColor: ['#ff9800', '#64b5f6', '#81c784', '#ba68c8'],
            borderWidth: 1
        }]
    }
    const statusWiseLeadOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#ffa500',
                bodyColor: '#ffffff',
            },
        },
        scales: {
            x: {
                ticks: { color: '#ffffff' },
                grid: { color: '#444' },
            },
            y: {
                ticks: { color: '#ffffff' },
                grid: { color: '#444' },
            },
        },
    }
    const reportData = {
        labels: ['Closed(last-week)', 'In Pipeline'],
        datasets: [{
            label: 'Total Leads',
            data: [closed.length, open.totalLeadsInPipeline],
            backgroundColor: ['#64b5f6', 'lightblue'],
            borderColor: 'green',
            borderWidth: 1,
        }]
    }
    const reportOption = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',   // White labels
                    font: {
                        size: 14,
                    },
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: '#333',   // Dark background
                titleColor: '#ffa500',     // Orange title
                bodyColor: '#ffffff',      // White body
                borderColor: '#ffa500',
                borderWidth: 1,
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    }

    return (
        <div className="container-fluid bg-dark text-white">
            <div className="row flex-md-nowrap min-vh-100">

                {/* sidebar */}
                <Sidebar heading={'Reports'} />

                {/* main Content */}
                <div className="col-12 col-md-8 col-lg-9 p-4 main-content d-flex align-items-start">
                    <div className="content-box p-5 shadow rounded w-100">
                        <h2 className="text-warning">Reports</h2>
                        <p style={{ fontSize: '20px' }} className="text-light">Agent Wise Lead Distribution</p>
                        <Bar data={agentWiseLeadData} options={agentWiseLeadOptions} />
                        <p style={{ fontSize: '20px' }} className='my-3'>Status Wise Lead Distribution </p>
                        <Bar data={statusWiseLeadData} options={statusWiseLeadOptions} />
                        <p style={{ fontSize: '20px' }} className='my-3'>Lead summary</p>
                        <div style={{ width: '100%', height: '400px' }}>
                            <Pie data={reportData} options={reportOption} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Report;