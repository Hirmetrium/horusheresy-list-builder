import { Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { OpenNavigationDrawerEvent } from "../../events/OpenNavigationDrawerEvent.ts";
import { useRosterInformation } from "../../hooks/useRosterInformation.ts";
import { useScreenSize } from "../../hooks/useScreenSize.ts";

export const ROSTER_INFO_BAR_HEIGHT = 40;

export const MobileRosterInfoToolbar = () => {
  const screen = useScreenSize();
  const { getAdjustedMetaData } = useRosterInformation();
  const metadata = getAdjustedMetaData();
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);


  useEffect(() => {
    function openMenuDrawer(event: OpenNavigationDrawerEvent) {
      setNavDrawerOpen(event.open);
    }

    window.addEventListener("mlb-event--open-nav-bar", openMenuDrawer);
    return () =>
      window.removeEventListener("mlb-event--open-nav-bar", openMenuDrawer);
  }, []);

  return (
    <>
      {!screen.isDesktop && (
        <Toolbar
          sx={{
            backgroundColor: "#1c1c1e",
            color: "white",
            minHeight: `${ROSTER_INFO_BAR_HEIGHT}px !important`,
            borderTop: "3px solid #4c4c4e",
            position: "fixed",
            width: `calc(100% - ${navDrawerOpen ? 320 : 56}px)`,
            transition: "width 0.3s ease",
            zIndex: "100",
          }}
        >
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ m: "auto" }}>
            <Typography
              color={
                !!metadata.maxPoints && metadata.points > metadata.maxPoints
                  ? "warning"
                  : "inherit"
              }
            >
              <span>
                Points: <b>{metadata.points}</b>
              </span>
            </Typography>
            <Typography>
              Units: <b>{metadata.units}</b>
            </Typography>
          </Stack>
        </Toolbar>
      )}
    </>
  );
};
