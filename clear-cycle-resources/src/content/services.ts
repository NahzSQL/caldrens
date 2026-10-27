import {
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  MessagesSquare,
  UsersRound,
  Workflow,
} from "lucide-react";
import type { IconType } from "@/components/ui";

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  icon: IconType;
  summary: string;
  description: string;
  includes: string[];
  scopeNote?: string;
};

export const services: Service[] = [
  {
    id: "benefits-administration",
    title: "Healthcare Benefits Administration Support",
    shortTitle: "Benefits Administration Support",
    icon: ClipboardList,
    summary:
      "Administrative workflow support and process documentation for organizations involved in healthcare benefits.",
    description:
      "Organizations involved in healthcare benefits manage a steady volume of administrative work. We help teams organize the processes behind that work so tasks are documented, handoffs are clear, and day-to-day operations are easier to manage.",
    includes: [
      "Administrative workflow support for benefits-related operations",
      "Process documentation and step-by-step operating procedures",
      "Coordination of tasks and handoffs between internal teams",
      "Operational assistance during process changes or busy periods",
    ],
    scopeNote:
      "This service supports the administrative operations of the organizations we work with. It does not include processing insurance claims, determining coverage or eligibility, or administering insurance policies.",
  },
  {
    id: "care-coordination",
    title: "Care Coordination",
    shortTitle: "Care Coordination",
    icon: Workflow,
    summary:
      "Organized follow-up workflows and clearer information flow between the people involved in care.",
    description:
      "Coordinated care depends on follow-up work getting done and the right information reaching the right people. We support the administrative side of care coordination so teams can keep follow-up activities on track and apply consistent processes.",
    includes: [
      "Organizing follow-up workflows and task ownership",
      "Coordinating relevant information between stakeholders",
      "Tracking open follow-up activities so items are not missed",
      "Improving the consistency of care-related administrative processes",
    ],
    scopeNote:
      "Our role is administrative and operational. Clinical decisions remain with treating providers and your organization's clinical teams.",
  },
  {
    id: "provider-communication",
    title: "Provider Communication",
    shortTitle: "Provider Communication",
    icon: MessagesSquare,
    summary:
      "Structured outreach and communication workflows that make provider-facing work easier to manage.",
    description:
      "Working with healthcare providers involves outreach, requests, and follow-ups that are easy to lose track of. We help teams organize provider communication so it is consistent, documented, and visible to the people responsible for it.",
    includes: [
      "Planning and organizing provider outreach activities",
      "Setting up and maintaining communication workflows",
      "Improving the visibility of open communication tasks",
      "Templates and documentation for consistent messaging",
    ],
  },
  {
    id: "population-health",
    title: "Population Health Support",
    shortTitle: "Population Health Support",
    icon: UsersRound,
    summary:
      "Administrative and operational support for organizations running population health initiatives.",
    description:
      "Population health initiatives involve many moving parts across outreach, tracking, and follow-up. We provide administrative and operational support that helps program teams keep their work organized and their progress visible.",
    includes: [
      "Workflow organization for program and outreach activities",
      "Reporting support for tracking program operations",
      "Follow-up coordination across program activities",
      "Documentation of program processes and responsibilities",
    ],
  },
  {
    id: "clinical-quality",
    title: "Clinical Quality Operations",
    shortTitle: "Clinical Quality Operations",
    icon: ClipboardCheck,
    summary:
      "Process documentation and task tracking for the operational work behind quality initiatives.",
    description:
      "Quality improvement efforts rely on well-documented processes and dependable follow-through. We help teams organize the operational work around their quality initiatives so activities, owners, and timelines stay clear.",
    includes: [
      "Documenting quality-related processes and procedures",
      "Organizing quality improvement activities and timelines",
      "Tracking operational tasks related to quality initiatives",
      "Preparing materials that support internal quality reviews",
    ],
    scopeNote:
      "This service supports the operational side of quality programs. It does not include clinical quality scoring, measure certification, or accreditation activities.",
  },
  {
    id: "reporting",
    title: "Healthcare Reporting and Operational Insights",
    shortTitle: "Healthcare Reporting",
    icon: BarChart3,
    summary:
      "Organized operational data and clear reports that help leadership understand how work gets done.",
    description:
      "Leaders need a clear view of how services are delivered. We help organize operational data, prepare reports, and highlight where workflows slow down, so leadership can make informed decisions about their operations.",
    includes: [
      "Organizing operational data into consistent formats",
      "Preparing recurring and as-needed operational reports",
      "Identifying workflow bottlenecks and process gaps",
      "Summaries that explain service delivery processes to leadership",
    ],
  },
];
