<h1 align="center">Scoutrix</h1>

<p align="center">
<b>Talent Has No Address.</b><br>
AI Infrastructure for Grassroots Sports Discovery
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Express-green" />
  <img src="https://img.shields.io/badge/AI%20Pipeline-TensorFlow.js-yellow" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen" />
  <img src="https://img.shields.io/badge/Auth-JWT-black" />
</p>

---

## **Overview**

Scoutrix is a standardized AI-powered athlete verification and recruitment infrastructure built for rural India.

It replaces geography-dependent physical trials with AI-based digital performance evaluation, allowing athletes to be discovered purely based on measurable performance.

---

## **The Problem**

India has over 50 crore rural citizens. Athletic talent exists everywhere. Structured discovery does not.

**Current ecosystem limitations:**

- Trials are geography-dependent  
- No standardized performance documentation  
- Manual filtering by recruiters  
- Rural athletes lack visibility  
- Inconsistent benchmarking across districts  

**Result:** Talent loss before development.

---

## **Our Solution**

Two roles. One performance-driven ecosystem.

### **Athlete Flow**

1. Record performance on any Android device  
2. Upload video  
3. AI extracts sport-specific metrics locally  
4. SPI (Standardized Performance Index) generated  
5. Athlete appears on verified leaderboard  

### **Recruiter Flow**

1. Input requirements  
2. Filter verified athletes  
3. Automated Recruitment Engine ranks profiles  
4. Download shortlist report instantly  

---

## **Core Features**

### **AI Video Analysis**
MediaPipe Pose Detection via TensorFlow.js extracts biomechanical and sport-specific metrics locally from raw phone footage. Performance metrics are rendered directly onto video frames efficiently on the device without backend computing.

### **Standardized Performance Index (SPI)**
Age, gender, and sport-normalized scoring engine enabling fair comparison across regions.

### **Pivoting Stickman Biomechanics**
Frame-by-frame movement comparison with professional reference models to highlight deviations.

### **Automated Recruitment Engine**
Requirement-based athlete ranking system generating downloadable reports.

### **Sport-wise Leaderboard**
Filter by sport, age group, gender, state, and district.

### **Explore Narrative Engine**
Live performance narratives generated using Google Gemini.

### **Offline-First Design**
Local capture and AI inference directly on the device. Syncs metadata securely to the cloud.

---

## **Sports Supported (Phase 1)**

### **Cricket**
- Bowling speed  
- Batting reaction time  
- Throw distance  

### **Football**
- Sprint speed  
- Kick distance  
- Agility run time  

### **Badminton**
- Smash speed  
- Reaction time  
- Rally endurance  

---

## **Technology Stack**

| **Layer** | **Technology** |
|-----------|----------------|
| Frontend | React + Vite |
| Backend | Express.js |
| AI / CV Pipeline | TensorFlow.js, @tensorflow-models/pose-detection |
| Database | MongoDB |
| Authentication | Custom JWT Backend Auth |
| Video/Image Storage | ImageKit CDN |
| Narrative Engine | Google Gemini API |

---

## **System Architecture**

### **Video Processing Pipeline**

Athlete Device  
→ React Frontend (Local TF.js Analysis)  
→ SPI Engine (Local Processing)
→ Express Backend  
→ ImageKit CDN  
→ MongoDB  

### **Recruitment Engine Pipeline**

Recruiter Input  
→ Criteria Parser  
→ MongoDB Retrieval  
→ SPI Ranking Algorithm  
→ Report Generator  
→ Downloadable Shortlist  

---

## **Business Model**

### **Revenue Streams**

1. **Recruiter Subscription Model**  
   Monthly/Annual access to verified athlete database  

2. **Pay-Per-Shortlist Reports**  
   Premium ranked recruitment exports  

3. **Federation & Government Partnerships**  
   Integration with state sports boards  

4. **Analytics & Performance Intelligence Layer**  
   Aggregated anonymized data insights  

### **Future Monetization**

- Academy licensing  
- AI analytics API  
- Corporate scouting tools  
- Athlete benchmarking dashboards  

---

## **Project Structure**

```
Scoutrix/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   │
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── db/
│   │   └── routes/
│   ├── server.js
│   └── uploads/
│
└── README.md
```
## **Getting Started**

### **Prerequisites**

- Node.js v18+  
- MongoDB  

### **Backend Setup**

```bash
cd backend
npm install
npm start
```
*Note: Ensure your MongoDB server is running.*

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **Environment Variables**

Create a `.env` file in the `backend` directory based on these requirements:
```
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Create a `.env` in the `frontend` directory if required by your client code (e.g., matching backend routes).

---

## **Roadmap**

**Phase 1**
Cricket, Football, Badminton across 3 states

**Phase 2**
10 sports across 28 states
Federation partnerships

**Phase 3**
National athlete registry
Khelo India integration
SAI academy pipeline

---

## **Vision**

Scoutrix is not a sports app.

It is a digital infrastructure layer for India’s grassroots sports ecosystem.

Discovery should depend on performance — not postcode.

Talent has no address.

---

## **The Team**

* [@PI-Prasaad-Krishna](https://github.com/PI-Prasaad-Krishna)
* [@Risha-Jayaraj](https://github.com/Risha-Jayaraj)
* [@Abhinav-anil-5670](https://github.com/Abhinav-Anil-5670)
