import { Badge } from "@/components/ui/Badge";
import { PRACTICE_KEYS, TECH_GROUPS } from "@/content/skills";
import { T } from "@/i18n/T";

const GROUP_TITLE = "font-mono text-sm text-subtle";

export function SkillGroups() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {TECH_GROUPS.map((group) => (
        <div key={group.titleKey}>
          <h3 className={GROUP_TITLE}>
            <T k={group.titleKey} />
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item}>
                <Badge>{item}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h3 className={GROUP_TITLE}>
          <T k="skills.practices" />
        </h3>
        <ul className="text-muted mt-3 space-y-1.5 text-sm">
          {PRACTICE_KEYS.map((key) => (
            <li key={key}>
              <T k={key} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
