# RAPUTA Frontend

## 📘 Project Overview

**RAPUTA** (Real-time AI Platform for Unobtrusive Triaging of Airway disorders) is a web-based frontend system developed for the intelligent, non-invasive screening of dysphagia and aspiration risks. It provides clinicians with a visual and interactive interface to manage patient data, monitor real-time physiological signals, and conduct assisted diagnostic tasks.

This repository contains the Vue.js-based frontend implementation of the RAPUTA system, connected to backend services for data handling, model execution, and device communication.

---

## 🧩 Key Functional Modules

### 🖥️ Home Dashboard

Provides a quick overview of system activity and screening statistics:

- 👨‍⚕️ Current user identity
- 📊 Patient screening data charts
- 📆 Daily schedule and appointments
- 📡 Device overview with historical and LAN-connected status

### 🧲 Device Management

Lists all connected sensor devices. Supports auto-discovery and manual switching of available hardware in the local network.

### 🧠 Model Management

Upload, select, and manage AI detection models used during screening tasks.

### 🗂️ Patient Management

Create and manage patient records. The system auto-generates storage directories for each patient.

### 📑 Data Management

Organize and review past test data by patient, task, and date. Reports and raw signals are downloadable.

### 🚦 System Monitoring

Start real-time screening tasks:

- ⚙️ Configure detection parameters
- 🔄 Stream laryngeal motion, swallowing sound, and airflow signals
- 🎯 Visualize segmented test results and risk levels
- 🧾 Export structured reports
