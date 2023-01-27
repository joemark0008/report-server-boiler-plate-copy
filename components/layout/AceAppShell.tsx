import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core";
import { useState } from 'react';
import SideBarContent from "./SideBarContent";
// navbar = {< SideBarContent />}

const AceAppShell = (props: any) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <AppShell

      padding="xl"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          < SideBarContent />
        </Navbar>
      }
      header={
  
          <Header height={{ base: 50, md: 70 }} p="md" >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text style={{fontWeight: 500}}>ACEMCBohol Report Server</Text>
            </div>
          </Header>
    
      }
    >
      {props.children}
    </AppShell>
  );
};

export default AceAppShell;
