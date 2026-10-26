const STAGES: { id: StageId; label: string; hint: string; quest: string }[] = [
  {
    id: "early",
    label: "Early-Game",
    hint: "ใกล้จุดเกิด จนชุด Adventurer's อยู่ตัว",
    quest: "เดิน The Champion's Trials แล้วเคลมรางวัลก่อนออกไกล ได้ Wisdom Scroll ไว้ซื้อแต้มตอน XP แพง",
  },
  {
    id: "mid",
    label: "Mid-Game",
    hint: "Nether, Brightsteel ถึง Darksteel หรือ Fell King",
    quest: "เควสต์ช่วงนี้ขอควอตซ์ แท่งเบลซ ผงเรืองแสง และหัวกะโหลกวิทเธอร์ มอนสเตอร์เนเธอร์สูงกว่า Overworld ประมาณ 25 เลเวล",
  },
  {
    id: "late",
    label: "Late-Game",
    hint: "ก่อนมังกร Aether, Twilight Forest, Sylvi's หรือชุดธาตุ",
    quest: "Traveller's Journey ให้ gem ระดับ Perfect หน้า Progression ให้ฆ่า Wither ก่อนสู้มังกร",
  },
  {
    id: "end",
    label: "End-Game",
    hint: "หลังมังกร Cisco's, Fallen Hero, Sovereign หรือชุดธาตุที่ยิงครบ",
    quest: "Cisco's Fate กับ Divine Equipment สู้ Cisco ด้วย Talisman of Challenge ปิดไฟต์ด้วยอาวุธนอกตระกูล Equilibrium เพราะฆ่าบอสไม่นับคิล",
  },
];

const SCHOOLS: School[] = [
  {
    id: "lightning",
    label: "สายฟ้า Lightning",
    armor: "Electromancer",
    power: "Lightning Spell Power",
    spell: "Thunderstorm",
  },
  {
    id: "ender",
    label: "Ender",
    armor: "Shadow-Walker",
    power: "Ender Spell Power",
    spell: "Echoing Strikes",
  },
  {
    id: "fire",
    label: "ไฟ Fire",
    armor: "Pyromancer",
    power: "Fire Spell Power",
    spell: "เวทไฟของ Iron's Spells",
  },
  {
    id: "holy",
    label: "ศักดิ์สิทธิ์ Holy",
    armor: "Priest",
    power: "Holy Spell Power",
    spell: "Guiding Bolt",
  },
  {
    id: "ice",
    label: "น้ำแข็ง Ice",
    armor: "Cryomancer",
    power: "Ice Spell Power",
    spell: "เวทน้ำแข็งของ Iron's Spells",
  },
  {
    id: "blood",
    label: "เลือด Blood",
    armor: "Cultist",
    power: "Blood Spell Power",
    spell: "สำนักเลือด",
  },
  {
    id: "evocation",
    label: "Evocation",
    armor: "Archevoker",
    power: "Evocation Spell Power",
    spell: "สำนัก Evocation",
  },
  {
    id: "nature",
    label: "ธรรมชาติ Nature",
    armor: "Plagued",
    power: "Nature Spell Power",
    spell: "สำนักธรรมชาติ",
  },
];

function byStage(early: string, mid: string, late: string, end: string): ByStage {
  return { early, mid, late, end };
}

const ARMOR_MELEE = byStage(
  "Adventurer's ทั้งชุด คราฟต์จากชุดเหล็กกับทอง 4 แท่งต่อชิ้น ใส่ครบได้ผล Bravery ลดดาเมจ 10%",
  "Brightsteel ทั้งชุด แล้วอัปเป็น Darksteel. Impervium: ถ้าดาเมจเกินเลือดสูงสุด จะรอดที่ 10 HP และอมตะ 3 วินาที ทุก 5 นาที. ถ้าจะวิ่งเข้า Sylvi's ให้ทำ Netherite Armor รวม Darksteel เป็น Fell King",
  "Sylvi's ทั้งชุด จาก Fell King + Frigidium. โบนัสบนชุดคือ Attack เท่ากับ 3% ของพลังชีวิต ตามคำอธิบายชุด ไม่ใช่ 7% ในหน้า Best Equipment รุ่นเก่า",
  "Sovereign Ascendant รีฟอร์จ Esoteric คือชุดที่หน้าเปรียบเทียบ Ancient กับ Esoteric ระบุว่าดีที่สุด. ฐานคือ Fallen Hero จาก Cisco's. สามสีแยกที่ Brilliant Diamond, Divine Ruby และ Nocturnal Amethyst",
);

const ARMOR_SHORT = byStage("Adventurer's", "Darksteel", "Sylvi's", "Sovereign Ascendant");

const OFF_EMPTY = byStage(
  "ว่าง Frijani ใช้โล่ไม่ได้",
  "ว่าง หรืออาวุธสำรอง ห้ามเป็นโล่",
  "ว่าง ห้ามเป็นโล่",
  "Frostfang เป็นมือเดียว แต่เผ่านี้ยังถือโล่ไม่ได้",
);

const CURIOS: ByStage = byStage(
  "Leather Belt ของ Relics เมื่อหาได้ เป็นเข็มขัดที่ Load Capacity สูงและเปิดช่อง talisman ได้มากเมื่ออัปความสามารถ",
  "รีฟอร์จถุงมือ แหวน จี้ และผ้าคลุมจาก Aether. คอใส่ Assassin's Necklace ได้คริต +5% ทั้งแชนซ์และดาเมจ",
  "หัวใช้ Emperor's Crown เกราะ +6 หรือ Alchemist's Crown ที่เปิดวงโพชันด้วยปุ่ม G. ปีกจาก Icarus รับสเตตัสรีฟอร์จ ส่วน Elytra ที่ใส่ได้ทั้งช่องเกราะและช่อง curio จะไม่ให้สเตตัสในช่อง curio. Slicer's Dice ใช้กับ Luck ประมาณ 20. Gem of Invincibility กับ Iron Bubble มาจาก Aether",
  "ถ้าอาวุธคือ Frostfang ให้ใช้ Ace of Iron แทน Caged Heart เพราะ Caged Heart ตัดดาเมจที่เกิน 25% ของเลือดสูงสุด. Critical Quiver เพิ่มคริตของ Passive Skill Tree +5%. หน้า Max Curios นับได้ราว 41 ช่องเมื่อบวกแหวน charm talisman และของ Aether",
);

const REFORGE: ByStage = byStage(
  "Simple Reforging Table ได้ถึงชั้น Rare ใช้ Luminous Crystal Shard. ช่องซ้ายใส่ของ ฝุ่นอัญมณี และวัตถุดิบ ช่องขวาขึ้นสามตัวเลือกพร้อมราคาเลเวล",
  "อัปเป็น Reforging Table ด้วย Netherite 1 และ Arcane Sands 2 จึงรีฟอร์จ Epic กับ Mythic ได้ รีฟอร์จทั่วไปให้โบนัสได้ถึง 4 บรรทัด เอฟเฟกต์ 3 และช่อง gem 3",
  "ดาบและคทาใช้ Ancient จาก Manifestation of Infinity เพื่อคริตคู่ Spell Power. ธนูเก็บ Galactic Core ไว้ทำ Esoteric แต่ยังไม่รีฟอร์จของที่จะไปติดคำสาป L2 Hostility",
  "ธนู โล่ที่ต้องการเลือดก้อนโต และชุด Sovereign ใช้ Esoteric. คริตจาก Esoteric, Artifact และ Heirloom คูณแบบทวี คนละชนิดกับบัฟคริตทั่วไป",
);

const ENCHANT =
  "Protection รวมทั้งชุดไม่เกิน 34 ระดับ คือลดดาเมจ 85%. เอนชานต์ธาตุใส่คู่ Protection ได้ ยกเว้น Magic Protection ที่ชนกับ Protection ทุกเลเวล. Mending กับ Unbreaking บนของที่ใช้จริง. ยัดผลบนอาวุธที่ไม่ชนกันเพื่อโหนด Excalibur. โล่ใส่ Unbreaking กับ Immortal. ทั่ง Apotheosis ที่วางบนพื้นไม่ขึ้น Too Expensive";

const CRIT_GEM =
  "อาวุธใส่ Samurai หนึ่งเม็ดจนกว่า Crit Chance จะชนเพดาน แล้วที่เหลือเป็น Warlord. หมวกกับเสื้อลง Warlord. กางเกงและรองเท้าลง Hearty กางเกงผสม Combatant ได้. เลี่ยง gem Armor และ Attack Damage แบบเลขตรง. ฝังที่ Smithing Table เมื่อของขึ้นข้อความ Socketed. Sigil of Socketing กับ Superior Sigil เติมช่อง ถอดด้วย Sigil of Withdrawal. เพดานช่องใน FAQ คือ 5 แต่หน้า Crit Build ของธนูเขียน 8 ให้ยึดข้อความ Socketed ในเกม. โหนด +1 Socket ที่ไม่มีโบนัสอื่นใช้ไม่ได้";

const MAGE_GEM =
  "Spell Power ของธาตุลงหมวกก่อน แล้วกางเกงหรือรองเท้า เสื้อเป็นช่องสุดท้าย. กางเกงสายเวทใช้ Brawler เพื่อเลือด. รองเท้าตาม TheZemor ใช้ Gem of the Ur-Ghast. อาวุธใส่ Samurai หนึ่งเม็ดแล้วที่เหลือเป็น Warlord. คทาและดาบรีฟอร์จ Ancient ธนูรีฟอร์จ Esoteric";

const WEIGHT_CRIT: Weight[] = [
  { id: "chance", label: "Crit Chance", value: 34, color: "blue" },
  { id: "damage", label: "Crit Damage", value: 34, color: "orange" },
  { id: "hp", label: "Max Health", value: 20, color: "green" },
  { id: "luck", label: "Luck ประมาณ 20", value: 12, color: "yellow" },
];

const WEIGHT_MAGE: Weight[] = [
  { id: "chance", label: "Crit Chance", value: 28, color: "blue" },
  { id: "damage", label: "Crit Damage", value: 20, color: "orange" },
  { id: "spell", label: "Spell Power", value: 32, color: "purple" },
  { id: "pool", label: "เลือด มานา CDR", value: 20, color: "green" },
];

