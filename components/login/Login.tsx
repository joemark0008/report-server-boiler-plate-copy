import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  PaperProps,
  Button,
  createStyles,
} from "@mantine/core";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../graphql/Auth";
import { setCookie } from "cookies-next";
import { Credentials } from "../../utility/interfaces";
import { showNotification } from "@mantine/notifications";
import _ from "lodash";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://res.cloudinary.com/acemc/image/upload/v1652410319/ace_building_02283fdb4d.jpg)",
  },
  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function LoginPage(props: PaperProps) {
  const { classes } = useStyles();
  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (data: Credentials) => {
    signIn({
      variables: {
        signInInput: data,
      },
      onCompleted: (resp) => {
        if (resp?.signin) {
          setCookie("authtoken", resp?.signin.accessToken);
          setCookie("role", resp?.signin.user?.role);
          location.href = "/";
        }
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(error)) {
      showNotification({
        color: "red",
        title: "Credentials Error",
        message: error.message,
      });
    }
  }, [error]);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          ACEMCBohol
          <br />
          Allied Care Export Medical Center Bohol Report Server
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            size="md"
            error={form.errors.email}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            mt="md"
            size="md"
            error={form.errors.password}
          />

          <Button
            fullWidth
            mt="xl"
            size="md"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
