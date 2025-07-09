import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TechCategory = {
  id: string;
  title: string;
  description?: string;
  badges: string[];
};

const TECH_STACK: TechCategory[] = [
  {
    id: "languages",
    title: "Languages I Code In",
    description: "Programming languages I'm comfortable with",
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
    description: "Building user interfaces and experiences",
    badges: [
      "https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB",
      "https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB",
      "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white",
      "https://img.shields.io/badge/Astro-0D1117?style=flat&logo=astro&logoColor=white",
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white",
      "https://img.shields.io/badge/React_Router_v7-CA4245?style=flat&logo=react-router&logoColor=white",
      "https://img.shields.io/badge/TanStack_Router-FF6B35?style=flat&logo=tanstackrouter&logoColor=white",
    ],
  },
  {
    id: "backend",
    title: "Backend & API Things",
    description: "Server-side development and API design",
    badges: [
      "https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white",
      "https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white",
      "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white",
      "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white",
      "https://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat&logo=spring-boot",
    ],
  },
  {
    id: "databases",
    title: "Databases I Use",
    description: "Data storage and management",
    badges: [
      "https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white",
      "https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white",
      "https://img.shields.io/badge/DuckDB-FFF000?style=flat&logo=duckdb&logoColor=black",
    ],
  },
  {
    id: "state",
    title: "State Management",
    description: "Managing application state",
    badges: [
      "https://img.shields.io/badge/Zustand-2D3748?style=flat&logo=zustand&logoColor=white",
      "https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white",
      "https://img.shields.io/badge/XState--Store-2C3E50?style=flat&logo=xstate&logoColor=white",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Deployment and infrastructure",
    badges: [
      "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white",
      "https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white",
      "https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white",
      "https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white",
    ],
  },
  {
    id: "tools",
    title: "Other Cool Stuff I've Played With",
    description: "Various tools and technologies I've explored",
    badges: [
      "https://img.shields.io/badge/RabbitMQ-FF6600?style=flat&logo=rabbitmq&logoColor=white",
      "https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apache-kafka&logoColor=white",
      "https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white",
      "https://img.shields.io/badge/Phoenix-FF6600?style=flat&logo=phoenixframework&logoColor=white",
      "https://img.shields.io/badge/NeoVim-57A143?style=flat&logo=neovim&logoColor=white",
    ],
  },
];

function BadgeGrid({ badges }: { badges: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {badges.map((src, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={src}
            alt="tech badge"
            className="h-7 transition-all duration-200 group-hover:brightness-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
}

function TechSection({ section }: { section: TechCategory }) {
  return (
    <AccordionItem
      value={section.id}
      className="border-b border-gray-200 dark:border-gray-700"
    >
      <AccordionTrigger className="text-left hover:no-underline py-4 group">
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {section.title}
          </span>
          {section.description && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {section.description}
            </span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <BadgeGrid badges={section.badges} />
      </AccordionContent>
    </AccordionItem>
  );
}

export default function SkillsAccordion() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Technologies and tools I work with regularly
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        defaultValue="languages"
      >
        {TECH_STACK.map((section) => (
          <TechSection key={section.id} section={section} />
        ))}
      </Accordion>
    </div>
  );
}