const WEIGHT_BOW: Weight[] = [
  { id: "chance", label: "Crit Chance", value: 30, color: "blue" },
  { id: "damage", label: "Crit Damage", value: 32, color: "orange" },
  { id: "hp", label: "Max Health", value: 26, color: "green" },
  { id: "skip", label: "ไม่ลง Arrow Damage", value: 12, color: "yellow" },
];

const SHARED_FARMS: Record<StageId, Farm[]> = {
  early: [
    {
      item: "เหล็ก สำหรับชุดเหล็กก่อน Adventurer's",
      where: "Overworld หนาที่สุดที่ Y=14 เกิดช่วง Y=-64 ถึง 72 และ Y=80 ถึง 320 ทุกไบโอม จุดที่วิกิยกคือ Crawl Dungeon ชื่อบนเข็มทิศคือ Dungeon",
      drop: "เหล็กดิบต่อบล็อก ฟาร์มเหล็กของ Easy Villagers ใช้ได้ตั้งแต่มีชาวบ้านและไม่ต้องลงลึก",
    },
    {
      item: "ทอง สำหรับ Adventurer's",
      where: "หนาที่สุดที่ Y=-18 เกิดช่วง Y=-64 ถึง 32 Badlands มีเพิ่มถึง Y=256",
      drop: "ทองดิบ Adventurer's ใช้ทอง 4 แท่งต่อชิ้นเกราะ",
    },
    {
      item: "ลาพิส สำหรับโต๊ะเอนชานต์",
      where: "หนาที่สุดที่ Y=-2 เกิดช่วง Y=-64 ถึง 64 แร่ต่ำกว่า Y=8 เป็นหินลึก",
      drop: "ลาพิส 4 ถึง 9 ต่อบล็อก ร่ายแต่ละครั้งใช้ 1 ถึง 3 อินฟิวชันใช้ 3 ก้อน",
    },
    {
      item: "เพชร",
      where: "หนาที่สุดที่ Y=-59 เกิดช่วง Y=-64 ถึง 15 แพ็กอยู่บน 1.20.1 จึงยังไม่ได้รับจำนวนที่ Java เพิ่มใน 1.20.2",
      drop: "เพชร 1 ต่อบล็อก มอนสเตอร์บัฟและฟาร์ม Boon of the Earth ให้เพชรทีหลัง",
    },
    {
      item: "ของ affixed, ฝุ่นอัญมณี, gem ต้นทาง",
      where: "มอนสเตอร์ที่มีชื่อประกาศและลำแสงสีระหว่างสำรวจใกล้จุดเกิด อย่าออกห่างเพราะ L2 Hostility สเกลตามระยะและความคืบหน้า",
      drop: "มอนสเตอร์ทั่วไปดรอป gem 4.5% ของ affixed ย่อยที่ Salvaging Table ได้วัตถุดิบสีเดียวกัน 1 ถึง 4 ชิ้น ย่อย gem ได้ฝุ่น",
    },
    {
      item: "ตา End ใน Overworld",
      where: "Old Eye ที่โครงสร้างทะเลทรายและพีระมิดมหาสมุทร Cold Eye ที่พีระมิดน้ำแข็งกับอิกลู Rogue Eye ที่วิหารป่า Black Eye ในหีบ Buried Treasure Lost Eye ในหีบดันเจียน Corrupted Eye ในหีบป้อมพิลลาเจอร์",
      drop: "Magical Eye จาก Evoker 5% ไม่สน Looting Witch Pupil จากแม่มด 10% แล้วคราฟต์เป็น Witch Eye กับ Eye of Ender เก็บใส่หีบ ยังไม่ต้องครบ 12 ดวง",
    },
  ],
  mid: [
    {
      item: "Ancient Debris และ Netherite",
      where: "เนเธอร์ทุกไบโอม ขุดช่วง Y=5 ถึง 21 หนาที่สุดราว Y=14 Ultimine ปุ่มเริ่มต้น ` ทุบได้ไม่เกิน 64 บล็อก สำรวจใกล้พอร์ทัลก่อน",
      drop: "เศษโบราณหลอมเป็นเศษเนเธอไรต์ ร้านเควสต์ขายแท่งละ 20 Champion Coins หีบบาสชันและเป้พิกลินเป็นทางสำรอง",
    },
    {
      item: "Nether Quartz, ทองเนเธอร์, Glowstone สำหรับ Brightsteel",
      where: "ควอตซ์หนาที่สุดที่ Y=114 ทองเนเธอร์พบบ่อยถึง Y=95 Glowstone เป็นก้อนใต้เพดานเนเธอร์และในหีบป้อม ไม่มีเลขชั้นแบบแร่",
      drop: "ควอตซ์ 1 ต่อบล็อก ทองเนเธอร์ 2 ถึง 6 ก้อนต่อบล็อก Glowstone 2 ถึง 4 เมื่อขุด Raw Brightsteel คราฟต์จากผงเรืองแสง ทอง เหล็ก และควอตซ์ แล้วถลุงเป็น Brightsteel Alloy ชุดใช้ alloy 5, 8, 7 และ 4 ชิ้นตามหมวก เสื้อ กางเกง รองเท้า",
    },
    {
      item: "Ancient Knight",
      where: "Ancient Battleground ในเนเธอร์ กองเกราะบนพื้นทุบด้วยจอบเพชรแล้วอัศวินเกิด อีกจุดอยู่บนดาดฟ้าหอ Pyromancer ใน Overworld",
      drop: "เศษเนเธอไรต์ 25% เพิ่มด้วย Looting ถือ Decrepit Flamberge และใส่เกราะเนเธอไรต์ จับด้วย Capturing หรือใส่โหล Drygmy ได้",
    },
    {
      item: "Nether Eye และ Cursed Eye",
      where: "Nether Eye ในหีบป้อมปราการเนเธอร์ Cursed Eye ในหีบ Bastion Remnant",
      drop: "Cursed Eye โอกาส 50% ต่อหีบตามหน้าตา End หีบเดียวกันมีโอกาสเป็นเนเธอไรต์",
    },
    {
      item: "วัตถุดิบรีฟอร์จสีม่วงจากมิติ",
      where: "ฟาร์ม Drygmy ให้สีตามมิติที่ฟาร์มตั้งอยู่ ไม่ใช่ตามบ้านเกิดของมอนสเตอร์ ตั้งในเนเธอร์หรือ Twilight Forest เพื่อไปให้ถึงสีม่วง",
      drop: "เนเธอร์: ผ้า 57.5% ผลึก 26.5% Arcane Sands 16% Overworld ได้แค่ถึงสีฟ้า ที่ 46.5% เศษเหล็ก 36% ผ้า 17.5% ผลึก",
    },
    {
      item: "สปอว์นเนอร์และซิลเวอร์ฟิชสำหรับ gem",
      where: "ดันเจียนห้องมอนสเตอร์ยกทั้งก้อนด้วย Silk Touch หรือ glyph Extract ของ Ars Nouveau ซิลเวอร์ฟิชชัวร์ที่สตรองโฮลด์ ใช้ Explorer's Compass",
      drop: "ซิลเวอร์ฟิชไม่มีของประจำตัว จึงเหลือ gem เป็นหลัก 4.5% ตัวที่หน่วงสูงสุดราว 120 คือสปอว์นเนอร์ตั้งต้นที่คุ้ม ตัวราว 800 คือของธรรมดา",
    },
  ],
  late: [
    {
      item: "Dreadsteel, Glacial Core, Ember Core, Dark Core",
      where: "Dreadsteel Ingot ในร้านเควสต์ราคา 500 Champion Coins ในไฟล์ 3C ลดจาก 1000 แกนน้ำแข็งและไฟกับ Dark Core เปิดสูตรใน JEI ของเซฟ",
      drop: "Frigidium ใช้ Dreadsteel 2, Glacial Core, Dark Core และ Darksteel แล้วอัป Fell King เป็น Sylvi's Demonium สลับ Ember Core แล้วได้ Bjorn's",
    },
    {
      item: "Curios และ accessory ของ Aether",
      where: "ดันเจียนบรอนซ์และเงินใน Aether ถุงมือ แหวน จี้ และผ้าคลุมขนสัตว์คราฟต์ได้ก่อนเข้าดันเจียน",
      drop: "โล่กับ accessory จากดันเจียน Gem of Invincibility กับ Iron Bubble เป็นชิ้นที่ TheZemor ยกให้ ของพวกนี้รีฟอร์จและฝัง gem ได้",
    },
    {
      item: "gem ระดับ Perfect และ gem เฉพาะมิติ",
      where: "เควสต์ Traveller's Journey เคลียร์ดันเจียนกับบอสของ Aether และ Twilight Forest Overworld ได้ Earth เนเธอร์ได้ Ravenous, Blood Lord, Incandescent, Inferno Twilight ได้ Twilight Forest, Frozen Queen, Wildheart Aether ได้ Aether, Zanite Alchemist, Umbral Matrimony",
      drop: "ร้านขาย gem ระดับ Flawed แบบสุ่มจาก 10 ชนิด และขาย Abyssal กับ Dark One ระดับ Perfect ได้ Radiant Sunshard ใช้ซื้อ Perfect ตามรายการในร้าน มอนสเตอร์ End ดรอปอย่างต่ำระดับ Flawed",
    },
    {
      item: "Warden Tendril และ Sculk สำหรับชั้นหนังสือ",
      where: "Ancient City ปูพื้นเสมอที่ Y=-51 ในไบโอม Deep Dark มักอยู่ใต้ภูเขา เมืองกว้างราว 220 บล็อก",
      drop: "Warden Tendril กับ Sculk Catalyst คราฟต์ Soul-Touched Sculkshelf จับวอร์เดนใส่โหล Drygmy ได้ของชุดนี้โดยไม่ต้องสู้ซ้ำ",
    },
    {
      item: "Guardian Eye และปริสมารีน",
      where: "Ocean Monument ในมหาสมุทรลึก ผู้พิทักษ์อาวุโสสามตัว",
      drop: "Guardian Eye 30% ต่อตัว ไม่สน Looting สเปล Projectile Break กับ Item Pickup ของ Ars เก็บปริสมารีนได้โดยไม่ติด Mining Fatigue Crystalline Seashelf ใช้ผลึก 3 ต่อชั้น",
    },
    {
      item: "Wither Eye",
      where: "อัญเชิญ Wither หน้า Progression ให้ฆ่าก่อนมังกร",
      drop: "90% และทอยสองครั้ง ไม่สน Looting Drygmy ที่จับ Wither ได้ตานี้แต่ไม่ได้ Nether Star",
    },
  ],
  end: [
    {
      item: "ลมหายใจมังกรและหัวมังกร",
      where: "เข้า End แล้วเกิดที่เกาะรอบนอก เกาะมังกรอยู่ที่ X=0 Z=0 คริสตัลถูกกรงเหล็กปิด มังกรมีเลือดมากกว่าวานิลลา",
      drop: "พกขวดไปเก็บลมหายใจเพื่ออินฟิวส์เป็น Infused Dragon's Breath นักเอนเดอร์วิทยาเลเวล 4 ขายลมหายใจ เลเวล 5 ขายหัวมังกร หลังฆ่ามังกรโอกาสของ Mythic สูงขึ้น และ Greater Boon ของพรติดตัว เข้าเนเธอร์ได้ XP ทุกแหล่ง +20% ฆ่ามังกรเพิ่มอีก +20%",
    },
    {
      item: "Cisco's Armor และ Fallen Hero",
      where: "หลังมังกร ตามเควสต์ Cisco's Fate สู้ Cisco ด้วย Talisman of Challenge แล้วสร้าง Podium of Purgatory ใช้เครื่องรางที่แปดเปื้อน Fell Fragment เพื่อดึง Fell King",
      drop: "Cisco's อัปจาก Brightsteel ด้วย Radiant Ruby ต้องมี Dragonskin ในสูตร True Dragon's Breath Fallen Hero ทำจากชิ้น Cisco's กับ Dark Core และ Ancient Essence ถ้า JEI ในเซฟไม่ตรงบรรทัดนี้ ให้ยึด JEI",
    },
    {
      item: "Frostfang",
      where: "คราฟต์ ไม่มีจุดดรอป ต้องมี Glacies อยู่ในสูตรจึงทำขวานน้ำแข็งก่อน",
      drop: "Divine Ruby, Glacial Core, Frigidium, Brilliant Diamond และ Glacies",
    },
    {
      item: "วัตถุดิบ Mythic จาก End",
      where: "ตั้ง Drygmy Henge ใน End เมื่อไปถึง เพราะสีส้มเกิดที่นั่นหนาที่สุด",
      drop: "End: ผลึก 55% Arcane Sands 30% Godforged Pearl 15% Aether ได้ครบทุกสีแต่สัดส่วนส้มต่ำกว่า คือ 39.5% 32.5% 15% 9% 4% มอนสเตอร์ End ให้ Endersurge กับ Mageslayer",
    },
    {
      item: "Champion Coins",
      where: "รางวัลเควสต์ การฆ่า Cisco มอนสเตอร์เลเวลเกิน 750 Gate of Memories และ Cataclysmic Gate ถ้ายืนฟาร์มเลเวล 750 ไม่ได้ ให้ย้ายฟาร์มเข้าใกล้จุดเกิด",
      drop: "มอนสเตอร์ 750 ขึ้นไปดรอป Burning Ashes, Stellarite และบางครั้ง Champion Coins Vengeful After Image เรียกด้วย Talisman of Betrayal อยู่ราว 3 วินาที ดรอปเหรียญโดย Looting ไม่เพิ่ม Drygmy ที่จับ Cisco ไม่ได้เหรียญ",
    },
  ],
};

