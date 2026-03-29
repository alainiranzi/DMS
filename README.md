#  DMS 

A modern SaaS-ready DMS built with **Next.js 16**, **MongoDB**, and **JWT Authentication**.
This system provides role-based access for **Super Admin** and **Admin**, with secure authentication and email-based onboarding.

---

##  Features

*  Authentication (JWT-based)
*  Super Admin (full control)
   Admin management
*  Email onboarding (random password + reset link)
*  Password reset system
*  Role-based access control
*  Clean SaaS dashboard UI
*  Smart search (name, email, role)
*  CRUD operations (Create, Edit, Delete users)
*  Modern responsive UI (TailwindCSS)

---

##  Tech Stack

* **Frontend:** Next.js 16 (App Router)
* **Backend:** Next.js API Routes
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Email Service:** MailerSend
* **Styling:** Tailwind CSS
* **Notifications:** React Hot Toast



---

##  Environment Variables

Create a `.env.local` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# JWT
JWT_SECRET=your_secret_key

# MailerSend
MAILERSEND_API_KEY=your_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=DMS

# App
APP_URL=http://localhost:3000
```

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dms.git
cd dms
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the development server

```bash
npm run dev
```

---

### 4. Seed Super Admin

Open in browser:

```bash
http://localhost:3000/api/seed-super-admin
```

---

##  Roles & Permissions

| Role        | Permissions                               |
| ----------- | ----------------------------------------- |
| Super Admin | Full access (create admins, delete, edit) |
| Admin       | Manage users (limited access)             |

---

##  Email Flow

When an admin is created:

1. System generates a **random password**
2. Sends email with:

   * Email
   * Password
   * Reset link
3. User logs in → changes password

---

##  Password Reset Flow

* User clicks **Forgot Password**
* Receives email with reset link
* Sets new password using secure token

---

##  Security

* Password hashing (bcrypt)
* JWT authentication
* Role-based API protection
* Token-based password reset (expires in 1 hour)

---

##  Contributing

Pull requests are welcome. For major changes, please open an issue first.


---

## 👨‍💻 Author

**Alain Iranzi**
 [alainiranzi@gmail.com](mailto:alainiranzi@gmail.com)

---

##  Support

If you like this project, give it a ⭐ on GitHub!

---
