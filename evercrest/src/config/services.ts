/**
 * Dental services offered by the practice (confirmed).
 * Each service gets its own page at /services/<slug>.
 */
import type { ImageKey } from "./images";

export type ServiceIcon =
  | "shield"
  | "search"
  | "wrench"
  | "sparkles"
  | "droplets"
  | "crown"
  | "heart-pulse"
  | "book-open";

export interface Service {
  slug: string;
  name: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  icon: ServiceIcon;
  image: ImageKey;
  overview: string;
  involves: string[];
  whoMayBenefit: string[];
  whatToExpect: string[];
  whyConsult: string;
}

export const services: Service[] = [
  {
    slug: "preventive-dentistry",
    name: "Preventive Dentistry",
    summary:
      "Routine care designed to help keep teeth and gums healthy and to identify potential concerns early.",
    icon: "shield",
    image: "dentistWithPatient",
    overview:
      "Preventive dentistry focuses on maintaining oral health over time. Regular visits, professional cleanings, and good habits at home work together to help reduce the risk of tooth decay and gum disease, and to catch changes while they are often simpler to address.",
    involves: [
      "Periodic dental examinations and professional cleanings",
      "Dental X-rays when your dentist determines they are appropriate",
      "Fluoride treatments or dental sealants when recommended",
      "Personalized guidance on brushing, flossing, and daily habits",
    ],
    whoMayBenefit: [
      "Adults and children who want to maintain healthy teeth and gums",
      "Patients with a history of cavities or gum concerns",
      "Anyone who has not had a dental check-up in some time",
    ],
    whatToExpect: [
      "A review of your medical and dental history",
      "An examination of your teeth, gums, and mouth",
      "A cleaning and, if needed, recommendations for follow-up care",
      "Time to ask questions and talk through any concerns",
    ],
    whyConsult:
      "Every mouth is different. A dentist can recommend how often you should visit and which preventive measures suit your needs, based on your health history and examination.",
  },
  {
    slug: "examinations-and-cleanings",
    name: "Dental Examinations and Cleanings",
    summary:
      "Thorough check-ups and professional cleanings that support a healthy mouth and help track changes over time.",
    icon: "search",
    image: "treatmentRoom",
    overview:
      "A dental examination gives your dentist a clear picture of your oral health, while a professional cleaning removes plaque and tartar (hardened plaque) that brushing and flossing at home cannot fully remove.",
    involves: [
      "An examination of teeth, gums, bite, and soft tissues",
      "Removal of plaque and tartar from tooth surfaces",
      "Polishing to help remove surface stains",
      "Dental X-rays when clinically appropriate",
    ],
    whoMayBenefit: [
      "Patients of all ages as part of routine dental care",
      "New patients establishing care with the practice",
      "Patients who have noticed sensitivity, bleeding gums, or other changes",
    ],
    whatToExpect: [
      "A conversation about your health history and any concerns",
      "A cleaning performed by a dental professional",
      "An examination by the dentist, who will share findings with you",
      "A discussion of any recommended treatment and next steps",
    ],
    whyConsult:
      "Regular examinations allow a dentist to monitor your oral health over time and to discuss findings with you early, when more options may be available.",
  },
  {
    slug: "restorative-dentistry",
    name: "Restorative Dentistry",
    summary:
      "Treatment options that repair damaged or missing tooth structure to help restore function and appearance.",
    icon: "wrench",
    image: "consultation",
    overview:
      "Restorative dentistry covers treatments that repair teeth affected by decay, wear, fractures, or tooth loss. The goal is to help restore comfortable chewing, support oral health, and maintain a natural appearance.",
    involves: [
      "Fillings to repair areas affected by decay",
      "Crowns to cover and protect weakened teeth",
      "Bridges to replace one or more missing teeth",
      "Treatment planning that explains the options available to you",
    ],
    whoMayBenefit: [
      "Patients with cavities, cracked, or worn teeth",
      "Patients with older restorations that may need replacement",
      "Patients missing one or more teeth",
    ],
    whatToExpect: [
      "An examination and, if needed, X-rays to understand the concern",
      "A clear explanation of possible treatment options",
      "A plan that may involve one or more appointments",
      "Guidance on caring for your restoration afterward",
    ],
    whyConsult:
      "The right restorative approach depends on the tooth, your overall oral health, and your preferences. A dentist can explain the benefits, limitations, and alternatives of each option.",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    summary:
      "Options to improve the appearance of your smile, discussed in the context of your overall oral health.",
    icon: "sparkles",
    image: "smile",
    overview:
      "Cosmetic dentistry focuses on the appearance of teeth, such as their color, shape, and alignment. Cosmetic options are best considered alongside your overall oral health, so any underlying concerns can be addressed first.",
    involves: [
      "A discussion of your goals for your smile",
      "An evaluation of your teeth and gums",
      "Options such as tooth-colored restorations or other treatments your dentist may recommend",
      "Realistic expectations about what each option can achieve",
    ],
    whoMayBenefit: [
      "Patients who are concerned about stained, chipped, or uneven teeth",
      "Patients considering replacing visible metal restorations",
      "Patients who want to understand their options before deciding",
    ],
    whatToExpect: [
      "A consultation focused on your goals and questions",
      "An examination to confirm your teeth and gums are healthy",
      "A discussion of suitable options, including time and cost considerations",
    ],
    whyConsult:
      "Not every cosmetic option is right for every patient. A dentist can help you understand which options suit your teeth and what results are realistic.",
  },
  {
    slug: "tooth-colored-fillings",
    name: "Tooth-Colored Fillings",
    summary:
      "Fillings made from composite resin that is matched to the natural shade of your teeth.",
    icon: "droplets",
    image: "equipment",
    overview:
      "Tooth-colored fillings, often made from composite resin, are used to repair teeth affected by decay or minor damage. Because the material can be matched to the shade of your teeth, fillings blend in with your natural smile.",
    involves: [
      "Removing decayed or damaged tooth structure",
      "Placing composite material in layers and shaping it to fit your bite",
      "Hardening each layer with a special curing light",
      "Polishing the filling for a smooth finish",
    ],
    whoMayBenefit: [
      "Patients with cavities or small areas of tooth damage",
      "Patients who prefer a filling that matches their natural tooth color",
      "Patients replacing older fillings, when replacement is recommended",
    ],
    whatToExpect: [
      "Local anesthetic to numb the area, when appropriate",
      "A procedure that is commonly completed in a single visit",
      "Some temporary sensitivity afterward, which your dentist can discuss with you",
    ],
    whyConsult:
      "Composite is suitable for many fillings, but not every situation. A dentist can recommend the most appropriate material for the size and location of the restoration.",
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns and Bridges",
    summary:
      "Custom restorations that protect weakened teeth or replace missing teeth.",
    icon: "crown",
    image: "clinic",
    overview:
      "A dental crown is a cap that covers a tooth to help protect and strengthen it. A dental bridge replaces one or more missing teeth by attaching artificial teeth to neighboring teeth or supports.",
    involves: [
      "Preparing the tooth or teeth that will support the restoration",
      "Taking impressions or digital scans to create a custom fit",
      "Placing a temporary restoration while the final one is made, when needed",
      "Fitting, adjusting, and bonding the final restoration",
    ],
    whoMayBenefit: [
      "Patients with large fillings, cracks, or significant tooth wear",
      "Patients who have had root canal treatment, when a crown is recommended",
      "Patients with one or more missing teeth",
    ],
    whatToExpect: [
      "Usually two or more appointments, depending on the treatment",
      "Guidance on caring for your temporary and final restoration",
      "Follow-up to check fit and comfort",
    ],
    whyConsult:
      "Crowns and bridges are one of several ways to restore or replace teeth. A dentist can explain whether they are a good option for you, and how they compare with alternatives.",
  },
  {
    slug: "gum-health",
    name: "Gum Health",
    summary:
      "Care focused on the health of your gums, including evaluation and guidance for gum concerns.",
    icon: "heart-pulse",
    image: "dentistWithPatient",
    overview:
      "Healthy gums are an important foundation for healthy teeth. Gum disease often begins with inflammation (gingivitis) and, if left untreated, may progress and affect the tissues and bone that support the teeth.",
    involves: [
      "Evaluating the gums, including measuring the spaces between gums and teeth",
      "Professional cleaning to remove plaque and tartar",
      "Deeper cleaning treatments when recommended by your dentist",
      "Home-care guidance and a plan for ongoing monitoring",
    ],
    whoMayBenefit: [
      "Patients with bleeding, swollen, or tender gums",
      "Patients with persistent bad breath or gum recession",
      "Patients with health factors that may affect gum health",
    ],
    whatToExpect: [
      "An evaluation of your gum health",
      "A clear explanation of findings and any recommended treatment",
      "Recommendations for follow-up visits and daily care",
    ],
    whyConsult:
      "Early signs of gum disease are not always noticeable. A dental professional can evaluate your gums and recommend appropriate care, including referral to a specialist when needed.",
  },
  {
    slug: "oral-health-education",
    name: "Oral Health Education",
    summary:
      "Practical guidance to help you care for your teeth and gums between visits.",
    icon: "book-open",
    image: "consultation",
    overview:
      "What happens between dental visits matters. Oral health education gives you practical, personalized information about daily care, diet, and habits that can affect your teeth and gums.",
    involves: [
      "Brushing and flossing techniques suited to your needs",
      "Guidance on choosing oral care products",
      "Information on how diet and habits can affect oral health",
      "Answers to your questions about your teeth and treatment",
    ],
    whoMayBenefit: [
      "Patients and families who want to build healthy routines",
      "Patients with braces, restorations, or other specific care needs",
      "Anyone who wants to better understand their oral health",
    ],
    whatToExpect: [
      "A conversation, not a lecture",
      "Recommendations based on your examination and history",
      "Clear, practical steps you can use at home",
    ],
    whyConsult:
      "General advice is a starting point. A dental professional can tailor recommendations to your teeth, health history, and daily routine.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
