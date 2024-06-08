import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import path from 'path'

const funFactsAboutChickens = [
    "Les poulets peuvent reconnaître plus de 100 visages humains.",
    "Les poulets ont une vision des couleurs supérieure à celle des humains.",
    "Les poulets peuvent rêver lorsqu'ils dorment.",
    "Les poulets communiquent avec plus de 24 vocalisations distinctes.",
    "Les poulets peuvent naviguer en utilisant le soleil.",
    "Les poulets ont des personnalités uniques, tout comme les humains.",
    "Les poulets peuvent se souvenir de leurs expériences et des lieux pendant des mois.",
    "Les poulets ont un ordre hiérarchique appelé 'ordre de picage'.",
    "Les poulets sont des descendants directs des dinosaures.",
    "Les poulets peuvent ressentir des émotions comme la peur, la joie et la tristesse.",
    "Les poulets peuvent résoudre des problèmes simples et des puzzles.",
    "Les poulets ont une capacité de reconnaissance numérique jusqu'à 5.",
    "Les poulets préfèrent les bains de poussière pour se nettoyer.",
    "Les poulets peuvent courir à une vitesse allant jusqu'à 14 km/h.",
    "Les poules peuvent pondre des œufs de différentes couleurs, comme le bleu, le vert, le rose et le brun.",
    "Une poule peut pondre environ 300 œufs par an.",
    "Les poules peuvent communiquer avec leurs poussins avant même qu'ils n'éclosent.",
    "Les poussins peuvent imiter les comportements de leur mère dès leur naissance.",
    "Les poulets peuvent se reconnaître entre eux et former des amitiés.",
    "Les poulets ont été domestiqués pour la première fois il y a environ 8 000 ans en Asie du Sud-Est.",
    "Les poulets ont un sens du temps, ils savent quand il est temps de se coucher et de se lever.",
    "Les poulets peuvent attraper des maladies similaires à celles des humains, comme la grippe.",
    "Les poulets aiment jouer, comme les chatons ou les chiots.",
    "Les poulets peuvent ressentir la douleur et la détresse.",
    "Les poules peuvent 'chanter' après avoir pondu un œuf pour annoncer leur exploit.",
    "Les poulets peuvent vivre jusqu'à 10 ans ou plus avec des soins appropriés.",
    "Les coqs chantent pour marquer leur territoire et avertir les autres coqs.",
    "Les poulets peuvent survivre à des températures extrêmement froides et chaudes, s'ils sont bien protégés.",
    "Les poulets préfèrent manger des insectes, des graines et des végétaux.",
    "Les poulets peuvent flotter sur l'eau pendant une courte période.",
    "Les poulets ont trois paupières pour protéger et nettoyer leurs yeux.",
    "Les poulets peuvent se souvenir des humains qui les ont bien traités et ceux qui ne l'ont pas fait.",
    "Les poulets peuvent se lier d'amitié avec d'autres animaux, comme les chiens et les chats.",
    "Les poulets ont des os creux qui leur permettent de voler sur de courtes distances.",
    "Les poulets utilisent des nids communautaires pour pondre leurs œufs.",
    "Les poulets peuvent détecter les champs magnétiques, ce qui les aide à naviguer.",
    "Les poulets ont une ouïe très développée et peuvent entendre des fréquences que les humains ne peuvent pas.",
    "Les poulets peuvent détecter les prédateurs grâce à leur vision périphérique étendue.",
    "Les poulets aiment écouter de la musique et peuvent même danser en rythme.",
    "Les poulets préfèrent les endroits sombres et calmes pour pondre leurs œufs.",
    "Les poulets peuvent faire la différence entre les aliments nutritifs et non nutritifs.",
    "Les poulets peuvent faire des bonds impressionnants pour atteindre des perchoirs élevés.",
    "Les poulets peuvent réguler leur température corporelle en ajustant la position de leurs plumes.",
    "Les poulets ont un bec très sensible qui leur permet de détecter la texture et la température des objets.",
    "Les poulets peuvent montrer de la compassion les uns envers les autres.",
    "Les poulets aiment prendre des bains de soleil pour se réchauffer et absorber la vitamine D.",
    "Les poulets ont des habitudes de sommeil similaires à celles des humains, avec des périodes de sommeil profond et léger.",
    "Les poulets peuvent être dressés pour effectuer des tours simples, comme venir à un appel.",
    "Les poulets ont un palais développé et préfèrent certains types de nourriture à d'autres.",
    "Les poulets peuvent être utilisés dans la thérapie animale pour aider à réduire le stress et l'anxiété chez les humains."
];


export const data = new SlashCommandBuilder()
.setName('chickenfact')
.setDescription('Fournit un fait sur les poulets...')

export const autre = true

export const execute = async (interaction) => {
    const randomFact = funFactsAboutChickens[Math.floor(Math.random() * funFactsAboutChickens.length)];
    const imagePath = path.resolve('public', 'poulet.jpg');
    const attachment = new AttachmentBuilder(imagePath);
    
    const embed = new EmbedBuilder()
    .setColor(`#a306b6`)
    .setTitle(`Chicken Facts   🐔`)
    .setDescription(randomFact)
    .setThumbnail('attachment://poulet.jpg')


    await interaction.reply({
        embeds: [embed],
        files: [attachment]});
};
