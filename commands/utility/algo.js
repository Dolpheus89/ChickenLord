import { SlashCommandBuilder } from 'discord.js';
import fs from "node:fs"

const pathToAlgo = "./datas/algo.json"
const algo = JSON.parse(fs.readFileSync(pathToAlgo,"utf-8"))

export const utile = true

export const data = new SlashCommandBuilder()
.setName("algo")
.setDescription(`Donne un exercice d'algorithme avec le niveau de difficulté choisis`)
.addIntegerOption(option =>
    option.setName('difficulté')
      .setDescription(`difficulté de l'algo`)
      .setRequired(true)
      .setChoices({
        name:"Ptit'oeuf 🐣",
        value:1
      },{
        name:"Poussin 🐥",
        value:2
      },{
        name:"Poulet 🐔",
        value:3
      }

    ))

    export const execute = async (interaction) =>  {
        const difficultyNB = interaction.options.getInteger('difficulté');
        const difficulty = algo.filter((content) => content.difficulty === difficultyNB)
        const exercice = difficulty[Math.floor(Math.random() * difficulty.length)]

        await interaction.reply(`🐔 **C'est l'heure de l'algo-poulet !** 🐔\n\n**${exercice.title}**\n${exercice.description}\n\`\`\`javascript\n${exercice.function}\n\`\`\`\nBonne chance, petit poulet ! 🐣🐥🐔`);
    }