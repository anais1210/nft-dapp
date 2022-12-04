const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { faker } = require("@faker-js/faker");

const input = "./Images";
const output = "./outputs";

let img_counter = 1;
const imgSize = { width: 500, height: 500 };
const desired_ext = ".webp"; //le most simplified
const base_url =
  "https://ipfs.io/ipfs/QmNuvRjh5SwEjaGfMjDiniDbM8NCpyW8dXP3DQeZpMqizF/";

const attributes = {
  weapon: [
    "Stick",
    "Knife",
    "Blade",
    "Clube",
    "Ax",
    "Sword",
    "Spear",
    "Gun",
    "Craft",
  ],
  environment: [
    "Space",
    "Sky",
    "Desert",
    "Forest",
    "Grassland",
    "MountainS",
    "Ocean",
    "Rainforest",
  ],
  rarity: Array.from(Array(10).keys()),
};

fs.readdirSync(input).forEach((file) => {
  const original_ext = path.extname(file);
  const original_filename = path.basename(file);

  if ([".jpg", ".png", ".jpeg", "gif", "webp"].includes(original_ext)) {
    const id = img_counter;
    const metadata = {
      id: id,
      name: `NFTUseCase #${id}`,
      description:
        "NFTUseCase Art, NFT Collection. Mint and collect the hottest NFTs around",
      price: 1,
      image: base_url + id + desired_ext,
      demand: faker.random.numeric({ min: 10, max: 100 }),
      attributes: [
        {
          trait_type: "Environment",
          value: attributes.environment.sort(() => 0.5 - Math.random())[0],
        },
        {
          trait_type: "Weapon",
          value: attributes.environment.sort(() => 0.5 - Math.random())[0],
        },
        {
          trait_type: "Rarity",
          value: attributes.environment.sort(() => 0.5 - Math.random())[0],
          max_value: 10,
        },
        {
          display_type: "date",
          trait_type: "Created",
          value: Date.now(),
        },
        {
          display_type: "date",
          trait_type: "Created",
          value: Date.now(),
        },
        {
          display_type: "number",
          trait_type: "generation",
          value: 1,
        },
      ],
    };

    if (fs.existsSync(input + "/" + original_filename)) {
      sharp(`${input}/${original_filename}`)
        .resize(imgSize.width, imgSize.height)
        .toFile(`${output}/images/${id + desired_ext}`, (err, info) => {
          console.log(err);
        });
      fs.writeFileSync(
        `${output}/metadatas/${id}.json`,
        JSON.stringify(metadata),
        {
          encoding: "utf8",
          flag: "w",
        }
      );
    }
    // console.log(metadata);
    img_counter++;
  }
});
