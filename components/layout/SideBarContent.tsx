import React, { useContext } from "react";
import { createStyles, Navbar, ScrollArea } from "@mantine/core";

import { IconSelector } from "@tabler/icons";

import UserButton from "./UserButton";
import _ from "lodash";
import { linkData } from "../../utility/RouteConfig";
import LinksGroup from "./NavBarLinkGroup";
import { AccountContext } from "../accessControl/AccountContext";
import { useRouter } from "next/router";
import { SubLink } from "../../utility/interfaces";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
        }`,
    },
  },
  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
      }`,
  },
  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  mainLinkParent: {
    width: "100%",
    paddingTop: `8px`,
    paddingLeft: `8px`,
    paddingRight: `8px`,

    fontSize: theme.fontSizes.xs,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[6],
  },
  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },
  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },
  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },
  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export default function SideBarContent() {
  const { classes } = useStyles();
  const account = useContext(AccountContext);
  const router = useRouter();

  const activeLink = (hasLink: SubLink[]) => {
    const obj = _.find(hasLink, ["link", router.pathname]);
    return !_.isEmpty(obj);
  };

  const links = linkData.map((item) => (
    <div key={item.name}>
      <p className={classes.mainLinkParent}>{item.name}</p>
      {(item.menu || []).map((sub) => (
        <LinksGroup
          {...sub}
          initialActive={activeLink(sub.hasLink)}
          key={sub.label}
        />
      ))}
    </div>
  ));

  const formatName = () => {
    return (
      account.employee?.lastName +
      ", " +
      account.employee?.firstName +
      " " +
      account.employee?.middleName
    );
  };

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.section}>
        <UserButton
          image="/images/avatar-male.png"
          name={formatName()}
          email={account.email}
          icon={<IconSelector size={14} stroke={1.5} />}
        />
      </Navbar.Section>
      <Navbar.Section
        grow
        className={classes.section}
        component={ScrollArea}
        style={{ marginBottom: "70px" }}
      >
        <div className={classes.mainLinks}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
