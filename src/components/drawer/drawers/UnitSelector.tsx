import Stack from "@mui/material/Stack";
import { useWarbandMutations } from "../../../hooks/useWarbandMutations.ts";
import { useAppState } from "../../../state/app";
import { useRosterBuildingState } from "../../../state/roster-building";
import { Unit } from "../../../types/hh3-data.types.ts";
import { HeroSelectionList } from "../../common/unit-selection/HeroSelectionList.tsx";
import { UnitSelectionList } from "../../common/unit-selection/UnitSelectionList.tsx";

export const UnitSelector = () => {
  const {
    selectionType,
    selectionFocus: [warbandId, unitId],
    armyList,
  } = useRosterBuildingState();
  const { closeSidebar } = useAppState();
  const roster = useRosterBuildingState(({ rosters }) =>
    rosters.find(({ id }) => id === armyList),
  );

  const { handleHeroSelection, handleUnitSelection } =
    useWarbandMutations(roster.id, warbandId);

  function selectUnit(unit: Unit) {
    console.debug(
      `select ${selectionType} for wb ${warbandId} in ${roster.name}; ${unit.name}`,
    );
    switch (selectionType) {
      case "hero":
        handleHeroSelection(unit);
        break;
      case "unit":
        handleUnitSelection(unitId, unit);
        break;
    }

    closeSidebar();
  }


  return (
    <Stack
      spacing={2}
      sx={{
        pb: 10,
        width: "50ch",
        maxWidth: "100%",
      }}
    >
      {selectionType === "hero" && (
        <HeroSelectionList armyList={roster.armyList} selectUnit={selectUnit} />
      )}
      {selectionType === "unit" && (
        <UnitSelectionList
          leadingHeroModelId={
            roster.warbands.find(({ id }) => id === warbandId)?.hero?.model_id
          }
          selectUnit={selectUnit}
        />
      )}
    </Stack>
  );
};
