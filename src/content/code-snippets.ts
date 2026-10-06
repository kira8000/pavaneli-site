export interface CodeSnippet {
  fileName: string;
  /** "repository" snippets are real excerpts; keep them in sync when the source changes. */
  origin: "illustrative" | "repository";
  source: string;
}

export const SERVER_CLIENT_BOUNDARY: CodeSnippet = {
  fileName: "projects/page.tsx + ProjectFilter.tsx",
  origin: "illustrative",
  source: `// app/projects/page.tsx: Server Component, no client JavaScript
export default async function ProjectsPage() {
  const projects = await projectService.list();
  return <ProjectList projects={projects} />;
}

// features/projects/ProjectFilter.tsx: Client Component only where interaction needs it
"use client";

export function ProjectFilter({ onChange }: { onChange: (query: string) => void }) {
  return (
    <input
      type="search"
      aria-label="Search projects"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}`,
};

export const NEST_LAYERS: CodeSnippet = {
  fileName: "users.controller.ts + users.service.ts",
  origin: "illustrative",
  source: `@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.users.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }
}

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async findOne(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}`,
};

export const PRISMA_SCHEMA: CodeSnippet = {
  fileName: "schema.prisma",
  origin: "illustrative",
  source: `model User {
  id      String   @id @default(uuid())
  email   String   @unique
  tickets Ticket[]
}

model Ticket {
  id         String @id @default(uuid())
  title      String
  assignee   User   @relation(fields: [assigneeId], references: [id])
  assigneeId String
}`,
};

export const THEME_TOGGLE_TEST: CodeSnippet = {
  fileName: "ThemeToggle.test.tsx",
  origin: "repository",
  source: `it("toggles the theme attribute and persists the choice", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);

  await user.click(screen.getByRole("button", { name: /switch to light theme/i }));

  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
});`,
};

export const NATIVE_DIALOG: CodeSnippet = {
  fileName: "components/ui/Dialog.tsx",
  origin: "repository",
  source: `useLayoutEffect(() => {
  const dialog = ref.current;
  if (!dialog) return;
  if (open && !dialog.open) dialog.showModal();
  if (!open && dialog.open) dialog.close();
}, [open]);

return (
  <dialog ref={ref} aria-label={label} onClose={onClose} className={...}>
    {children}
  </dialog>
);`,
};

export const AI_TASK_SPEC: CodeSnippet = {
  fileName: "task-spec.md",
  origin: "illustrative",
  source: `Task: add pagination to the users table

Requirements
- Page sizes: 10, 25 and 50
- Loading, empty and error states
- Filters and sorting keep working across pages

Constraints
- Go through UserService, never the mock data directly
- Strict TypeScript, no new dependencies

Done when
- Behavior tests pass
- Lint and typecheck are green`,
};

export const AI_REVIEW_NOTES: CodeSnippet = {
  fileName: "review-notes.md",
  origin: "illustrative",
  source: `- Page size is not validated -> add a schema check in the service
- Component imports mock data -> move it behind the repository
- Empty state is missing -> add it and cover it with a test
- Page buttons have no accessible names -> add labels`,
};

/** Every snippet, so tests can check that each one is labeled and (for repository ones) still true. */
export const ALL_SNIPPETS: readonly CodeSnippet[] = [
  SERVER_CLIENT_BOUNDARY,
  NEST_LAYERS,
  PRISMA_SCHEMA,
  THEME_TOGGLE_TEST,
  NATIVE_DIALOG,
  AI_TASK_SPEC,
  AI_REVIEW_NOTES,
];
