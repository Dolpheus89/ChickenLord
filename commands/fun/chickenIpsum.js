import { SlashCommandBuilder } from 'discord.js';

const startIpsum = ["Chicken","ipsum","dolor","sit","amet"]
const chickenIpsumWords = [
    "the", "cluck", "bock", "b'gawk", "squawk", "eats",
    "a", "jumps", "runs", "kfc", "sings",
    "cot", "cot", "dances", "fried", "chicken", "flies",
    "sleeps", "walks", "watches", "climbs", "reads",
    "writes", "petok", "gack", "buffalo", "wings", "nuggets",
    "l214", "có", "klukk", "куд-куда","."
  ];
  

  const chickenIpsum = (wordCount) => {
    const result = []

    for (let i = 0; i < wordCount; i++) {
        if (i < startIpsum.length) {
          result.push(startIpsum[i]);
        } else {
          const randomIndex = Math.floor(Math.random() * chickenIpsumWords.length);
          let selectedWord = chickenIpsumWords[randomIndex];
    
          if (result[i - 1] === ".") {
            selectedWord = selectedWord.charAt(0).toUpperCase() + selectedWord.slice(1);
          } else if (selectedWord.toLowerCase() === result[i - 1].toLowerCase()) {
            selectedWord = chickenIpsumWords[(randomIndex + 1) % chickenIpsumWords.length];
          }
    
          result.push(selectedWord);

        }
        
    }

    if(result[result.length] !== "."){
        result.push(".")
    }
     
    return result.join(" ")
  }


  export const data = new SlashCommandBuilder()
    .setName("lorem")
    .setDescription('Génère du texte Chicken Ipsum')
    .addIntegerOption(option =>
        option.setName('nb')
          .setDescription('Nombre de mots à générer')
          .setRequired(true)
      );


      export const execute = async (interaction) => {
        const wordCount = interaction.options.getInteger('nb');
        if (wordCount <= 0) {
          return interaction.reply('Le nombre de mots doit être supérieur à 0.');
        }
      
        const chickenIpsumText = chickenIpsum(wordCount);
        await interaction.reply(chickenIpsumText);
      }