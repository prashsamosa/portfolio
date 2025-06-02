import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SKILLS_DATA = {
  languages: [
    "TypeScript",
    "Python",
    "Golang",
    "JavaScript",
    "Bash",
    "Elixir",
    "Lua",
    "SQL",
  ],
  frameworks: [
    "Next",
    "React",
    "React Native",
    "Router v7",
    "Astro",
    "Hono",
    "Express",
    "FastAPI",
    "Pydantic",
    "gRPC",
  ],
  devTools: [
    "Git",
    "Docker",
    "Kubernetes",
    "Cypress",
    "Nginx",
    "Neovim",
    "RabbitMQ",
  ],
} as const;

const ACCORDION_ITEMS = [
  {
    id: "languages",
    title: "Languages",
    skills: SKILLS_DATA.languages,
  },
  {
    id: "frameworks",
    title: "Frameworks and Libraries",
    skills: SKILLS_DATA.frameworks,
  },
  {
    id: "devTools",
    title: "Developer Tools",
    skills: SKILLS_DATA.devTools,
  },
] as const;

function SkillsList({ items }: { items: readonly string[] }) {
  if (!items || items.length === 0) {
    return <p className="tw:text-gray-500 tw:italic">No skills available</p>;
  }

  return (
    <ul className="tw:list-disc tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 tw:gap-2 tw:pl-5">
      {items.map((item) => (
        <li key={item} className="tw:mb-2 tw:text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SkillsAccordion() {
  return (
    <div className="tw:w-full">
      <Accordion type="single" collapsible className="tw:w-full">
        {ACCORDION_ITEMS.map((section, index) => (
          <AccordionItem key={section.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="tw:text-left">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <SkillsList items={section.skills} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
