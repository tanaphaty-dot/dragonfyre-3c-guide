import fs from "fs";

const canvas = fs.readFileSync(
  "C:/Users/filmk/.cursor/projects/d-cisco-dragon-guide/canvases/dragonfyre-build-calculator.canvas.tsx",
  "utf8"
);
const start = canvas.indexOf("const STAGES");
const end = canvas.indexOf("export default function");
if (start < 0 || end < 0) throw new Error("canvas slice failed");
const body = canvas.slice(start, end).trim();
const engineTs = `${body}

globalThis.Guide = {
  STAGES, SCHOOLS, LINES, SHARED_FARMS, STATIONS,
  activeSchool, originText, armorText, armorShort, offhandText,
  curiosText, reforgeText, enchantText, limitText, statRows,
  flagsFor, skillRows, levelCallout, farmsFor,
};
`;
fs.mkdirSync("d:/cisco-dragon-guide/web", { recursive: true });
fs.writeFileSync("d:/cisco-dragon-guide/web/engine.ts", engineTs);

const compact = fs
  .readFileSync("C:/Users/filmk/.cursor/projects/d-cisco-dragon-guide/agent-tools/spells-compact.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .trim()
  .split("\n");
const builder = fs.readFileSync(
  "C:/Users/filmk/.cursor/projects/d-cisco-dragon-guide/agent-tools/build-spell-tables.js",
  "utf8"
);
function grab(name) {
  const token = `const ${name} = `;
  const i = builder.indexOf(token);
  if (i < 0) throw new Error("missing " + name);
  let n = i + token.length;
  if (builder[n] !== "{") throw new Error("brace " + name);
  let depth = 0;
  for (let k = n; k < builder.length; k++) {
    if (builder[k] === "{") depth++;
    else if (builder[k] === "}") {
      depth--;
      if (depth === 0) return builder.slice(n, k + 1);
    }
  }
  throw new Error("unclosed " + name);
}
const role = eval("(" + grab("role") + ")");
const tip = eval("(" + grab("tip") + ")");
const spells = compact.map((line) => {
  const [school, name, level, cd, mana, cast, rarity, effect, desc] = line.split(" || ");
  return { school, name, level, cd, mana, cast, rarity, effect: effect || "", desc: desc || "" };
});
const evasion = spells.find((s) => s.name === "Evasion");
if (evasion) evasion.effect = "1-5 Hits Dodged";
const portal = spells.find((s) => s.name === "Portal");
if (portal) portal.effect = "48 Cast Range 5m-9m Portal Duration";
const tomb = spells.find((s) => s.name === "Ice Tomb");
if (tomb && !tomb.effect) tomb.effect = "1 Healing 5s-12s Duration";
const bless = spells.find((s) => s.name === "Blessing Of Life");
if (bless && !bless.effect) bless.effect = "6-15 Healing";
const heal = spells.find((s) => s.name === "Heal");
if (heal && !heal.effect) heal.effect = "5-12 Healing";
const greater = spells.find((s) => s.name === "Greater Heal");
if (greater && !greater.effect) greater.effect = "Max Healing";
if (!spells.some((s) => s.name === "Root")) {
  spells.push({
    name: "Root",
    school: "Nature",
    level: "1 to 10",
    cd: "35s",
    mana: "45 to 72",
    cast: "Long",
    rarity: "Uncommon to Legendary",
    effect: "5s-14s Effect Length 40 HP",
    desc: "Roots",
  });
}
const out = spells.map((s) => ({
  ...s,
  role: role[s.name],
  tip: tip[s.name],
}));
const missing = out.filter((s) => !s.role || !s.tip);
if (missing.length) throw new Error("missing meta " + missing.map((s) => s.name).join(","));
fs.writeFileSync("d:/cisco-dragon-guide/web/spells.js", "const SPELLS = " + JSON.stringify(out) + ";\n");
console.log("spells", out.length, "engine chars", engineTs.length);