const STATIONS: ByStage = byStage(
  "โต๊ะคราฟต์วานิลลา, บล็อก Global XP, โต๊ะเอนชานต์กับชั้นหนังสือ 15 ชิ้น, Salvaging Table, Simple Reforging Table, โต๊ะช่างเหล็ก, ทั่งบนพื้น, หินลับ โบนัสโหนดคราฟต์ติดเฉพาะโต๊ะวานิลลา",
  "Reforging Table, สปอว์นเนอร์ที่ยกมาทั้งก้อน, Volcanic Sourcelink กับ Source Jar ของ Ars, Hellshelf เมื่ออยู่ในเนเธอร์อยู่แล้ว",
  "Augmenting Table สำหรับรีโรลทีละ affix, Enchantment Library เก็บได้ 16 ระดับต่อชนิด, Drygmy Henge, Seashelf ถึง Deepshelf",
  "Soul-Touched Sculkshelf 20 ชิ้นกับ Draconic Endshelf 1 ชิ้นคือทางสั้นที่สุดไป 50 Eterna Library of Alexandria เก็บได้ 31 ระดับแต่สายหลักจบได้ด้วยห้องสมุด 16 ระดับ Eternal Stella ใส่ของความทนต่ำ",
);

const LINES: Line[] = [
  {
    id: "melee_crit",
    label: "ประชิดคริต",
    en: "Melee Crit",
    path: "crit",
    origin: byStage(
      "Frijani Drengr",
      "Frijani Drengr",
      "Frijani Drengr",
      "Frijani Drengr",
    ),
    blessing: "Hephaestus ทุกการโจมตีทำดาเมจ 2% ของพลังชีวิตปัจจุบันของศัตรู สลับ Thor ถ้าต้องการ Attack +10 หรือ Amaterasu ถ้าต้องการพลังชีวิต +10",
    className: "Warrior ดาเมจอาวุธเพิ่มเล็กน้อย และชูโล่แล้วช้าลงน้อยกว่า ผลโล่ใช้ไม่ได้กับเผ่านี้",
    limit: "Frijani ได้คริตแชนซ์ +20% คริตดาเมจ +50% และ life steal 20% แต่ดาเมจที่ทำลด 20% รับดาเมจเพิ่ม 30% หิวเร็วมาก และใช้โล่ไม่ได้ ถ้าต้องการโล่ Brawler ให้เปลี่ยนเป็น Paladin หรือ Knight แล้วรับว่าคริตต้องหาจากต้นไม้กับรีฟอร์จเอง",
    focus: "เผ่าให้คริตมาแล้ว แต้มใช้ปิดช่องที่ยังไม่ถึงเพดานและกอง Max Health ชดการรับดาเมจ +30% ไม่ซื้อโหนด Attack แบบเลขตรงมาชดดาเมจที่ลด 20%",
    weapon: byStage(
      "ดาบเหล็กหรือเพชรที่รีฟอร์จคริตได้ จุดไฟยังไม่ใช่แกนของสายนี้",
      "Aquaflora ความเร็วโจมตีสูง มีแทงรัวและเทเลพอร์ตฟัน ใช้มือรองได้ เปิดสูตรใน JEI อย่าเดาวัตถุดิบ",
      "Aquaflora ต่อจนครบวัตถุดิบ Frostfang ขวานทั่วไปรีฟอร์จคริตแชนซ์ได้ถึง 60% และคริตดาเมจ 40% ใช้เป็นอาวุธสลับ",
      "Frostfang ดาเมจ 27 มือเดียว ความทน 7000 ระยะ 2.5 คลิกขวาเมื่อเลือดเกิน 50% ได้ Attack จาก 40% ของพลังชีวิตสูงสุดตามหน้าไอเทม ถ้าต่ำกว่า 50% จะฮีลถึง 70% แล้วได้ความเร็ว หน้า Crit Build บางท่อนเขียนคนละตัวเลข ให้ยึดดาบในเกม",
    ),
    weaponShort: byStage("ดาบรีฟอร์จคริต", "Aquaflora", "Aquaflora", "Frostfang"),
    offhand: OFF_EMPTY,
    armor: ARMOR_MELEE,
    armorShort: ARMOR_SHORT,
    gem: CRIT_GEM + " ไม่มีช่องโล่ให้ลง Brawler",
    weights: WEIGHT_CRIT,
    extra: {
      early: [
        {
          item: "อาหารปริมาณมาก",
          where: "ฟาร์มเหนือดินใกล้จุดเกิด เผ่านี้หิวเร็วมากจาก Andhrimnir",
          drop: "อาหารที่คราฟต์เองจะได้โบนัสโหนด Hot Food ทีหลัง คือคริตดาเมจ +20% นาน 1 นาที",
        },
      ],
      mid: [
        {
          item: "Aquaflora",
          where: "ไม่มีพิกัดดรอป เปิด JEI ในเซฟแล้วไล่วัตถุดิบย้อน อาวุธนี้มาก่อน Frostfang ในหน้าวิกิ",
          drop: "สูตรอยู่ในเซฟ ไกด์ไม่ได้ลงรายการวัตถุดิบทีละช่อง",
        },
      ],
    },
  },
  {
    id: "melee_phys",
    label: "ประชิดพลัง",
    en: "Melee Physical",
    path: "phys",
    origin: byStage(
      "Paladin ได้ดาบ Durendal กับ Praise the Sun",
      "Paladin",
      "Paladin หรือ Demi-God เมื่อมี Majestic Elytra",
      "Demi-God Lux หรือ Umbra เมื่อมีของบินแล้ว ดาเมจรวม +40%",
    ),
    blessing: "Thor ให้ Attack +10 คู่ Hephaestus ที่ทำดาเมจ 2% ของเลือดปัจจุบันศัตรู เลือก Thor เป็นพรหลักของสายนี้",
    className: "Warrior",
    limit: "เลข Attack ตรงจาก gem และรีฟอร์จแพ้คริตเมื่อเลเวลมอนสเตอร์สูง สายนี้จึงยังลงคริตก่อน แล้วใช้ขวานกับพรเป็นชั้นดาเมจจากเลือดศัตรู Demi-God รับดาเมจ +20% และกินได้เฉพาะแอปเปิลทองกับแคร์รอตทอง",
    focus: "ชั้นกายภาพอยู่ที่รีฟอร์จ Current HP Damage ของขวาน ซึ่งสูงได้ถึง 15% พร้อมประหารเมื่อเลือดศัตรูต่ำ และที่พร Hephaestus อีก 2% แต้มสกิลไม่ไปซื้อ Attack แบบแบน",
    weapon: byStage(
      "ดาบ Durendal จากเผ่าช่วงชั่วโมงแรก แล้วขวานเหล็กหรือเพชรเมื่อรีฟอร์จคริตได้",
      "ขวานเนเธอไรต์รีฟอร์จคริตและ Current HP Damage Aquaflora ถ้าต้องการความเร็วโจมตีมากกว่าหน้าประหาร",
      "ขวานรีฟอร์จต่อ หรือ Aquaflora ระหว่างสะสมวัตถุดิบ Frostfang",
      "Frostfang คือเพดานประชิดที่วิกิระบุ ขวานยังเป็นอาวุธสลับสำหรับประหารเลือดต่ำ Absolute Equilibrium ดาเมจฐานสูงแต่สองมือ ดาเมจจากเปอร์เซ็นต์เลือดสูงสุดไม่ติดคริต และฆ่าบอสไม่นับคิล",
    ),
    weaponShort: byStage("Durendal แล้วขวาน", "ขวานเนเธอไรต์", "ขวานหรือ Aquaflora", "Frostfang สลับขวาน"),
    offhand: byStage(
      "โล่เหล็ก Unbreaking",
      "Kite Shield เพราะเล่นขวาน รีฟอร์จเลือดด้วย Esoteric เมื่อถึงชั้นนั้น และฝัง Brawler ทุกช่อง",
      "Kite Shield ชุดเดิม อัปเอนชานต์ Immortal",
      "Kite Shield รีฟอร์จ Esoteric สายเลือด Skelewag Skull ใช้เมื่อไม่ได้เล่นขวานหรือสเปลเบลด",
    ),
    armor: ARMOR_MELEE,
    armorShort: ARMOR_SHORT,
    gem: CRIT_GEM + " โล่ลง Brawler ทุกช่อง",
    weights: [
      { id: "chance", label: "Crit Chance", value: 30, color: "blue" },
      { id: "damage", label: "Crit Damage", value: 30, color: "orange" },
      { id: "hpDamage", label: "Current HP Damage บนขวาน", value: 24, color: "red" },
      { id: "hp", label: "Max Health", value: 16, color: "green" },
    ],
    extra: {
      mid: [
        {
          item: "ขวานเนเธอไรต์",
          where: "คราฟต์จากเส้นเนเธอไรต์ช่วง Y=14 ไม่มีมอนสเตอร์ดรอปขวานสายนี้เป็นของประจำ",
          drop: "รีฟอร์จเองได้คริตแชนซ์ถึง 60% คริตดาเมจ 40% Current HP Damage ถึง 15%",
        },
      ],
    },
  },
  {
    id: "magic",
    label: "เมจ",
    en: "Iron's Spells",
    path: "mage",
    origin: byStage(
      "Pyriosi Phoenix Knight ใช้พุ่งช่วงยังไม่มีของบิน",
      "Pyriosi Phoenix Knight โบนัสไฟของเผ่าไม่เพิ่มทุกธาตุ",
      "Demi-God Lux หรือ Umbra เมื่อมี Majestic Elytra",
      "Demi-God Lux หรือ Umbra ดาเมจรวม +40% เมื่อการบินมาจากของแล้ว",
    ),
    blessing: "ต้นทางใช้ Amaterasu พลังชีวิต +10 ถ้าจบที่ Rainfall Serenity ให้เปลี่ยนเป็น Astraeus ซึ่งเพิ่มดาเมจ celestial +100",
    className: "Explorer, Miner หรือ Lumberjack อาชีพนี้เป็นงานบ้าน ไม่ได้ยกเพดานดาเมจเวท",
    limit: "High Elf สายเวทที่เขียนว่าเพิ่ม magic damage ใช้กับสเปลของ Iron's Spells ไม่ได้ อย่าเลือกเผ่านั้นเป็นตัวทำดาเมจของสมุดนี้",
    focus: "ลง Spell Power ของธาตุที่เลือกหลังจากคริตเริ่มติด แหล่งหลักคือรีฟอร์จและ gem ไม่ต้องลงในต้นไม้ก่อนมีของธาตุนั้น",
    weapon: byStage(
      "ดาบเหล็กที่รีฟอร์จคริตได้ คู่ glyph ของ Ars Nouveau ในชั่วโมงแรก Extract ยกสปอว์นเนอร์ Bounce ใช้พุ่ง",
      "สมุด Iron's ของสำนักที่เลือก เริ่มแทน glyph เมื่อร่ายได้ต่อเนื่อง",
      "Rainfall Serenity มือหลัก รีฟอร์จ Esoteric ธนูนี้ให้ Spell Power ติดมา แต่โบนัสนั้นไม่ทำงานในมือรอง",
      "Rainfall Serenity รีฟอร์จ Esoteric ต่อเนื่อง TheZemor ให้ธนูนี้เป็นมือหลักของเมจเพราะคริตแบบคูณทวี",
    ),
    weaponShort: byStage("ดาบคริต + glyph Ars", "สมุด Iron's", "Rainfall Serenity", "Rainfall Serenity"),
    offhand: byStage(
      "โล่",
      "โล่ หรือธนูอีกเล่ม",
      "โล่ หรือธนูอีกเล่ม Rainfall Serenity ต้องอยู่มือหลัก",
      "โล่รีฟอร์จเลือด หรือธนูอีกเล่ม",
    ),
    armor: byStage(
      "Adventurer's ทั้งชุดระหว่างสะสมหนังสือสำนัก",
      "Darksteel เพื่อกันตายด้วย Impervium ระหว่างชุดธาตุยังไม่ครบ",
      "ชุดเกราะเวทของสำนักที่เลือก ทั้งชุด",
      "ชุดสำนักเดิมพร้อม Eternal Stella เพราะความทนต่ำ Unbreaking กับ Mending อย่างเดียวอาจไม่พอ",
    ),
    armorShort: byStage("Adventurer's", "Darksteel", "ชุดธาตุของสำนัก", "ชุดธาตุ + Eternal Stella"),
    gem: MAGE_GEM,
    weights: WEIGHT_MAGE,
    extra: {
      early: [
        {
          item: "ไม้ Archwood และ glyph ต้นทาง",
          where: "ป่า Archwood หาด้วย Nature's Compass ต้น Blazing Archwood คือต้นแดง ให้เชื้อเพลิง Volcanic Sourcelink มากที่สุด",
          drop: "เควสต์หลักบังคับสาย Ars และต้องฆ่า Wilden Chimera เพื่อเดินต่อ ชาวบ้าน Shady Wizard ที่โต๊ะเป็น Arcane Core ขายของม็อด Mana Unification ทำให้มานา Ars กับ Iron's เป็นหลอดเดียว",
        },
      ],
      mid: [
        {
          item: "หนังสือสำนัก Iron's",
          where: "หอ Pyromancer, หอภูเขาของ Cryomancer, ป้อม Evoker, กระท่อมป่าชายเลนของ Apothecarist, Catacombs ของ Dead King ใน Overworld และ Ancient Battleground ในเนเธอร์ ใช้เข็มทิศโครงสร้าง",
          drop: "หนังสือสเปลและหมึก Dead King ในโหล Drygmy ให้สโครล Iron's ส่วนใหญ่รวมหมึกตำนาน",
        },
      ],
    },
  },
  {
    id: "archer",
    label: "ธนู",
    en: "Archer",
    path: "archer",
    origin: byStage(
      "Venthari Sharpshooter",
      "Venthari Sharpshooter",
      "Venthari Sharpshooter",
      "Venthari Sharpshooter",
    ),
    blessing: "Amaterasu พลังชีวิต +10 ชดเลือดที่หาย 30% Skadi ให้ดาเมจ +30% ในไบโอมหิมะและหลังมังกรได้ดาเมจโปรเจกไทล์ +45% แต่ไปชนกับ Slowness ในไบโอมหนาวของ Venthari ถ้าจะใช้ Skadi ให้เปลี่ยน Origin เป็น Wood Elf หรือ Pyriosi ซึ่งไม่มีโทษหนาว และ Wood Elf ใส่เกราะได้ไม่หนักกว่าโซ่",
    className: "Archer โปรเจกไทล์แม่นขึ้น และขยับเร็วขึ้นตอนน้าวธนู",
    limit: "Venthari ได้ดาเมจโปรเจกไทล์ +30% แต่พลังชีวิตน้อยลง 30% กินเนื้อเป็นหลัก และช้าในไบโอมหนาว ต้องกอง Max Health ตั้งแต่กลางทาง",
    focus: "Max Health แทรกเร็วกว่าสายประชิดเพราะเผ่าเลือดบาง Arrow Velocity กับ Arrow Damage แพ้คริต ตามหน้าที่วิกิเทียบอาวุธธนู",
    weapon: byStage(
      "ธนูเหล็กหรือเพชรที่รีฟอร์จคริตได้",
      "Netherite Bow เป็นธนูฐานที่หน้า Best Equipment บอกว่าดาเมจโปรเจกไทล์ฐานสูงที่สุด",
      "ธนูที่รีฟอร์จ Esoteric เป็นแท่งสเตตัสคริต รีฟอร์จคริตดาเมจได้ถึง 140% Netherite Bow ยังเป็นเล่มฐานดาเมจ",
      "ธนู Esoteric เล่มเดิม Tri-bow สูงเมื่อโดนครบสามดอก Dragon Breath Bow คือฐานโปรเจกไทล์อันดับสองและรวมโพชันได้",
    ),
    weaponShort: byStage("ธนูรีฟอร์จคริต", "Netherite Bow", "ธนู Esoteric", "ธนู Esoteric"),
    offhand: byStage(
      "โล่ตอนโดนประชิด",
      "Kite Shield ฝัง Brawler เพื่อชดเลือด",
      "Kite Shield รีฟอร์จเลือด",
      "Kite Shield รีฟอร์จ Esoteric ลงเลือด",
    ),
    armor: ARMOR_MELEE,
    armorShort: ARMOR_SHORT,
    gem: CRIT_GEM + " โล่ลง Brawler กางเกงรองเท้าลง Hearty เป็นพิเศษเพราะเลือดเผ่าหาย 30%",
    weights: WEIGHT_BOW,
    extra: {
      early: [
        {
          item: "กระดูกและธนูสำรอง",
          where: "สปอว์นเนอร์โครงกระดูกในดันเจียนใกล้จุดเกิด ยกด้วย Extract หรือ Silk Touch",
          drop: "ลูกธนูกับกระดูก ฟาร์มนี้ป้อนธนูระหว่างที่ Netherite Bow ยังไม่คราฟต์",
        },
      ],
      mid: [
        {
          item: "Netherite Bow",
          where: "แท่งเนเธอไรต์จากแถบ Y=14 หรือ Ancient Knight ที่ดรอป scrap 25%",
          drop: "คราฟต์ธนูเนเธอไรต์ตามสูตรใน JEI ของเซฟ",
        },
      ],
    },
  },
  {
    id: "hybrid",
    label: "ไฮบริด",
    en: "Hybrid",
    path: "hybrid",
    origin: byStage(
      "Pyriosi Phoenix Knight",
      "Pyriosi Phoenix Knight",
      "Pyriosi Phoenix Knight หรือ Valkyrie ถ้าล็อกศักดิ์สิทธิ์",
      "เผ่าเดิม อย่าเปลี่ยนเป็น Demi-God ถ้ายังพึ่ง Blazing Dash อยู่",
    ),
    blessing: "Ra เมื่อเล่นไฟ ดาเมจไฟจริงคือ +5 ใต้แดด ไม่ใช่ +10 ตามข้อความในเมนู และหลังมังกรอีก +25 Hephaestus ถ้าอยากได้ดาเมจจากเลือดศัตรูคู่สเปล",
    className: "Warrior",
    limit: "เลือกสำนักเดียว แต้มที่แยกไปสองธาตุจะไม่ถึงเพดาน Spell Power ของธาตุไหนเลย สายนี้ใส่ Sylvi's เพื่อรับดาเมจประชิด ชุดผ้าของเมจทั้งตัวทิ้งช่องเกราะของประชิด",
    focus: "Spell Power ของสำนักเดียว หลังคู่คริต ดาบรีฟอร์จ Ancient เพื่อให้คริตอยู่คู่ Spell Power",
    weapon: byStage(
      "ดาบเหล็กหรือเพชรรีฟอร์จคริต มือซ้ายยังเป็นโล่",
      "ดาบเนเธอไรต์หรือ Aquaflora รีฟอร์จคริต สมุดของสำนักอยู่ในฮอตบาร์สำหรับสลับ",
      "ดาบหรือ Aquaflora รีฟอร์จ Ancient",
      "Frostfang เมื่อสำนักไม่ใช่น้ำแข็งที่เป็นศัตรูกับ Pyriosi ดาบสลับ Amethyst Rapier เฉพาะตอนเปิด Echoing Strikes ถ้าสำนักคือ Ender",
    ),
    weaponShort: byStage("ดาบคริต + โล่", "Aquaflora + สมุด", "ดาบ Ancient", "Frostfang หรือดาบ Ancient"),
    offhand: byStage(
      "โล่",
      "โล่ Brawler สมุดไม่แทนโล่ถาวร",
      "โล่ Brawler",
      "โล่ Kite หรือ Skelewag รีฟอร์จ Esoteric ลงเลือด สมุดอยู่ช่องฮอตบาร์",
    ),
    armor: ARMOR_MELEE,
    armorShort: ARMOR_SHORT,
    gem: "ดาบลง Samurai หนึ่งเม็ดแล้วที่เหลือ Warlord หมวกหนึ่งช่องเป็น Spell Power ของสำนัก ที่เหลือ Warlord กับ Hearty โล่ลง Brawler ทั้งช่อง",
    weights: WEIGHT_MAGE,
    extra: {
      mid: [
        {
          item: "หนังสือสำนักเดียว",
          where: "หอของธาตุที่เลือก ดูเข็มทิศโครงสร้าง อย่าเก็บหนังสือคนละสำนักมาลงแต้ม",
          drop: "สโครลและหมึกของสำนักนั้น Dead King ในโหล Drygmy ให้สโครลรวมจำนวนมาก",
        },
      ],
    },
  },
  {
    id: "fire",
    label: "ไฟ",
    en: "Fire",
    path: "mage",
    origin: byStage(
      "Pyriosi Phoenix Knight",
      "Pyriosi Phoenix Knight",
      "Pyriosi Phoenix Knight",
      "Pyriosi Phoenix Knight",
    ),
    blessing: "Ra ดาเมจไฟ +5 เมื่อโดนแดด ค่าในเมนูที่เขียน +10 ไม่ตรงกับค่าที่พรใส่ และหลังมังกรอีก +25 สลับ Amaterasu เมื่อต้องการพลังชีวิต +10 มากกว่าดาเมจไฟ",
    className: "Explorer",
    limit: "เวทน้ำแข็งลด 200% ไบโอมหนาวมากพลังชีวิตลด 40% และอ่อนแรงช้าเมื่อไม่มีแดด อยู่ใต้แดดเพื่อ Phoenix Renewal Blazing Dash ตัดระยะสั้น glyph Bounce ใช้พุ่งต่อ",
    focus: "Fire Spell Power หลังคริตเริ่มเดิน เผ่าให้เวทไฟ +200% และเป้าหมายที่ติดไฟรับดาเมจจากคุณเพิ่ม 60% อยู่แล้ว",
    weapon: byStage(
      "ดาบเหล็กที่รีฟอร์จคริตได้ จุดไฟมาจากเผ่า มือรองเป็นโล่",
      "สมุดไฟของ Iron's คู่ดาบที่ยังรีฟอร์จคริต",
      "Rainfall Serenity มือหลักรีฟอร์จ Esoteric คู่ชุด Pyromancer",
      "Rainfall Serenity รีฟอร์จ Esoteric อาวุธจบของสายไฟนี้คือธนูสเตตัส ไม่ใช่ Frostfang ซึ่งเป็นเส้นน้ำแข็ง",
    ),
    weaponShort: byStage("ดาบคริต", "สมุดไฟ", "Rainfall Serenity", "Rainfall Serenity"),
    offhand: byStage("โล่", "โล่", "โล่ หรือธนูอีกเล่ม", "โล่รีฟอร์จเลือด"),
    armor: byStage(
      "Adventurer's ทั้งชุด",
      "Darksteel ระหว่างสะสมชุด Pyromancer",
      "Pyromancer ทั้งชุดของ Iron's Spells",
      "Pyromancer + Eternal Stella",
    ),
    armorShort: byStage("Adventurer's", "Darksteel", "Pyromancer", "Pyromancer + Eternal Stella"),
    gem: MAGE_GEM,
    weights: WEIGHT_MAGE,
    extra: {
      early: [
        {
          item: "พื้นที่ที่มีแดด",
          where: "ฐานเปิดฟ้าใน Overworld หลีกเลี่ยงไบโอมหนาวมาก",
          drop: "Phoenix Renewal ฟื้นเลือดใต้แดด Solar Eclipse ทำให้อ่อนแรงเมื่อไม่มีแดด",
        },
      ],
      mid: [
        {
          item: "หนังสือไฟและ Ancient Knight",
          where: "หอ Pyromancer ใน Overworld ดาดฟ้าหอเดียวกันมีกองเกราะของ Ancient Knight",
          drop: "หนังสือสำนักไฟ และเศษเนเธอไรต์ 25% จากอัศวินเมื่อทุบกองด้วยจอบเพชร",
        },
      ],
    },
  },
  {
    id: "holy",
    label: "ศักดิ์สิทธิ์",
    en: "Holy",
    path: "mage",
    origin: byStage(
      "Lumerian Justicar",
      "Lumerian Justicar",
      "Lumerian Justicar",
      "Lumerian Justicar",
    ),
    blessing: "Vishnu ได้ผลฟื้นฟูที่แรง สลับ Arthur เมื่อตั้งใจล่าอันเดดเพราะดาเมจต่ออันเดดเพิ่ม 60% หรือ Amaterasu เมื่อต้องการพลังชีวิต +10",
    className: "Explorer ถ้าเล่น Justicar เป็นตัวร่าย Paladin คู่ Warrior เป็นอีกตัวของสายดาบศักดิ์สิทธิ์ ซึ่งใช้ Durendal กับ Praise the Sun แล้วเดินเกราะแบบประชิด",
    limit: "Lumerian ได้ Holy Spell Power +350% มานาเพิ่ม และร่ายเร็ว 2 เท่า แต่ Ender Spell Power ลด 350% เดินช้า 30% และโดเมนของ Anthrax ใช้ไม่ได้",
    focus: "Holy Spell Power ใช้ gem น้อยลงเพราะเผ่าบวก 350% อยู่แล้ว ช่อง gem ที่เหลือลงคริตหรือเลือด",
    weapon: byStage(
      "สมุดศักดิ์สิทธิ์เมื่อคราฟต์ได้ Guiding Bolt ร่ายระดับสูงสุดได้ตามใจ กดเริ่มต้น G Fortify เสริมพลังตัวเองและเพื่อน กดเริ่มต้น H",
      "สมุดศักดิ์สิทธิ์เล่มเดิม อัประดับสเปลจากหอและ Catacombs",
      "Rainfall Serenity มือหลักเพื่อช่องคริตและ Spell Power คู่สมุด Guiding Bolt",
      "Rainfall Serenity รีฟอร์จ Esoteric สมุดศักดิ์สิทธิ์อยู่ในฮอตบาร์",
    ),
    weaponShort: byStage("Guiding Bolt", "สมุดศักดิ์สิทธิ์", "Rainfall Serenity", "Rainfall Serenity"),
    offhand: byStage("โล่", "โล่", "โล่", "โล่รีฟอร์จเลือด"),
    armor: byStage(
      "Adventurer's",
      "Darksteel ระหว่างสะสมชุด Priest ของ Iron's Spells",
      "ชุด Priest ของ Iron's Spells ทั้งชุด ชื่อชุดนี้คนละอย่างกับ Origin ที่ชื่อ Priest",
      "ชุด Priest + Eternal Stella",
    ),
    armorShort: byStage("Adventurer's", "Darksteel", "ชุด Priest", "ชุด Priest + Eternal Stella"),
    gem: MAGE_GEM + " เผ่าชนเพดาน Holy ก่อนสายอื่น จึงลดจำนวน gem Spell Power ได้",
    weights: WEIGHT_MAGE,
    extra: {
      mid: [
        {
          item: "สโครลศักดิ์สิทธิ์",
          where: "ป้อม Evoker และ Catacombs ของ Dead King ใช้เข็มทิศโครงสร้าง",
          drop: "หนังสือสำนักศักดิ์สิทธิ์ Dead King ในโหล Drygmy ให้สโครล Iron's รวมหมึกตำนาน",
        },
      ],
      late: [
        {
          item: "อันเดด ถ้าใช้พร Arthur",
          where: "ดันเจียนโครงกระดูกและซอมบี้ใกล้ฐาน ยกสปอว์นเนอร์ด้วย Extract",
          drop: "ของอันเดดทั่วไป ใช้ฝึก Fortify กับ Guiding Bolt ไม่ใช่แหล่งเกราะ",
        },
      ],
    },
  },
  {
    id: "ice",
    label: "ความเย็น",
    en: "Ice",
    path: "ice",
    origin: byStage("Frijani Drengr", "Frijani Drengr", "Frijani Drengr", "Frijani Drengr"),
    blessing: "Skadi ดาเมจเพิ่ม 30% ในไบโอมหิมะ และหลังมังกรดาเมจโปรเจกไทล์เพิ่ม 45% Boreas ให้ดาเมจความเย็น +9 ถ้าไม่อยากผูกกับหิมะ",
    className: "Warrior",
    limit: "ใช้โล่ไม่ได้ ดาเมจที่ทำลด 20% รับดาเมจเพิ่ม 30% มี life steal 20% คริตแชนซ์ +20% และคริตดาเมจ +50% อย่าเลือก Pyriosi มาเข้าสายนี้เพราะเวทน้ำแข็งของเผ่านั้นลด 200%",
    focus: "คู่คริตยังมาก่อน ชั้นน้ำแข็งอยู่ที่อาวุธ Glacies กับพร Skadi หรือ Boreas ไม่ได้อยู่ที่การซื้อ Attack แบน",
    weapon: byStage(
      "ดาบหรือขวานที่รีฟอร์จคริตได้",
      "Aquaflora จนคราฟต์ Glacies ได้ Glacies ดาเมจ 17 สองมือ ความทน 4000 คลิกขวาหุ้มเกราะด้วยน้ำแข็งแต่ติด Slowness และโจมตีแล้วช้าศัตรู",
      "Glacies เป็นทั้งอาวุธและวัตถุดิบของ Frostfang",
      "Frostfang แล้วสายอาวุธนี้ไปต่อที่ Fell Ragnarok ตามหน้าอาวุธของ Glacies",
    ),
    weaponShort: byStage("อาวุธคริต", "Glacies", "Glacies", "Frostfang"),
    offhand: byStage(
      "ว่าง Glacies จะเป็นสองมือ และเผ่าถือโล่ไม่ได้ตั้งแต่ต้น",
      "ว่าง",
      "ว่าง",
      "ว่าง Frostfang มือเดียวแต่เผ่ายังถือโล่ไม่ได้",
    ),
    armor: ARMOR_MELEE,
    armorShort: ARMOR_SHORT,
    gem: CRIT_GEM + " ไม่มีโล่ให้ลง Brawler รองเท้าและกางเกงลง Hearty",
    weights: WEIGHT_CRIT,
    extra: {
      early: [
        {
          item: "ไบโอมหิมะสำหรับ Skadi",
          where: "ไบโอมหิมะใน Overworld หาด้วย Nature's Compass หรือเดินตามแผนที่ โครงสร้างน้ำแข็งให้ Cold Eye",
          drop: "Cold Eye จากหีบพีระมิดน้ำแข็งและอิกลู ดาเมจ Skadi +30% เฉพาะตอนยืนในไบโอมหิมะ",
        },
      ],
      mid: [
        {
          item: "หอ Cryomancer และแกนน้ำแข็ง",
          where: "หอภูเขาของ Cryomancer ใช้เข็มทิศโครงสร้าง Glacial Core เปิดสูตรใน JEI",
          drop: "หนังสือน้ำแข็งถ้าจะแตะสเปลเสริม และ Glacial Core สำหรับ Frigidium กับ Frostfang",
        },
      ],
    },
  },
  {
    id: "poison",
    label: "พิษ",
    en: "Poison",
    path: "poison",
    origin: byStage("Moon Elf", "Moon Elf", "Moon Elf", "Moon Elf"),
    blessing: "Loki เอื้อมไกลขึ้น ล่องหนจริงตอนย่อ และการโจมตีใส่พิษ Baba Yaga เป็นพรสำรองที่ใส่ Weakness กับ Wither เมื่อโจมตีโดน",
    className: "Rogue ย่อครบ 10 วินาทีแล้วเข้า Stealth และตีจากด้านหลังแรงขึ้น",
    limit: "Moon Elf เก่งมีดและล่องหนในที่มืด แต่เลือดน้อย รับดาเมจกายภาพเพิ่ม นอนใน Overworld ไม่ได้ และเกราะหนักทำให้ช้าซึ่งกันได้ด้วยเอนชานต์ โจมตีแรกจากเงาได้ดาเมจโบนัสแล้วหลุดล่องหน",
    focus: "หลังคู่คริตให้ไป Persistent Toxin เพื่อสูตรอาบยา แล้วใช้โหนดอาวุธที่ให้ Crit Damage +35% ต่อเป้าหมายติดพิษ",
    weapon: byStage(
      "มีดหรือแดกเกอร์เหล็กที่รีฟอร์จคริตได้ ดาเมจเงาสูงขึ้นเมื่อถือมีด",
      "มีดเนเธอไรต์รีฟอร์จคริต อาบยาเมื่อปลดโหนดแล้ว",
      "มีดรีฟอร์จ Esoteric เพราะสายนี้ไม่ได้แลกช่องกับ Spell Power คริตชุด Esoteric คูณทวี",
      "มีด Esoteric เล่มเดิม อัปช่อง gem จนชนข้อความ Socketed ในเกม",
    ),
    weaponShort: byStage("มีดคริต", "มีดเนเธอไรต์", "มีด Esoteric", "มีด Esoteric"),
    offhand: byStage(
      "ว่าง หรือโล่เบาเมื่อเลือดไม่พอ ดาเมจหลักมาจากมีด ไม่ต้องลง Brawler ทั้งแผง",
      "โล่เบาได้เมื่อต้องยืนอัด",
      "โล่เบา รีฟอร์จเลือดถ้าเริ่มใช้เป็นชิ้นหลัก",
      "โล่ Kite ได้ถ้าต้องการเลือด แต่ไม่แทนมีดในมือหลัก",
    ),
    armor: byStage(
      "Adventurer's ได้ โทษเกราะหนักของ Elegant กันด้วยเอนชานต์",
      "Darksteel เมื่อเอนชานต์กันโทษความช้าอยู่บนชุดแล้ว",
      "Sylvi's ใส่ได้เมื่อเอนชานต์กัน Elegant อยู่ครบ",
      "Sovereign Ascendant รีฟอร์จ Esoteric เงื่อนไขเอนชานต์กันความช้าเหมือนช่วงก่อน",
    ),
    armorShort: ARMOR_SHORT,
    gem: CRIT_GEM + " กางเกงรองเท้าลง Hearty เพราะเผ่าเลือดบาง",
    weights: [
      { id: "chance", label: "Crit Chance", value: 28, color: "blue" },
      { id: "damage", label: "Crit Damage", value: 24, color: "orange" },
      { id: "poison", label: "โหนดพิษ", value: 28, color: "green" },
      { id: "hp", label: "Max Health", value: 20, color: "yellow" },
    ],
    extra: {
      early: [
        {
          item: "พื้นที่มืดสำหรับ To the Shadows",
          where: "ถ้ำและฐานที่ปิดไฟได้ Moon Elf นอนใน Overworld ไม่ได้ ต้องจัดที่นอนในมิติอื่นเมื่อปลดมิติแล้ว",
          drop: "ไม่มีของดรอป เป็นเงื่อนไขสกิลล่องหน ย่อในที่มืดแล้วโจมตีแรกจากเงาแรงขึ้นถ้าถือมีด",
        },
      ],
      mid: [
        {
          item: "วัตถุดิบอาบยาและโพชัน",
          where: "กระท่อมแม่มดบนพื้นผิว ฟาร์มแมงมุมจากสปอว์นเนอร์ดันเจียน",
          drop: "แม่มดดรอปของหลายชนิดที่สุดสำหรับ Knowledge of the Ages และดรอป Witch Pupil 10% ตาแมงมุมกับของพิษเปิดใน JEI คู่สูตรจากโหนด Persistent Toxin",
        },
      ],
    },
  },
];

