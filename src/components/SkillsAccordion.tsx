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
    id: "core-development",
    title: "Core Development & Frameworks",
    badges: [
      // Languages
      "https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white",
      "https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white",
      "https://img.shields.io/badge/Elixir-4B275F?style=flat&logo=elixir&logoColor=white",
      // Frontend
      "https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB",
      "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white",
      "https://img.shields.io/badge/Astro-0D1117?style=flat&logo=astro&logoColor=white",
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white",
      "https://img.shields.io/badge/React_Router_v7-CA4245?style=flat&logo=react-router&logoColor=white",
      // Backend & APIs
      "https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white",
      "https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white",
      "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white",
      "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white",
      // State Management
      "https://img.shields.io/badge/Zustand-2D3748?style=flat&logo=zustand&logoColor=white",
      "https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white",
      "https://img.shields.io/badge/XState--Store-2C3E50?style=flat&logo=xstate&logoColor=white",
    ],
  },
  {
    id: "data-infrastructure",
    title: "Data & Infrastructure",
    badges: [
      // Databases
      "https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white",
      "https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white",
      "https://img.shields.io/badge/DuckDB-FFF000?style=flat&logo=duckdb&logoColor=black",
      // Data Science & ML
      "https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white",
      "https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white",
      "https://img.shields.io/badge/Matplotlib-11557c?style=flat&logo=matplotlib&logoColor=white",
      "https://img.shields.io/badge/Seaborn-3776AB?style=flat&logo=python&logoColor=white",
      "https://img.shields.io/badge/Polars-CD792C?style=flat&logo=polars&logoColor=white",
      "https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white",
      "https://img.shields.io/badge/Keras-D00000?style=flat&logo=keras&logoColor=white",
      // Cloud & DevOps
      "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white",
      "https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white",
      "https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white",
      "https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white",
      // Message Queues
      "https://img.shields.io/badge/RabbitMQ-FF6600?style=flat&logo=rabbitmq&logoColor=white",
      "https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apache-kafka&logoColor=white",
    ],
  },
  {
    id: "other-tools-technologies",
    title: "Other Tools & Technologies",
    badges: [
      "https://img.shields.io/badge/Phoenix-FF6600?style=flat&logo=phoenixframework&logoColor=white",
      "https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white",
      "https://img.shields.io/badge/NeoVim-57A143?style=flat&logo=neovim&logoColor=white",
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
