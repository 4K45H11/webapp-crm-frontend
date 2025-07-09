# CRM Application

A full stack lead management application where you can view, edit, add and showcase all the required details of a lead.
Built with React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://webapp-crm-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/4K45H11/webapp-crm-frontend.git
cd webapp-crm-frontend
npm install
npm run dev

```

## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB
- Chart.js

---

## Demo Video
Watch a walkthrough of the major features of this app:

[Video](https://www.loom.com/share/c079fedbc6a0482a8f5bf9debad8678f?sid=0dd97d8a-ff91-488a-b233-4bb98035bd03)

---

## Features
**Home**
- Display of latest leads
- Overview of current lead statuses
- Quick filters
- Add new lead button

**Lead List**
- Display of all leads
- filters (by status, by sales agent)
- sort (by priority, by closing time)
- Add new lead button

**Lead Details**
- Details of a lead (name, sales agent, source, status, priority, time to close...)
- update and delete option
- add new lead button(leads to a form)
- comments section for lead related updates

**Sales Agent List**
- Display of all sales agents
- Add new sales agent button(leads to a form)

**Reports**
- Display of all leads completed lastweek and in pipeline
- Display lead distribution by status, sales agents
- visual representaion using Bar and Pie garphs with Chart.js

---

## API Reference

### **POST leads/new**<br>
Adds new lead <br>
Sample Response: <br>
```
{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt}
```
### **POST leads/:id**<br>
Update exsisting lead <br>
Sample Response: <br>
```
{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt}
```
### **GET leads/**<br>
List of all leads with optional query filetrs(source,status,tags)<br>
Sample Response: <br>
```
[{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt},....]
```
### **GET leads/:id**<br>
Details of a lead<br>
Sample Response: <br>
```
{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt}
```
### **DELETE leads/:id**<br>
Delete a lead <br>
Sample Response: <br>
```
{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt}
```
### **POST leads/comments/:id**<br>
Add comment to a particular lead <br>
Sample Response: <br>
```
{_id, lead, author, commentText, createdAt}
```
### **GET leads/comments/:id**<br>
Read All comments to a particular lead <br>
Sample Response: <br>
```
[{_id, lead, author, commentText, createdAt},....]
```

### **GET Report/last-week**<br>
Get all leads cleared last week<br>
Sample Response: <br>
```
[{_id,name, sales agent, source, status, priority, time to close,createdAt,updatedAt,closedAt},....]
```
### **GET Report/pipeline**<br>
Get all leads in Pipeline<br>
Sample Response: <br>
```
{_id, totalLeadsInPipeline}
```
### **POST agents/new**<br>
Adds new lead <br>
Sample Response: <br>
```
{_id,name, email,createdAt,updatedAt}
```
### **GET agents/**<br>
Adds new lead <br>
Sample Response: <br>
```
[{_id,name, email,createdAt,updatedAt}]
```
---

## Contact 
For bugs or feature request please reach out to akscareer1999@gmail.com