function schoolById(id: SchoolId): School {
  return SCHOOLS.find((school) => school.id === id) ?? SCHOOLS[0];
}

function activeSchool(line: Line, schoolId: SchoolId): School | null {
  if (line.id === "fire") return schoolById("fire");
  if (line.id === "holy") return schoolById("holy");
  if (line.path === "mage" || line.path === "hybrid") return schoolById(schoolId);
  return null;
}

function originText(line: Line, stage: StageId, school: School | null): string {
  if (line.id === "magic" && school) {
    if (school.id === "ender") return "Anthraxi Dark Mage ตลอดสาย Ender Spell Power +350% ร่ายเร็ว 2 เท่า Holy ติดลบ 350% พลังชีวิตน้อยลง 40%";
    if (school.id === "holy") return "Lumerian Justicar Holy Spell Power +350% ร่ายเร็ว 2 เท่า เดินช้า 30%";
    if (school.id === "fire") return "Pyriosi Phoenix Knight เวทไฟ +200% เป้าหมายติดไฟรับดาเมจเพิ่ม 60%";
    if (school.id === "ice") return "Yeti หรือ Human อย่าใช้ Pyriosi เพราะเวทน้ำแข็งของเผ่านั้นลด 200%";
    if (stage === "early" || stage === "mid") {
      return "Pyriosi Phoenix Knight ใช้พุ่งและจุดไฟช่วงที่ยังไม่มีของบิน โบนัสเวทไฟไม่เพิ่ม " + school.power;
    }
    return "Demi-God Lux หรือ Umbra เมื่อมี Majestic Elytra ดาเมจที่ทำเพิ่ม 40% รับดาเมจเพิ่ม 20% กินได้เฉพาะแอปเปิลทองกับแคร์รอตทอง หน้า Best Equipment แนะนำเผ่านี้เมื่อการบินมาจากของแล้ว";
  }
  if (line.path === "hybrid" && school) {
    if (school.id === "holy") return "Valkyrie มีปีก บินอิสระ ถนัดหอกและเวทศักดิ์สิทธิ์ อันเดดใกล้ตัวทำให้ Weakness กับ Slowness";
    if (school.id === "ender") return "Anthraxi Dark Mage ได้ Echoing Strikes แต่พลังชีวิตน้อยลง 40% สำหรับสายที่เดินเข้าประชิด";
    if (school.id === "ice") return "Frijani Drengr อย่าใช้ Pyriosi กับเวทน้ำแข็ง";
    if (school.id === "fire") return "Pyriosi Phoenix Knight";
  }
  return line.origin[stage];
}

