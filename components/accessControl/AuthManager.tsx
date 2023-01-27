import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import _ from "lodash";
import {
  AccountConsumer,
  AccountProvider,
  NULLACCOUNT,
} from "./AccountContext";
import { LoadingOverlay, Modal, useMantineTheme, Center } from "@mantine/core";
import { GET_ACCOUNT } from "../../graphql/Auth";
import { deleteCookie, setCookie } from "cookies-next";
import { UserEmployee } from "../../utility/interfaces";
import AceAppShell from "../layout/AceAppShell";

const AuthManager = (props: any) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);
  const { isLoading, error, data } = useSWR(GET_ACCOUNT);

  const blank = (
    <Center>
      <div style={{ width: "100%", height: "100%" }}>
        <LoadingOverlay visible={true} overlayBlur={4} />
      </div>
    </Center>
  );

  if (error) {
    const size = _.size(error.response?.errors);

    if (size == 1) {
      let gError = error.response?.errors[0];
      if (gError.extensions.code === "UNAUTHENTICATED") {
        deleteCookie("authtoken");
        deleteCookie("role");
        return (
          <div>
            <Modal
              opened={opened}
              withCloseButton={false}
              closeOnClickOutside={false}
              closeOnEscape={false}
              onClose={() => setOpened(false)}
              overlayColor={
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2]
              }
              overlayOpacity={0.55}
              overlayBlur={3}
            >
              <p style={{ textAlign: "center" }}>
                Your Session is Expired. Please login again.{" "}
                <Link href={`${process.env.NEXT_PUBLIC_URL}/login`}>Login</Link>
              </p>
            </Modal>
          </div>
        );
      }
    }
  }

  if (!data || isLoading) {
    return blank;
  }

  return (
    <AccountProvider value={_.get(data, "user", NULLACCOUNT)}>
      <AccountConsumer>
        {(value: UserEmployee) => {
          const childrenWithProps = React.Children.map(
            props.children,
            (child) =>
              React.cloneElement(child, { account: value || NULLACCOUNT })
          );
          setCookie("role", value.role);
          return <AceAppShell>{childrenWithProps}</AceAppShell>;
        }}
      </AccountConsumer>
    </AccountProvider>
  );
};

export default AuthManager;
