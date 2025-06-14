# CSE-341-group-project
# 🎓 School Management API – CSE 341 Final Project

## 📘 Project Overview

The **School Management API** is a RESTful web service built with **Node.js**, **Express**, and **MongoDB**, allowing clients to manage school data such as **Staff** and **Students**. This project is part of the CSE 341 Final Team Project for Week 5 and includes CRUD operations, Swagger documentation, and deployment to Render.

## 🌐 Live Deployment

- **Base API URL:** https://cse-341-group-project-mfvd.onrender.com
- **Swagger Docs:** https://cse-341-group-project-mfvd.onrender.com/api-docs

## 📚 Collections Covered

- `Staff`
- `Students`

Each collection supports the full set of CRUD operations.

---

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Swagger (OpenAPI)
- Render (for deployment)
- Postman / cURL (for testing)

---

## 🛠️ Features

### ✅ CRUD Operations

- `GET /staff` – Retrieve all staff
- `GET /staff/:id` – Retrieve a single staff member by ID
- `POST /staff` – Create a new staff member
- `PUT /staff/:id` – Update staff details
- `DELETE /staff/:id` – Remove staff member

- `GET /students` – Retrieve all students
- `GET /students/:id` – Retrieve a single student by ID
- `POST /students` – Create a new student
- `PUT /students/:id` – Update student details
- `DELETE /students/:id` – Remove student

### 🚨 Error Handling

- Returns `400` or `500` for malformed data or database errors.
- Mongoose schema validations (e.g., required fields like `gender`).
- Clean error responses for invalid ObjectIDs and missing resources.

---

## 👩🏽‍💻 Team Contributions

### Racheal Katono – _Individual Contributions_
- ✅ Fixed a **500 Internal Server Error** in the `POST /students` route by identifying and correcting a missing required field (`gender`) based on schema validation.
- ✅ Investigated and resolved **404/500 errors** when fetching staff by ID by checking:
  - Correct route and ID usage.
  - Existence of records in MongoDB.
  - Validation using `mongoose.Types.ObjectId.isValid()`.

### [Other Teammates – Add Here]
- _Name:_ Contribution summary…

---

## 📂 Project Structure

