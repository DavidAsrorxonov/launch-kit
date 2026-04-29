export const baseOutputFiles: IOutputFileNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "layout.tsx", type: "file" },
      { name: "page.tsx", type: "file" },
    ],
  },
  {
    name: "README.md",
    type: "file",
  },
  {
    name: "package.json",
    type: "file",
  },
  {
    name: ".env.example",
    type: "file",
  },
  {
    name: "next-env.d.ts",
    type: "file",
  },
  {
    name: "next.config.js",
    type: "file",
  },
  {
    name: "tsconfig.json",
    type: "file",
  },
];

export const mongoOutputFiles: IOutputFileNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      {
        name: "api",
        type: "folder",
        children: [
          {
            name: "test-db",
            type: "folder",
            children: [{ name: "route.ts", type: "file" }],
          },
        ],
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [{ name: "db.ts", type: "file" }],
  },
  {
    name: "models",
    type: "folder",
    children: [{ name: "User.ts", type: "file" }],
  },
];

export const authOutputFiles: IOutputFileNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      {
        name: "login",
        type: "folder",
        children: [{ name: "page.tsx", type: "file" }],
      },
      {
        name: "dashboard",
        type: "folder",
        children: [{ name: "page.tsx", type: "file" }],
      },
      {
        name: "api",
        type: "folder",
        children: [
          {
            name: "auth",
            type: "folder",
            children: [
              {
                name: "[...all]",
                type: "folder",
                children: [{ name: "route.ts", type: "file" }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      {
        name: "auth",
        type: "folder",
        children: [
          { name: "auth.ts", type: "file" },
          { name: "auth-client.ts", type: "file" },
        ],
      },
    ],
  },
];