function armorText(line: Line, stage: StageId, school: School | null): string {
  if (line.path === "mage" && school && (stage === "late" || stage === "end")) {
    const stella = stage === "end" ? " ใส่ Eternal Stella เพราะความทนต่ำ" : "";
    return `ชุด ${school.armor} ของ Iron's Spells ทั้งชุด เป็นตัวให้ ${school.power}${stella}`;
  }
  return line.armor[stage];
}

function armorShort(line: Line, stage: StageId, school: School | null): string {
  if (line.path === "mage" && school && stage === "late") return school.armor;
  if (line.path === "mage" && school && stage === "end") return `${school.armor} + Eternal Stella`;
  return line.armorShort[stage];
}

function offhandText(line: Line, stage: StageId, school: School | null): string {
  const base = line.offhand[stage];
  if (school?.id === "ender" && (stage === "late" || stage === "end")) {
    return `${base} สลับมา Amethyst Rapier เพื่อเปิด Echoing Strikes แล้วสลับกลับ ไม่ต้องฟันด้วยดาบนี้ตลอด`;
  }
  return base;
}

function curiosText(line: Line, stage: StageId): string {
  const base = CURIOS[stage];
  if (line.path === "mage" && stage !== "early") {
    return `คอใช้ Amulet of Vitality พลังชีวิต +10 ${base}`;
  }
  if (line.id === "archer" && stage === "late") {
    return `${base} ใส่ Critical Quiver เมื่อหาได้`;
  }
  return base;
}

