# 💼 SnapJob - Intelligent Recruitment Platform

![Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-MERN_Logic-blue)
![Security](https://img.shields.io/badge/Security-JWT_Auth-green)
![Context](https://img.shields.io/badge/Academic-INPT-orange)

> **"Bridging the gap between Talent and Opportunity."**

**SnapJob** is a robust **Full-Stack Recruitment Management System** designed to streamline the hiring process. It functions as a specialized social network where recruiters can publish offers, and candidates can apply with dynamic profiles (generated from their skills, education, and experience).

The platform features a sophisticated **Candidate Review System**, allowing recruiters to evaluate, accept, or refuse applications in real-time.

---

## 📸 System Previews

### 📊 Application Workflow (The "Review" Engine)
*Recruiters can view applicant cards, review credentials, and make hiring decisions instantly.*
<img width="100%" alt="Candidate Review System" src="<img width="730" height="874" alt="image" src="https://github.com/user-attachments/assets/7c3fcd5d-0eb6-4256-ba92-480ff49d75ff" />
" />

### 🗂️ Database Architecture (CDM)
*A normalized relational structure implemented in a NoSQL environment.*
<img width="100%" alt="Database Architecture" src="<img width="1280" height="876" alt="image" src="https://github.com/user-attachments/assets/d5388062-72f8-40cb-882f-033746f08729" />
" />

---

## 🚀 Key Features

### 🔐 1. Advanced Security & Auth
* **JWT (JSON Web Tokens):** Stateless authentication mechanism securing all API routes.
* **Bcrypt:** Password hashing for database security.
* **Role-Based Access:** Distinct workflows for *Recruiters* vs *Candidates*.

### 📂 2. Dynamic Profile Management
Unlike static forms, SnapJob allows users to build a living CV:
* **Modular Data:** Users add/edit Education, Experience, and Skills dynamically.
* **Data Models:** Complex MongoDB schemas handling relationships (User -> Applications -> Offers).

### 🤝 3. The Recruitment Core
* **Offer Publication:** Recruiters post detailed job descriptions.
* **One-Click Apply:** Candidates apply instantly using their stored profile data.
* **Application Tracking:** Real-time status updates (Applied -> Reviewed -> Accepted/Refused).

---

## 🛠️ Technical Architecture

This project follows the **MVC (Model-View-Controller)** pattern to ensure code maintainability and scalability.

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose ODM)
* **Frontend Engine:** EJS (Server-Side Rendering) & CSS3
* **Architecture:** RESTful API principles

### 📂 Project Structure
```bash
SnapJob/
├── models/             # Mongoose Schemas (User, Offre, Experience, etc.)
├── controllers/        # Business Logic (Auth, User interactions)
├── routes/             # API Endpoints (Middleware protected)
├── middleware/         # JWT Verification (verifyJWT.js)
├── views/              # EJS Templates (UI Rendering)
├── public/             # Static Assets (CSS, Scripts, Images)
└── server.js           # Entry point
