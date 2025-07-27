import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../theme/ThemeContext.tsx";

export const About = () => {
  const theme = useTheme();
  const themeContext = useThemeContext();

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
      <Stack direction="row" gap={5} flexWrap="wrap">
        <Stack gap={2}>
          <Typography variant="h4" className="sabon">
            About
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            The Horus Heresy 3.0 List Builder is a webapp forked from the MESBG List Builder developed by Alex Cordaro and
            Marcel Hollink.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            Special thanks to both of them, as without them, their time and dedication and making their builder open source, this would not be possible.
          </Typography>

                  <Typography variant="body1" sx={{ fontSize: "18px" }}>
                      The list builder is open source (
                      <a
                          href="https://github.com/Hirmetrium/horusheresy-list-builder"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                              color:
                                  themeContext.mode === "dark"
                                      ? theme.palette.secondary.light
                                      : theme.palette.secondary.dark,
                          }}
                      >
                          you can find it here
                      </a>
                      ). If you&apos;d like to help you can fork the repository and
                      provide your corrections via pull request.
                                      </Typography>


          <Typography variant="h4" className="sabon" sx={{ mb: 2 }}>
            Features
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            <Stack component="ul" sx={{ pl: 0 }} gap={1}>
              <Box component="li">
                A <strong>fully responsive</strong> web interface allowing you
                to build lists in the comfort of your own home as well as on the
                go.
              </Box>
              <Box component="li">
                <strong>Profile cards</strong> for some models across
                Horus Heresy. (WIP)
              </Box>
              <Box component="li">
                <strong>PDF print-outs</strong> which are work in progress.
              </Box>
              <Box component="li">
                <strong>Game Mode</strong> which provides digital stat trackers
                as an interactive alternative to the PDF print-out, allowing you
                to;
                <ul>
                  <Box component="li">
                    Track the Wounds of your heroes. (currently broken)
                  </Box>
                  <Box component="li">
                    Additionally displays army rules and profile cards all on
                    one screen.
                  </Box>
                </ul>
              </Box>
              <Box component="li">
                <strong>All relevant roster information available</strong> in
                the drawer on the right, which collapses for Mobile users.
              </Box>
              <Box component="li">
                Alerts providing{" "}
                <strong>notifications for illegal roster combinations</strong>{" "}
                and required models.
              </Box>
              <Box component="li">
                <strong>Match History</strong> which allows you to keep track of
                your matches from Game Mode, as well as being able to add
                matches manually for when you use the PDF print-out.
                <ul>
                  <Box component="li">
                    You match history will be provided with various graphs to
                    help visualise and break down your match experience over
                    time.
                  </Box>
                </ul>
              </Box>
              <Box component="li">
                Uses the browsers internal storage API to{" "}
                <strong>persist your rosters between sessions</strong>, and also{" "}
                <strong>provides import/export</strong> options to keep your
                data safe when clearing your browser history and data.
              </Box>
            </Stack>
          </Typography>
          <Typography variant="h4" className="sabon">
            Roadmap
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            The app is a work in progress, and you can find the current list
            of to do items on the github respository above.
          </Typography>
         </Stack>
      </Stack>
    </Container>
  );
};
