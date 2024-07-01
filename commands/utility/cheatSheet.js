import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import fs from "node:fs"

const pathToCheatSheet = "./datas/cheatSheet.json";
const cheatSheetData = JSON.parse(fs.readFileSync(pathToCheatSheet, 'utf8'));

export const utile = true

export const data = new SlashCommandBuilder()
.setName("cheatsheet")
.setDescription(`Fournit une cheat-sheet sur la technologie choisit`)
.addIntegerOption(option =>
    option.setName('technologie')
      .setDescription(`technologie à choisir`)
      .setRequired(true)
      .setChoices({
        name:"FlexBox",
        value:1
      },{
        name:"Git",
        value:2
      },{
        name:"MediaQueries",
        value:3
      }
      ,{
        name:"PouleRequest",
        value:4
      }
      ,{
        name:"Terminal",
        value:5
      }
      ,{
        name:"MethodeJS",
        value:6
      }

    ))

    export const execute = async (interaction) => {

        const technoNB = interaction.options.getInteger('technologie');
        const techno = cheatSheetData.technologies[technoNB]
    
        const imagePath = fs.readFileSync(`./public/cheat-sheet/${techno.image_url}`);
        const attachment = new AttachmentBuilder(imagePath);
    
        const embed = new EmbedBuilder()
            .setColor(`#a306b6`)
            .setTitle(`Voila ton petit rappel pour ${techno.name} ! 🐔`)
            
    
        await interaction.reply({ embeds: [embed], files: [attachment] });
    };
    