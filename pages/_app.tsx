import { AppProps } from "next/app";
import Head from "next/head";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utility/graphql-client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import AuthManager from "../components/accessControl/AuthManager";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { fetcher } from "../utility/swr-client";
import { NotificationsProvider } from "@mantine/notifications";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 1.8e6, //30 mins
        fetcher,
      }}
    >
      <GoogleOAuthProvider clientId="310020020568-r8lb69rgsts05mim5jq52n62gp9vkm0o.apps.googleusercontent.com">
        <ApolloProvider client={client}>
          <Head>
            <title>ACEMCBohol Report Server</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              globalStyles: (theme) => ({
                "*, *::before, *::after": {
                  boxSizing: "border-box",
                },

                body: {
                  ...theme.fn.fontStyles(),
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,
                  lineHeight: theme.lineHeight,
                },
                a: {
                  textDecoration: "none",
                },
              }),

              colors: {
                brand: [
                  "#7AD1DD",
                  "#5FCCDB",
                  "#44CADC",
                  "#2AC9DE",
                  "#1AC2D9",
                  "#11B7CD",
                  "#09ADC3",
                  "#0E99AC",
                  "#128797",
                  "#147885",
                ],
                brand2: [
                  "#f0fbe2",
                  "#dbf2bd",
                  "#c4e895",
                  "#addf6c",
                  "#96d644",
                  "#7dbd2b",
                  "#609320",
                  "#446915",
                  "#273f0a",
                  "#0b1600",
                ],
                brand3: [
                  "#ffeddb",
                  "#ffcdaf",
                  "#ffac7e",
                  "#ff8c4c",
                  "#ff6b1a",
                  "#e65200",
                  "#b43f00",
                  "#812d00",
                  "#4f1900",
                  "#210600",
                ],
              },
              colorScheme,
              // primaryColor: "brand",
              loader: "bars",
              breakpoints: {
                xs: 500,
                sm: 800,
                md: 1000,
                lg: 1200,
                xl: 1400,
              },
            }}
          >
            {router.route === "/login" || router.route === "/admin/login" ? (
              <NotificationsProvider position="top-right">
                <Component {...pageProps} />
              </NotificationsProvider>
            ) : (
              <NotificationsProvider position="top-right">
                <AuthManager>
                  <Component {...pageProps} />
                </AuthManager>
              </NotificationsProvider>
            )}
          </MantineProvider>
        </ApolloProvider>
      </GoogleOAuthProvider>
    </SWRConfig>
  );
}
