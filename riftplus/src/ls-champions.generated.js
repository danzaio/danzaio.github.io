export const lsChampions = [
  {
    "name": "APHELIOS",
    "label": "LS",
    "role": "26 menu sections",
    "description": "LegendSense DanZAIO Aphelios menu with 111 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aphelios_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/aphelios2/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 1)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Semi-Manual Q (Keybind / key string.byte(\"T\"))",
          "Semi Swap (W) (Keybind / key string.byte(\"G\"))",
          "Semi-Manual R (Keybind / key string.byte(\"Y\"))"
        ]
      },
      {
        "title": "Q - Weapon Logic",
        "items": [
          "Use Q in Combo (Toggle / default true)",
          "Use Q in Harass (Toggle / default true)",
          "Use Q in Clear (Toggle / default true)",
          "Use Q in LastHit (Toggle / default true)",
          "Allow blind Gravitum Q (Toggle / default true)",
          "Never use Sentry on Red+White (Toggle / default false)",
          "Gravitum Q manual if not killable (Toggle / default false)",
          "Infernum auto only if killable in AA range (Toggle / default false)",
          "AA-gate scope (Selector / default index 0)",
          "AA-gate window (ms) (Slider / default 500)",
          "Low-ammo hold scope (Selector / default index 0)",
          "Low-ammo threshold (Slider / default 10)",
          "Forbid dash-follow logic (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Weapon Logic / Per-Weapon Q Mode",
        "items": [
          "Calibrum Q (Selector / default index 0)",
          "Severum Q (Selector / default index 0)",
          "Gravitum Q (Selector / default index 0)",
          "Infernum Q (Selector / default index 0)",
          "Crescendum Q (Selector / default index 0)"
        ]
      },
      {
        "title": "Weapon Pair Matrix",
        "items": [
          "Calibrum + Severum (Toggle / default true)",
          "Calibrum + Gravitum (Toggle / default true)",
          "Calibrum + Infernum (Toggle / default true)",
          "Calibrum + Crescendum (Toggle / default true)",
          "Severum + Gravitum (Toggle / default true)",
          "Severum + Infernum (Toggle / default true)",
          "Severum + Crescendum (Toggle / default true)",
          "Gravitum + Infernum (Toggle / default true)",
          "Gravitum + Crescendum (Toggle / default true)",
          "Infernum + Crescendum (Toggle / default true)"
        ]
      },
      {
        "title": "W - Weapon Swap",
        "items": [
          "Swap Policy (Selector / default index 0)",
          "Auto Swap in Combo (Toggle / default true)",
          "Auto Swap in Harass (Toggle / default true)",
          "Auto Swap in Clear (Toggle / default true)",
          "Swap if no target (Toggle / default true)",
          "Pause auto-swaps after manual W (Toggle / default true)",
          "Manual W pause (sec) (Slider / default 3)",
          "Prioritize Infernum autos (Green+Blue) (Toggle / default true)",
          "Calibrum off-hand optimization (Selector / default index 1)",
          "Min Swap Delay (ms) (Slider / default 0)"
        ]
      },
      {
        "title": "W - Weapon Swap / Post-Severum Q",
        "items": [
          "Force Red(Severum) -> White(Crescendum) (Toggle / default true)",
          "Min Crescendum stacks (Slider / default 1)",
          "Force Red -> Blue swap (Toggle / default true)",
          "Force window (ms) (Slider / default 1500)"
        ]
      },
      {
        "title": "W - Weapon Swap / Special Combos",
        "items": [
          "Severum + Calibrum Special (Toggle / default true)",
          "Infernum + Calibrum Special (Toggle / default true)"
        ]
      },
      {
        "title": "W - Weapon Swap / Rotation Engine",
        "items": [
          "Cycle Preset (Selector / default index 0)",
          "Prefer cycle over tactical swap (Toggle / default false)",
          "Show correction hint on HUD (Toggle / default true)"
        ]
      },
      {
        "title": "W - Weapon Swap / Windwall Bias",
        "items": [
          "Bias toward Severum vs windwall threats (Toggle / default true)",
          "Severum bias score (Slider / default 18)"
        ]
      },
      {
        "title": "W - Weapon Swap / Windwall Bias / Per-Enemy Windwall Threat",
        "items": [
          "threat_ (Toggle / default defaultThreat)"
        ]
      },
      {
        "title": "R - Moonlight Vigil",
        "items": [
          "Manual key only (Toggle / default false)",
          "Use R in Combo (Toggle / default true)",
          "Use R for Killsteal (Toggle / default true)",
          "Use for Teamfight Hits (Toggle / default true)",
          "Use for Execute (Toggle / default true)",
          "Use on CC Follow-up (Toggle / default true)",
          "Use as Panic Peel (Toggle / default true)",
          "Min enemies for Teamfight R (Slider / default 2)",
          "Execute if target HP% <= (Slider / default 30)",
          "Panic if my HP% <= (Slider / default 28)",
          "Never auto-cast Gravitum R (Toggle / default true)",
          "Infernum R min targets (Slider / default 2)",
          "Crescendum R close range (Slider / default 450)",
          "Severum R auto if HP% <= (Slider / default 40)",
          "Calibrum R killable only (Toggle / default true)",
          "Enable Calibrum Q->R combo window (Toggle / default true)"
        ]
      },
      {
        "title": "Harass Settings",
        "items": [
          "Min Mana % (Slider / default 50)"
        ]
      },
      {
        "title": "Combo Settings",
        "items": [
          "Min Mana % (Slider / default 10)"
        ]
      },
      {
        "title": "Lane/Jungle/LastHit",
        "items": [
          "Min Mana % (Slider / default 40)",
          "Infernum Q min minions (Slider / default 3)"
        ]
      },
      {
        "title": "KillSteal Settings",
        "items": [
          "Enable KillSteal (Toggle / default true)",
          "Use Q (Toggle / default true)",
          "Use R (Toggle / default true)"
        ]
      },
      {
        "title": "Anti-Gapclose / Interrupt",
        "items": [
          "Anti-Gapclose with Gravitum Q (Toggle / default true)",
          "Interrupt immobile targets (Toggle / default true)",
          "Gapclose trigger range (Slider / default 525)"
        ]
      },
      {
        "title": "Anti-Gapclose / Interrupt / Anti-Melee",
        "items": [
          "Enable anti-melee defensive root (Toggle / default true)",
          "Trigger range (Slider / default 325)"
        ]
      },
      {
        "title": "Anti-Gapclose / Interrupt / Anti-Melee / Per-Enemy",
        "items": [
          "melee_ (Toggle / default true)"
        ]
      },
      {
        "title": "Flee Settings",
        "items": [
          "Use W swap in Flee (Toggle / default true)",
          "Use Severum Q in Flee (Toggle / default true)"
        ]
      },
      {
        "title": "Safety Gates",
        "items": [
          "Use mana gates (Toggle / default true)",
          "Turret safety (Toggle / default true)",
          "Forbid turret dive (Toggle / default true)",
          "Invuln/spell shield checks (Toggle / default true)",
          "Anti-overkill (Toggle / default true)",
          "Apply min-enemies gate to R (Toggle / default true)",
          "Require ally proximity (Toggle / default true)",
          "Min nearby allies (Slider / default 1)",
          "Ally check range (Slider / default 900)",
          "Dodge-aware conservative casts (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Draw Q Range (Toggle / default true)",
          "Draw R Range (Toggle / default true)",
          "Show status panel (Toggle / default true)",
          "Status panel opacity (Slider / default 62)"
        ]
      },
      {
        "title": "Per-Enemy Controls",
        "items": [
          "Enable advanced per-enemy controls (Toggle / default true)"
        ]
      },
      {
        "title": "Per-Enemy Controls / Gravitum Manual-First Overrides",
        "items": [
          "manual_ (Toggle / default false)"
        ]
      },
      {
        "title": "Per-Enemy Controls / Anti-Gapclose Targets",
        "items": [
          "gap_ (Toggle / default true)"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "Enable debug logs (Toggle / default false)",
          "Per-message cooldown (ms) (Slider / default 350)",
          "Tick snapshot interval (sec) (Slider / default 1)",
          "Menu snapshot interval (sec) (Slider / default 5)",
          "Swap probe interval (ms) (Slider / default 500)",
          "Ammo/buff probe interval (ms) (Slider / default 350)",
          "Q probe interval (ms) (Slider / default 350)",
          "Log cast/slot/path events (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "EZREAL",
    "label": "LS",
    "role": "14 menu sections",
    "description": "LegendSense DanZAIO Ezreal menu with 81 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/ezreal/menu.lua",
    "featureGroups": [
      {
        "title": "RiftPlusPred Settings",
        "items": [
          "Prediction Engine (Selector / default index 0)",
          "Q Hitchance (Selector / default index 2)",
          "W Hitchance (Selector / default index 2)",
          "R Hitchance (Selector / default index 2)",
          "Include Ping in Prediction (Toggle / default true)",
          "Extra Ping Compensation (ms) (Slider / default 0)",
          "Prediction Analysis Logs (Toggle / default false)"
        ]
      },
      {
        "title": "Q - Mystic Shot",
        "items": [
          "Toggle Auto Q (Keybind / key 84)",
          "Combo: Keep Passive Stacks Alive (Keybind / key 72)",
          "Disable Auto Q Under Turret (Toggle / default true)",
          "Harass with Q While Clearing (Toggle / default true)",
          "Q Range (Slider / default 1100)",
          "Use Q in Combo (Toggle / default true)",
          "Use Q in Harass (Toggle / default true)",
          "Auto Q on CC'd Targets (Toggle / default true)"
        ]
      },
      {
        "title": "W - Essence Flux",
        "items": [
          "Use W in Combo (Toggle / default true)",
          "Use W in Harass (Toggle / default true)",
          "Harass W: Only if Q/AA Possible (Toggle / default true)",
          "Combo W: Only if Can Hit Q or in AA Range (Toggle / default false)",
          "Use W on Towers (Toggle / default true)",
          "Only on Towers in AA Range (Toggle / default true)",
          "W Range (Slider / default 1100)",
          "Auto W on CC'd Targets (Toggle / default true)"
        ]
      },
      {
        "title": "E - Arcane Shift",
        "items": [
          "Use E to KS (E Forward to Hit Q) (Toggle / default false)",
          "Use E for Better Q Positioning (Toggle / default false)"
        ]
      },
      {
        "title": "E - Arcane Shift / E Safety",
        "items": [
          "Don't E Under Enemy Turret (Toggle / default true)",
          "Min HP % For E Forward (Slider / default 30)",
          "Max Enemies Near E Position (Slider / default 1)",
          "Enemy Check Radius (Slider / default 700)",
          "Allow Unsafe E For Guaranteed Kill (Toggle / default false)"
        ]
      },
      {
        "title": "R - Trueshot Barrage",
        "items": [
          "R Semi-Manual Key (Keybind / key 71)",
          "R Usage Mode (Selector / default index 1)",
          "Use R Below % HP (Slider / default 40)",
          "R Cast Mode (Selector / default index 0)",
          "Multi-Hit: Min Targets (Slider / default 2)",
          "Maximum R Range (Slider / default 2500)",
          "Only R If Target Out of AA Range (Toggle / default true)",
          "Don't R if Target in Q Range (Toggle / default false)",
          "Don't R Under Turret (Toggle / default true)",
          "Don't R if Q Can Kill (Toggle / default true)",
          "Don't R if 2 AAs Can Kill (Toggle / default true)",
          "Auto R on CC'd Targets (Toggle / default false)"
        ]
      },
      {
        "title": "R - Trueshot Barrage / R Safety",
        "items": [
          "Block R On Spell Shield (Toggle / default true)",
          "Block R On Stasis / Invulnerable (Toggle / default true)"
        ]
      },
      {
        "title": "R - Trueshot Barrage / R Targets",
        "items": [
          "Use R on (Toggle / default true)"
        ]
      },
      {
        "title": "Combo Settings",
        "items": [
          "Focus W-Marked Targets (Toggle / default false)",
          "Prioritize Q on W-Marked Target (Toggle / default true)",
          "Force Q on W-Marked Target (Toggle / default false)",
          "Ignore Q Minion Collision (Toggle / default false)",
          "Smart AA Weaving (Toggle / default true)",
          "Max DPS combo mode (Toggle / default true)",
          "Don't W if Q Can Kill (Toggle / default false)",
          "Don't Q if W+AA Can Kill (Toggle / default false)",
          "Don't W/Q if AA Can Kill (Toggle / default false)"
        ]
      },
      {
        "title": "Harass Settings",
        "items": [
          "Focus W-Marked Targets (Toggle / default true)",
          "Minimum Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "Farm Settings",
        "items": [
          "Use Q to Clear (Keybind / key 77)",
          "Prioritize Harass on V (LaneClear) (Toggle / default false)",
          "Minimum Mana % (Slider / default 40)",
          "Q Only to Lasthit (Toggle / default false)"
        ]
      },
      {
        "title": "Jungle Settings",
        "items": [
          "Use Q (Toggle / default true)",
          "Use W on Monsters (Toggle / default true)"
        ]
      },
      {
        "title": "Kill Steal Settings",
        "items": [
          "Enable Kill Steal (Toggle / default true)",
          "Use Q (Toggle / default true)",
          "Use W (Toggle / default false)",
          "Use R (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Show Passive Bar (StatusHUD) (Toggle / default true)",
          "Show Auto Q (StatusHUD) (Toggle / default true)",
          "Show Hitchance (StatusHUD) (Toggle / default true)",
          "Show Q Farm Mode (StatusHUD) (Toggle / default true)",
          "Show W Mark Timer (StatusHUD) (Toggle / default true)",
          "Draw Q Range (Draw color)",
          "Draw W Range (Draw color)",
          "Draw E Range (Draw color)",
          "Draw R Range (Draw color)",
          "Draw R Range on Minimap (Toggle / default true)",
          "Draw R Killable Marker on Minimap (Toggle / default true)",
          "Stylized Mode (Toggle / default true)",
          "Player Visuals (Toggle / default true)",
          "Player Visual Style (Selector / default index 1)"
        ]
      }
    ]
  },
  {
    "name": "HWEI",
    "label": "LS",
    "role": "25 menu sections",
    "description": "LegendSense DanZAIO Hwei menu with 91 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Hwei_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/hwei/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction",
        "items": [
          "QQ Hitchance (Selector / default index 2)",
          "QW Hitchance (Selector / default index 3)",
          "QE Hitchance (Selector / default index 2)",
          "EQ Hitchance (Selector / default index 2)",
          "EW Hitchance (Selector / default index 3)",
          "EE Hitchance (Selector / default index 2)",
          "R Hitchance (Selector / default index 3)"
        ]
      },
      {
        "title": "Modes",
        "items": [
          "Harass Min Mana % (Slider / default 35)",
          "Clear Min Mana % (Slider / default 40)",
          "Reserve E Mana % (Slider / default 12)",
          "Reserve R Mana % (Slider / default 18)",
          "Min Cast Gap (ms) (Slider / default 90)"
        ]
      },
      {
        "title": "Combo / QQ - Devastating Fire",
        "items": [
          "Use QQ (Toggle / default true)",
          "Max Range (Slider / default 800)"
        ]
      },
      {
        "title": "Combo / QW - Severing Bolt",
        "items": [
          "Use QW (Toggle / default true)",
          "Execute / Locked Only (Toggle / default true)",
          "Immobile Or Isolated Only (Toggle / default true)",
          "Max Target HP % (Slider / default 45)",
          "Min Range (Slider / default 700)"
        ]
      },
      {
        "title": "Combo / QE - Molten Fissure",
        "items": [
          "Use QE (Toggle / default true)",
          "Min Enemies For QE (Slider / default 2)"
        ]
      },
      {
        "title": "Combo / WE - Stirring Lights",
        "items": [
          "Use WE Before Auto Attack (Toggle / default true)",
          "Min Range To Buff (Slider / default 250)"
        ]
      },
      {
        "title": "Combo / WQ - Fleeting Current",
        "items": [
          "Use WQ To Chase (Toggle / default true)",
          "Min Target Range (Slider / default 650)"
        ]
      },
      {
        "title": "Combo / WW - Pool of Reflection",
        "items": [
          "Use WW Defensively (Toggle / default true)",
          "Self HP % (Slider / default 40)",
          "Nearby Enemies (Slider / default 1)"
        ]
      },
      {
        "title": "Combo / EQ - Grim Visage",
        "items": [
          "Use EQ (Toggle / default true)",
          "Prefer When Target Is Threatening (Toggle / default true)",
          "Threat Range (Slider / default 525)"
        ]
      },
      {
        "title": "Combo / EW - Gaze of the Abyss",
        "items": [
          "Use EW On Locked Targets (Toggle / default true)",
          "Only On Locked / Immobile (Toggle / default true)"
        ]
      },
      {
        "title": "Combo / EE - Crushing Maw",
        "items": [
          "Use EE (Toggle / default true)",
          "Min Enemies (Slider / default 2)",
          "Always Use On Immobile (Toggle / default true)"
        ]
      },
      {
        "title": "Combo / R - Spiraling Despair",
        "items": [
          "Use R (Toggle / default true)",
          "Only High Confidence / CC (Toggle / default true)",
          "Min Enemies (Slider / default 1)",
          "Single Target HP % (Slider / default 35)",
          "Single Target Requires Kill / Low HP (Toggle / default true)"
        ]
      },
      {
        "title": "Harass / EE",
        "items": [
          "Use EE Setup (Toggle / default true)",
          "Min Range (Slider / default 450)",
          "Only If Q Ready (Toggle / default true)"
        ]
      },
      {
        "title": "Harass / QQ",
        "items": [
          "Use QQ (Toggle / default true)"
        ]
      },
      {
        "title": "Harass / WE",
        "items": [
          "Use WE Before Auto Attack (Toggle / default true)"
        ]
      },
      {
        "title": "Harass / QW",
        "items": [
          "Use QW On Locked Targets (Toggle / default true)",
          "Only Locked / Immobilized (Toggle / default true)"
        ]
      },
      {
        "title": "Lane Clear / QE",
        "items": [
          "Use QE (Toggle / default true)",
          "Min Minions (Slider / default 3)"
        ]
      },
      {
        "title": "Jungle Clear",
        "items": [
          "Use QE (Toggle / default true)",
          "Use QQ (Toggle / default true)",
          "Use WE (Toggle / default true)"
        ]
      },
      {
        "title": "Last Hit",
        "items": [
          "Use QW On Cannon / Siege (Toggle / default false)",
          "Use QQ (Toggle / default false)"
        ]
      },
      {
        "title": "Killsteal",
        "items": [
          "Use QQ (Toggle / default true)",
          "Use QW (Toggle / default true)",
          "Use R (Toggle / default true)"
        ]
      },
      {
        "title": "Reactive",
        "items": [
          "Anti-Gapclose EQ (Toggle / default true)",
          "Anti-Gapclose EE (Toggle / default true)",
          "Use EQ On Melee Threat (Toggle / default true)",
          "Interrupt With EQ (Toggle / default true)",
          "Interrupt With EW (Toggle / default false)",
          "QW On Immobile (Toggle / default true)",
          "R On Hard-Locked Targets (Toggle / default true)",
          "R On Hard-Locked Targets Only In Combo (Toggle / default true)",
          "Auto WW Self (Toggle / default true)",
          "Melee Threat Range (Slider / default 350)",
          "WW Self HP % (Slider / default 30)",
          "WW Nearby Enemies (Slider / default 1)"
        ]
      },
      {
        "title": "Manual",
        "items": [
          "Semi QQ (Keybind / key string.byte(\"T\"))",
          "Semi QW (Keybind / key string.byte(\"Y\"))",
          "Semi EQ (Keybind / key string.byte(\"U\"))",
          "Semi EE (Keybind / key string.byte(\"G\"))",
          "Semi R (Keybind / key string.byte(\"H\"))",
          "Flee Helper (Keybind / key string.byte(\"J\"))"
        ]
      },
      {
        "title": "Draw",
        "items": [
          "Enable Draw (Toggle / default true)",
          "Show Status HUD (Toggle / default true)",
          "StatusHUD Kill Window (Toggle / default true)",
          "StatusHUD Recommended Spell (Toggle / default true)",
          "QQ Range (Draw color)",
          "QW Range (Draw color)",
          "QE Range (Draw color)",
          "E Range (Draw color)",
          "R Range (Draw color)"
        ]
      },
      {
        "title": "Draw / Mid Lane Helper",
        "items": [
          "Enable Panel (Toggle / default true)",
          "Low HP Threshold % (Slider / default 40)",
          "Max Enemies (Slider / default 3)"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "Enable Debug Logs (Toggle / default false)",
          "Per-Message Cooldown (ms) (Slider / default 250)",
          "Log QQ Source (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "JINX",
    "label": "LS",
    "role": "14 menu sections",
    "description": "LegendSense DanZAIO Jinx menu with 66 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/jinx/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Semi-Manual W (Keybind / key 71)",
          "Semi-Manual E (Keybind / key 72)",
          "Semi-Manual R (Keybind / key 84)"
        ]
      },
      {
        "title": "Q - Switcheroo!",
        "items": [
          "Enable Combo Q Logic (Toggle / default true)",
          "Combo Q Mode (Selector / default index 0)",
          "Stacks to Swap to Rockets (Slider / default 3)",
          "Stacks to Swap Back to Minigun (Slider / default 1)",
          "Swap Lockout (ms) (Slider / default 100)",
          "Auto Rockets in Harass/LaneClear (Out of AA) (Toggle / default true)",
          "Default to Minigun in Lane Clear (Toggle / default true)",
          "Switch for Waveclear AoE (Toggle / default false)",
          "Minions to Splash with Q (Slider / default 5)",
          "Farm Minimum Mana % (Slider / default 60)",
          "Q Farm Out of Range Minions (Toggle / default true)",
          "Poke Q Through Minions (LaneClear) (Toggle / default true)"
        ]
      },
      {
        "title": "W - Zap!",
        "items": [
          "Use W in Combo (Toggle / default true)",
          "Use W in Harass (Toggle / default true)",
          "Use W on champs during Lane Clear (Toggle / default true)",
          "Combo: Only use outside AA range (Toggle / default true)",
          "Harass: Only use outside AA range (Toggle / default true)",
          "LaneClear: Only use outside AA range (Toggle / default false)",
          "W Smart TTK Check (Toggle / default true)",
          "Harass Minimum Mana % (Slider / default 50)"
        ]
      },
      {
        "title": "E - Flame Chompers!",
        "items": [
          "Combo E Mode (Selector / default index 3)",
          "E Minimum Cast Range (Slider / default 120)",
          "E Recast Lockout (ms) (Slider / default 900)",
          "E on Path/Chokepoint (Toggle / default true)",
          "Use E to Peel (Toggle / default false)",
          "E Max Range (Slider / default 925)"
        ]
      },
      {
        "title": "R - Super Mega Death Rocket!",
        "items": [
          "Auto R To Execute in Combo (Toggle / default true)",
          "Don't R if target in W range (Combo) (Toggle / default true)",
          "R Minimum Range (Slider / default 1475)",
          "R Maximum Range (Slider / default 3000)"
        ]
      },
      {
        "title": "Automatic",
        "items": [
          "Auto E on CC'd Targets (Toggle / default true)",
          "Enable Anti-Gapcloser E (Toggle / default true)",
          "Anti-Gapclose E Mode (Selector / default index 1)",
          "Interrupt Spells with E (Toggle / default true)"
        ]
      },
      {
        "title": "Killsteal Settings",
        "items": [
          "Enable Killsteal (Toggle / default true)",
          "Use W (Toggle / default false)",
          "Use R (Toggle / default false)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Status Visualizers",
        "items": [
          "Status Display Mode (Selector / default index 1)"
        ]
      },
      {
        "title": "Drawing Settings / Status Visualizers / Display Toggles",
        "items": [
          "Q Combo Switch (Toggle / default true)",
          "Q Combo AoE (Toggle / default false)",
          "Q Farm AoE (Toggle / default false)",
          "W Combo (Toggle / default false)",
          "W Combo (Out of AA) (Toggle / default false)",
          "W Harass (Out of AA) (Toggle / default false)",
          "E Combo Mode (Toggle / default false)",
          "E Self Peel (Toggle / default true)",
          "E Anti-Gapclose (Toggle / default true)",
          "R Auto-Execute (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Status Indicators",
        "items": [
          "Show 'GET EXCITED!' Cue (Toggle / default true)",
          "Show Weapon Status (Toggle / default true)",
          "Show R Killable Text (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Range Indicators",
        "items": [
          "Draw Q Switch Range (Toggle / default true)",
          "Draw W Range (Toggle / default true)",
          "Draw E Range (Toggle / default false)",
          "Draw R Range (Toggle / default false)",
          "Draw R Range on Minimap (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Damage Indicator",
        "items": [
          "Enable Damage Indicator (Toggle / default true)",
          "Show W Damage (Toggle / default true)",
          "Show E Damage (Toggle / default true)",
          "Show R Damage (Toggle / default true)",
          "Number of AAs (Slider / default 3)"
        ]
      }
    ]
  },
  {
    "name": "KAI'SA",
    "label": "LS",
    "role": "22 menu sections",
    "description": "LegendSense DanZAIO Kai'Sa menu with 83 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/kaisa/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Semi-Manual W (Keybind / key 85)",
          "Flee Key (Keybind / key 71)",
          "Force R (to mouse target) (Keybind / key 84)",
          "Prioritize 4-Stack AA Target (Keybind / key 76)",
          "Harass During Lane Clear (Toggle / default true)",
          "Fast Evolve (Recall + Evolve All) (Keybind / key 78)"
        ]
      },
      {
        "title": "Q - Icathian Rain / Combat Logic",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Use Only After Attack (Toggle / default false)",
          "Use Only On Targets With Plasma (Toggle / default true)",
          "Minimum Plasma Stacks >= (Slider / default 2)",
          "Enable Isolation Check (Toggle / default true)",
          "Units near target <= (Slider / default 2)"
        ]
      },
      {
        "title": "Q - Icathian Rain / Harass Logic",
        "items": [
          "Use in Harass (Toggle / default true)",
          "Harass Mana Limit [%] (Slider / default 60)",
          "Use Only After Attack (Toggle / default false)",
          "Use Only On Targets With Plasma (Toggle / default false)",
          "Minimum Plasma Stacks >= (Slider / default 1)",
          "Enable Isolation Check (Toggle / default false)",
          "Units near target <= (Slider / default 1)"
        ]
      },
      {
        "title": "Q - Icathian Rain / AutoKill Logic",
        "items": [
          "Use Q to Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Icathian Rain / Farm Logic",
        "items": [
          "Use for Lane Clear (Toggle / default true)",
          "Minimum Minions to Hit >= (Slider / default 3)",
          "Use for Jungle Clear (Toggle / default true)",
          "Farm Mana Limit [%] (Slider / default 40)"
        ]
      },
      {
        "title": "W - Void Seeker / Combat Logic",
        "items": [
          "W Usage Mode (Selector / default index 2)",
          "Use W to initiate if target out of AA range (Toggle / default true)",
          "Max Use Range (Slider / default 3000)",
          "Don't Use if Target Dist <= (Slider / default 0)",
          "Don't Use if X AAs Can Kill (Slider / default 2)",
          "Use During AA Windup (Toggle / default true)",
          "Use Only When Out of AA Range (Toggle / default false)",
          "Use on Target Passive Stacks >= (Slider / default 0)"
        ]
      },
      {
        "title": "W - Void Seeker / Auto W Logic",
        "items": [
          "Auto Use On CC'd Target (Toggle / default true)"
        ]
      },
      {
        "title": "W - Void Seeker / Harass Logic",
        "items": [
          "Use W for Harass (Toggle / default false)",
          "Use W to Harass in Lane Clear (Toggle / default false)",
          "Harass Mana Limit [%] (Slider / default 50)"
        ]
      },
      {
        "title": "W - Void Seeker / AutoKill Logic",
        "items": [
          "Use W to Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "W - Void Seeker / Jungle Logic",
        "items": [
          "Use W in Jungle (Toggle / default true)",
          "Just Hit Bigger SRU (Toggle / default true)",
          "Save Mana [%] (Slider / default 40)"
        ]
      },
      {
        "title": "E - Supercharge / Combat Logic",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Use E If Target Can Be Killed (Toggle / default true)",
          "Use If My HP [%] <= (Slider / default 40)",
          "Evolved: Only Use When Invisible (Toggle / default true)",
          "Evolved: Use E after Q for Invisibility (Toggle / default true)"
        ]
      },
      {
        "title": "E - Supercharge / Anti-Melee Settings",
        "items": [
          "Enable Anti-Melee System (Toggle / default true)",
          "Only use Evolved E for Anti-Melee (Toggle / default true)",
          "My HP is Below [%] to use E (Slider / default 60)",
          "Trigger if within X Distance (Slider / default 350)"
        ]
      },
      {
        "title": "E - Supercharge / Anti-Gapclose Settings",
        "items": [
          "Enable Anti-Gapclose System (Toggle / default true)",
          "Only use Evolved E for Anti-Gapclose (Toggle / default true)",
          "My HP is Below [%] to use E (Slider / default 75)"
        ]
      },
      {
        "title": "E - Supercharge / E Dodge Settings",
        "items": [
          "Use E to Dodge (Toggle / default true)",
          "Use Only After E Evolution (Toggle / default true)",
          "Only Dodge if My HP <= X% (Slider / default 70)"
        ]
      },
      {
        "title": "R - Killer Instinct",
        "items": [
          "R Usage Logic (Selector / default index 1)",
          "Killable AA Count (Slider / default 2)",
          "Only use Killable R if target out of AA range (Toggle / default false)"
        ]
      },
      {
        "title": "R - Killer Instinct / R Safety Settings",
        "items": [
          "Don't R into enemy turret (Toggle / default true)",
          "Min My HP % to R (Slider / default 30)",
          "Don't R into X or more enemies (Slider / default 3)",
          "Only use Offensive R in 1v1 (Toggle / default false)"
        ]
      },
      {
        "title": "R - Killer Instinct / R Defensive Settings",
        "items": [
          "Use R for Shield in 1v1 Duels (Toggle / default true)",
          "Use if My HP is Below % (Slider / default 25)"
        ]
      },
      {
        "title": "R - Killer Instinct / R Dodge Settings",
        "items": [
          "Use R to Dodge (Toggle / default true)",
          "Only Dodge if My HP <= X% (Slider / default 50)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable All Drawings (Toggle / default true)",
          "Q Range (Toggle / default true)",
          "W Range (Toggle / default true)",
          "R Range (Toggle / default false)",
          "Plasma Stacks (Toggle / default true)",
          "R Target Indicator (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Status Visualizers",
        "items": [
          "Status Display Mode (Selector / default index 1)"
        ]
      },
      {
        "title": "Drawing Settings / Status Visualizers / Display Toggles",
        "items": [
          "Show Evolutions (Toggle / default true)",
          "Show W Semi-Manual (Toggle / default true)",
          "Show R Semi-Manual (Toggle / default true)",
          "Priority AA Status (Toggle / default false)",
          "Q Isolation Check (Toggle / default false)",
          "W Initiate Mode (Toggle / default false)",
          "E Dodge Mode (Toggle / default false)",
          "R Dodge Mode (Toggle / default false)",
          "Show Plasma Status (HUD) (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "LEE SIN",
    "label": "LS",
    "role": "24 menu sections",
    "description": "LegendSense DanZAIO Lee Sin menu with 112 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/leesin/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)"
        ]
      },
      {
        "title": "Manual Keys",
        "items": [
          "Insec Key (Keybind / key string.byte(\"T\"))",
          "Chinese Combo Key (Keybind / key string.byte(\"G\"))",
          "Fast lane combo (Keybind / key string.byte(\"X\"))",
          "Flee Jump (Simple Wardjump) (Keybind / key string.byte(\"Z\"))",
          "Classic Ward Jump (Hold) (Keybind / key string.byte(\"A\"))",
          "Semi Manual Q (Keybind / key string.byte(\"H\"))"
        ]
      },
      {
        "title": "Q - Sonic Wave / Resonating Strike / Combo",
        "items": [
          "Use Q1 in Combo (Toggle / default true)",
          "Use Q2 in Combo (Toggle / default true)",
          "Q2 Requires Mark (Toggle / default false)",
          "Q2 Combo Mode (Selector / default index 2)",
          "Q2 Execute HP% (Slider / default 35)",
          "Q1 Min Range (Slider / default 0)"
        ]
      },
      {
        "title": "Q - Sonic Wave / Resonating Strike / Harass",
        "items": [
          "Use Q1 in Harass (Toggle / default true)",
          "Use Q2 in Harass (Toggle / default false)",
          "Min Mana% (Slider / default 45)"
        ]
      },
      {
        "title": "Q - Sonic Wave / Resonating Strike / Farm",
        "items": [
          "Use Q in Jungle (Toggle / default true)",
          "Use Q in Lane (Toggle / default false)",
          "Min Mana% (Slider / default 25)"
        ]
      },
      {
        "title": "Q - Sonic Wave / Resonating Strike / Q Prediction",
        "items": [
          "Q Hitchance (Selector / default index 2)",
          "Strict Collision Check (Toggle / default true)"
        ]
      },
      {
        "title": "W - Safeguard / Iron Will / Combat",
        "items": [
          "Combo W Mode (Selector / default index 0)",
          "Use W1 Shield in Combo (Toggle / default true)",
          "W1 Shield if HP% <= (Slider / default 60)",
          "Use W2 Shield in Combo (Toggle / default true)",
          "W2 Shield if HP% <= (Slider / default 55)",
          "Self W Only In Combat (Toggle / default true)",
          "Self W Trigger (Selector / default index 0)",
          "Self W Incoming Damage% >= (Slider / default 20)",
          "Self W Incoming Window (ms) (Slider / default 750)",
          "Use W1 in Jungle (Toggle / default true)",
          "W1 Jungle if HP% <= (Slider / default 85)",
          "Use W2 in Jungle (Toggle / default true)",
          "W2 Jungle if HP% <= (Slider / default 70)"
        ]
      },
      {
        "title": "W - Safeguard / Iron Will / Ward Jump",
        "items": [
          "Use Wardjump for Insec (Toggle / default true)",
          "Prioritize W To Allies (Toggle / default true)",
          "Prefer Existing Ally Units (Toggle / default true)",
          "Place Ward If Needed (Toggle / default true)",
          "Ward->W Buffer (ms) (Slider / default 250)"
        ]
      },
      {
        "title": "W - Safeguard / Iron Will / Ward Jump / Wardjump Failsafe",
        "items": [
          "Min Recast Delay (ms) (Slider / default 90)",
          "Pending Ward Timeout (ms) (Slider / default 325)",
          "Max Consecutive Failures (Slider / default 3)",
          "Failure Lockout (ms) (Slider / default 500)",
          "Clear Pending On Idle (Toggle / default true)"
        ]
      },
      {
        "title": "W - Safeguard / Iron Will / W Engage Combo",
        "items": [
          "Enable W Engage Combo (Toggle / default true)",
          "Use minion anchor first (Toggle / default true)",
          "Use ward fallback (Toggle / default true)",
          "Anchor max distance to enemy (Slider / default 350)",
          "Q2 Timing (Selector / default index 0)",
          "Q2 delay (ms) (Slider / default 250)",
          "Turret dive (Selector / default index 0)"
        ]
      },
      {
        "title": "W - Safeguard / Iron Will / W Engage Combo / W engange combo options",
        "items": [
          "R usage (Selector / default index 0)"
        ]
      },
      {
        "title": "E - Tempest / Cripple / Combat",
        "items": [
          "Use E1 in Combo (Toggle / default true)",
          "Use E2 in Combo (Toggle / default true)",
          "Use E2 if Enemy <= (Slider / default 425)"
        ]
      },
      {
        "title": "E - Tempest / Cripple / Farm",
        "items": [
          "Use E in Jungle (Toggle / default true)",
          "Use E in Lane (Toggle / default false)",
          "Lane Minions >= (Slider / default 3)"
        ]
      },
      {
        "title": "R - Dragon's Rage / Combat",
        "items": [
          "Use R in Combo (Toggle / default true)",
          "R Execute HP% (Slider / default 25)",
          "R Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "Insec / General",
        "items": [
          "Enable Insec System (Toggle / default true)",
          "Kick Direction (Selector / default index 0)",
          "Behind Target Distance (Slider / default 220)",
          "Kick Position Tolerance (Slider / default 145)",
          "Max Target Search Range (Slider / default 1500)",
          "Allow R Without Perfect Angle (Toggle / default false)"
        ]
      },
      {
        "title": "Insec / Routing",
        "items": [
          "Use Q Route (Toggle / default true)",
          "Allow Q2 Follow (Toggle / default true)",
          "Use Wardjump Route (Toggle / default true)",
          "Use Flash Route (Toggle / default true)"
        ]
      },
      {
        "title": "Insec / Insec Timing",
        "items": [
          "Step Delay (ms) (Slider / default 80)",
          "Q2 Follow Delay (ms) (Slider / default 120)",
          "Commit Timeout (ms) (Slider / default 1000)"
        ]
      },
      {
        "title": "Chinese Combo",
        "items": [
          "Enable Chinese Combo (Toggle / default true)",
          "Use Q Route (Toggle / default true)",
          "Use Wardjump Route (Toggle / default true)",
          "Use Flash Route (Toggle / default true)",
          "Use E Before R (Toggle / default true)",
          "Flash After R (If Ready) (Toggle / default false)",
          "Commit Timeout (ms) (Slider / default 1200)"
        ]
      },
      {
        "title": "Chinese Combo / Chinese Combo Timing",
        "items": [
          "Step Delay (ms) (Slider / default 75)",
          "Post R Flash Window (ms) (Slider / default 180)"
        ]
      },
      {
        "title": "Passive / AA Weave / AA Weave",
        "items": [
          "Combo AAs Between Spells (Slider / default 1)",
          "Jungle AAs Between Spells (Slider / default 1)",
          "Max Wait For Weave (ms) (Slider / default 650)",
          "Bypass Weave On Lethal (Toggle / default true)",
          "Debug Jungle Weave (Toggle / default false)"
        ]
      },
      {
        "title": "Reactive Safety",
        "items": [
          "Anti Gapclose (Toggle / default true)",
          "Anti Melee (Toggle / default true)",
          "Threat Range (Slider / default 325)",
          "Use E to Peel (Toggle / default true)",
          "Use W2 Shield Defensively (Toggle / default true)",
          "Reactive HP% Threshold (Slider / default 65)"
        ]
      },
      {
        "title": "Safety",
        "items": [
          "Allow Turret Dives (Toggle / default false)",
          "Allow Dash Follow (Toggle / default false)",
          "Allow Flash in Auto Chains (Toggle / default false)",
          "Allow Wardhop Engage (Toggle / default false)",
          "Max Enemies At Destination (Slider / default 2)",
          "Min HP% for Engage (Slider / default 35)",
          "Min HP% for Insec (Slider / default 40)",
          "Block Q2 Under Turret (Toggle / default true)"
        ]
      },
      {
        "title": "Flee",
        "items": [
          "Use E Peel While Flee (Toggle / default true)",
          "Use W2 Shield While Flee (Toggle / default true)",
          "W2 Flee if HP% <= (Slider / default 70)"
        ]
      },
      {
        "title": "Draw",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Draw Q Range (Toggle / default true)",
          "Draw W Range (Toggle / default true)",
          "Draw E Range (Toggle / default true)",
          "Draw R Range (Toggle / default true)",
          "Draw Insec Spot (Toggle / default true)",
          "Draw Ward Placement Cursor (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "PYKE",
    "label": "LS",
    "role": "19 menu sections",
    "description": "LegendSense DanZAIO Pyke menu with 57 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/pyke/menu.lua",
    "featureGroups": [
      {
        "title": "Q - Bone Skewer / Combo Settings",
        "items": [
          "Use Q in Combo (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Bone Skewer / Harass Settings",
        "items": [
          "Use Q in Harass (Toggle / default true)",
          "Only Q Long (Hook) (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Bone Skewer / Killsteal Settings",
        "items": [
          "Use Q in Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Bone Skewer / General Settings",
        "items": [
          "Only use Q charged (Toggle / default true)",
          "Q Max Range (Slider / default 1100)",
          "Q Start Charging Range (Slider / default 1000)",
          "Don't use Q while E Magneting (Toggle / default true)",
          "Block Q if Enemy Executable with R (Toggle / default true)",
          "Overcharge Mode (Selector / default index 0)",
          "Overcharge by X units (Slider / default 0)",
          "Ignore Whitelist if Killable (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Bone Skewer / Target Whitelist",
        "items": [
          "use_on_ (Toggle / default true)"
        ]
      },
      {
        "title": "W - Ghostwater Dive / Combo Settings",
        "items": [
          "Use W in Combo (Toggle / default true)"
        ]
      },
      {
        "title": "W - Ghostwater Dive / General Settings",
        "items": [
          "Use W After E (Toggle / default false)",
          "Don't use Q while in W (Toggle / default false)"
        ]
      },
      {
        "title": "E - Phantom Undertow / Combo Settings",
        "items": [
          "Use E in Combo (Toggle / default true)",
          "Use Prediction (Toggle / default true)",
          "Auto E After Q (Confirmed) (Toggle / default true)",
          "E First if collision between target and us (Toggle / default true)",
          "Block E if Q is Ready (and no collision) (Toggle / default false)",
          "Semi Manual E (Keybind / key string.byte(\"T\"))"
        ]
      },
      {
        "title": "E - Phantom Undertow / Flash Settings",
        "items": [
          "Enable Flash Usage (Toggle / default true)",
          "Flash if E will hit x targets (Slider / default 3)",
          "Follow Enemy Flash with ours (Toggle / default true)",
          "Follow Enemy Dash with Flash if killable (Toggle / default true)",
          "Flash as late as possible (Toggle / default true)"
        ]
      },
      {
        "title": "E - Phantom Undertow / Safety Checks",
        "items": [
          "Only E First If Allie Count Equal Or Bigger Than Enemy Count (Toggle / default true)",
          "Ignore E Safety if Enemy Executable (Keybind / key string.byte(\"G\"))"
        ]
      },
      {
        "title": "E - Phantom Undertow / General Settings",
        "items": [
          "E Range (Slider / default 550)",
          "E Magnet (Toggle / default true)",
          "E Magnet Point Distance to Target (Slider / default 200)",
          "Disable Q while magneting (Toggle / default false)",
          "Prowlers on E Target if out of range (Keybind / key string.byte(\"J\"))",
          "Disable AA while walking to E Pos (Toggle / default true)"
        ]
      },
      {
        "title": "R - Death from Below / Combo Settings",
        "items": [
          "Use R in Combo (Toggle / default true)",
          "Use Prediction (Toggle / default true)",
          "Semi Manual Cast (Keybind / key string.byte(\"U\"))"
        ]
      },
      {
        "title": "R - Death from Below / Killsteal Settings",
        "items": [
          "Use R in Killsteal (Toggle / default true)",
          "Use E to Gapclose for R (Toggle / default false)",
          "Use E to Gapclose for Combo (Toggle / default false)"
        ]
      },
      {
        "title": "R - Death from Below / Safety Checks",
        "items": [
          "Panic Cast before Death (Toggle / default true)",
          "Incoming Damage Time x / 100 (Slider / default 50)",
          "Don't cast if Q is in air (Toggle / default true)",
          "Don't Ult if enemy will get revived (Toggle / default true)",
          "Don't Ult if has Zhonyas up (Toggle / default true)"
        ]
      },
      {
        "title": "R - Death from Below / Target Whitelist",
        "items": [
          "use_on_ (Toggle / default true)"
        ]
      },
      {
        "title": "R - Death from Below / General Settings",
        "items": [
          "R Range (Slider / default 750)"
        ]
      },
      {
        "title": "Flee Settings",
        "items": [
          "Use E (Toggle / default true)",
          "Use W (Toggle / default true)"
        ]
      },
      {
        "title": "Killsteal Master",
        "items": [
          "Enable Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Stylized Circles (Gradient) (Toggle / default true)",
          "Draw Q Range (Draw color)",
          "Draw E Range (Draw color)",
          "Draw R Range (Draw color)",
          "Draw R Execute X on Killable (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "QIYANA",
    "label": "LS",
    "role": "26 menu sections",
    "description": "LegendSense DanZAIO Qiyana menu with 136 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Qiyana_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/qiyana/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)",
          "Q Hitchance Override (Selector / default index 0)",
          "R Hitchance Override (Selector / default index 0)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Flee Key (Keybind / key string.byte(\"A\"))",
          "Manual Builder Key (Keybind / key 4)",
          "Manual Turret Kill Combo (Keybind / key string.byte(\"Z\"))",
          "Semi Manual R (Keybind / key string.byte(\"X\"))",
          "Semi Manual R + Flash (Keybind / key string.byte(\"C\"))",
          "Semi Manual E Flash R (Keybind / key string.byte(\"V\"))",
          "Semi Manual Flash Into E (Keybind / key string.byte(\"G\"))"
        ]
      },
      {
        "title": "Combo Logic",
        "items": [
          "Use Builder In Combo (Toggle / default true)",
          "Min HP % To Engage (Slider / default 35)",
          "Max Enemies At Destination (Slider / default 2)",
          "Allow Turret Dives (Toggle / default false)",
          "Block While Evading (Toggle / default true)",
          "Block Into Skillshots (Toggle / default true)",
          "Manual Dive Only If Killable (Toggle / default true)"
        ]
      },
      {
        "title": "Combo Logic / Combo Presets",
        "items": [
          "Use Presets In Combo (Toggle / default true)",
          "Preset Mode (Selector / default index 0)",
          "Auto Swap Into Anti-Reaction (Toggle / default true)",
          "Prefer Anti-Reaction Vs Immobile (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Edge of Ixtal / Combat",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Buffer Q After E (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Edge of Ixtal / Harass",
        "items": [
          "Use in Harass (Toggle / default true)",
          "Min Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "Q - Edge of Ixtal / Farm",
        "items": [
          "Use in LaneClear (Toggle / default true)",
          "Use in JungleClear (Toggle / default true)",
          "Swap W For Passive Refresh / 2nd Q (Toggle / default true)",
          "Allow Element Q (Toggle / default false)",
          "Use River Q (Toggle / default false)",
          "Use Brush Q (Toggle / default false)",
          "Use Terrain Q (Toggle / default false)",
          "Min Minions for Q (Slider / default 2)",
          "Min Mana % (Slider / default 35)"
        ]
      },
      {
        "title": "Q - Edge of Ixtal / Killsteal",
        "items": [
          "Use Q Killsteal (Toggle / default true)",
          "Use E + Q Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "W - Terrashape / Combat",
        "items": [
          "Use in Combo (Toggle / default true)",
          "AA Reset in Combo (Toggle / default true)",
          "Swap For Passive Refresh / 2nd Q (Toggle / default true)",
          "Anti-Stutter In AA Range (Toggle / default true)",
          "Anti-Stutter On Terrain (Toggle / default true)",
          "Preferred Engage Element (Selector / default index 0)",
          "Preferred Finisher Element (Selector / default index 0)",
          "Prefer Brush When Outnumbered (Toggle / default true)",
          "Outnumbered Enemy Count (Slider / default 2)",
          "Element Search Range (Slider / default 950)"
        ]
      },
      {
        "title": "W - Terrashape / Harass",
        "items": [
          "Use in Harass (Toggle / default true)",
          "Use Brush to Exit Trades (Toggle / default true)"
        ]
      },
      {
        "title": "W - Terrashape / Utility",
        "items": [
          "Grass Stall (Toggle / default true)",
          "Stall Until Q Ready (Toggle / default true)",
          "Grass Stall Max (ms) (Slider / default 900)",
          "Escape Root Combo (Toggle / default true)",
          "Tower Dive Exit (Toggle / default true)",
          "Prefer Brush Exit After Dive (Toggle / default true)"
        ]
      },
      {
        "title": "W - Terrashape / Flee",
        "items": [
          "Preferred Flee Element (Selector / default index 0)"
        ]
      },
      {
        "title": "W - Terrashape / Reactive",
        "items": [
          "Use W to Dodge Skillshots (Toggle / default true)",
          "Only React to CC (Toggle / default false)",
          "Skillshot Damage % Threshold (Slider / default 15)",
          "Defensive Element (Selector / default index 0)",
          "Use W vs Gapclose (Toggle / default true)",
          "Gapclose Threat Range (Slider / default 350)"
        ]
      },
      {
        "title": "E - Audacity / Combat",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Use in Harass (Toggle / default false)",
          "E Targeting Mode (Selector / default index 2)"
        ]
      },
      {
        "title": "E - Audacity / Safety",
        "items": [
          "Block E Under Enemy Turret (Toggle / default true)",
          "Allow Minion Gapclose Under Turret (Toggle / default false)",
          "Require Q Follow-Up After Gapclose (Toggle / default true)"
        ]
      },
      {
        "title": "E - Audacity / Flee",
        "items": [
          "Use E Toward Cursor (Toggle / default true)"
        ]
      },
      {
        "title": "E - Audacity / Clear",
        "items": [
          "Use E in JungleClear (Toggle / default true)"
        ]
      },
      {
        "title": "R - Supreme Display of Talent / Combat",
        "items": [
          "Use in Combo (Toggle / default true)"
        ]
      },
      {
        "title": "R - Supreme Display of Talent / Conditions",
        "items": [
          "Require Explodable Surface (Toggle / default true)",
          "Allow Brush / River Shockwave (Toggle / default true)",
          "Allow Turret Push (Toggle / default true)",
          "Min Cast Range (Slider / default 250)",
          "Minimum Targets (Slider / default 1)",
          "Use as Execute (Toggle / default true)",
          "Execute Target HP % (Slider / default 45)"
        ]
      },
      {
        "title": "R - Supreme Display of Talent / Safety",
        "items": [
          "Min HP % (Slider / default 25)",
          "Avoid Invulnerable Targets (Toggle / default true)",
          "Avoid Stasis Targets (Toggle / default true)"
        ]
      },
      {
        "title": "R - Supreme Display of Talent / Killsteal",
        "items": [
          "Use R Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "Flash Tech",
        "items": [
          "Enable Auto Flash Logic (Toggle / default true)",
          "Allow R + Flash (Toggle / default true)",
          "Allow E Flash R (Toggle / default true)",
          "Allow Flash Into E (Toggle / default false)",
          "Auto Flash Single Target Kill Only (Toggle / default true)",
          "Auto R Flash If Hits Targets (Slider / default 2)",
          "Max Enemies At Flash End (Slider / default 2)",
          "Block Flash Under Enemy Turret (Toggle / default true)",
          "Late Flash Only (Toggle / default true)",
          "Flash Window (ms) (Slider / default 180)"
        ]
      },
      {
        "title": "Automatic Logic",
        "items": [
          "Enable Killsteal (Toggle / default true)",
          "Auto Q on Immobile (Toggle / default true)",
          "Auto Q on Dashing Targets (Toggle / default true)",
          "Auto R Interrupt (Toggle / default true)"
        ]
      },
      {
        "title": "Combo Builder",
        "items": [
          "Enable Builder (Toggle / default false)",
          "Use in Combo Mode (Toggle / default true)",
          "Reset Timeout (ms) (Slider / default 2000)",
          "Wait Step (ms) (Slider / default 120)",
          "Step 1 (Selector / default index 1)",
          "Step 2 (Selector / default index 3)",
          "Step 3 (Selector / default index 4)",
          "Step 4 (Selector / default index 5)",
          "Step 5 (Selector / default index 0)",
          "Step 6 (Selector / default index 0)",
          "Step 7 (Selector / default index 0)",
          "Step 8 (Selector / default index 0)"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "Enable Debug Prints (Toggle / default false)",
          "Throttle (ms) (Slider / default 400)",
          "Tick Snapshot (Toggle / default true)",
          "Tick Snapshot (sec) (Slider / default 1)",
          "Menu Snapshot (Toggle / default true)",
          "Menu Snapshot (sec) (Slider / default 5)",
          "Log Keys (Toggle / default true)",
          "Log Combo / Presets (Toggle / default true)",
          "Log Builder (Toggle / default true)",
          "Log Spell Casts (Toggle / default true)",
          "Log Flash Logic (Toggle / default true)",
          "Log Flee / Dive Exit (Toggle / default true)",
          "Log Reactive / Anti-Gapclose (Toggle / default true)",
          "Log Auto / Killsteal (Toggle / default true)",
          "Log State Changes (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Builder Status HUD (Toggle / default true)",
          "Current Element Text (Toggle / default true)",
          "Show Element In StatusHUD (Toggle / default true)",
          "Use Element Short Tag (Toggle / default true)",
          "Element HUD Update (ms) (Slider / default 75)",
          "Hide Element While Idle (Toggle / default true)",
          "Idle Check Enemy Range (Slider / default 1200)",
          "Pulse Element On W Grab (Toggle / default true)",
          "Combo Damage Indicator (Toggle / default true)",
          "Q Range (Toggle / default true)",
          "W Range (Toggle / default true)",
          "E Range (Toggle / default true)",
          "R Range (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "SAMIRA",
    "label": "LS",
    "role": "12 menu sections",
    "description": "LegendSense DanZAIO Samira menu with 90 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Samira_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/samira/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction",
        "items": [
          "Q Hitchance (Selector / default index 2)",
          "Q Max Range (Slider / default 890)"
        ]
      },
      {
        "title": "Combo",
        "items": [
          "Use Q (Toggle / default true)",
          "Use Q After AA (Toggle / default true)",
          "Use Q During/After E (Toggle / default true)",
          "Min Style For E+Q (Slider / default 4)",
          "Use E (Toggle / default true)",
          "E Mode (Selector / default index 0)",
          "E Minimum Range (Slider / default 350)",
          "Use W (Toggle / default false)",
          "Min Enemies For W (Slider / default 1)",
          "Use R (Toggle / default true)",
          "R Mode (Selector / default index 2)",
          "R Min Targets (Slider / default 2)",
          "Combo R Damage Ticks (Slider / default 10)",
          "R If My HP <= % (Slider / default 30)",
          "Require Style S (Toggle / default true)"
        ]
      },
      {
        "title": "Harass",
        "items": [
          "Use Q (Toggle / default true)",
          "Minimum Mana % (Slider / default 25)"
        ]
      },
      {
        "title": "Killsteal",
        "items": [
          "Enable (Toggle / default true)",
          "Mode (Selector / default index 0)",
          "Use Q (Toggle / default true)",
          "Use W (Toggle / default false)",
          "Use E (Toggle / default true)",
          "Use E + AA (Toggle / default true)",
          "Use E + Q (Toggle / default true)",
          "Use E + Q + AA (Toggle / default true)",
          "Use E Bridge Killsteal (Toggle / default false)",
          "Use R (Toggle / default true)",
          "R Damage Ticks (Slider / default 10)",
          "Allow E Under Turret (Toggle / default false)"
        ]
      },
      {
        "title": "Farm",
        "items": [
          "Farm Q Toggle (Keybind / key 4)",
          "Use Q Last Hit (Toggle / default true)",
          "Last Hit Q Mana % (Slider / default 0)",
          "Only Last Hit Q Outside AA (Toggle / default true)",
          "Use Q Lane Clear (Toggle / default true)",
          "Avoid Lane Q In AA Range (Toggle / default true)",
          "Block Lane Q Near Enemies (Toggle / default false)",
          "Lane Enemy Check Range (Slider / default 1200)",
          "Q Harass Priority During Clear (Toggle / default true)",
          "Use Long Q Farm (Toggle / default true)",
          "Use Melee Q Farm (Toggle / default true)",
          "Use Q Jungle (Toggle / default true)",
          "Lane Mana % (Slider / default 60)",
          "Jungle Mana % (Slider / default 15)",
          "Melee Q Min Minions (Slider / default 2)"
        ]
      },
      {
        "title": "E Safety",
        "items": [
          "Check E Safety (Toggle / default true)",
          "Prevent E Under Tower (Toggle / default true)",
          "Allow Smart Dive If Killable (Toggle / default true)",
          "Dive If Target HP < % (Slider / default 30)",
          "Dive If My HP > % (Slider / default 50)",
          "Max Enemies At End Pos (Slider / default 1)"
        ]
      },
      {
        "title": "W Block",
        "items": [
          "Enable W Block (Toggle / default false)",
          "Only Dodge CC Spells (Toggle / default false)",
          "Block High Damage (Toggle / default true)",
          "Damage Threshold % HP (Slider / default 20)",
          "Save W for Ultimate Threats (Probe Only) (Toggle / default false)"
        ]
      },
      {
        "title": "W Block / Per-Spell Dodge Settings / champMenu / spellMenu",
        "items": [
          "Block this spell (Toggle / default metaData.IsCrowdControl == true)",
          "Min HP % to block (Slider / default 0)"
        ]
      },
      {
        "title": "Auto",
        "items": [
          "Auto Q Immobile/CC (Toggle / default true)",
          "Auto Q Mana % (Slider / default 45)",
          "Passive Follow-Up Immobile (Toggle / default false)",
          "Auto E Out Of Turret After Kill (Toggle / default true)"
        ]
      },
      {
        "title": "Keys",
        "items": [
          "Fast S Combo (Keybind / key string.byte(\"G\"))",
          "Semi Q (Keybind / key string.byte(\"H\"))",
          "Semi E (Keybind / key string.byte(\"T\"))",
          "Flee (Keybind / key string.byte(\"A\"))",
          "Semi R (Keybind / key string.byte(\"R\"))"
        ]
      },
      {
        "title": "Draws",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Draw Q Range (Toggle / default true)",
          "Q Color (Draw color)",
          "Draw W Range (Toggle / default false)",
          "W Color (Draw color)",
          "Draw E Range (Toggle / default false)",
          "E Color (Draw color)",
          "Draw R Range (Toggle / default true)",
          "R Color (Draw color)",
          "Draw Damage (Toggle / default true)",
          "Draw Killable Text (Toggle / default true)",
          "Draw Style (Toggle / default false)",
          "Draw E Path (Toggle / default false)"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "Enable Debug Logs (Toggle / default false)",
          "Log Style Buffs (Toggle / default false)",
          "Log Spell Casts (Toggle / default false)",
          "Runtime Probe Details (Toggle / default false)",
          "Log Fast S Details (Toggle / default false)",
          "Log E Safety (Toggle / default false)",
          "Log W Block (Toggle / default false)",
          "Log R Decision (Toggle / default false)",
          "Throttle ms (Slider / default 500)"
        ]
      }
    ]
  },
  {
    "name": "SHYVANA",
    "label": "LS",
    "role": "20 menu sections",
    "description": "LegendSense DanZAIO Shyvana menu with 92 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/shyvana/menu.lua",
    "featureGroups": [
      {
        "title": "Main",
        "items": [
          "Language / Idioma / Dil / Sprache (Selector / default index 0)"
        ]
      },
      {
        "title": "Prediction",
        "items": [
          "global_hitchance (Selector / default index 2), \"global_hitchance\", \"hitchance_options\")",
          "e_hitchance (Selector / default index 0), \"e_hitchance\", \"e_override_options\")",
          "e_dragon_hitchance (Selector / default index 0), \"e_dragon_hitchance\", \"e_dragon_options\")"
        ]
      },
      {
        "title": "Keys",
        "items": [
          "semi_e_key (Keybind / key string.byte(\"T\"))",
          "semi_r_key (Keybind / key string.byte(\"G\"))",
          "flee_key (Keybind / key string.byte(\"A\"))"
        ]
      },
      {
        "title": "Combo",
        "items": [
          "use_q (Toggle / default true), \"use_q_combo\")",
          "use_w (Toggle / default true), \"use_w_combo\")",
          "use_e (Toggle / default true), \"use_e_combo\")",
          "use_r (Toggle / default true), \"use_r_combo\")",
          "prefer_e_opener (Toggle / default true), \"prefer_e_opener\")",
          "force_q_after_attack (Toggle / default true), \"force_q_after_attack\")"
        ]
      },
      {
        "title": "QCombat",
        "items": [
          "use_combo (Toggle / default true), \"use_q_combat\")",
          "allow_recast (Toggle / default true), \"allow_recast\")",
          "use_dragon_q3 (Toggle / default true), \"use_dragon_q3\")",
          "cast_gap_ms (Slider / default 125)"
        ]
      },
      {
        "title": "QWeave",
        "items": [
          "only_after_attack (Toggle / default true), \"cast_after_attack\")",
          "after_attack_window_ms (Slider / default 450)"
        ]
      },
      {
        "title": "WCombat",
        "items": [
          "use_combo (Toggle / default true), \"use_w_combo\")",
          "engage_range (Slider / default 450)",
          "use_recast (Toggle / default true), \"use_recast\")",
          "smart_recast (Toggle / default true), \"smart_recast\")",
          "recast_delay_ms (Slider / default 250)",
          "expire_window_ms (Slider / default 250)",
          "recast_enemy_range (Slider / default 325)",
          "recast_if_killable (Toggle / default true), \"recast_if_killable\")",
          "recast_if_target_leaving (Toggle / default true), \"recast_if_target_leaving\")",
          "dragon_recast_low_hp (Toggle / default true), \"dragon_recast_low_hp\")",
          "dragon_recast_hp (Slider / default 55)"
        ]
      },
      {
        "title": "ECombat",
        "items": [
          "use_combo (Toggle / default true), \"use_e_combo\")",
          "opener_outside_aa (Toggle / default true), \"opener_outside_aa\")",
          "allow_close_range (Toggle / default true), \"allow_close_range\")",
          "dragon_line_priority (Toggle / default true), \"dragon_line_priority\")",
          "dragon_line_min_targets (Slider / default 2)",
          "dragon_line_weight (Slider / default 35)"
        ]
      },
      {
        "title": "EAuto",
        "items": [
          "on_immobile (Toggle / default true), \"on_immobile\")",
          "on_dashing (Toggle / default true), \"on_dashing\")"
        ]
      },
      {
        "title": "RCombat",
        "items": [
          "mode (Selector / default index 1), \"r_usage\", \"r_usage_options\")",
          "min_targets (Slider / default 1)"
        ]
      },
      {
        "title": "RSafety",
        "items": [
          "min_hp (Slider / default 35)",
          "min_fury (Slider / default 100)",
          "allow_turret_dive (Toggle / default false), \"allow_turret_dive\")"
        ]
      },
      {
        "title": "Reactive",
        "items": [
          "use_w_defensive (Toggle / default true), \"use_w_defensive\")",
          "use_e_anti_gapclose (Toggle / default true), \"use_e_anti_gapclose\")",
          "threat_range (Slider / default 350)",
          "defensive_hp (Slider / default 55)"
        ]
      },
      {
        "title": "Safety",
        "items": [
          "min_hp (Slider / default 35)",
          "max_enemies_dest (Slider / default 2)",
          "allow_turret_dive (Toggle / default false), \"allow_turret_dive\")",
          "block_under_turret (Toggle / default true), \"block_under_turret\")"
        ]
      },
      {
        "title": "Auto",
        "items": [
          "killsteal_e (Toggle / default true), \"killsteal_e\")",
          "killsteal_q (Toggle / default true), \"killsteal_q\")",
          "killsteal_q_outside_combo (Toggle / default true), \"killsteal_q_outside_combo\")"
        ]
      },
      {
        "title": "Clear",
        "items": [
          "use_q_jungle (Toggle / default true), \"use_q_jungle\")",
          "use_w_jungle (Toggle / default true), \"use_w_jungle\")",
          "use_e_jungle (Toggle / default true), \"use_e_jungle\")",
          "use_q_lane (Toggle / default false), \"use_q_lane\")",
          "use_e_lane (Toggle / default false), \"use_e_lane\")",
          "lane_minions (Slider / default 3)"
        ]
      },
      {
        "title": "Objectives",
        "items": [
          "enable_epic_monitor (Toggle / default true), \"enable_epic_monitor\")",
          "auto_q_secure (Toggle / default true), \"auto_q_secure\")",
          "use_e_epic (Toggle / default true), \"use_e_epic\")",
          "reserve_q3_epic (Toggle / default true), \"reserve_q3_epic\")",
          "secure_window (Slider / default 900)",
          "log_contested_only (Toggle / default true), \"log_contested_only\")"
        ]
      },
      {
        "title": "Form",
        "items": [
          "min_fury_combo (Slider / default 45)",
          "min_fury_r (Slider / default 100)"
        ]
      },
      {
        "title": "Flee",
        "items": [
          "use_w (Toggle / default true), \"use_w_flee\")"
        ]
      },
      {
        "title": "Draw",
        "items": [
          "enabled (Toggle / default true), \"enable_drawings\")",
          "q_range (Toggle / default true), \"draw_q_range\")",
          "w_range (Toggle / default true), \"draw_w_range\")",
          "e_range (Toggle / default true), \"draw_e_range\")",
          "r_range (Toggle / default true), \"draw_r_range\")",
          "state_text (Toggle / default true), \"draw_state_text\")",
          "objective_text (Toggle / default true), \"draw_objective_text\")"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "enabled (Toggle / default false), \"enable_debug\")",
          "throttle_ms (Slider / default 300)",
          "tick_snapshot (Toggle / default true), \"tick_snapshot\")",
          "tick_snapshot_sec (Slider / default 2)",
          "menu_snapshot (Toggle / default false), \"menu_snapshot\")",
          "menu_snapshot_sec (Slider / default 10)",
          "log_keys (Toggle / default true), \"log_keys\")",
          "log_buffs (Toggle / default true), \"log_buffs\")",
          "log_buff_updates (Toggle / default false), \"log_buff_updates\")",
          "log_spell_names (Toggle / default true), \"log_spell_names\")",
          "log_casts (Toggle / default true), \"log_casts\")",
          "log_q_state (Toggle / default true), \"log_q_state\")",
          "log_form_fury (Toggle / default true), \"log_form_fury\")",
          "log_objectives (Toggle / default true), \"log_objectives\")",
          "log_state (Toggle / default true), \"log_state\")",
          "dump_state_key (Keybind / key string.byte(\"K\"))"
        ]
      }
    ]
  },
  {
    "name": "VARUS",
    "label": "LS",
    "role": "13 menu sections",
    "description": "LegendSense DanZAIO Varus menu with 53 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Varus_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/varus/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)"
        ]
      },
      {
        "title": "Playstyle Mode",
        "items": [
          "Playstyle Mode (Selector / default index 1)"
        ]
      },
      {
        "title": "Q - Piercing Arrow / Combat Logic",
        "items": [
          "Use Q (Toggle / default true)",
          "Min Charge % to Release (Slider / default 70)",
          "Max Charge Time (s) (Slider / default 150)",
          "Auto Poke When Out of AA Range (Toggle / default true)",
          "Poke Min Range Gap (Slider / default 200)",
          "Only Use Q with W Stacks (Toggle / default true)",
          "Min W Stacks for Q (Slider / default 2)"
        ]
      },
      {
        "title": "Q - Piercing Arrow / Harass Logic",
        "items": [
          "Use Q in Harass (Toggle / default true)",
          "Mana Limit % (Slider / default 40)"
        ]
      },
      {
        "title": "Q - Piercing Arrow / Farm Logic",
        "items": [
          "Toggle Q Farm Mode (Keybind / key 77)",
          "Min Minions to Hit (Slider / default 3)",
          "Mana Limit % (Slider / default 30)"
        ]
      },
      {
        "title": "W - Blighted Quiver / Combat Logic",
        "items": [
          "Auto-Activate W Before Q (Toggle / default true)",
          "Activate When Target Has X Stacks (Slider / default 3)",
          "Track Stacks on Enemies (Toggle / default true)",
          "Prioritize Empowered Q (Toggle / default true)"
        ]
      },
      {
        "title": "W - Blighted Quiver / Jungle Logic",
        "items": [
          "Use W in Jungle (Toggle / default true)",
          "Consume 3 Stacks with Q (Toggle / default true)"
        ]
      },
      {
        "title": "E - Hail of Arrows / Combat Logic",
        "items": [
          "Use E (Toggle / default true)",
          "E Usage Mode (Selector / default index 1)",
          "Defensive HP Threshold % (Slider / default 50)",
          "Self-Peel When Melee Gapcloses (Toggle / default true)",
          "Slow Fleeing Enemies (Toggle / default true)"
        ]
      },
      {
        "title": "R - Chain of Corruption / Combat Logic",
        "items": [
          "R Usage Mode (Selector / default index 1)",
          "Min Targets to R (Slider / default 1)",
          "Use R for Self-Defense (Toggle / default true)",
          "Self-Defense HP % (Slider / default 40)",
          "Self-Defense Enemy Count (Slider / default 2)",
          "Auto-Engage After Root (Toggle / default true)",
          "Use R Anti-Gapclose (Toggle / default true)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Semi-Manual Q (Keybind / key 71)",
          "Semi-Manual R (Keybind / key 84)",
          "Manual Activate W (Keybind / key 89)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Show Q Farm Mode (StatusHUD) (Toggle / default true)",
          "Draw Q Range (Draw color)",
          "Draw E Range (Draw color)",
          "Draw R Range (Draw color)",
          "Draw AA Range (Draw color)",
          "Q Charge Bar (Toggle / default true)",
          "Damage Indicator (Toggle / default true)",
          "Show W Stacks (Toggle / default true)",
          "Stylized Mode (Toggle / default true)",
          "Player Visuals (Toggle / default true)",
          "Player Visual Style (Selector / default index 1)"
        ]
      },
      {
        "title": "Debug Settings",
        "items": [
          "Enable Debug Mode (Toggle / default false)",
          "MS Print Cooldown (ms) (Slider / default 1000)"
        ]
      },
      {
        "title": "Debug Settings / Debug Keybinds",
        "items": [
          "Debug Player Buffs (Keybind / key 112)",
          "Debug Enemy Buffs (Keybind / key 113)",
          "Debug Player Spells (Keybind / key 114)",
          "Debug All (Player + Target) (Keybind / key 115)"
        ]
      }
    ]
  },
  {
    "name": "YUNARA",
    "label": "LS",
    "role": "18 menu sections",
    "description": "LegendSense DanZAIO Yunara menu with 54 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/yunara/menu.lua",
    "featureGroups": [
      {
        "title": "Prediction Settings",
        "items": [
          "Global Hitchance (Selector / default index 2)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Flee Key (Keybind / key string.byte(\"Z\"))",
          "Semi-Manual W (Keybind / key string.byte(\"A\"))"
        ]
      },
      {
        "title": "Q: Cultivation of Spirit / Combat Logic",
        "items": [
          "Use in Combo (Full Stacks) (Toggle / default true)",
          "Save Mana for Q if Inactive % (Slider / default 40)",
          "Force AA Reset Logic (Toggle / default true)"
        ]
      },
      {
        "title": "Q: Cultivation of Spirit / Harass Logic",
        "items": [
          "Use in Harass (Toggle / default true)",
          "Only if Target in AA Range (Toggle / default true)",
          "Min Mana % (Slider / default 50)"
        ]
      },
      {
        "title": "Q: Cultivation of Spirit / Farm Logic",
        "items": [
          "Use in LaneClear (Toggle / default true)",
          "Use in JungleClear (Toggle / default true)",
          "Min Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "W: Arc of Judgment / Combat Logic",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Use Empowered W (R) (Toggle / default true)"
        ]
      },
      {
        "title": "W: Arc of Judgment / Harass Logic",
        "items": [
          "Use in Harass (Toggle / default true)",
          "Min Mana % (Slider / default 60)"
        ]
      },
      {
        "title": "W: Arc of Judgment / Misc Logic",
        "items": [
          "Auto W on CC (Toggle / default true)",
          "Use W to Peel (Flee) (Toggle / default true)",
          "Killsteal (Toggle / default true)"
        ]
      },
      {
        "title": "W: Arc of Judgment / Farm Logic",
        "items": [
          "Use in LaneClear (Toggle / default false)",
          "Harass in LaneClear (Toggle / default true)",
          "Min Minions Hit (Base W) (Slider / default 3)",
          "Lane Mana % (Slider / default 50)",
          "Use in JungleClear (Toggle / default true)",
          "Jungle Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Combat Logic",
        "items": [
          "Use in Combo (Toggle / default true)",
          "Use Empowered E to Gapclose (Toggle / default true)",
          "Gapclose Only if HP > % (Slider / default 50)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Anti-Gapclose Settings",
        "items": [
          "Enable Anti-Gapclose (Toggle / default true)",
          "Use Empowered E (Dash) (Toggle / default true)",
          "Use Normal E (Speed) (Toggle / default true)",
          "HP Threshold % (Slider / default 100)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Anti-Gapclose Settings / Target List",
        "items": [
          "Anti-Gap: (Toggle / default true)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Anti-Melee Settings",
        "items": [
          "Enable Anti-Melee (Toggle / default true)",
          "Use Empowered E (Dash) (Toggle / default true)",
          "Use Normal E (Speed) (Toggle / default true)",
          "HP Threshold % (Slider / default 100)",
          "Trigger Range (Slider / default 275)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Anti-Melee Settings / Target List",
        "items": [
          "Anti-Melee: (Toggle / default true)"
        ]
      },
      {
        "title": "E: Untouchable Shadow / Misc Logic",
        "items": [
          "Auto E to Cleanse Slows (Toggle / default true)",
          "Prevent Dashing into Turret (Toggle / default true)",
          "Mana % (Slider / default 30)"
        ]
      },
      {
        "title": "R: Transcend One's Self / Combat Logic",
        "items": [
          "Auto R Teamfight (Toggle / default true)",
          "Min Enemies Nearby (Slider / default 3)",
          "Smart Kill Logic (Combo+R) (Toggle / default true)",
          "Kill Mode (Selector / default index 2)",
          "Activate R to Escape (HP Check) (Toggle / default true)",
          "Escape HP < % (Slider / default 25)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Draw W Range (Toggle / default true)",
          "Draw Empowered E Range (Toggle / default true)",
          "Draw Damage Indicator (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings / Visualizers",
        "items": [
          "Status Display Mode (Selector / default index 2)",
          "Draw W Prediction (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "ZED",
    "label": "LS",
    "role": "32 menu sections",
    "description": "LegendSense DanZAIO Zed menu with 229 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/zed/menu.lua",
    "featureGroups": [
      {
        "title": "Core Targeting / R Save",
        "items": [
          "Focus Death Mark target (Toggle / default true)",
          "Save R if combo already kills (Toggle / default true)",
          "Only R if target HP >= % (Slider / default 10)"
        ]
      },
      {
        "title": "R Policy / Blacklist",
        "items": [
          "Require Q ready (Toggle / default true)",
          "Require W ready or W shadow (Toggle / default true)",
          "Require E ready (Toggle / default true)",
          "Do not R if energy <= % (Slider / default 30)",
          "Combo R if target HP <= % (Slider / default 70)",
          "Ignore blacklist on selected target (Toggle / default true)"
        ]
      },
      {
        "title": "R Policy / Blacklist / R Blacklist",
        "items": [
          "Block Combo R: (Toggle / default false)",
          "Block Force R: (Toggle / default false)"
        ]
      },
      {
        "title": "Damage",
        "items": [
          "Count auto attack (Toggle / default true)",
          "Auto attack modifier x100 (Slider / default 100)",
          "Count passive (Toggle / default true)",
          "Count Q damage (Toggle / default true)",
          "Count shadow/future W Q (Toggle / default true)",
          "Count E damage (Toggle / default true)",
          "Count R damage (Toggle / default true)"
        ]
      },
      {
        "title": "Keys",
        "items": [
          "Farm key (Keybind / key string.byte(\"V\"))",
          "Manual WEQ (Keybind / key string.byte(\"H\"))",
          "Force R (Keybind / key string.byte(\"Y\"))",
          "Turret combat R modifier (Keybind / key string.byte(\"N\"))",
          "Flee (Keybind / key string.byte(\"Z\"))",
          "Cycle W Mode (Keybind / key string.byte(\"U\"))",
          "Hold combo R (Keybind / key string.byte(\"A\"))"
        ]
      },
      {
        "title": "Combo",
        "items": [
          "Zed W placement (Selector / default index 3)",
          "Use R (Toggle / default true)",
          "Use W2 to swap onto killable target (Toggle / default true)",
          "Check W2 swap safety (Toggle / default true)",
          "W2 safe radius (Slider / default 700)",
          "W2 dangerous enemies (Slider / default 3)",
          "Check W2 turret (Toggle / default true)",
          "Check W2 evade (Toggle / default true)",
          "Use R2 to swap onto killable target (Toggle / default true)",
          "Use R2 return (Toggle / default true)",
          "Check R2 swap safety (Toggle / default true)",
          "R2 safe radius (Slider / default 700)",
          "R2 dangerous enemies (Slider / default 3)",
          "Check R2 turret (Toggle / default true)",
          "Check R2 evade (Toggle / default true)",
          "Use W1 (Toggle / default true)",
          "W1 only if double Q (Toggle / default false)",
          "Use E (Toggle / default true)",
          "Use Q (Toggle / default true)"
        ]
      },
      {
        "title": "Combo / Pursue W1 -> W2",
        "items": [
          "Use W1 -> W2 (Toggle / default true)",
          "Min pursuing range (Slider / default 600)",
          "Only if R ready (Toggle / default true)",
          "If my HP >= % (Slider / default 60)",
          "If target HP <= % (Slider / default 60)",
          "Enemies near target >= (Slider / default 1)",
          "Enemy check range (Slider / default 1000)"
        ]
      },
      {
        "title": "Harass",
        "items": [
          "Harass W placement (Selector / default index 3)",
          "Use W1 (Toggle / default true)",
          "Close WEQ poke setup (Toggle / default false)",
          "W1 only if double Q (Toggle / default true)",
          "Use W1 from outside Q (Toggle / default true)",
          "Use E (Toggle / default true)",
          "Use Q (Toggle / default true)"
        ]
      },
      {
        "title": "Clear",
        "items": [
          "Lane clear W setup (Toggle / default false)",
          "Jungle clear W setup (Toggle / default false)",
          "Lane clear E (Toggle / default true)",
          "Jungle clear E (Toggle / default true)",
          "Lane clear Q (Toggle / default true)",
          "Jungle clear Q (Toggle / default true)",
          "Min minions for clear (Slider / default 2)",
          "Lane min energy (Slider / default 20)",
          "Jungle min energy (Slider / default 20)",
          "Jungle W min monster HP % (Slider / default 35)",
          "Lane Q min hits (Slider / default 2)",
          "Lane E min hits (Slider / default 2)",
          "W setup min hits (Slider / default 3)"
        ]
      },
      {
        "title": "Last Hit",
        "items": [
          "Use Q (Toggle / default true)",
          "Use E (Toggle / default true)",
          "Min energy (Slider / default 30)"
        ]
      },
      {
        "title": "Killsteal / Execute",
        "items": [
          "Use direct Q kill (Toggle / default true)",
          "Use direct E kill (Toggle / default true)",
          "Use WQ execute (Toggle / default true)",
          "Use WE execute (Toggle / default true)",
          "Use WEQ execute (Toggle / default true)",
          "Allow WEQ + AA/passive estimate (Toggle / default true)",
          "Only if W shadow reaches (Toggle / default true)",
          "Use Q/E from active shadow (Toggle / default true)"
        ]
      },
      {
        "title": "Auto Shadow Q/E",
        "items": [
          "Idle shadow Q/E (Toggle / default false)",
          "Use Q from shadow (Toggle / default true)",
          "Q only if kill (Toggle / default false)",
          "Use E from shadow (Toggle / default true)",
          "E only if kill (Toggle / default false)",
          "Min energy (Slider / default 40)"
        ]
      },
      {
        "title": "Idle Automation",
        "items": [
          "Idle E on nearby enemies (Toggle / default false)",
          "Idle Auto E min energy (Slider / default 35)"
        ]
      },
      {
        "title": "Shadow Dodge / Evade / Core Settings",
        "items": [
          "Enable dodge (Toggle / default true)",
          "Only in combo (Toggle / default true)",
          "Disable while dodging (Toggle / default true)",
          "Global max HP % (Slider / default 35)",
          "Shadow Dodge route (Selector / default index 1)",
          "Min hit time for W1/R1 (Slider / default 250)",
          "Find safe shadow (Toggle / default true)",
          "Do not use turret shadow (Toggle / default true)",
          "Use relatively safe shadow (Toggle / default true)",
          "Use shadow if enemies near <= (Slider / default 0)",
          "Shadow enemy check range (Slider / default 500)"
        ]
      },
      {
        "title": "parentMenu / champMenu / spellMenu",
        "items": [
          "Dodge route (Selector / default index DefaultDodgeMode(metaData, spellName))",
          "Spell max HP % (Slider / default 100)",
          "React to this spell (Toggle / default true)",
          "Use W away (Toggle / default true)",
          "Use W if HP <= % (Slider / default 20)",
          "Use R dodge (Toggle / default true)",
          "Use R if HP <= % (Slider / default 0)",
          "Use W2 to safe shadow (Toggle / default true)",
          "Use W2 if HP <= % (Slider / default 50)",
          "Use R2 to safe shadow (Toggle / default true)",
          "Use R2 if HP <= % (Slider / default 50)"
        ]
      },
      {
        "title": "Safety",
        "items": [
          "Auto return if low HP (Toggle / default true)",
          "Return if HP <= % (Slider / default 20)",
          "Enemies near self >= (Slider / default 2)",
          "Self enemy check radius (Slider / default 600)",
          "Shadow enemy check radius (Slider / default 800)",
          "Safe shadow enemies <= (Slider / default 0)",
          "Avoid enemy turret shadow (Toggle / default true)",
          "Avoid active skillshots on return (Toggle / default true)",
          "Use relatively safest shadow (Toggle / default false)",
          "Return from enemy turret after kill (Toggle / default true)"
        ]
      },
      {
        "title": "Anti-Gapcloser",
        "items": [
          "Enable (Toggle / default true)",
          "React to unresolved listed dashes (Toggle / default true)",
          "React to unknown dashes (Toggle / default false)",
          "Use W away (Toggle / default true)",
          "Use W if HP <= % (Slider / default 20)",
          "Use R dodge (Toggle / default true)",
          "Use R if HP <= % (Slider / default 0)",
          "Use W2 to safe shadow (Toggle / default true)",
          "Use W2 if HP <= % (Slider / default 50)",
          "Use R2 to safe shadow (Toggle / default true)",
          "Use R2 if HP <= % (Slider / default 50)",
          "Avoid turret W end pos (Toggle / default true)",
          "Avoid turret shadow (Toggle / default true)",
          "Avoid active skillshots on return (Toggle / default true)",
          "EQ follow-up after return (Toggle / default true)",
          "Dash end near self (Slider / default 550)",
          "Shadow enemy check radius (Slider / default 500)",
          "Use shadow enemies <= (Slider / default 0)",
          "Use relatively safe shadow (Toggle / default true)"
        ]
      },
      {
        "title": "Anti-Gapcloser / Champion Blacklist",
        "items": [
          "Block: (Toggle / default false)"
        ]
      },
      {
        "title": "Combo / Aggressive Shadow Swap",
        "items": [
          "Enable aggressive shadow swap (Toggle / default false)",
          "Use W2 (Toggle / default true)",
          "Use R2 (Toggle / default true)",
          "Require lethal damage near shadow (Toggle / default true)",
          "Count Ignite (Toggle / default true)",
          "Count Electrocute (Toggle / default false)",
          "Avoid enemy turret shadow (Toggle / default true)",
          "Min self HP % (Slider / default 25)",
          "Max enemies near shadow (Slider / default 3)",
          "Enemy check range (Slider / default 700)"
        ]
      },
      {
        "title": "Flee",
        "items": [
          "Use W1 toward cursor (Toggle / default true)",
          "Use W2 after W1 (Toggle / default true)",
          "Use E from player (Toggle / default true)",
          "Use E from shadow (Toggle / default true)"
        ]
      },
      {
        "title": "Advanced Options",
        "items": [
          "Use Advanced mode (Toggle / default false):AddTooltip(\"Global master switch for every option in this Advanced menu. If this is off, all advanced logic stays disabled even when individual advanced sub-options are checked.\")"
        ]
      },
      {
        "title": "Advanced Options / Cast Safety",
        "items": [
          "Enable advanced cast safety (Toggle / default true):AddTooltip(\"Master switch for the advanced cast policy. When off, Q/E/R use the original Zed logic without these extra safety gates.\")",
          "Pause/resume stasis and untargetable (Toggle / default true):AddTooltip(\"When a target enters short stasis/parry/untargetability, hold casts and resume on the first safe frame instead of hard-aborting the fight.\")",
          "Resume buffer after buff (ms) (Slider / default 50)",
          "Block invulnerable/unkillable targets (Toggle / default true):AddTooltip(\"Blocks casts into invulnerability or unkillable states so Q/E/R are not spent when damage would be zero or R would be wasted.\")",
          "Block stasis/Zhonya targets (Toggle / default true):AddTooltip(\"Pauses all damage casts into Zhonya, Stopwatch, Bard R style stasis, and LS Stasis evidence while the buff is active.\")",
          "Pause Fiora W parry (Toggle / default true):AddTooltip(\"Holds Q/E/R during Fiora Riposte-style parry windows, then lets pause/resume continue the combo after the window ends.\")",
          "Debug cast safety reasons (Toggle / default false):AddTooltip(\"Prints why a cast was blocked, such as stasis, spell shield, Pantheon E front block, or revive/no-death R block.\")"
        ]
      },
      {
        "title": "Advanced Options / Spell Shields",
        "items": [
          "Handle spell shields (Toggle / default true):AddTooltip(\"Enables special handling for spell-shielded targets instead of blindly throwing Q into the shield.\")",
          "Use E before Q into shield (Toggle / default true):AddTooltip(\"If a target has a spell shield and E can hit from Zed or a shadow, use E first to pop the shield before Q.\")",
          "Allow Q to pop shield if E unavailable (Toggle / default false):AddTooltip(\"Allows Q to be used just to remove a spell shield when E cannot pop it. Off by default because Q is valuable and projectile-based.\")"
        ]
      },
      {
        "title": "Advanced Options / R Policy",
        "items": [
          "Use advanced R policy (Toggle / default true):AddTooltip(\"Master switch for advanced R value checks layered on top of the existing R blacklist and save-R logic.\")",
          "Block R into revive/no-death buffs (Toggle / default true):AddTooltip(\"Prevents R on targets protected by effects like Zilean R, Tryndamere R, or Kindred R where Death Mark is usually wasted.\")",
          "Block R if stasis item appears ready (Toggle / default false):AddTooltip(\"Experimental visible-item check for Zhonya/Stopwatch readiness. Off by default until enemy item readiness is verified in LS runtime.\")",
          "R killable buffer % (Slider / default 10)",
          "No-R overkill buffer % (Slider / default 5)",
          "Nearby defensive ally buffer % (Slider / default 10)",
          "Defensive ally check range (Slider / default 900)"
        ]
      },
      {
        "title": "Advanced Options / Energy Gates",
        "items": [
          "Enable action energy gates (Toggle / default true):AddTooltip(\"Master switch for advanced energy thresholds. Flee/escape logic is still prioritized over saving energy.\")",
          "Poke/harass min energy (Slider / default 150)",
          "All-in min energy (Slider / default 125)",
          "Disengage reserve energy (Slider / default 50)",
          "Ignore energy gate if lethal (Toggle / default true):AddTooltip(\"Allows low-energy casts if the current damage estimate already confirms the target should die.\")"
        ]
      },
      {
        "title": "Advanced Options / Targeted Dodge",
        "items": [
          "Enable targeted spell dodge (Toggle / default true):AddTooltip(\"Master switch for targeted spell reactions such as Pantheon W. This is separate from normal ShadowEvade skillshot logic.\")",
          "Dodge Pantheon W (Toggle / default true):AddTooltip(\"When Pantheon starts Shield Vault on or near Zed, prefer a safe shadow swap or W away before the stun lands.\")",
          "Pantheon W max HP % (Slider / default 100)",
          "Prefer safe shadow swap (Toggle / default true):AddTooltip(\"Try W2/R2 to an already-safe shadow before spending W1 for defensive movement.\")",
          "Use W away if no safe shadow (Toggle / default true):AddTooltip(\"If no safe shadow swap exists, cast W away/lateral from the incoming targeted threat when possible.\")"
        ]
      },
      {
        "title": "Advanced Options / Matchup Rules",
        "items": [
          "Respect Pantheon E facing (Toggle / default true):AddTooltip(\"Blocks Q/E/R when Pantheon E is active and Zed is in front of him, but allows casts from behind or flanking angles.\")",
          "Block R into Trynd/Kindred/Zilean (Toggle / default true):AddTooltip(\"Compatibility toggle for the R-policy rule that avoids Death Mark into Undying Rage, Lamb's Respite, or Chronoshift.\")",
          "Debug enemy defensive spells (Toggle / default false):AddTooltip(\"Logs enemy spell starts and targets so unverified matchup rules like Mel W, Samira W, Yasuo wall, Braum/Sion blocks can be promoted safely later.\")"
        ]
      },
      {
        "title": "Advanced Options / Execution",
        "items": [
          "Prefer E before Q at range (Toggle / default true):AddTooltip(\"Planned/compatibility toggle for ranged W->E->Q ordering so E slow improves Q reliability. Current first pass mostly uses existing combo order.\")",
          "Avoid frontal projectile blocks (Toggle / default true):AddTooltip(\"Planned/compatibility toggle for avoiding Q into frontal blockers like Pantheon/Braum/Sion until a flank angle is available.\")",
          "Use Q during flee if safe (Toggle / default false):AddTooltip(\"During flee, allow a Q at a nearby target after escape actions. Off by default so Q never delays W/W2 escape.\")"
        ]
      },
      {
        "title": "Advanced Options / Experimental",
        "items": [
          "Farsight low-HP trick (Toggle / default false):AddTooltip(\"Planned: place Farsight near Zed's escape body at low HP to create a possible misclick target. Not wired in this pass.\")",
          "Taunt after R kill (Toggle / default false):AddTooltip(\"Planned: use documented Game.DoEmote(Emote.Taunt) after a confirmed R kill. Cosmetic only; not wired in this pass.\")",
          "Mastery emote after kill (Toggle / default false):AddTooltip(\"Planned: use documented Game.SendMasteryEmote after a confirmed kill. Cosmetic only; not wired in this pass.\")"
        ]
      },
      {
        "title": "Prediction",
        "items": [
          "Q effective range (Slider / default 900)",
          "Q hitchance: 1 Low, 2 Medium, 3 High, 4 VeryHigh, 5 Immobile (Slider / default 2)"
        ]
      },
      {
        "title": "Draw",
        "items": [
          "Enable drawings (Toggle / default true)",
          "Stylized range circles (Toggle / default true)",
          "Use compact StatusHUD for W mode (Toggle / default false)",
          "Draw Q (Toggle / default true)",
          "Draw R (Toggle / default true)",
          "Draw W2 position (Toggle / default true)",
          "W2 position color (Draw color)",
          "Draw R2 position (Toggle / default true)",
          "R2 position color (Draw color)",
          "Draw shadow timer (Toggle / default true)",
          "Shadow timer color (Draw color)",
          "Draw damage indicator (Toggle / default true)",
          "Draw R killable tip (Toggle / default true)",
          "Fallback text: Farm key (Toggle / default false)",
          "Fallback text: Manual WEQ (Toggle / default false)",
          "Fallback text: Force R (Toggle / default false)",
          "Fallback text: turret R modifier (Toggle / default false)",
          "Fallback text: Flee (Toggle / default false)",
          "Fallback text: W mode (Toggle / default false)",
          "Fallback text: Hold Combo R (Toggle / default false)",
          "X offset (Slider / default 20)",
          "Y offset (Slider / default 120)",
          "Text spacing (Slider / default 20)"
        ]
      },
      {
        "title": "Debug",
        "items": [
          "Debug prints (Toggle / default false)",
          "Throttle (ms) (Slider / default 750)",
          "Log state changes / R mark (Toggle / default false)",
          "Log cast attempts (Toggle / default false)",
          "Log shadow/object evidence (Toggle / default false)",
          "Log prediction / hitchance (Toggle / default false)",
          "Log evade/safety routes (Toggle / default false)",
          "Log modes/manual/keys (Toggle / default false)",
          "Log killsteal decisions (Toggle / default false)",
          "Log clear/lasthit decisions (Toggle / default false)",
          "Debug shadow labels (Toggle / default false)"
        ]
      }
    ]
  },
  {
    "name": "ZERI",
    "label": "LS",
    "role": "12 menu sections",
    "description": "LegendSense DanZAIO Zeri menu with 60 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zeri_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/zeri/menu.lua",
    "featureGroups": [
      {
        "title": "DanZPred Settings",
        "items": [
          "Smart Cast Mode (Selector / default index 1)"
        ]
      },
      {
        "title": "Key Bindings",
        "items": [
          "Semi-Manual W (Keybind / key 84)",
          "Q-E-Q Combo Key (Keybind / key 71)",
          "Wall Jump Key (Keybind / key 90)",
          "Toggle Auto Q (Keybind / key 72)"
        ]
      },
      {
        "title": "Q - Burst Fire",
        "items": [
          "Use Q in Combo (Toggle / default true)",
          "Use Q in Harass (Toggle / default true)",
          "Q Ignore Collision (Toggle / default true)",
          "Chase Q into Fog of War (Toggle / default true)",
          "FoW Chase Duration (sec) (Slider / default 2)",
          "Use Q on Wards (instead of AA) (Toggle / default true)",
          "Q Control Wards in FoW (Toggle / default true)"
        ]
      },
      {
        "title": "W - Ultrashock Laser",
        "items": [
          "Use W in Combo (Toggle / default true)",
          "Advanced Prediction (Terrain W) (Toggle / default true)",
          "Advanced Prediction (Normal W) (Toggle / default true)",
          "Only W if Target Out of Q Range (Toggle / default false)",
          "Use W in Harass (Toggle / default true)",
          "Only Use W if Hits Terrain (Toggle / default false)",
          "Use W to Killsteal (Toggle / default true)",
          "Auto W When Inside Terrain (Toggle / default true)"
        ]
      },
      {
        "title": "E - Spark Surge",
        "items": [
          "Use E to Chase in Combo (Toggle / default false)",
          "Use E to Flee Over Walls (Toggle / default true)",
          "Prevent E Under Enemy Turret (Toggle / default true)",
          "Auto W On Manual E (Toggle / default false)"
        ]
      },
      {
        "title": "R - Lightning Crash",
        "items": [
          "Use R in Combo (Toggle / default true)",
          "Auto R Killable (Toggle / default true)",
          "Auto R if My HP < % (Slider / default 0)",
          "Enable: Auto R on Enemy Count (Toggle / default true)",
          "Auto R if X Enemies Hit (Slider / default 2)",
          "Enable: Auto R on Target HP (Toggle / default false)",
          "Auto R if Target HP < % (Slider / default 40)",
          "Block R if No Targets in Range (Toggle / default true)"
        ]
      },
      {
        "title": "Combo Settings",
        "items": [
          "Passive Usage (Selector / default index 1)"
        ]
      },
      {
        "title": "Harass Settings",
        "items": [
          "Minimum Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "Farm Settings",
        "items": [
          "Enable Smart Farming (Toggle / default true)",
          "Harass with Q While Farming (Toggle / default true)",
          "Farm Min Mana % (Slider / default 40)",
          "Passive Turret Attack (Selector / default index 0)",
          "Passive Last-Hit Mode (Selector / default index 2)",
          "Prefer Passive Execute In Range (Toggle / default true)"
        ]
      },
      {
        "title": "Kill Steal Settings",
        "items": [
          "Enable Kill Steal (Toggle / default true)",
          "Use W (Toggle / default true)",
          "Use R (Toggle / default true)"
        ]
      },
      {
        "title": "Drawing Settings",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Draw Q Range (Draw color)",
          "Draw W Range (Draw color)",
          "Draw R Range (Draw color)",
          "Draw E Wall-Dash Path (Toggle / default true)",
          "Draw R Overcharge Bar (Toggle / default true)",
          "Draw E Lightning Rounds Bar (Toggle / default true)",
          "Draw Q Cooldown Bar (Toggle / default false)",
          "Draw W Hitbox Prediction (Toggle / default true)",
          "Stylized Mode (Toggle / default true)",
          "Status Display Mode (Selector / default index 1)"
        ]
      },
      {
        "title": "Drawing Settings / Damage Indicator",
        "items": [
          "Enable Damage Indicator (Toggle / default true)",
          "Show Q Damage (Toggle / default true)",
          "Show W Damage (Toggle / default true)",
          "Show E Bonus Damage (Toggle / default true)",
          "Show R Damage (Toggle / default true)",
          "Show Passive AA Damage (Toggle / default true)"
        ]
      }
    ]
  },
  {
    "name": "ZOE",
    "label": "LS",
    "role": "11 menu sections",
    "description": "LegendSense DanZAIO Zoe menu with 39 extracted controls grouped by source menu section.",
    "image": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zoe_0.jpg",
    "position": "center top",
    "sourcePath": "C:/LS/GS/tier3/DanZAIO1/champions/zoe/menu.lua",
    "featureGroups": [
      {
        "title": "Q - Paddle Star / Combat",
        "items": [
          "Use Q in Combo (Toggle / default true)",
          "Q2 Hitchance (Selector / default index 1)",
          "Q1 Setup Distance (Slider / default 650)",
          "Q2 Min Delay (ms) (Slider / default 180)",
          "Q2 Force Release (ms) (Slider / default 1050)",
          "Q2 Min Release Distance (Slider / default 1000)",
          "Enable Q2 Magnet (Toggle / default true)",
          "Q2 Magnet Desired Distance (Slider / default 1100)",
          "Q2 Magnet Step (Slider / default 220)",
          "Q1 Max Start Distance (Slider / default 1150)",
          "Strict E Priority Before Q1 (Toggle / default true)",
          "Release Q2 On Sleep (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Paddle Star / Harass",
        "items": [
          "Use Q in Harass (Toggle / default true)"
        ]
      },
      {
        "title": "Q - Paddle Star / Farm",
        "items": [
          "Use Q in Farm (Toggle / default true)",
          "Q Min Minions (Slider / default 3)"
        ]
      },
      {
        "title": "E - Sleepy Trouble Bubble / Combat",
        "items": [
          "Use E in Combo (Toggle / default true)",
          "Max Target Range (Slider / default 1400)",
          "E Hitchance (Selector / default index 1)"
        ]
      },
      {
        "title": "E - Sleepy Trouble Bubble / Reactive",
        "items": [
          "Anti-Gapclose (Toggle / default true)",
          "Wall-E Helper (Toggle / default true)",
          "Auto-Interrupt (Toggle / default false)"
        ]
      },
      {
        "title": "E - Sleepy Trouble Bubble",
        "items": [
          "Semi Cast E (Keybind / key string.byte(\"T\"))"
        ]
      },
      {
        "title": "R - Portal Jump / Combat",
        "items": [
          "Use R Assist for Q2 (Toggle / default true)",
          "Assist Min Range (Slider / default 900)",
          "Assist Max Range (Slider / default 1250)",
          "Require Sleep Window (Toggle / default false)",
          "Avoid Turret Jump (Toggle / default true)"
        ]
      },
      {
        "title": "Modes",
        "items": [
          "Harass Min Mana % (Slider / default 35)",
          "Farm Min Mana % (Slider / default 40)"
        ]
      },
      {
        "title": "Draw",
        "items": [
          "Enable Drawings (Toggle / default true)",
          "Q Range (Toggle / default true)",
          "E Range (Toggle / default true)",
          "R Range (Toggle / default true)"
        ]
      },
      {
        "title": "Draw / E Wall Helper",
        "items": [
          "Show Wall Helper (Toggle / default true)",
          "Show Impact Marker (Toggle / default true)"
        ]
      },
      {
        "title": "Key Settings",
        "items": [
          "Combo Key (Keybind / key 32)",
          "Harass Key (Keybind / key string.byte(\"C\"))",
          "Farm Key (Keybind / key string.byte(\"V\"))",
          "Last Hit Key (Keybind / key string.byte(\"A\"))"
        ]
      }
    ]
  }
];
