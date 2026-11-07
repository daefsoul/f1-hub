import colors from "../data/teamColors.json";

export const teamColor = (id) => colors[id] || "#888888";