function reforgeText(line: Line, stage: StageId): string {
  if (line.id === "poison" && (stage === "late" || stage === "end")) {
    return "มีดใช้ Esoteric จาก Galactic Core เพราะสายนี้ไม่ได้แลกช่องรีฟอร์จกับ Spell Power คริตของ Esoteric คูณแบบทวี";
  }
  if (line.id === "archer" && (stage === "late" || stage === "end")) {
    return "ธนูใช้ Esoteric ทั้งเล่ม คริตดาเมจจากรีฟอร์จได้ถึง 140% ตามหน้า Crit Build และเป็นตัวคูณทวี";
  }
  return REFORGE[stage];
}

function enchantText(line: Line): string {
  if (line.path === "mage") {
    return `${ENCHANT} เกราะเวทใส่ Eternal Stella ดาเมจไฟจากเผ่าหรือรีฟอร์จเป็นชนิดดาเมจที่สองเวลาเจอ trait Adaptive`;
  }
  return ENCHANT;
}

function limitText(line: Line, school: School | null): string {
  const extra: string[] = [];
  if (line.id === "magic" && school?.id === "ender") {
    extra.push("สำนัก Ender ล็อก Origin เป็น Anthraxi พลังชีวิตน้อยลง 40%");
  }
  if (line.id === "magic" && school?.id === "ice") {
    extra.push("สำนักน้ำแข็งใช้คู่ Pyriosi ไม่ได้");
  }
  if (line.path === "hybrid" && school?.id === "ice") {
    extra.push("ไฮบริดน้ำแข็งต้องออกจาก Pyriosi");
  }
  if (extra.length === 0) return line.limit;
  return `${line.limit} ${extra.join(" ")}`;
}

