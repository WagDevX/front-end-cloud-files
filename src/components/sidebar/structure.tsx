const sidebarStructure = [
  {
    id: "drive",
    title: "Drive",
    name: "drive",
    parent: true,
    icon: "home",
    link: "/drive",
  },
  {
    id: "login",
    title: "Fazer Login",
    name: "login",
    parent: true,
    icon: "login",
    link: "/login",
  },
  {
    id: "settings",
    title: "Configurações",
    name: "config",
    parent: true,
    icon: "settings",
    link: "/settings",
  },
  {
    id: "admin",
    title: "Admin",
    name: "admin",
    parent: true,
    icon: "admin",
    child: [
      {
        id: "admin-roles",
        title: "Genrenciar perfis",
        name: "admin.roles",
        link: "/admin/roles",
        icon: "dot",
      },
      {
        id: "admin-permissions",
        title: "Gerenciar permissões",
        name: "admin.permissions",
        link: "/permissions",
        icon: "dot",
      },
    ],
  },
  {
    id: "logout",
    title: "Sair",
    name: "logout",
    parent: true,
    icon: "logout",
    link: "/logout",
  },
];

export { sidebarStructure };
