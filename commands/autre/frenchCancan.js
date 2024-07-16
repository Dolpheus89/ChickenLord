import { SlashCommandBuilder } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
} from "@discordjs/voice";
import { createReadStream } from "fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioFilePath = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "FrenchCancan.wav"
);

export const data = new SlashCommandBuilder()
  .setName("cancan")
  .setDescription("Hymne national des galinacés");

export const execute = async (interaction) => {
  if (interaction.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    try {
      const stream = createReadStream(audioFilePath);
      const resource = createAudioResource(stream, {
        inputType: StreamType.Raw,
      });
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      player.on("idle", () => {
        connection.destroy();
      });

      await interaction.reply(
        "🐔🎶 Préparez-vous à entendre l'hymne national des galinacés ! 🎵🐓"
      );
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier audio :", error);
      await interaction.reply(
        "Il y a eu une erreur lors de la lecture du fichier audio. Veuillez réessayer plus tard."
      );
    }
  } else {
    await interaction.reply(
      "Vous devez d'abord rejoindre un canal vocal pour écouter l'hymne national des galinacés ! 🐔🎶"
    );
  }
};