function statRows(line: Line, school: School | null): StatRow[] {
  const spell = school?.power ?? "Spell Power ของสำนักที่เลือก";
  if (line.path === "mage" || line.path === "hybrid") {
    let spellWhy = "ลงหลังจากคริตเริ่มติด ได้จากรีฟอร์จและ gem เป็นหลัก";
    if (school?.id === "holy") spellWhy += " Lumerian ให้มา +350% และร่ายเร็ว 2 เท่า จึงเหลือช่องไปลงคริตหรือเลือด";
    if (school?.id === "ender") spellWhy += " Anthraxi ให้มา +350% แต่พลังชีวิตน้อยลง 40% ต้องกองเลือดคู่ไปด้วย";
    if (school?.id === "fire") spellWhy += " Pyriosi ให้เวทไฟ +200% และเป้าหมายติดไฟรับดาเมจเพิ่ม 60%";
    if (school?.id === "lightning") spellWhy += " ไม่มีเผ่าที่บวกสายฟ้าตรง ๆ TheZemor ยก Thunderstorm ให้เป็นหนึ่งในดาเมจเวทสูงสุดคู่กับ Echoing Strikes";
    if (line.path === "hybrid") spellWhy += " เลือกสำนักเดียวทั้งเซฟ";
    return [
      {
        stat: "Crit Chance",
        target: "ใกล้เพดาน จากฐาน 5%",
        why: "สเปลคริตด้วยตัวคูณชุดเดียวกับประชิด อาวุธใส่ Samurai หนึ่งเม็ดระหว่างทาง",
      },
      {
        stat: "Crit Damage",
        target: "ให้ใกล้แชนซ์ ฐาน 150%",
        why: "คริตเกิน 100% ติดหลายชั้น ชั้นถัดไปคูณ 0.85 แชนซ์สูงด้านเดียวเริ่มลดดาเมจเอง",
      },
      { stat: spell, target: "หลังคริตเริ่มเดิน", why: spellWhy },
      {
        stat: "เลือด มานา Cooldown Reduction",
        target: "ตามหลอดที่บาง",
        why: "เสื้อเป็นช่อง gem สุดท้ายของสายเวท เลือดมาก่อนมานาถ้าเผ่าเลือดบาง",
      },
    ];
  }
  if (line.id === "archer") {
    return [
      {
        stat: "Crit Chance",
        target: "ใกล้เพดาน จากฐาน 5%",
        why: "ธนู Esoteric เป็นแท่งคริต แชนซ์ต้องไปถึงเพดานก่อนเปลี่ยน Samurai เป็น Warlord",
      },
      {
        stat: "Crit Damage",
        target: "ให้ใกล้แชนซ์ และใช้รีฟอร์จ Esoteric",
        why: "รีฟอร์จธนูได้คริตดาเมจถึง 140% และคริตชุด Esoteric, Artifact, Heirloom คูณทวี",
      },
      {
        stat: "Max Health",
        target: "กองเร็วกว่าสายประชิด",
        why: "Venthari พลังชีวิตน้อยลง 30% Hearty ที่กางเกงกับรองเท้า และ Amaterasu +10 ถ้าเลือกพรนี้",
      },
      {
        stat: "Arrow Velocity / Arrow Damage",
        target: "ไม่ใช้เป็นแกน",
        why: "หน้าวิกิบอกว่าสองค่านี้แพ้คริตบนธนู ดาเมจโปรเจกไทล์ +30% มาจากเผ่าอยู่แล้ว",
      },
    ];
  }
  if (line.id === "poison") {
    return [
      {
        stat: "Crit Chance",
        target: "ใกล้เพดาน จากฐาน 5%",
        why: "โจมตีแรกจากเงาเป็นดาเมจก้อนเดียว คริตต้องติดก้อนนั้น",
      },
      {
        stat: "Crit Damage",
        target: "ให้ใกล้แชนซ์",
        why: "มีด Esoteric คูณคริตแบบทวี โหนดอาวุธบวกอีก 35% เมื่อเป้าหมายติดพิษ",
      },
      {
        stat: "Persistent Toxin",
        target: "หลังมีแท่นปรุงยา",
        why: "โอกาสเพิ่มระดับโพชัน +50% และได้สูตรอาบยาพิษใส่อาวุธ พิษจากพร Loki ใส่ติดทุกครั้งที่โจมตีโดน",
      },
      {
        stat: "Max Health",
        target: "ชดเผ่าที่เลือดบาง",
        why: "Moon Elf เลือดลดและรับดาเมจกายภาพเพิ่ม Blood Veil ช่วยเมื่อเลือดไม่เกิน 50%",
      },
    ];
  }
  if (line.id === "melee_phys") {
    return [
      {
        stat: "Crit Chance",
        target: "ใกล้เพดาน จากฐาน 5%",
        why: "แม้พรจะให้ Attack +10 เลขแบนยังแพ้คริตเมื่อเลเวลมอนสเตอร์ L2 สูง",
      },
      {
        stat: "Crit Damage",
        target: "ให้ใกล้แชนซ์ ฐาน 150%",
        why: "ขวานรีฟอร์จคริตดาเมจได้ถึง 40% ต้องมีแชนซ์ไปถึงจึงจะได้ใช้เพดานนั้น",
      },
      {
        stat: "Current HP Damage",
        target: "บนขวาน สูงได้ถึง 15%",
        why: "เป็นชั้นกายภาพของสายนี้ คู่ประหารเมื่อเลือดศัตรูต่ำ และพร Hephaestus อีก 2% ของเลือดปัจจุบันศัตรู ค่านี้มาจากรีฟอร์จ ไม่ใช่แต้มสกิล",
      },
      {
        stat: "Max Health",
        target: "Hearty ที่กางเกงและรองเท้า",
        why: "Paladin หิวเร็ว Demi-God รับดาเมจเพิ่ม 20% เลือดก้อนนี้กันการตายช่วง Impervium ยังติดคูลดาวน์",
      },
    ];
  }
  return [
    {
      stat: "Crit Chance",
      target: "ใกล้เพดาน จากฐาน 5%",
      why: "Frijani ให้มา +20% อยู่แล้ว จึงถึงเพดานเร็ว เปลี่ยน Samurai เป็น Warlord ทันทีที่ชนเพดาน",
    },
    {
      stat: "Crit Damage",
      target: "ให้ใกล้แชนซ์",
      why: "เผ่าให้มา +50% ฐานอาวุธคือ 150% แชนซ์ที่ล้ำเกิน 100% โดยดาเมจคริตไม่ตาม จะเริ่มลดดาเมจเองเพราะชั้นถัดไปคูณ 0.85",
    },
    {
      stat: "Max Health",
      target: "กองเพื่อชดการรับดาเมจ +30%",
      why: "life steal 20% ฟื้นเมื่อฟาดโดน ไม่ฟื้นตอนยืนกินดาเมจ Hearty อยู่ที่กางเกงกับรองเท้า",
    },
    {
      stat: "Luck",
      target: "ประมาณ 20",
      why: "จุดหวานของ Slicer's Dice และ Ace of Iron เกินนี้คุ้มน้อยกว่าการปิดคู่คริต",
    },
  ];
}

interface Flags {
  caster: boolean;
  shield: boolean;
  lowHp: boolean;
  poison: boolean;
  bowyer: boolean;
}

