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
          <Typography variant="h4" className="middle-earth">
            About
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            The Horus Heresy 3.0 List Builder is a webapp forked from the MESBG List Builder developed by Alex Cordaro and
            Marcel Hollink.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            Special thanks to both of them, as without them, their time and dedication and making their builder open source, this would not be possible.
          </Typography>

          <Typography variant="h4" className="middle-earth" sx={{ mb: 2 }}>
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
                <strong>Lazy copied and pasted profile cards</strong> for some models across
                Horus Heresy.
              </Box>
              <Box component="li">
                <strong>PDF print-out</strong> which I've probably broken.
              </Box>
              <Box component="li">
                <strong>Game Mode</strong> which provides digital stat trackers
                as an interactive alternative to the PDF print-out, allowing you
                to;
                <ul>
                  <Box component="li">
                    Track the Wounds of your heroes.
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
          <Typography variant="h4" className="middle-earth">
            Roadmap
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            Even though the app should already include everything you would need
            to build your army lists, there is always work to be done. Think of
            FAQ&apos;s and errata that need to be implemented or bugs on our
            side that need be be squashed. Aside from those few things we have
            our own list of things we still want to include.
          </Typography>
          <Stack component="ul" sx={{ listStyle: "none", pl: 0 }} gap={1}>
            <Box component="li">
              <Typography>
                <strong>Internationalization;</strong> We are committed to
                support the many different  communities all around the
                world. With accessibility being one of our top priorities, we
                would also like to make it linguistically available for
                everyone. Staring with Spanish as our first focus, we&apos;d
                like to open our gates for those willing to help translate the
                many rules and profiles.
              </Typography>
            </Box>
            <Box component="li">
              <Typography>
                <strong>Accounts;</strong> Allowing users to login using their
                favorite authentication provider, like Facebook, Google and
                maybe others platform. Or let them create an custom
                email/password account. This will allow users with an account to
                save their rosters and match history on our servers and allows
                them to sync more easily between their computer and mobile
                device while also reducing the risk of losing their browser
                storage.
              </Typography>
            </Box>
            <Box component="li">
              <Typography>
                <strong>Sharing rosters;</strong> The List Builder
                providers multiple ways of exporting your roster and sharing it
                with the world. One way to share rosters is currently
                impossible: Sharing the a link to the actual roster. Once we set
                up our database for creating and managing rosters based on an
                authenticated account we can provide more fancy stuff like that.
                Such as creating a link to a readonly roster and allowing users
                to import it into their own accounts.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
