# PROJECT SPECIFICATION: SMART HR PORTAL (ATTENDANCE & REQUEST SYSTEM)

## 1. Project Overview

* **Goal:** Build a Web App for internal management focusing on IP-based attendance, leave management, and managerial analytics.
* **Platform:** Web Application (Responsive).
* **Target Users:** Employees and Managers (Managers inherit all Employee rights).
* **Core Value:** Precise attendance data, automated leave calculation, and behavioral insights via a centralized dashboard.

---

## 2. Business Rules & Logic (Crucial)

* **Working Hours:** 08:30 AM - 18:00 PM.
* **Working Days:** Monday to Friday (Saturday & Sunday are weekends).
* **Attendance Policy:**
* Only **Check-in** is required (no Check-out).
* Valid Check-in MUST come from the **Company's Public IP Whitelist**.

* **Holiday Logic:** System must account for Vietnam Public Holidays and Company-specific holidays (stored in a configurable calendar).
* **Leave Calculation:**

---

## 3. System Actors & Permissions

1. **Employee:** Check-in, view personal attendance history, submit 8 types of requests.
2. **Manager:** All Employee features + Approve/Reject requests for direct reports + Access Manager Dashboard.
3. **Admin:** System configuration (IP Whitelist, Holiday calendar, User management, Department setup).

---

## 4. Functional Requirements

### 4.1. IP-Based Attendance Module

* **Feature:** One-click Check-in button.
* **Validation:** Backend checks `request.ip` against the `Allowed_IP_List` table.
* **Logic:** Only the first check-in of the day is recorded as the official entry time.
* **Error Handling:** If IP doesn't match, display: "Invalid Network. Please connect to Company Wi-Fi."

### 4.2. Request Management Module (8 Types)

* **Request Types:** 1.  Late Arrival (Đi muộn)

1. Early Departure (Về sớm)
2. Forgot to Check-in (Quên chấm công)
3. Annual Leave (Nghỉ phép)
4. Maternity Leave (Nghỉ thai sản)
5. Funeral Leave (Nghỉ hiếu)
6. Wedding Leave (Nghỉ hỉ)
7. Work From Home (WFH)

* **Fields:** Type, Start Date/Time, End Date/Time, Reason, Attachment (optional).
* **Auto-Correction:** Once a "Forgot to Check-in" or "Late Arrival" request is approved, the system automatically updates the Attendance record for that day.

### 4.3. Holiday & Company Calendar

* **Management:** A CRUD interface to add/edit holidays.
* **Attributes:** Date, Name, Is_Paid (Boolean).

### 4.4. Slack Integration Service

* **Mechanism:** Outgoing Webhook / Slack App API.
* **Workflow:** 1. Employee submits request -> System sends an Interactive Message to the Manager's Slack.

1. Slack Message contains: [Employee Name] | [Type] | [Duration] | [Approve/Reject Buttons].
2. Manager clicks button -> System updates DB and notifies Employee via Slack/Web.

### 4.5. Manager Dashboard (Analytics)

* **Real-time Stats:** Total employees present today, on leave, or WFH.
* **Behavioral Charts:**
* **Punctuality Trend:** Percentage of on-time arrivals over time.
* **Leave Heatmap:** Days of the week with highest absence rates.
* **Abnormal Patterns:** Flagging employees with >3 "Forgot to check-in" per month.

---

## 5. Technical Stack Suggestions (For AI Agent)

* **Frontend:** React.js / Next.js / Vue.js (Tailwind CSS for UI).
* **Backend:** Node.js (NestJS) / Python (FastAPI).
* **Database:** PostgreSQL (Relational data is better for HR structures).
* **Integration:** Slack API SDK.

---

## 6. Database Schema (High-Level)

* `Users`: ID, Name, Email, Role, Manager_ID, Department_ID, Slack_ID.
* `Attendance`: ID, User_ID, Check_in_Time, IP_Address, Status (On-time/Late).
* `Requests`: ID, User_ID, Type, Start_Date, End_Date, Status (Pending/Approved/Rejected), Approver_ID.
* `Holidays`: ID, Date, Description, Is_Paid.
* `Settings`: ID, Config_Key (e.g., 'COMPANY_IP'), Config_Value.

---

## 7. UI/UX Requirements

* **Clean & Professional:** Minimalist sidebar navigation.
* **Mobile Responsive:** Essential for employees checking in via smartphone browser.
* **Action-Oriented:** Dashboard should highlight items needing immediate attention (Pending approvals).
