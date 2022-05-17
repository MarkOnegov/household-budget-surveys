export type Link = {
  label: string;
  link: string;
  icon: string;
  description: string;
};

export const links: Link[] = [
  {
    label: 'ADMIN_PANEL.USERS.LABEL',
    link: 'users',
    icon: 'person',
    description: 'ADMIN_PANEL.USERS.DESCRIPTION',
  },
  {
    label: 'ADMIN_PANEL.HOUSEHOLDS.LABEL',
    link: 'households',
    icon: 'households',
    description: 'ADMIN_PANEL.HOUSEHOLDS.DESCRIPTION',
  },
];
