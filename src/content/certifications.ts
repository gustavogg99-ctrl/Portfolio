import type { Certification } from "./schema";

/**
 * Certifications.
 *
 * To publish one: change status to "verified" and add `credentialUrl`
 * (Credly, Microsoft Learn, issuer portal). Without the URL the build fails.
 *
 * NOT Gustavo's (never add): COBIT 2019, EXIN AI Essentials.
 */
export const certifications = [
  // Issued — waiting for verification links (Part 5).
  {
    id: "ab-731",
    name: "Microsoft Certified: AI Transformation Leader (AB-731)",
    issuer: "Microsoft",
    status: "pending_link",
  },
  { id: "itil4", name: "ITIL 4 Foundation", issuer: "[CONFIRMAR: emissor]", status: "pending_link" },
  { id: "iso27001", name: "ISO/IEC 27001 Foundation", issuer: "[CONFIRMAR: emissor]", status: "pending_link" },
  { id: "iso20000", name: "ISO/IEC 20000 Foundation", issuer: "[CONFIRMAR: emissor]", status: "pending_link" },
  { id: "iso9001", name: "ISO 9001 Foundation", issuer: "[CONFIRMAR: emissor]", status: "pending_link" },
  {
    id: "english-ctj",
    name: "English — [CONFIRMAR: nome do certificado]",
    issuer: "Casa Thomas Jefferson",
    status: "pending_link",
  },
  {
    // Only becomes "verified" once the certificate is issued (bootcamp ends Nov/2026).
    id: "servicenow-shark",
    name: "Shark in ServiceNow #14 — App Engine Studio",
    issuer: "Aoop",
    status: "pending_link",
  },

  // In progress
  {
    id: "microsoft-track",
    name: "Microsoft Learn — AI, security and data track",
    issuer: "Microsoft",
    status: "in_progress",
  },
  { id: "scrum", name: "Scrum Master", status: "in_progress" },
] satisfies Certification[];
