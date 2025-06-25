import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TechCategory = {
  id: string;
  title: string;
  badges: string[]; // shields.io image URLs
};

const TECH_STACK: TechCategory[] = [
  {
    id: "languages",
    title: "Languages",
    badges: [
      "https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white",
      "https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white",
      "https://img.shields.io/badge/Elixir-4B275F?style=flat&logo=elixir&logoColor=white",
      "https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI Frameworks",
    badges: [
      "https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB",
      "https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB",
      "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white",
      "https://img.shields.io/badge/Astro-0D1117?style=flat&logo=astro&logoColor=white",
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    badges: [
      "https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white",
      "https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white",
      "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white",
      "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white",
      "https://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat&logo=spring-boot",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    badges: [
      "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white",
      "https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white",
      "https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white",
      "https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white",
    ],
  },
  {
    id: "tools",
    title: "Basic Knowledge & Tools",
    badges: [
      "https://img.shields.io/badge/RabbitMQ-FF6600?style=flat&logo=rabbitmq&logoColor=white",
      "https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apache-kafka&logoColor=white",
      "https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white",
      "https://img.shields.io/badge/DuckDB-FFF000?style=flat&logo=duckdb&logoColor=black",
      "https://img.shields.io/badge/Phoenix-FF6600?style=flat&logo=phoenixframework&logoColor=white",
      "https://img.shields.io/badge/TanStack_Router-FF4154?style=flat&logoColor=white",
    ],
  },
];

function BadgeGrid({ badges }: { badges: string[] }) {
  return (
    <div className="tw:flex tw:flex-wrap tw:gap-2 tw:py-2">
      {badges.map((src, idx) => (
        <img key={idx} src={src} alt="tech badge" className="tw:h-6" />
      ))}
    </div>
  );
}

export default function SkillsAccordion() {
  return (
    <div className="tw:w-full">
      <Accordion type="single" collapsible className="tw:w-full">
        {TECH_STACK.map((section, index) => (
          <AccordionItem key={section.id} value={`item-${index + 1}`}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <BadgeGrid badges={section.badges} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
