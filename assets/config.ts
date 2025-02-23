import type { SpriteConfig, SpritesheetConfig } from "./schema";

const BASE_URL = "https://play.isleward.com";

const sheetStubCore = (name: string, size: number): SpritesheetConfig => ({
  id: name,
  url: BASE_URL + `/images/${name}.png`,
  size,
  sprites: [],
});
const sheetStubMod = (
  mod: string,
  name: string,
  size: number
): SpritesheetConfig => ({
  id: `${mod}/${name}`,
  url: BASE_URL + `/server/mods/${mod}/images/${name}.png`,
  size,
  sprites: [],
});

const sprite = (x: number, y: number, name: string): SpriteConfig => ({
  name,
  x,
  y,
});

export const SPRITESHEET_CONFIGS: SpritesheetConfig[] = [
  {
    id: "abilityIcons",
    url: BASE_URL + "/images/abilityIcons.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Smite"),
      sprite(1, 0, "Magic Missile"),
      // sprite(2, 0, ''),
      sprite(3, 0, "Slash"),
      sprite(4, 0, "Harvest Life"),
      sprite(5, 0, "Whirlwind"),
      // sprite(6, 0, 'Whirlwind'),
      sprite(7, 0, "Melee"),

      sprite(0, 1, "Consecrate"),
      sprite(1, 1, "Ice Spear"),
      sprite(2, 1, "Smokebomb"),
      sprite(3, 1, "Charge"),
      sprite(4, 1, "Summon Skeleton"),
      // sprite(5, 1, ''),
      // sprite(6, 1, ''),
      sprite(7, 1, "Projectile"),

      // sprite(0, 2, ''),
      sprite(1, 2, "Fireblast"),
      // sprite(2, 2, ''),
      // sprite(3, 2, ''),
      sprite(4, 2, "Blood Barrier"),
      // sprite(5, 2, ''),
      // sprite(6, 2, ''),
      // sprite(7, 2, ''),

      sprite(0, 3, "Healing Touch"),
      sprite(2, 3, "Flurry"),
      sprite(3, 3, "Innervation"),

      sprite(2, 4, "Ambush"),
      sprite(3, 4, "Tranquility"),

      sprite(3, 5, "Swiftness"),

      sprite(0, 7, "Crystal Spikes"),
    ],
  },

  sheetStubCore("animBigObjects", 24),
  sheetStubCore("animBoss", 24),
  sheetStubCore("animChar", 8),
  sheetStubCore("animMob", 8),
  sheetStubCore("attacks", 8),
  sheetStubCore("auras", 24),
  sheetStubCore("bigObjects", 24),

  {
    id: "bosses",
    url: BASE_URL + "/images/bosses.png",
    size: 24,
    sprites: [sprite(1, 0, "Nyxaliss"), sprite(2, 0, "M'ogresh")],
  },

  {
    id: "characters",
    url: BASE_URL + "/images/characters.png",
    size: 8,
    sprites: [
      sprite(0, 0, "Wizard"),
      sprite(1, 0, "Thief"),
      sprite(2, 0, "Warrior"),
    ],
  },

  {
    id: "consumables",
    url: BASE_URL + "/images/consumables.png",
    size: 64,
    sprites: [
      sprite(0, 1, "Minor Healing Potion"),
      sprite(0, 5, "Recipe"),
      sprite(0, 9, "Carp on a Stick"),
    ],
  },

  sheetStubCore("icon", 192),

  {
    id: "items",
    url: BASE_URL + "/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Helmet"),
      sprite(0, 1, "Cowl"),
      sprite(0, 2, "Leather Cap"),
      sprite(0, 3, "Facemask"),
      // sprite(0, 4, 'Facemask'),

      sprite(1, 0, "Pendant"),
      sprite(1, 1, "Amulet"),
      sprite(1, 2, "Locket"),
      sprite(1, 3, "Choker"),

      sprite(2, 0, "Breastplate"),
      sprite(2, 1, "Robe"),
      sprite(2, 2, "Leather Armor"),
      sprite(2, 3, "Scalemail"),

      sprite(3, 0, "Gauntlets"),
      sprite(3, 1, "Gloves"),
      sprite(3, 2, "Leather Gloves"),
      sprite(3, 3, "Scale Gloves"),

      sprite(4, 0, "Signet"),
      sprite(4, 1, "Ring"),
      sprite(4, 2, "Loop"),
      sprite(4, 3, "Viridian Band"),

      sprite(5, 0, "Belt"),
      sprite(5, 1, "Sash"),
      sprite(5, 2, "Leather Belt"),
      sprite(5, 3, "Scaled Binding"),

      sprite(6, 0, "Legplates"),
      sprite(6, 1, "Pants"),
      sprite(6, 2, "Leather Pants"),
      sprite(6, 3, "Scale Leggings"),

      sprite(7, 0, "Steel Boots"),
      sprite(7, 1, "Boots"),
      sprite(7, 2, "Leather Boots"),
      sprite(7, 3, "Scale Boots"),

      sprite(8, 0, "Forged Ember"),
      sprite(8, 1, "Smokey Orb"),
      sprite(8, 2, "Quartz Fragment"),
      sprite(8, 3, "Mystic Card"),
      sprite(8, 4, "Dragon Fang"),

      sprite(9, 0, "Sword"),
      sprite(9, 1, "Gnarled Staff"),
      sprite(9, 2, "Dagger"),
      sprite(9, 3, "Axe"),
      // sprite(9, 4, 'Mace'),
      // sprite(9, 5, 'Axe'),
      sprite(9, 6, "Spear"),
      // sprite(9, 7, 'Spear'),
      sprite(9, 8, "Wand"),
      // sprite(9, 9, 'Wand'),
      sprite(9, 10, "Corrupted Blossom"),

      sprite(10, 0, "RuneInt"),
      sprite(10, 1, "RuneDex"),
      sprite(10, 2, "RuneStr"),
      sprite(10, 3, "RuneDexInt"),
      sprite(10, 4, "RuneIntStr"),

      sprite(11, 0, "Fishing Rod"),
      sprite(11, 1, "Competition Rod"),

      sprite(12, 1, "Rusted Key"),
      sprite(12, 9, "Angler's Mark"),

      sprite(13, 0, "Wooden Shield"),
      sprite(13, 1, "Gilded Shield"),
      sprite(13, 2, "Brittle Tome"),
      sprite(13, 3, "Ancient Tome"),
    ],
  },

  {
    id: "legendaryItems",
    url: BASE_URL + "/images/legendaryItems.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Trident"),
      sprite(1, 0, "Steelclaw's Bite"),
      sprite(2, 0, "Cowl of Obscurity"),
      // sprite(3, 0, ''),

      sprite(0, 1, "Putrid Shank"),
      // sprite(0, 0, ''),
      // sprite(0, 0, ''),
      // sprite(0, 0, ''),
    ],
  },

  {
    id: "materials",
    url: BASE_URL + "/images/materials.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Iron Bar"),
      sprite(1, 0, "Emberleaf"),
      sprite(2, 0, "Stinkcap"),
      sprite(3, 0, "Rat Claw"),
      // sprite(4, 0, ''),
      // sprite(5, 0, ''),
      sprite(6, 0, "Muddy Runestone"),

      sprite(0, 1, "Cloth Scrap"),
      sprite(1, 1, "Moonbell"),

      sprite(0, 2, "Common Essence"),
      sprite(1, 2, "Skyblossom"),

      sprite(0, 3, "Magic Essence"),
      sprite(0, 4, "Rare Essence"),
      sprite(0, 5, "Epic Essence"),
      sprite(0, 6, "Legendary Essence"),

      sprite(0, 7, "Leather Scrap"),
      sprite(1, 7, "Arcane Fragment"),
      sprite(2, 7, "Charged Arcane Idol"),

      sprite(0, 8, "Arcane Idol"),
      sprite(1, 8, "Unstable Idol"),
      sprite(3, 8, "Ascendant Idol"),
      sprite(6, 8, "Dragon-Glass Idol"),
      sprite(7, 8, "Bone Idol"),
      sprite(8, 8, "Smoldering Idol"),

      sprite(11, 7, "Skewering Stick"),
      sprite(11, 9, "Cerulean Pearl"),

      sprite(0, 9, "Empty Vial"),

      sprite(11, 2, "Sun Carp"),
      sprite(11, 4, "Ancient Sun Carp"),
    ],
  },

  {
    id: "mobs",
    url: BASE_URL + "/images/mobs.png",
    size: 8,
    sprites: [
      /*
	sprite(0, 0, ''),
	sprite(1, 0, ''),
	sprite(2, 0, ''),
	sprite(3, 0, ''),
	sprite(4, 0, ''),
	sprite(5, 0, ''),
	sprite(6, 0, ''),
	sprite(7, 0, ''),
	*/

      sprite(0, 0, "Vikar"),
      // sprite(1, 0, '') // villagers
      // sprite(2, 0, '') // villagers
      // sprite(3, 0, '') // villagers
      sprite(4, 0, "Firestriker Scorpion"),
      sprite(5, 0, "Sandspitter Scorpion"),
      sprite(6, 0, "Hatchling"),
      sprite(6, 0, "Viridian Serpent"),
      sprite(7, 0, "Scarlet Serpent"),

      // sprite(0, 1, ''), // villagers
      // sprite(1, 1, ''), // villagers
      // sprite(2, 1, ''), // villagers
      // sprite(3, 1, ''), // villagers
      sprite(4, 1, "Flabbers"),
      // sprite(5, 1, ''),
      sprite(6, 1, "Rodriguez"),
      // sprite(7, 1, ''),

      sprite(0, 2, "Rat"),
      // sprite(1, 2, ''),
      // sprite(2, 2, ''),
      // sprite(3, 2, ''),
      // sprite(4, 2, ''),
      // sprite(5, 2, ''),
      sprite(6, 2, "Mummy"),
      // sprite(7, 2, ''),

      sprite(0, 3, "Giant Rat"),
      sprite(1, 3, "Stinktooth"),
      sprite(2, 3, "Target Dummy"),
      // sprite(3, 3, ''),
      // sprite(4, 3, ''),
      // sprite(5, 3, ''),
      sprite(6, 3, "Luta"),
      // sprite(7, 3, ''),

      // sprite(0, 4, ''),
      sprite(1, 4, "Hermit"),
      sprite(2, 4, "Bunny"),
      sprite(3, 4, "Elk"),
      sprite(4, 4, "Seagull"),
      sprite(5, 4, "Goat"),
      sprite(6, 4, "Cow"),
      sprite(7, 4, "Pig"),

      sprite(0, 5, "Crab"),
      sprite(1, 5, "Titan Crab"),
      // sprite(2, 5, ''),
      // sprite(3, 5, ''),
      sprite(4, 5, "Flamingo"),
      sprite(5, 5, "Frog"),
      sprite(6, 5, "Beaver"),
      // sprite(7, 5, ''),

      // sprite(0, 6, ''),
      // sprite(1, 6, ''),
      sprite(2, 6, "Bandit"),
      // sprite(3, 6, ''),
      // sprite(4, 6, ''),
      // sprite(5, 6, ''),
      // sprite(6, 6, ''),
      sprite(7, 6, "Fjolgard Guard"),

      // sprite(0, 7, ''),
      sprite(1, 7, "Radulos"),
      sprite(2, 7, "Crystal Snail"),
      // sprite(3, 7, ''),
      sprite(4, 7, "Crystal Whelk"),
      sprite(5, 7, "Akarei Artificer"),
      sprite(6, 7, "Akarei Scout"),
      sprite(7, 7, "Thaumaturge Yala"),

      // sprite(0, 8, ''),
      // sprite(1, 8, ''),
      sprite(2, 8, "Penguin"),
      // sprite(3, 8, ''),
      // sprite(4, 8, ''),
      sprite(5, 8, "Angler Nayla"),
      sprite(6, 8, "Mud Crab"),
      // sprite(7, 8, ''),

      // sprite(0, 9, ''), // villagers
      // sprite(1, 9, ''), // villagers
      // sprite(2, 9, ''), // villagers
      sprite(3, 9, "Estrid"),
      // sprite(4, 9, ''), // Fjolgard sisters?
      // sprite(5, 9, ''), // Fjolgard sisters?
      // sprite(6, 9, ''), // Bandit alchemist?
      // sprite(7, 9, ''), // Bandit alchemist?

      sprite(0, 10, "Eagle"),
      sprite(1, 10, "Violet Serpent"),
      sprite(2, 10, "Albino Serpent"),
      sprite(3, 10, "Snakelet"),
      sprite(4, 10, "Sundfehr"),
      // sprite(5, 10, ''),
      // sprite(6, 10, ''),
      // sprite(7, 10, ''),
    ],
  },

  sheetStubCore("objects", 8),
  sheetStubCore("portraitIcons", 64), // TODO

  {
    id: "questItems",
    url: BASE_URL + "/images/questItems.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Eagle Feather"),

      sprite(0, 1, "Rabbit Foot"),
      sprite(1, 1, "Digested Crystal"),

      sprite(0, 2, "Elk Antler"),

      sprite(0, 3, "Severed Pincer"),
    ],
  },

  sheetStubCore("statusEffects", 8),
  sheetStubCore("statusIcons", 8),
  sheetStubCore("tiles", 8),
  sheetStubCore("ui", 8),
  sheetStubCore("uiIcons", 64),
  sheetStubCore("walls", 8),

  // class-necromancer
  sheetStubMod("class-necromancer", "abilityIcons", 64), // TODO
  sheetStubMod("class-necromancer", "avatar", 64),
  {
    id: "class-necromancer/items",
    url: BASE_URL + "/server/mods/class-necromancer/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Sickle"),
      sprite(1, 0, "Jade Sickle"),
      sprite(2, 0, "Golden Sickle"),
      sprite(3, 0, "Bone Sickle"),
    ],
  },
  sheetStubMod("class-necromancer", "mobs", 8),

  // feature-cards
  {
    id: "feature-cards/items",
    url: BASE_URL + "/server/mods/feature-cards/images/items.png",
    size: 64,
    sprites: [sprite(0, 0, "Gambler's Card")],
  },
  {
    id: "feature-cards/mobs",
    url: BASE_URL + "/server/mods/feature-cards/images/mobs.png",
    size: 8,
    sprites: [sprite(0, 0, "Shady Dealer")],
  },

  // iwd-blisterwind
  {
    id: "iwd-blisterwind/items",
    url: BASE_URL + "/server/mods/iwd-blisterwind/images/items.png",
    size: 64,
    sprites: [sprite(2, 0, "Moontouched Horn"), sprite(3, 0, "Scarab Husk")],
  },
  {
    id: "iwd-blisterwind/mobs",
    url: BASE_URL + "/server/mods/iwd-blisterwind/images/mobs.png",
    size: 8,
    sprites: [sprite(3, 0, "Moontouched Oryx Calf"), sprite(4, 0, "Oryx Calf")],
  },
  {
    id: "iwd-blisterwind/bigObjects",
    url: BASE_URL + "/server/mods/iwd-blisterwind/images/bigObjects.png",
    size: 24,
    sprites: [
      sprite(5, 3, "Moontouched Oryx Matriarch"),

      sprite(4, 4, "Oryx Patriarch"),
      sprite(5, 4, "Moontouched Oryx Patriarch"),

      sprite(5, 5, "Oryx Matriarch"),
    ],
  },
  sheetStubMod("iwd-blisterwind", "tiles", 8),
  sheetStubMod("iwd-blisterwind", "tilesExtended", 8),
  sheetStubMod("iwd-blisterwind", "walls", 8),
  sheetStubMod("iwd-blisterwind", "wallsExtended", 8),
  sheetStubMod("iwd-blisterwind", "doodadsExtended", 8),
  sheetStubMod("iwd-blisterwind", "objects", 8),
  sheetStubMod("iwd-blisterwind", "bigObjects", 8),
  sheetStubMod("iwd-blisterwind", "bigObjectsExtended", 8),

  // iwd-cosmetics
  {
    id: "iwd-cosmetics/bigMobs",
    url: BASE_URL + "/server/mods/iwd-cosmetics/images/bigMobs.png",
    size: 24,
    sprites: [sprite(0, 0, "Winged Charger")],
  },
  {
    id: "iwd-cosmetics/skins",
    url: BASE_URL + "/server/mods/iwd-cosmetics/images/skins.png",
    size: 8,
    sprites: [
      // [0, 0, ] // unused
      sprite(1, 0, "Resplendent Wizard"),

      sprite(0, 1, "Man of War"),
      sprite(1, 1, "Warrior Alternate"),

      sprite(0, 2, "Steel Crusader"),
      sprite(1, 2, "Steel Crusader Alternate"),
      sprite(2, 2, "Cobalt Crusader"),
      sprite(3, 2, "Cobalt Crusader Alternate"),
      sprite(4, 2, "Grand Crusader"),
      sprite(5, 2, "Infernal Crusader"),

      sprite(0, 3, "Frozen Lance Knight"),
      sprite(1, 3, "Frozen Invoker"),

      sprite(0, 4, "Necromancer"),
      sprite(1, 4, "Occultist"),

      sprite(0, 5, "Diviner"),
      sprite(1, 5, "Cleric Alternate"),
      sprite(2, 5, "Cleric"),

      sprite(0, 6, "Wizard Alternate"),
      sprite(1, 6, "Sashed Wizard"),
      sprite(2, 6, "Sorcerer"),

      sprite(0, 7, "Cutthroat"),
      sprite(1, 7, "Thief Alternate"),

      // [0, 8]
      sprite(1, 8, "Apprentice Druid"),
      sprite(2, 8, "Veilrunner"),
      sprite(7, 8, "Red Macaw"),
    ],
  },

  // iwd-fast-travel
  sheetStubMod("iwd-fast-travel", "worldSprites", 8),

  // iwd-fjolgard
  {
    id: "iwd-fjolgard/mobs",
    url: BASE_URL + "/server/mods/iwd-fjolgard/images/mobs.png",
    size: 8,
    sprites: [
      sprite(1, 0, "Gaekatlan Druid"),

      sprite(5, 2, "Royal Fjolgardian Mage"),
      sprite(6, 2, "Royal Fjolgardian Soldier"),
      sprite(7, 2, "Royal Fjolgardian Assassin"),

      // TODO
    ],
  },
  sheetStubMod("iwd-fjolgard", "tiles", 8),
  sheetStubMod("iwd-fjolgard", "walls", 8),
  sheetStubMod("iwd-fjolgard", "objects", 8),
  sheetStubMod("iwd-fjolgard", "doodads", 8),
  sheetStubMod("iwd-fjolgard", "bigObjects", 24),

  // iwd-gaekatla-temple
  {
    id: "iwd-gaekatla-temple/mobs",
    url: BASE_URL + "/server/mods/iwd-gaekatla-temple/images/mobs.png",
    size: 8,
    sprites: [sprite(0, 0, "Vile Brood")],
  },
  {
    id: "iwd-gaekatla-temple/items",
    url: BASE_URL + "/server/mods/iwd-gaekatla-temple/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Temple of Gaekatla Cosmetic"),
      sprite(1, 0, "Taunt"),
      sprite(2, 0, "Barbed Chain"),
      sprite(0, 1, "Virulent Cleaver"),
      sprite(1, 1, "Tox-Steel Bulwark"),
      sprite(2, 1, "Nyxaliss' Nock"),
      sprite(3, 1, "Vile Essence"),
      sprite(4, 1, "Serrated Fang"),
      sprite(5, 1, "Noxious Egg"),
    ],
  },
  sheetStubMod("iwd-gaekatla-temple", "attacks", 8),
  sheetStubMod("iwd-gaekatla-temple", "gaekatlaBigObjects", 24),

  // iwd-mail
  sheetStubMod("iwd-mail", "worldSprites", 8),

  // iwd-merrywinter
  {
    id: "iwd-merrywinter/bigMobs",
    url: BASE_URL + "/server/mods/iwd-merrywinter/images/bigMobs.png",
    size: 24,
    sprites: [
      sprite(0, 0, "Glacial Steed"),
      sprite(1, 0, "Glacial Reaper"),
      sprite(2, 0, "The Winter Man"),
    ],
  },
  {
    id: "iwd-merrywinter/items",
    url: BASE_URL + "/server/mods/iwd-merrywinter/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Festive Spear"),
      // sprite(1, 0, ''),
      // sprite(2, 0, ''),
      sprite(3, 0, "Snowflake"),

      sprite(0, 1, "Merrywinter Card"),
      sprite(1, 1, "Bottomless Eggnog"),
      // sprite(2, 1, ''), // Play script :(
      sprite(3, 1, "Sprig of Mistletoe"),

      sprite(0, 2, "Enchanted Wreath"),
      sprite(1, 2, "Unique Snowflake"),
      // sprite(2, 2, ''),
      sprite(3, 2, "Scented Beard Oil"),

      sprite(0, 3, "Merrywinter Cosmetic"),
      sprite(1, 3, "Glacial Eggnog"),
      // sprite(2, 3, ''),
      // sprite(3, 3, ''),
    ],
  },
  {
    id: "iwd-merrywinter/mobs",
    url: BASE_URL + "/server/mods/iwd-merrywinter/images/mobs.png",
    size: 8,
    sprites: [
      sprite(0, 0, "Rude Holf Mob"), // ? mob version?
      sprite(1, 0, "Frost Crab"),
    ],
  },
  {
    id: "iwd-merrywinter/skins",
    url: BASE_URL + "/server/mods/iwd-merrywinter/images/skins.png",
    size: 8,
    sprites: [
      sprite(0, 0, "Bearded Wizard"),
      sprite(1, 0, "Bearded Knight"),
      sprite(2, 0, "Bearded Priest"),
      sprite(3, 0, "Glacial Wizard"),
      sprite(4, 0, "Glacial Knight"),
      sprite(5, 0, "Glacial Priest"),

      sprite(0, 1, "Rude Holf"),
      sprite(6, 1, "Arctic Hare"),
      sprite(7, 1, "Rime Rabbit"),
    ],
  },

  // iwd-misc-events
  sheetStubMod("iwd-misc-events", "spawnAnimation", 8),

  // iwd-mounts
  {
    id: "iwd-mounts/mounts",
    url: BASE_URL + "/server/mods/iwd-mounts/images/mounts.png",
    size: 8,
    sprites: [sprite(0, 0, "Brown Horse"), sprite(1, 0, "Gray Donkey")],
  },
  {
    id: "iwd-mounts/reins",
    url: BASE_URL + "/server/mods/iwd-mounts/images/reins.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Brown Horse Reins"),
      sprite(1, 0, "Gray Donkey Reins"),
    ],
  },

  // iwd-pets
  sheetStubMod("iwd-pets", "pets", 8),

  // iwd-ranger
  {
    id: "iwd-ranger/items",
    url: BASE_URL + "/server/mods/iwd-ranger/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Broken Elderbow"),
      sprite(1, 0, "Serpentine Sinnew"),
      sprite(0, 7, "Bow"),
    ],
  },
  {
    id: "iwd-ranger/mobs",
    url: BASE_URL + "/server/mods/iwd-ranger/images/mobs.png",
    size: 8,
    sprites: [sprite(0, 0, "Finn Elderbow")],
  },
  {
    id: "iwd-ranger/abilityIcons",
    url: BASE_URL + "/server/mods/iwd-ranger/images/abilityIcons.png",
    size: 64,
    sprites: [sprite(0, 0, "Roll")],
  },

  // iwd-souls-moor
  {
    id: "iwd-souls-moor/items",
    url: BASE_URL + "/server/mods/iwd-souls-moor/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Signet of Witching"),
      sprite(0, 0, "Dead Man's Band"),
      sprite(0, 0, "Black Cat's Grace"),
      sprite(0, 0, "Banshee's Will"),
      sprite(1, 0, "Sash of Souls"),

      sprite(0, 2, "The Shadeblade"),
      sprite(1, 2, "Gourdhowl"),

      sprite(0, 3, "Squashling Vine"),
      sprite(1, 3, "The Soulfisher"),
      sprite(2, 3, "Soul Lantern"),
      sprite(3, 3, "Candy Corn"),
    ],
  },
  sheetStubMod("iwd-souls-moor", "skins", 8), // TODO
  sheetStubMod("iwd-souls-moor", "pumpkinSkelly", 8),
  sheetStubMod("iwd-souls-moor", "tiles", 8),

  // iwd-summer-fest
  {
    id: "iwd-summer-fest/items",
    url: BASE_URL + "/server/mods/iwd-summer-fest/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Radiant Sword"),
      sprite(1, 0, "Shield of Lustre"),
      sprite(2, 0, "The Sunsickle"),
      // sprite(3, 0, ''),
      sprite(4, 0, "Amulet of the Sun"),

      sprite(0, 1, "Twilight Sword"),
      sprite(1, 1, "Shield of Eclipses"),
      // sprite(2, 1, ''),
      sprite(3, 1, "Crescent Dagger"),
      sprite(4, 1, "Amulet of the Moon"),

      sprite(7, 2, "Djinn's Tonic"),

      // sprite(0, 3, ''),
      sprite(1, 3, "Solar Tear"),
      sprite(7, 3, "Festival of the Sun Cosmetic"),
    ],
  },
  {
    id: "iwd-summer-fest/mobs",
    url: BASE_URL + "/server/mods/iwd-summer-fest/images/mobs.png",
    size: 8,
    sprites: [
      sprite(0, 0, "Desert Mage"),
      sprite(1, 0, "Desert Warrior"),
      sprite(2, 0, "Desert Assassin"),
      sprite(5, 0, "Lunar Mage"),
      sprite(6, 0, "Lunar Warrior"),
      sprite(7, 0, "Lunar Assassin"),

      sprite(0, 1, "Moonbound Cultist"),
      sprite(1, 1, "Gray Sceibian"),
      sprite(7, 1, "Djinn"),

      sprite(5, 2, "Brown Camel"),
      sprite(7, 2, "Golden Camel"),
    ],
  },
  sheetStubMod("iwd-summer-fest", "tiles", 8),
  sheetStubMod("iwd-summer-fest", "walls", 8),
  sheetStubMod("iwd-summer-fest", "objects", 8),
  sheetStubMod("iwd-summer-fest", "bigObjects", 8),

  // iwd-trading
  sheetStubMod("iwd-trading", "worldSprites", 8),
  sheetStubMod("iwd-trading", "bigWorldSprites", 24),

  // iwd-trials-of-the-abyss
  {
    id: "iwd-trials-of-the-abyss/items",
    url: BASE_URL + "/server/mods/iwd-trials-of-the-abyss/images/items.png",
    size: 64,
    sprites: [sprite(0, 0, "Abyssal Lodestone")],
  },
  sheetStubMod("iwd-trials-of-the-abyss", "bigObjects", 24),
  sheetStubMod("iwd-trials-of-the-abyss", "walls", 8),
  sheetStubMod("iwd-trials-of-the-abyss", "tilesExtended", 24),

  // iwd-valentines
  {
    id: "iwd-valentines/mobs",
    url: BASE_URL + "/server/mods/iwd-valentines/images/mobs.png",
    size: 8,
    sprites: [
      sprite(0, 0, "Mardriona"),
      sprite(1, 0, "Pet Rat"),
      sprite(2, 0, "Pink Rat"),
      sprite(4, 0, "Sjofnian Huntress"),
    ],
  },
  {
    id: "iwd-valentines/items",
    url: BASE_URL + "/server/mods/iwd-valentines/images/items.png",
    size: 64,
    sprites: [
      sprite(0, 0, "Milkwort"),
      sprite(1, 0, "Elixir of Infatuation"),
      sprite(2, 0, "Rat Cage"),
      sprite(3, 0, "Pink Rat Cage"),
      sprite(5, 0, "Sjofni's Embrace MTX"),
      sprite(6, 0, "Sjofnian Bow"),
    ],
  },
  {
    id: "iwd-valentines/bigMobs",
    url: BASE_URL + "/server/mods/iwd-valentines/images/bigMobs.png",
    size: 24,
    sprites: [sprite(0, 0, "Sjofnian Deadeye")],
  },
];
