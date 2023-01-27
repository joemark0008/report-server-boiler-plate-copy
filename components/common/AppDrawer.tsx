import React, { useState, FC, ReactElement } from "react";
import { Drawer, Button, Group } from "@mantine/core";

type AppDrawerProps = {
  children: React.ReactNode;
  Component: any;
  title: string;
  size?: string;
  callBack?: any;
  record?: any;
};

export default function AppDrawer({
  children,
  Component,
  size = "70%",
  callBack,
  record,
  ...props
}: AppDrawerProps) {
  const [opened, setOpened] = useState(false);
  const executeCallBack = (message: string) => {
    if (callBack) {
      setOpened(false);
      callBack(message);
    }
  };
  return (
    <>
      <Drawer
        title={<h4>{props.title}</h4>}
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size={size}
      >
        <Component
          setOpened={setOpened}
          hide={(msg: string) => executeCallBack(msg)}
          {...record}
        />
      </Drawer>
      <Group>
        <div onClick={() => setOpened(true)}>{children}</div>
      </Group>
    </>
  );
}
