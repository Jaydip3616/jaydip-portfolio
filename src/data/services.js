import { FiBarChart2, FiCpu, FiDatabase, FiZap } from "react-icons/fi";

const services = [
  { id: "ai", icon: FiCpu, accent: "#4965c4", title: "AI & ML Prototypes", text: "Turn an opportunity into a focused proof of concept using machine learning and natural language processing." },
  { id: "analytics", icon: FiBarChart2, accent: "#14b8a6", title: "Data Analytics", text: "Transform raw data into practical analysis, dashboards, and clearer business decisions." },
  { id: "automation", icon: FiZap, accent: "#8b5cf6", title: "Workflow Automation", text: "Automate repetitive data collection and preparation tasks to create more efficient operations." },
  { id: "data", icon: FiDatabase, accent: "#ec4899", title: "Data Preparation", text: "Clean, structure, and validate data so it is ready for analysis, reporting, or modelling." },
];

export default services;
