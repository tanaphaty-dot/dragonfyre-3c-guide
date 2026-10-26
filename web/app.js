const COLORS = {
  blue: "#7ea0c4",
  orange: "#d6a15a",
  green: "#7d9a6a",
  yellow: "#cbb56a",
  purple: "#a78bb8",
  red: "#c46b4a",
};

const SCHOOL_ORDER = ["Fire", "Ice", "Lightning", "Holy", "Ender", "Blood", "Evocation", "Nature", "Eldritch"];
const RARITY_ORDER = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

const state = {
  view: "builds",
  build: localStorage.getItem("df-build") || "melee_crit",
  stage: localStorage.getItem("df-stage") || "early",
  level: localStorage.getItem("df-level") || "",
  school: localStorage.getItem("df-school") || "lightning",
  q: "",
  spellSchool: "all",
  role: "all",
};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function save() {
  localStorage.setItem("df-build", state.build);
  localStorage.setItem("df-stage", state.stage);
  localStorage.setItem("df-level", state.level);
  localStorage.setItem("df-school", state.school);
}

function lineById(id) {
  return Guide.LINES.find((item) => item.id === id) || Guide.LINES[0];
}

function stageById(id) {
  return Guide.STAGES.find((item) => item.id === id) || Guide.STAGES[0];
}

