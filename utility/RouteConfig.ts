import {
  IconDashboard,
  IconChecklist,
  IconBuildingEstate,
  IconUsers,
  IconFiles,
  IconClipboardTypography,
  IconShoppingCart,
  IconFileAnalytics,
  IconFileInvoice,
  IconCashBanknote,
  IconReceipt2,
} from "@tabler/icons";

/* NOTE: Please specify hasLink to blank Array [] to avoid syntax error if there is no subLink inside */

export const linkData = [
  {
    name: "Announcement",
    menu: [
      {
        icon: IconDashboard,
        label: "Announcement",
        notifications: 3,
        link: "/",
        hasLink: [],
      },
    ],
  },
  {
    name: "Health Care Reports",
    menu: [
      {
        icon: IconChecklist,
        label: "Patient Cencus",
        link: "/patient",
        hasLink: [
          { label: "Department", link: "/patient/list" },
          { label: "Location (Patient Address)", link: "/patient/case" },
          { label: "Gender", link: "/patient/case" },
          { label: "Age", link: "/patient/case" },
          { label: "Age", link: "/patient/case" },
        ],
      },
      {
        icon: IconChecklist,
        label: "ER Consults Census",
        link: "/patient",
        hasLink: [],
      },
      {
        icon: IconChecklist,
        label: "Ancillary Census",
        link: "/patient",
        hasLink: [],
      },
      {
        icon: IconChecklist,
        label: "Room Cencus",
        link: "/patient",
        hasLink: [],
      },
      {
        icon: IconChecklist,
        label: "Admission Cencus",
        link: "/patient",
        hasLink: [
          { label: "Service", link: "/patient/list" },
          { label: "Department", link: "/patient/list" },
          { label: "ICU", link: "/patient/list" },
          { label: "Operating Room", link: "/patient/list" },
          { label: "Delivery Room/Labor Room", link: "/patient/list" },
        ],
      },
      {
        icon: IconChecklist,
        label: "Discharged Cencus",
        link: "/patient",
        hasLink: [
          { label: "Department", link: "/patient/list" },
          { label: "ICU", link: "/patient/list" },
          { label: "NICU", link: "/patient/list" },
        ],
      },
      {
        icon: IconChecklist,
        label: "Mortality Cencus",
        link: "/patient",
        hasLink: [],
      },
      {
        icon: IconChecklist,
        label: "Transfered Cencus",
        link: "/patient",
        hasLink: [],
      },
      {
        icon: IconChecklist,
        label: "Cummulative Monthly Cencus",
        link: "/patient",
        hasLink: [],
      },
    ],
  },
  {
    name: "Inventory Reports",
    menu: [
      {
        icon: IconFiles,
        label: "Masterfiles",
        link: "/inventory/masterfile",
        hasLink: [
          { label: "Item", link: "/inventory/masterfile/items" },
          { label: "Supplier", link: "/inventory/masterfile/suppliers" },
          {
            label: "Signature Setup",
            link: "/inventory/masterfiles/signatures",
          },
          { label: "Others", link: "/inventory/masterfiles/others" },
        ],
      },
    ],
  },
  {
    name: "Billing Reports",
    menu: [
      {
        icon: IconFileInvoice,
        label: "Billing Accounts",
        link: "/billing/accounts",
        hasLink: [],
      },
    ],
  },
  {
    name: "Accounting Reports",
    menu: [
      {
        icon: IconBuildingEstate,
        label: "Financial Reports",
        link: "/settings/clinic",
        hasLink: [],
      },
    ],
  },
];
