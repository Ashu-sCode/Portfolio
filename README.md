
# 🚀 Ashutosh's Developer Portfolio

Welcome to my personal portfolio website built with **React 19**, **Tailwind CSS 4**, and **TypeScript** (optional). It showcases my skills, projects, and resume — all dynamically managed from a custom-built **Admin CMS** powered by **Firebase**. ✨

---

## 📸 Preview

![Portfolio Preview](https://your-preview-image-link-if-any.com)

---

## 🛠️ Tech Stack

| Frontend           | Admin CMS              | Backend / Services     |
|--------------------|------------------------|-------------------------|
| React 19           | React + Tailwind       | Firebase Auth 🔐        |
| Tailwind CSS 4     | SweetAlert2 🧁         | Firebase Firestore 🔥   |
| Framer Motion 🎥    | Image/File Uploads     | Firebase Storage 📦     |
| React Markdown 📝   | Resume Upload & View   | EmailJS (Contact Form) ✉️ |

---

## ✨ Features

- 💻 **Responsive UI** – Tailwind-powered design optimized for all devices
- 🔍 **Project Filtering** – Filter by technology tags
- 📁 **Markdown Support** – Write project descriptions in markdown
- 🔐 **Admin CMS** – Secure login system to upload/manage portfolio content
- 🧾 **Resume Upload & Preview** – Upload and fetch resume from Firebase
- 🗃️ **Dynamic Data** – All data fetched from Firestore in real-time
- 📦 **Optimized for SEO** – Metadata, Open Graph tags, and fast loading
- 📬 **EmailJS Contact Form** – Seamless contact form using EmailJS API

---

## 📁 Folder Structure

```
📦 root/
├── 📂 portfolio/       # Public-facing portfolio site
│   ├── 📂 src/
│   ├── index.html
│   └── ...
├── 📂 admin_cms/       # Firebase-powered admin dashboard
│   ├── 📂 src/
│   ├── firebase.js
│   └── ...
```

---

## 🧪 Live Demo

> ⚡ Coming soon! Or deploy locally using the steps below.

---

## 🚀 Getting Started (Local Development)

### 📦 Clone the Repo

```bash
git clone https://github.com/Ashu-sCode/Portfolio.git
cd Portfolio
```

### ▶️ Setup Portfolio site

```bash
cd portfolio
npm install
npm run dev
```

### ⚙️ Setup Admin CMS

```bash
cd admin_cms
npm install
npm run dev
```

✅ Make sure your Firebase credentials are properly set in `.env` files.

---

## 🔐 Firebase Setup

You need a `.env` file in both the `portfolio/` and `admin_cms/` folders.

Services used:

- Firebase Authentication (Email/Password)
- Firestore Database (for `projects` collection)
- Firebase Storage (for project images and resume PDF)
- EmailJS (for contact form)

### ✅ Portfolio `.env`

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

### ✅ Admin CMS `.env`

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

---

## 📤 Deployment

The portfolio is ready to deploy on any static hosting service:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [GitHub Pages](https://pages.github.com/)

To build the app for production:

```bash
npm run build
```

Then deploy the output from the `dist/` or `build/` folder.

---

## 👀 Preview

### Portfolio:

![Portfolio Screenshot](https://github.com/user-attachments/assets/288f3f8c-d566-46f9-b287-f6915275ed2e)

### Admin Dashboard:

![Admin Screenshot](https://github.com/user-attachments/assets/6ce02ea4-f99f-487d-96b4-4361e6112b47)

---

### 📄 License

This project is open-source and free to use under the **MIT License**.

---

> Made with ❤️ by Ashutosh
