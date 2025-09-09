import { Unit } from "../../../types/hh3-data.types.ts";

export function handleCrusadeDetachment(unit: Unit, selectedUnits: string[]) {
    return unit.name === "Crusade"
        ? ![
            "High Command",
            "Command",
            "Troops",
            "Transports",
        ].includes(unit.unit_type) ||
        selectedUnits.includes("Primary Detachment")
        : true;
}

export const handleSpecialRestriction =
    (selectedUnits: string[]) => (unit: Unit) => {
        return [handleCrusadeDetachment].every((restriction) =>
            restriction(unit, selectedUnits),
        );
    };