function parsedLevel() {
  if (state.level.trim() === "") return null;
  const n = Number(state.level);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

function pills(items, current, attr) {
  return items.map((item) => {
    const on = item.id === current ? ' aria-pressed="true"' : ' aria-pressed="false"';
    return `<button class="pill" type="button" data-${attr}="${esc(item.id)}"${on}>${esc(item.label)}</button>`;
  }).join("");
}

function table(headers, rows, tones) {
  const head = headers.map((h) => `<th>${esc(h)}</th>`).join("");
  const body = rows.map((row, index) => {
    const tone = tones && tones[index] ? ` class="tone-${esc(tones[index])}"` : "";
    const cells = row.map((cell) => `<td>${esc(cell)}</td>`).join("");
    return `<tr${tone}>${cells}</tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderBuilds() {
  const line = lineById(state.build);
  const stage = stageById(state.stage);
  const school = Guide.activeSchool(line, state.school);
  const showSchool = line.id === "magic" || line.path === "hybrid";
  const level = parsedLevel();
  const note = Guide.levelCallout(level, state.stage);
  const flags = Guide.flagsFor(line, school);
  const burn = line.id === "fire" || school?.id === "fire";
  const skills = Guide.skillRows(state.stage, flags, line.focus, burn);
  const stats = Guide.statRows(line, school);
  const farms = Guide.farmsFor(line, state.stage);
  const bar = line.weights.map((w) => `<i style="width:${w.value}%;background:${COLORS[w.color] || "#a89884"}" title="${esc(w.label)}"></i>`).join("");
  const legend = line.weights.map((w) => `${esc(w.label)} ${w.value}`).join(" · ");
  const compareRows = Guide.LINES.map((item) => {
    const itemSchool = Guide.activeSchool(item, state.school);
    const origin = item.id === "magic" || item.path === "hybrid"
      ? Guide.originText(item, state.stage, itemSchool)
      : item.origin[state.stage];
    return [item.label, origin, item.weaponShort[state.stage], Guide.armorShort(item, state.stage, itemSchool)];
  });
  const schoolBlock = showSchool ? `
    <h2>สำนัก Iron's Spells</h2>
    <div class="pills" data-group="school">${pills(Guide.SCHOOLS, school?.id, "school")}</div>
    <p class="note">สเปลหลักของสำนักนี้ในไกด์คือ ${esc(school.spell)} ชุดเกราะเวทชื่อ ${esc(school.armor)}</p>` : "";

  return `
    <h1>เครื่องคำนวณสาย Dragonfyre 3C</h1>
    <p class="lede">สลับสาย ช่วงเกม XP Level และสำนักเวทได้ทั้งแผง เลขคริต เกราะ และจุดฟาร์มยึดไกด์ในเซฟนี้</p>
    <div class="pills" data-group="build">${pills(Guide.LINES, line.id, "build")}</div>
    <div class="row" style="margin-top:10px">
      <div class="pills" data-group="stage">${pills(Guide.STAGES, state.stage, "stage")}</div>
      <label class="level">XP Level <input id="level" type="number" min="0" inputmode="numeric" placeholder="เช่น 42" value="${esc(state.level)}"></label>
    </div>
    ${schoolBlock}
    <div class="stats">
      <div class="stat"><b>110</b><span>เพดานแต้มสกิลตาม FAQ</span></div>
      <div class="stat"><b>5% / 150%</b><span>คริตฐาน แชนซ์ / ดาเมจ</span></div>
      <div class="stat"><b>≤34</b><span>Protection รวมทั้งชุด</span></div>
      <div class="stat"><b>20</b><span>Luck จุดหวานของลูกเต๋า</span></div>
    </div>
    <div class="callout ${esc(note.tone)}"><strong>${esc(note.title)}</strong><p>${esc(note.body)}</p></div>
    <h2>ทุกสายในช่วง ${esc(stage.label)}</h2>
    <p class="note">${esc(stage.hint)}</p>
    <p>${esc(stage.quest)}</p>
    ${table(["สาย", "Origin", "อาวุธ", "เกราะ"], compareRows)}
    <p class="meta">Origin ของเมจและไฮบริดเปลี่ยนตามสำนักที่เลือกอยู่</p>
    <div class="card">
      <p><span class="k">สาย</span> ${esc(line.label)} · ${esc(line.en)}</p>
      <p><span class="k">Origin</span> ${esc(Guide.originText(line, state.stage, school))}</p>
      <p><span class="k">Divine Blessing</span> ${esc(line.blessing)}</p>
      <p><span class="k">Class</span> ${esc(line.className)}</p>
    </div>
    <div class="callout warning"><strong>ข้อจำกัดของชุดนี้</strong><p>${esc(Guide.limitText(line, school))}</p></div>
    <h2>1. Stat Allocation</h2>
    <p class="note">สัดส่วนคือลำดับความสำคัญของช่วงที่เลือก ไม่ใช่จำนวนแต้มต่อเลเวล แต้มซื้อด้วย XP และราคาแพงขึ้นตามจำนวนที่ซื้อไปแล้ว</p>
    <div class="bar" aria-hidden="true">${bar}</div>
    <p class="legend">${legend}</p>
    ${table(["ลำดับ", "สเตตัส", "เป้าหมายช่วงนี้", "เหตุผล"], stats.map((row, i) => [String(i + 1), row.stat, row.target, row.why]), stats.map((_, i) => (i < 2 ? "success" : "info")))}
    <p class="meta">เปิดต้นไม้ด้วยปุ่ม O แล้วกด Confirm ก่อนออก ไม่งั้นไม่เซฟ คลิกขวาที่โหนดเพื่อปักหมุดทาง</p>
    <h2>2. Skill Tree Path</h2>
    ${table(["ขั้น", "โหนด", "ทำไมช่วงนี้"], skills.map((row) => [row.step, row.node, row.why]), skills.map((row) => row.tone || ""))}
    <h2>3. Best-in-Slot Gear</h2>
    ${table(["ช่อง", "ของช่วงนี้"], [
      ["อาวุธ", line.weapon[state.stage]],
      ["มือรอง", Guide.offhandText(line, state.stage, school)],
      ["เกราะ", Guide.armorText(line, state.stage, school)],
      ["รีฟอร์จ", Guide.reforgeText(line, state.stage)],
      ["Gem", line.gem],
      ["Curios", Guide.curiosText(line, state.stage)],
      ["เอนชานต์", Guide.enchantText(line)],
    ])}
    <p class="meta">ลำดับ gem คือ Cracked, Chipped, Flawed, Gem, Flawless, Perfect อัปที่ Gem Cutting Table ด้วยเม็ดชนิดเดียวกันสองเม็ด</p>
    <h2>4. Farming Spots</h2>
    <p>โครงสร้างสุ่มต่อโลก จึงไม่มีพิกัด X Z คงที่ นอกจากเกาะมังกรที่ X=0 Z=0 ใช้ Explorer's Compass กับ Nature's Compass</p>
    ${table(["ของ", "มิติ / ชั้น / โครงสร้าง", "ดรอปหรือสูตร"], farms.map((farm) => [farm.item, farm.where, farm.drop]))}
    <h3>โต๊ะที่ควรมีใน ${esc(stage.label)}</h3>
    <p>${esc(Guide.STATIONS[state.stage])}</p>`;
}

function renderCraft() {
  const known = [
    ["Iron Ingot", "24 สำหรับเกราะเหล็ก อีก 4 ถ้ายังไม่มี Smithing Table", "ชุดเหล็ก 5 / 8 / 7 / 4 แล้วจึง Adventurer's โต๊ะช่างเหล็กตามไกด์ใช้เหล็ก 4 กับไม้ 4", "ถ้ำใกล้ฐานที่ Y=14 หรือฟาร์มเหล็ก Easy Villagers ตั้งแต่มีชาวบ้าน"],
    ["Gold Ingot", "16 สำหรับ Adventurer's อย่างต่ำ ต้องเผื่ออีกกองให้ Raw Brightsteel", "ทอง 4 แท่งต่อชิ้นเกราะ ทั้ง 4 ชิ้น", "แร่ทองหนาที่สุดที่ Y=-18 ใต้ฐาน ถ้า Badlands อยู่ใกล้จุดเกิดให้ขุดที่นั่นแทน"],
    ["Glowstone Dust", "เปิด JEI", "Raw Brightsteel", "ก้อนใต้เพดานเนเธอร์ 2 ถึง 4 ผงต่อบล็อก หีบป้อมเป็นของแถมระหว่างทาง"],
    ["Nether Quartz", "เปิด JEI", "Raw Brightsteel และของเควสต์", "หนาที่สุดที่ Y=114 คนละทริปกับเศษโบราณ"],
    ["Brightsteel Alloy", "24 สำหรับเกราะ 4 ชิ้น หมวก 5 เสื้อ 8 กางเกง 7 รองเท้า 4", "Brightsteel Armor แล้วต้องเหลือไว้ทำ Darksteel", "คราฟต์ Raw Brightsteel แล้วถลุง"],
    ["Netherite Ingot", "เปิด JEI ต่อชิ้นที่อัป", "รวมกับ alloy เป็น Darksteel แล้วอัปเกราะทีละชิ้น", "ขุดเศษโบราณแถบ Y=14 ใกล้พอร์ทัลก่อน ร้านขายแท่งละ 20 Champion Coins"],
  ];
  const steps = [
    ["1", "โต๊ะคราฟต์วานิลลากับเตา โบนัสโหนดคราฟต์ติดเฉพาะโต๊ะนี้", "คราฟต์ในฐานได้"],
    ["2", "ขุดเหล็ก 24 แท่ง คราฟต์หมวก เสื้อ กางเกง รองเท้า", "ใส่ชุดเหล็กครบ"],
    ["3", "เอาทอง 4 แท่งอัปเกราะเหล็กทีละชิ้นเป็น Adventurer's", "ครบ 4 ชิ้น ได้ Bravery ลดดาเมจ 10% และผ่านเงื่อนไขเควสต์ชุดนี้"],
    ["4", "ทำ Smithing Table ด้วยเหล็ก 4 กับไม้ 4 ตามสูตรในไกด์", "มีโต๊ะก่อนได้แท่งเนเธอไรต์แท่งแรก"],
    ["5", "เข้าเนเธอร์ใกล้พอร์ทัล ทริปบนเก็บควอตซ์ที่ Y=114 กับ Glowstone ที่เพดาน", "มีผงเรืองแสงและควอตซ์พอตาม JEI"],
    ["6", "คราฟต์ Raw Brightsteel จากผงเรืองแสง ทอง เหล็ก ควอตซ์ แล้วถลุงเป็น Alloy", "มี Alloy มากกว่า 24 เพราะ 24 ชิ้นแรกหมดไปกับเกราะ"],
    ["7", "คราฟต์ Brightsteel Armor หมวก 5 เสื้อ 8 กางเกง 7 รองเท้า 4", "ใส่ครบ ได้ Aegis เมื่อเลือดเกิน 80% และกันกระเด็น 15% ต่อชิ้น"],
    ["8", "ทริปล่าง หา Netherite ที่ Y=5 ถึง 21 หนาที่สุดราว Y=14", "มีแท่งพออัป 4 ชิ้นตามจำนวนใน JEI"],
    ["9", "รวม Alloy กับ Netherite เป็น Darksteel ใน Smithing Table หรือโต๊ะคราฟต์ แล้วอัปเกราะ Brightsteel ทีละชิ้น", "Darksteel ครบ 4 ชิ้น Impervium พร้อมใช้"],
  ];
  return `
    <h1>Early → Mid: Adventurer's, Brightsteel, Darksteel</h1>
    <p class="lede">ลำดับคราฟต์ชุดกันตายชุดแรก ตั้งแต่ใกล้จุดเกิดจนอัป Brightsteel ทั้งชุดด้วย Darksteel</p>
    <div class="stats">
      <div class="stat"><b>24</b><span>แท่งเหล็ก สำหรับชุดเหล็ก</span></div>
      <div class="stat"><b>16</b><span>แท่งทอง สำหรับ Adventurer's</span></div>
      <div class="stat"><b>24</b><span>Brightsteel Alloy สำหรับเกราะ 4 ชิ้น</span></div>
    </div>
    <div class="callout warning"><strong>ตัวเลขที่ไฟล์ไม่ได้ลง</strong><p>Raw Brightsteel ใช้ผงเรืองแสง ทอง เหล็ก และควอตซ์ แต่ไม่มีจำนวนต่อครั้ง Darksteel คือ Brightsteel Alloy รวม Netherite ใน Smithing Table หรือคราฟต์ตรงในโต๊ะคราฟต์ แล้วเอาไปอัปเกราะ Brightsteel ทีละชิ้น จำนวนแท่งต่อชิ้นอยู่ใน JEI อย่านับแค่ 24 alloy แล้วหยุดขุด เพราะชุด Darksteel ต้องใช้ alloy เพิ่มอีกกอง</p></div>
    <h2>1. วัตถุดิบที่นับได้</h2>
    ${table(["ของ", "จำนวนที่รู้", "ใช้กับ", "ที่มาเร็วที่สุด"], known)}
    <h2>2. ลำดับประกอบ</h2>
    ${table(["ขั้น", "ทำอะไร", "จบเมื่อ"], steps)}
    <p class="note">Impervium: ถ้าดาเมจเกินเลือดสูงสุด จะรอดที่ 10 HP และอมตะ 3 วินาที ใช้ได้ทุก 5 นาที เซ็ตยังให้ Resilience ซึ่งเป็นผล Resistance ขั้นนี้พอสำหรับเควสต์ Strength in Darkness</p>
    <h2>3. จุดฟาร์มที่สั้นที่สุด</h2>
    <h3>Overworld ทริปเดียวจบชุดเหล็กกับทอง</h3>
    ${table(["ของ", "จุด", "เหตุผลที่สั้นกว่าทางอื่น"], [
      ["เหล็ก", "หนาที่สุด Y=14 เกิดช่วง Y=-64 ถึง 72 และ Y=80 ถึง 320 ทุกไบโอม ใกล้จุดเกิด", "Easy Villagers เร็วกว่าในระยะยาวเมื่อมีชาวบ้านแล้ว แต่ชุดแรก 24 แท่งขุดที่ Y=14 ใต้ฐานจบได้โดยไม่เดินไกล L2 Hostility สเกลตามระยะจากจุดเกิด"],
      ["ทอง", "หนาที่สุด Y=-18 ช่วง Y=-64 ถึง 32 Badlands หนากว่าและมีถึง Y=256", "16 แท่งของ Adventurer's มาจากแร่โลกเร็วกว่าทองเนเธอร์ ทองเนเธอร์ดรอปเป็นก้อน 2 ถึง 6 ต่อบล็อก ต้องรวมเป็นแท่งอีกที จึงเป็นทองสำรองของสูตร Brightsteel"],
    ])}
    <h3>Nether สองชั้น อย่าขุดปนกัน</h3>
    ${table(["ทริป", "ชั้น", "ของที่ได้", "ทางที่เร็วรองลงไป"], [
      ["บน", "ควอตซ์หนาที่สุด Y=114 Glowstone อยู่ที่เพดาน ไม่มีเลขชั้นแบบแร่", "ผงเรืองแสง 2 ถึง 4 ต่อบล็อก ควอตซ์ 1 ต่อบล็อก แวะป้อมได้ Nether Eye กับหีบผงเรืองแสง", "ฟาร์มเนเธอร์แร็คด้วย Boon of the Earth ให้ควอตซ์เป็นผลพลอยได้ แต่เป็นวิธีหลังมีเอนชานต์นั้นแล้ว"],
      ["ล่าง", "เศษโบราณ Y=5 ถึง 21 หนาที่สุดราว Y=14 Ultimine ปุ่ม \` ได้ไม่เกิน 64 บล็อก", "Ancient Debris หลอมเป็นเศษเนเธอไรต์ แล้วคราฟต์เป็นแท่ง", "Ancient Knight ทิ้ง scrap 25% และ Looting เพิ่ม ทุบกองเกราะด้วยจอบเพชรที่ Ancient Battleground หรือดาดฟ้าหอ Pyromancer ร้านเควสต์ขายแท่งละ 20 Champion Coins"],
    ])}
    <p class="meta">มอนสเตอร์เนเธอร์สูงกว่า Overworld ประมาณ 25 เลเวล ให้เริ่มวงใกล้พอร์ทัล ชั้นแร่เป็นช่วงเกิดของ Java 1.18 ถึง 1.20.1</p>
    <div class="callout info"><strong>แท่งเนเธอไรต์แท่งแรกไปที่ไหน</strong><p>ยังไม่มี Arcane Sands 2 ชิ้น ให้ใส่แท่งที่มีเข้า Darksteel เพราะ Reforging Table ตัวเต็มต้องใช้ Netherite 1 กับ Arcane Sands 2 พร้อมกัน ทรายสีม่วงมาจากฟาร์ม Drygmy ที่ตั้งในเนเธอร์ราว 16% ซึ่งยังไม่ใช่ทางของชุดแรก หลัง Darksteel ครบ ค่อยแยกสาขา Netherite Armor รวม Darksteel เป็น Fell King ถ้าจะวิ่งเข้า Sylvi's</p></div>
    <div class="callout warning"><strong>ก่อนเข้าเนเธอร์</strong><p>ใส่ Adventurer's ครบก่อนออกจากพอร์ทัล Paladin เดินในเนเธอร์ช้าลงหนัก Pyriosi อ่อนแรงเมื่อไม่มีแดด และไบโอมหนาวมากของเผ่านี้ไม่เกี่ยวกับเนเธอร์ แต่เพดานมืดยังทำให้ Solar Eclipse ทำงาน Frijani หิวเร็วและถือโล่ไม่ได้ ให้พกอาหารที่ปรุงแล้วกองใหญ่ เผ่าที่โดนน้ำแล้วเจ็บอย่าใช้ลิฟต์น้ำ</p></div>`;
}

function startRarity(spell) {
  const match = String(spell.rarity).match(/^(Common|Uncommon|Rare|Epic|Legendary)/);
  const index = match ? RARITY_ORDER.indexOf(match[1]) : 9;
  return index < 0 ? 9 : index;
}

function damageKey(effect) {
  const text = String(effect || "");
  const flat = text.match(/(\d+(?:\.\d+)?)(?:\s*-\s*\d+(?:\.\d+)?)?\s+(?:Impact\s+)?Damage/i);
  if (flat && !/%/.test(flat[0])) return [1, parseFloat(flat[1])];
  if (/%/.test(text)) return [2, parseFloat(text) || 0];
  return [0, 0];
}

function orderedSpells() {
  const q = state.q.trim().toLowerCase();
  return SPELLS.filter((spell) => {
    if (state.spellSchool !== "all" && spell.school !== state.spellSchool) return false;
    if (state.role !== "all" && spell.role !== state.role) return false;
    if (!q) return true;
    return [spell.name, spell.school, spell.effect, spell.tip, spell.role].join(" ").toLowerCase().includes(q);
  }).sort((a, b) => {
    const school = SCHOOL_ORDER.indexOf(a.school) - SCHOOL_ORDER.indexOf(b.school);
    if (school) return school;
    const rarity = startRarity(a) - startRarity(b);
    if (rarity) return rarity;
    const da = damageKey(a.effect);
    const db = damageKey(b.effect);
    if (da[0] !== db[0]) return da[0] - db[0];
    return da[1] - db[1] || a.name.localeCompare(b.name);
  });
}

function renderSpells() {
  const rows = orderedSpells();
  const schools = ["all", ...SCHOOL_ORDER].map((id) => {
    const label = id === "all" ? "ทุกสำนัก" : id;
    const on = state.spellSchool === id ? ' aria-pressed="true"' : ' aria-pressed="false"';
    return `<button class="pill" type="button" data-spell-school="${esc(id)}"${on}>${esc(label)}</button>`;
  }).join("");
  const roles = ["all", "Main DPS", "CC", "Buff/Heal"].map((id) => {
    const label = id === "all" ? "ทุกบทบาท" : id;
    const on = state.role === id ? ' aria-pressed="true"' : ' aria-pressed="false"';
    return `<button class="pill" type="button" data-role="${esc(id)}"${on}>${esc(label)}</button>`;
  }).join("");
  let body = `<div class="empty">ไม่พบเวทที่ตรงกับคำค้น</div>`;
  if (rows.length) {
    let last = "";
    const grouped = rows.map((spell) => {
      const cost = `${spell.mana} · ${spell.cd} · ${spell.cast}`;
      const cells = [spell.name, spell.school, spell.rarity, spell.effect || "—", cost, spell.role, spell.tip]
        .map((cell) => `<td>${esc(cell)}</td>`).join("");
      let head = "";
      if (state.spellSchool === "all" && spell.school !== last) {
        last = spell.school;
        head = `<tr class="tone-info"><td colspan="7"><strong>${esc(spell.school)}</strong></td></tr>`;
      }
      return head + `<tr>${cells}</tr>`;
    }).join("");
    body = `<div class="table-wrap"><table><thead><tr>
      <th>ชื่อ</th><th>สำนัก</th><th>ชั้น</th><th>ผล</th><th>มานา / คูลดาวน์</th><th>บทบาท</th><th>ใช้ยังไง</th>
    </tr></thead><tbody>${grouped}</tbody></table></div>`;
  }
  return `
    <h1>สมุดเวท Iron's Spells</h1>
    <p class="lede">110 เวท จัดตามสำนัก แล้วตามความหายากตอนเริ่มเรียน จากเบาไปหนัก เวทที่ไม่มีดาเมจตรงมาก่อน เวทสเกลเป็นเปอร์เซ็นต์อยู่ท้ายชั้น</p>
    <p class="meta">ชุดเกราะของสำนักในรุ่น 3.16.3 ให้พลังเวทของสำนัก +40% และ Upgrade Orb เพิ่มอีก 5% ต่อลูก ตาม Minecraft Guides ไม่ใช่ตัวเลขในวิกิ Cisco สำนัก Eldritch ไม่มีชุดเกราะและต้องเรียนจาก Eldritch Manuscript ตัวโฟกัสคือ Echo Shard</p>
    <div class="filters">
      <input id="spell-q" type="search" placeholder="ค้นชื่อเวท ผล หรือคำอธิบาย" value="${esc(state.q)}">
      <div class="pills">${schools}</div>
      <div class="pills">${roles}</div>
      <p class="count">แสดง ${rows.length} จาก ${SPELLS.length}</p>
    </div>
    ${body}`;
}

function render() {
  const root = document.getElementById("app");
  const view = location.hash.replace("#", "") || "builds";
  state.view = ["builds", "craft", "spells"].includes(view) ? view : "builds";
  document.querySelectorAll(".nav a").forEach((link) => {
    const on = link.dataset.view === state.view;
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (state.view === "craft") root.innerHTML = renderCraft();
  else if (state.view === "spells") root.innerHTML = renderSpells();
  else root.innerHTML = renderBuilds();
  const marked = root.querySelector("tbody");
  if (state.view === "builds" && marked) {
    const line = lineById(state.build);
    marked.querySelectorAll("tr").forEach((row) => {
      if (row.children[0] && row.children[0].textContent === line.label) row.classList.add("is-active");
    });
  }
}

document.getElementById("app").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.build) state.build = button.dataset.build;
  if (button.dataset.stage) state.stage = button.dataset.stage;
  if (button.dataset.school) state.school = button.dataset.school;
  if (button.dataset.spellSchool) state.spellSchool = button.dataset.spellSchool;
  if (button.dataset.role) state.role = button.dataset.role;
  save();
  const focusId = document.activeElement && document.activeElement.id;
  render();
  if (focusId) {
    const next = document.getElementById(focusId);
    if (next) next.focus();
  }
});

document.getElementById("app").addEventListener("input", (event) => {
  if (event.target.id === "level") {
    state.level = event.target.value;
    save();
    render();
    const input = document.getElementById("level");
    if (input) {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  }
  if (event.target.id === "spell-q") {
    state.q = event.target.value;
    render();
    const input = document.getElementById("spell-q");
    if (input) {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  }
});

window.addEventListener("hashchange", render);
render();
