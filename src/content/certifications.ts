import type { Certification } from "./schema";

/**
 * Certifications.
 *
 * To publish one: change status to "verified" and add `credentialUrl`
 * (Credly, Microsoft Learn, issuer portal). Without the URL the build fails.
 *
 * NOT Gustavo's (never add): COBIT 2019, EXIN AI Essentials.
 * Certificates of completion (courses, bootcamps) go to education.ts (ADR-018, ADR-029).
 */
export const certifications = [
  // Verified
  {
    // Credential ID 70F0AE27A3647B60, earned 2026-07-30 (checked against the PDF from Microsoft Learn, 05/11/2026).
    id: "ab-731",
    name: "Microsoft Certified: AI Transformation Leader (AB-731)",
    issuer: "Microsoft",
    status: "verified",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/GustavoRodrigues-9692/70F0AE27A3647B60?sharingId=45C92C3A6080F3A8",
    issued: "2026-07",
  },

  {
    // Certificate seen 05/11/2026: "ITIL Foundation Certificate in IT Service Management", effective 2024-12-14,
    // renew by 2027-12-14. ITIL v3 Foundation was retired before 2024, so this is ITIL 4.
    // PeopleCert has no free per-certificate link: verification is by certificate number (ADR-017).
    // Never commit the candidate number.
    id: "itil4",
    name: "ITIL 4 Foundation",
    issuer: "PeopleCert",
    status: "verified",
    credentialUrl: "https://www.peoplecert.org/for-corporations/certificate-verification-service",
    lookupId: "GR671723801GF",
    issued: "2024-12",
  },

  // SkillFront: the badge page (/Badges/<certification ID>) is public and shows holder, title and date.
  // Titles and dates checked against the certificates and the badge pages, 05/11/2026.
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022 Information Security Associate™",
    issuer: "SkillFront",
    status: "verified",
    credentialUrl: "https://www.skillfront.com/Badges/79118650338296",
    issued: "2024-11",
  },
  {
    id: "iso20000",
    name: "ISO/IEC 20000 IT Service Management Associate™",
    issuer: "SkillFront",
    status: "verified",
    credentialUrl: "https://www.skillfront.com/Badges/55042612228689",
    issued: "2024-12",
  },
  {
    id: "iso9001",
    name: "ISO 9001 Quality Management Systems Associate™",
    issuer: "SkillFront",
    status: "verified",
    credentialUrl: "https://www.skillfront.com/Badges/92711847854180",
    issued: "2024-12",
  },

  // In progress
  {
    id: "microsoft-track",
    name: {
      en: "Microsoft Learn: AI, security and data track",
      pt: "Microsoft Learn: trilha de IA, segurança e dados",
    },
    issuer: "Microsoft",
    status: "in_progress",
  },
  { id: "scrum", name: "Scrum Master", status: "in_progress" },
] satisfies Certification[];
