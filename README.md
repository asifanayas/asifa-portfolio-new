# Asifa Ahammed E — Portfolio Website

A personal portfolio built with React.js, featuring 3 pages:

1. **Portfolio** — Achievements, projects, and skills (fully editable)
2. **PM Vikas Tracker** — Personal learning log from IoT course at IIITK
3. **Blog** — Personal writing space

---

## 🚀 Deploy to Vercel (Step-by-Step for First Timers)

### Step 1: Install Node.js
Download from https://nodejs.org (choose the LTS version). This also installs `npm`.

### Step 2: Set Up the Project
Open a terminal (Command Prompt or Terminal) and run:
```bash
# Go to the project folder
cd asifa-portfolio

# Install dependencies
npm install
```

### Step 3: Test Locally
```bash
npm start
```
This opens the site at http://localhost:3000. Check all 3 pages work!

### Step 4: Push to GitHub
1. Go to https://github.com and create a free account if you don't have one
2. Create a new repository (name it `asifa-portfolio` or anything you like)
3. In your terminal (inside the project folder):

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/asifa-portfolio.git
git push -u origin main
```
(Replace `YOUR_USERNAME` with your GitHub username)

### Step 5: Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **"Add New Project"**
3. Import your `asifa-portfolio` repository
4. Leave all settings as default — Vercel auto-detects React
5. Click **Deploy**

✅ In about 60 seconds, your site will be live at `https://asifa-portfolio.vercel.app` (or similar)!

---

## 📝 How to Add Your Content

Everything is editable directly in the website — no code needed after deployment!

### Adding a Project
→ Go to **Portfolio** page → Click **"+ Add Project"** → Fill in details → Save

### Adding an Achievement  
→ Portfolio page → **"+ Add"** in Achievements section

### Logging a PM Vikas Session
→ Go to **PM Vikas** page → **"+ Add Session"** → Fill weekly log → Save

### Writing a Blog Post
→ Go to **Blog** page → Click **"✎ Write"** → Type your post → **Publish**

> ⚠️ **Note:** Currently, data resets on page refresh (in-memory storage). 
> To make data persistent across visits, you'll need to add a database (like Firebase or Supabase) later. 
> This is a great next step once you're comfortable!

---

## 🛠 Tech Stack

- **React.js** 18
- **React Router** v6 (client-side routing)
- **CSS Variables** (theming system)
- **Google Fonts** (Cormorant Garamond, DM Mono, Outfit)
- **Vercel** (hosting)

---

## 📁 Project Structure

```
asifa-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← Navigation + data store
│   ├── App.css         ← Global styles + layout
│   ├── index.js        ← Entry point
│   ├── index.css       ← CSS variables + base styles
│   └── pages/
│       ├── Portfolio.js / Portfolio.css
│       ├── PMVikas.js  / PMVikas.css
│       └── Blog.js     / Blog.css
├── vercel.json         ← Vercel routing config
└── package.json
```

---

Made with 💛 by Asifa Ahammed E | IoT Assistant, PM-VIKAS IIITK
