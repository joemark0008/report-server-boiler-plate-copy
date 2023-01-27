import React, { useState } from "react";
import { Collapse, Text, UnstyledButton, createStyles } from "@mantine/core";
import { TablerIcon, IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import _ from "lodash";

const useStyles = createStyles((theme) => ({
  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  active: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  chevron: {
    transition: "transform 200ms ease",
  },
}));

type MenuList = {
  icon: TablerIcon;
  label: string;
  link: string;
  hasLink: { label: string; link: string }[];
  initialActive: boolean;
};

export default function LinksGroup({
  icon: Icon,
  label,
  hasLink,
  link,
  initialActive = false
}: MenuList) {
  const { classes, theme, cx } = useStyles();
  const router = useRouter();
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const [opened, setOpened] = useState(initialActive);


  return (
    <>
      <UnstyledButton
        className={cx(classes.mainLink, {
          [classes.active]: link === router.pathname,
        })}
        onClick={() => {
          if (_.isEmpty(hasLink)) {
            router.push(link);
          } else {
            setOpened((prev) => !prev);
          }
        }}
      >
        <div className={classes.mainLinkInner}>
          <Icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{label}</span>
        </div>
        {!_.isEmpty(hasLink) && (
          <ChevronIcon
            className={classes.chevron}
            size={14}
            stroke={1.5}
            style={{
              transform: opened
                ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                : "none",
            }}
          />
        )}
      </UnstyledButton>
      {!_.isEmpty(hasLink) ? (
        <Collapse in={opened}>
          {(hasLink || []).map((sub) => (
            <Text<"a">
              component="a"
              className={cx(classes.link, {
                [classes.active]: sub.link === router.pathname,
              })}
              href={sub.link}
              key={sub.label}
              onClick={(event) => {
                event.preventDefault();
                router.push(sub.link);
              }}
            >
              {sub.label}
            </Text>
          ))}
        </Collapse>
      ) : null}
    </>
  );
}
