import { Folder } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, ListItemAvatar, ListItemIcon } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FactionLogo } from "../../components/common/images/FactionLogo.tsx";
import { useGameModeState } from "../../state/gamemode";
import { useRosterBuildingState } from "../../state/roster-building";
import { Roster } from "../../types/roster.ts";

const RosterListItem = ({ roster }: { roster: Roster }) => {
  const navigate = useNavigate();
  const { startNewGame } = useGameModeState();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(`/gamemode/-/${roster.id}`);
          startNewGame(roster);
        }}
      >
        <ListItemAvatar>
          <FactionLogo faction={roster.armyList} size={35} />
        </ListItemAvatar>
        <ListItemText
          primary={roster.name}
          secondary={`Points: ${roster.metadata.points}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

const RosterGroup = ({
  group,
  rosters,
}: {
  group: string;
  rosters: Roster[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary={group} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ width: "100%", bgcolor: "background.paper" }} dense>
          {rosters.map((roster, index) => (
            <RosterListItem roster={roster} key={index} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const SelectRoster = () => {
  const { gameState } = useGameModeState();
  const { rosters, groups } = useRosterBuildingState();
  const navigate = useNavigate();
  const groupMap = Object.fromEntries(groups.map((group) => [group.id, group]));

  const gameIds = Object.keys(gameState);
  const games = Object.entries(gameState).filter(([gameId]) => {
    const roster = rosters.find((roster) => roster.id === gameId);
    return !!roster;
  });
  const gameCount = games.length;

  const groupedRosters = Object.entries(
    rosters
      .filter((roster) => !gameIds.includes(roster.id))
      .reduce(
        (acc, currentValue) => {
          const groupKey = currentValue.group || "ungrouped";

          if (!acc[groupKey]) acc[groupKey] = [];

          acc[groupKey].push(currentValue);

          return acc;
        },
        {} as Record<string, Roster[]>,
      ),
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h4" className="sabon">
        Game Mode
      </Typography>

      {gameCount > 0 && (
        <Divider sx={{ by: 2 }}>
          <Typography variant="h6">Continue an existing game</Typography>
        </Divider>
      )}

      <List sx={{ width: "100%", bgcolor: "background.paper" }} dense>
        {games
          .sort((a, b) => b[1].started - a[1].started)
          .map(([key, value], index) => {
            const roster = rosters.find((roster) => roster.id === key);
            if (!roster) return <Fragment key={index} />;
            return (
              <ListItem key={index} sx={{}} disablePadding>
                <ListItemButton onClick={() => navigate(`/gamemode/-/${key}`)}>
                  <ListItemAvatar>
                    <FactionLogo faction={roster.armyList} size={35} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={roster.name}
                    secondary={new Date(value.started)
                      .toLocaleDateString("en-UK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/ /g, " ")}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>

      {gameCount > 0 ? (
        <Divider sx={{ my: 2 }}>
          <Typography variant="h6">
            Or start a game for one of your other rosters
          </Typography>
        </Divider>
      ) : (
        <Divider sx={{ mb: 2 }}>
          <Typography variant="h6">Select a roster to start a game</Typography>
        </Divider>
      )}

      {groupedRosters
        .filter(([group]) => group !== "ungrouped")
        .map(([group, rosters], index) => (
          <RosterGroup
            group={groupMap[group].name}
            rosters={rosters}
            key={index}
          />
        ))}

      <List sx={{ width: "100%", bgcolor: "background.paper" }} dense>
        {rosters
          .filter((roster) => !roster.group)
          .filter((roster) => !gameIds.includes(roster.id))
          .map((roster, index) => (
            <RosterListItem roster={roster} key={index} />
          ))}
      </List>
    </Container>
  );
};