function flagsFor(line: Line, school: School | null): Flags {
  return {
    caster: line.path === "mage" || line.path === "hybrid",
    shield: line.id !== "melee_crit" && line.id !== "ice" && line.id !== "poison",
    lowHp:
      line.id === "melee_crit" ||
      line.id === "ice" ||
      line.id === "archer" ||
      line.id === "poison" ||
      school?.id === "ender",
    poison: line.id === "poison" || school?.id === "nature",
    bowyer: line.id === "archer",
  };
}

function skillRows(stage: StageId, flags: Flags, focus: string, burn: boolean): Skill[] {
  const rows: Skill[] = [
    {
      step: "",
      node: "Crit Chance",
      why: "ฐาน 5% ดันใกล้เพดานก่อนสเตตัสอื่น ซื้อแต้มด้วย XP ที่หยิบจากบล็อก Global XP ขณะราคายังถูก เก็บ Wisdom Scroll ไว้ตอนแพง รางวัลเควสต์ที่เป็นเลเวลผู้เล่นซื้อแต้มไม่ได้",
      tone: "success",
    },
    {
      step: "",
      node: "Crit Damage",
      why: "ฐาน 150% ไล่ให้ใกล้แชนซ์ คริตเกิน 100% ติดหลายชั้นและชั้นถัดไปคูณ 0.85",
      tone: "success",
    },
    {
      step: "",
      node: flags.caster ? "Spell Power ของธาตุที่ใช้" : "ชั้นเฉพาะสาย",
      why: focus,
      tone: "info",
    },
  ];
  if (flags.caster) {
    rows.push({
      step: "",
      node: "Enchanter",
      why: "ลดเลเวลที่ต้องใช้เอนชานต์ 30% TheZemor ให้ทำคู่โหนด amplification ก่อน Excalibur",
      tone: "info",
    });
    rows.push({
      step: "",
      node: "Excalibur",
      why: "ดาเมจ +5% ต่อระดับเอนชานต์บนอาวุธ ลงเมื่ออาวุธมีผลเอนชานต์แล้ว ถ้าอาวุธยังเปล่าให้ข้ามขั้นนี้ไปก่อน",
      tone: "info",
    });
  } else if (stage !== "early") {
    rows.push({
      step: "",
      node: "Excalibur",
      why: "ดาเมจ +5% ต่อระดับเอนชานต์บนอาวุธ เริ่มเมื่ออาวุธมีผลเอนชานต์แล้ว ยัดผลที่ไม่ชนกันเพื่อเพิ่มระดับ",
      tone: "info",
    });
  }
  if (!flags.caster && (stage === "late" || stage === "end")) {
    rows.push({
      step: "",
      node: "Enchanter",
      why: "ลดเลเวลเอนชานต์ 30% เมื่อเริ่มร่ายหนังสือระดับสูง",
      tone: "info",
    });
  }
  if (stage === "mid" || stage === "late" || stage === "end") {
    rows.push({
      step: "",
      node: "+10% Crit Damage ต่อ gem ในอาวุธ",
      why: "คุ้มเมื่ออาวุธขึ้นข้อความ Socketed และมี gem ฝังจริง",
      tone: "info",
    });
  }
  if (flags.poison && stage !== "early") {
    rows.push({
      step: "",
      node: "Persistent Toxin",
      why: "โอกาสเพิ่มระดับโพชัน +50% และได้สูตรอาบยา ใช้คู่โหนด +35% Crit Damage ต่อเป้าหมายติดพิษ",
      tone: "info",
    });
  }
  if (flags.lowHp && (stage === "late" || stage === "end")) {
    rows.push({
      step: "",
      node: "Berserker แล้ว Blood Veil",
      why: "Berserker ให้ดาเมจ +10% เมื่อเลือดไม่เกิน 75% และ +20% เมื่อไม่เกิน 50% Blood Veil ให้คริตแชนซ์ +15% เมื่อเลือดไม่เกิน 50% และฟื้น 1 เมื่อโจมตีโดน",
      tone: "info",
    });
  }
  if (flags.shield && (stage === "late" || stage === "end")) {
    rows.push({
      step: "",
      node: "Aegis",
      why: "+5 Blocking ต่อระดับเอนชานต์บนโล่",
      tone: "info",
    });
  }
  if ((stage === "late" || stage === "end") && flags.caster) {
    rows.push({
      step: "",
      node: "gem effectiveness แล้ว Aristocrat",
      why: "Aristocrat ให้ช่องแหวนเพิ่มหนึ่งช่อง เป็นช่องสวม ไม่ใช่ socket ลงเมื่อมี gem ดีและแหวนใบที่สองแล้วเท่านั้น",
      tone: "info",
    });
  }
  if (flags.bowyer && stage === "early") {
    rows.push({
      step: "",
      node: "จำเพจ Bowyer ไว้",
      why: "ถ้าจะมินแม็กซ์ของคราฟต์ ลำดับเพจคือ Alchemist, Bowyer, Armorsmith, Augmenteer โบนัสติดเฉพาะของที่คราฟต์บนโต๊ะวานิลลา และอยู่ต่อแม้รีเซ็ตต้นไม้ ยังไม่ใช้ Amnesia ในช่วงนี้",
      tone: "neutral",
    });
  }
  if (burn && (stage === "late" || stage === "end")) {
    rows.push({
      step: "",
      node: "ชุดโหนดเผา",
      why: "ให้ทั้งดาเมจและคริตเมื่อเป้าหมายติดไฟ ใช้กับ Pyriosi, พร Ra หรือสำนักไฟที่จุดเป้าหมายได้เอง",
      tone: "info",
    });
  }
  if (stage === "end") {
    rows.push({
      step: "",
      node: "Amnesia Scroll เฉพาะรอบเพจคราฟต์",
      why: "คืนแต้มทั้งหมดแต่หัก 20% ได้จากร้าน 8 Champion Coins จากสูตร Wisdom Scroll กับ Eye of Ender และ Netherite 3 หรือจากมังกร ไม่จำเป็นต่อการจบเกม",
      tone: "warning",
    });
  }
  const numbered = rows.map((row, index) => ({ ...row, step: String(index + 1) }));
  numbered.push({
    step: "ข้าม",
    node: "ของที่ยังไม่ลงช่วงนี้",
    why: skipWhy(stage),
    tone: "warning",
  });
  return numbered;
}

function skipWhy(stage: StageId): string {
  if (stage === "early") {
    return "โหนด +1 Socket ที่ไม่มีโบนัสอื่นไม่ทำงานใน Dragonfyre ยังไม่ลง gem effectiveness กับ Aristocrat และยังไม่ใช้ Amnesia Scroll";
  }
  if (stage === "mid") {
    return "ยังไม่ลง Aristocrat จนกว่าจะมีแหวนใบที่สอง ยังไม่ลง gem effectiveness จนกว่า gem จะถึงอย่างน้อย Flawless ข้ามโหนด Armor กับ Attack Damage แบบเลขตรง";
  }
  return "ยังข้ามโหนด +1 Socket เปล่า อย่ารีฟอร์จ Galactic Core บนของที่จะไปติดคำสาป L2 Hostility เพราะมีรายงานแครช รวมถึงสร้อยข้อมือ บันเดิล arcane scroll และ spell focus ที่รีฟอร์จ Esoteric";
}

function levelCallout(level: number | null, stage: StageId): {
  tone: "info" | "warning" | "success";
  title: string;
  body: string;
} {
  if (level == null) {
    return {
      tone: "info",
      title: "XP Level ยังไม่ระบุ",
      body: "ลำดับสเตตัสยึดช่วงเกม XP Level ไม่ได้แจกแต้มสกิล แต้มมาจากบล็อก Global XP กับ Wisdom Scroll และเพดานตาม FAQ ของ Dragonfyre คือ 110",
    };
  }
  if (stage === "end" && level < 30) {
    return {
      tone: "warning",
      title: `เลเวล ${level} ยังจ่ายงานเอนด์เกมไม่ไหว`,
      body: "รีฟอร์จและโต๊ะเอนชานต์กินเลเวลในตัว ชุดชั้นหนังสือ 15 ชิ้นเพิ่งพาไปถึงร่ายระดับ 30 รีฟอร์จ Mythic ระดับ 3 ต้องมี 150 เลเวลในตัว ใช้ฝุ่น 15 กอง แล้วเสีย 3 เลเวล",
    };
  }
  if (level >= 150) {
    return {
      tone: "success",
      title: `เลเวล ${level} ถึงเงื่อนไขรีฟอร์จ Mythic ระดับ 3`,
      body: "ต้องมี 150 เลเวลในตัว ใช้ฝุ่นอัญมณี 15 กอง แล้วเสีย 3 เลเวล ร่ายระดับ 100 ยังต้องมี Eterna 50 ซึ่งมาจากชั้นหนังสือ ไม่ได้มาจากเลเวลผู้เล่นอย่างเดียว ชุดสั้นที่สุดคือ Soul-Touched Sculkshelf 20 กับ Draconic Endshelf 1",
    };
  }
  if (level >= 30) {
    return {
      tone: "info",
      title: `เลเวล ${level} ผ่านเพดานร่าย 30 ของชั้นหนังสือวานิลลาแล้ว`,
      body: "รีฟอร์จ Mythic ระดับ 3 ยังไม่ถึง เพราะต้องมี 150 เลเวลในตัว ระหว่างนี้กอง XP ไว้ในบล็อก Global XP ก่อนเข้าฟาร์ม มอนสเตอร์บัฟฆ่าได้แม้ปิด AI",
    };
  }
  return {
    tone: "info",
    title: `เลเวล ${level} ยังอยู่ใต้ร่ายระดับ 30`,
    body: "ชั้นหนังสือวานิลลา 15 ชิ้นคือชุดแรกที่คุ้ม ทำ Simple Reforging Table ให้ได้ถึง Rare ก่อนไล่ Galactic Core",
  };
}

function farmsFor(line: Line, stage: StageId): Farm[] {
  return [...SHARED_FARMS[stage], ...(line.extra[stage] ?? [])];
}

globalThis.Guide = {
  STAGES, SCHOOLS, LINES, SHARED_FARMS, STATIONS,
  activeSchool, originText, armorText, armorShort, offhandText,
  curiosText, reforgeText, enchantText, limitText, statRows,
  flagsFor, skillRows, levelCallout, farmsFor,
};
