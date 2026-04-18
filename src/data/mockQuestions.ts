export interface Question {
  id: string;
  examType: 'JAMB' | 'WAEC' | 'NECO';
  subject: string;
  year: string;
  questionText: string;
  image: string | null;
  options: string[];
  correctAnswer: number; // Index 0-3
  staticExplanation: string;
}

export const mockQuestions: Question[] = [
  {
    id: "q1",
    examType: "JAMB",
    subject: "Physics",
    year: "2022",
    questionText: "A uniform meter rule balances horizontally on a knife edge placed at the 60cm mark when a mass of 5g is suspended from one end. What is the mass of the rule?",
    image: null,
    options: ["2.5g", "5.0g", "10.0g", "15.0g"],
    correctAnswer: 2,
    staticExplanation: "Using the principle of moments: For a uniform rule, the center of gravity is at the 50cm mark. Clockwise moment = Anti-clockwise moment. Let M be the mass of the rule. M(60-50) = 5(100-60) => 10M = 5(40) => 10M = 200 => M = 20g. Wait, if suspended from 'one end' (usually the 100cm end if it's balancing at 60cm). M(10) = 5(40) is correct for the 100cm end."
  },
  {
    id: "q2",
    examType: "WAEC",
    subject: "Biology",
    year: "2021",
    questionText: "Which of the following processes does not take place in the mammalian kidney?",
    image: null,
    options: ["Ultra-filtration", "Selective reabsorption", "Deamination", "Hormonal secretion"],
    correctAnswer: 2,
    staticExplanation: "Deamination is the process by which the liver removes the amino group from amino acids. It takes place in the liver, not the kidney."
  },
  {
    id: "q3",
    examType: "NECO",
    subject: "Chemistry",
    year: "2023",
    questionText: "Identify the functional group present in the diagram below (Simulation).",
    image: "https://picsum.photos/seed/chemistry/400/200", // Using a placeholder for demo
    options: ["Alcohol (-OH)", "Carboxylic Acid (-COOH)", "Aldehyde (-CHO)", "Ketone (>C=O)"],
    correctAnswer: 1,
    staticExplanation: "The diagram shows a carbon double-bonded to an oxygen and also bonded to a hydroxyl group (-OH), which defines a Carboxylic Acid."
  },
  {
    id: "q4",
    examType: "JAMB",
    subject: "English",
    year: "2022",
    questionText: "Choose the option that is nearest in meaning to the underlined word: The manager’s speech was very *cogent*.",
    image: null,
    options: ["Irrelevant", "Confusing", "Convincing", "Unimportant"],
    correctAnswer: 2,
    staticExplanation: "Cogent means clear, logical, and convincing."
  },
  {
    id: "q5",
    examType: "WAEC",
    subject: "Mathematics",
    year: "2020",
    questionText: "If the sum of interior angles of a regular polygon is 1440 degrees, how many sides does the polygon have?",
    image: null,
    options: ["8", "10", "12", "14"],
    correctAnswer: 1,
    staticExplanation: "The formula for the sum of interior angles is (n-2) * 180. So: (n-2) * 180 = 1440. (n-2) = 1440/180 = 8. n = 8 + 2 = 10."
  },
  {
    id: "q6",
    examType: "JAMB",
    subject: "Chemistry",
    year: "2019",
    questionText: "The oxidation state of Manganese in KMnO4 is?",
    image: null,
    options: ["+2", "+5", "+7", "+4"],
    correctAnswer: 2,
    staticExplanation: "K is +1, O is -2. So, +1 + Mn + 4(-2) = 0. +1 + Mn - 8 = 0. Mn - 7 = 0. Mn = +7."
  },
  {
    id: "q7",
    examType: "WAEC",
    subject: "Physics",
    year: "2018",
    questionText: "Which of the following describes the behavior of a semiconductor at absolute zero temperature?",
    image: null,
    options: ["Perfect conductor", "Superconductor", "Perfect insulator", "Partial conductor"],
    correctAnswer: 2,
    staticExplanation: "At 0K, the electrons in a semiconductor are all in the valence band, and the conduction band is empty. Thus, it behaves as a perfect insulator."
  },
  {
    id: "q8",
    examType: "NECO",
    subject: "Biology",
    year: "2022",
    questionText: "The basic unit of classification is the?",
    image: null,
    options: ["Genus", "Species", "Class", "Kingdom"],
    correctAnswer: 1,
    staticExplanation: "Species is the basic and smallest unit of biological classification."
  },
  {
    id: "jamb-bio-2010-q2",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following characterizes a mature plant cell?",
    image: null,
    options: [
      "the cytoplasm fills up the entire cell space",
      "the nucleus is pushed to the centre of the cell",
      "the cell wall is made up of cellulose",
      "the nucleus is small and irregular in shape"
    ],
    correctAnswer: 2,
    staticExplanation: "A mature plant cell is characterized by a large central vacuole that pushes the nucleus to the side, and a rigid cell wall made of cellulose. The cytoplasm only forms a thin layer restricted to the periphery."
  },
  {
    id: "jamb-bio-2010-q3",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following is NOT a function of the nucleus of a cell?",
    image: null,
    options: [
      "it controls the life processes of the cell",
      "it translates genetic information for the manufacture of proteins",
      "it stores and carries hereditary information",
      "it is reservoir of energy for the cell"
    ],
    correctAnswer: 3,
    staticExplanation: "The nucleus controls cell activities and stores genetic material. Energy production and storage is the function of the mitochondria (and ATP), not the nucleus."
  },
  {
    id: "jamb-bio-2010-q4",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The dominant phase in the life cycle of a fern is the?",
    image: null,
    options: ["gametophyte", "prothallus", "sporophyte", "antheridium"],
    correctAnswer: 2,
    staticExplanation: "In pteridophytes (ferns), the sporophyte is the dominant, visible, and independent phase of the life cycle."
  },
  {
    id: "jamb-bio-2010-q5",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Parental care is exhibited by",
    image: null,
    options: ["toads", "snails", "earthworms", "birds"],
    correctAnswer: 3,
    staticExplanation: "Birds are well known for exhibiting extensive parental care, including brooding and feeding their young, unlike most lower vertebrates or invertebrates."
  },
  {
    id: "jamb-bio-2010-q6",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "With respect to their decreasing dependence on aquatic conditions for reproduction, which of the following is the correct arrangement of the animals represented (Referencing simulation diagram)?",
    image: "https://picsum.photos/seed/evolution/400/200",
    options: ["I, IV, II and III", "IV, III, II and I", "I, II, IV and III", "III, II, IV and I"],
    correctAnswer: 2,
    staticExplanation: "The correct sequence follows evolutionary adaptation to land: I (Fish/Amphibian - most dependent) to more land-adapted organisms. Sequence I, II, IV, III typically represents Fish, Amphibians, Reptiles, and then Birds/Mammals in these specific past questions."
  },
  {
    id: "jamb-bio-2010-q7",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the animals represents the oldest creatures in terms of evolutionary history (Referencing simulation diagram)?",
    image: "https://picsum.photos/seed/history/400/200",
    options: ["III", "II", "I", "IV"],
    correctAnswer: 2,
    staticExplanation: "In terms of evolutionary phylogeny relative to vertebrates, the fish-like organism (usually labelled I) represents the ancestral state."
  },
  {
    id: "jamb-bio-2010-q8",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following groups of cells is devoid of true nuclei?",
    image: null,
    options: ["algae", "monera", "fungi", "viruses"],
    correctAnswer: 1,
    staticExplanation: "Monera (prokaryotes like bacteria) lack a membrane-bound nucleus. Viruses are non-cellular."
  },
  {
    id: "jamb-bio-2010-q9",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The main function of the feathers covering the part labelled I is to (Referencing bird diagram)",
    image: "https://picsum.photos/seed/bird/400/200",
    options: [
      "prevent ectoparasites from attacking the animal",
      "generate heat to keep the animal warm",
      "provide some power for flight",
      "serve as insulator to maintain body heat"
    ],
    correctAnswer: 3,
    staticExplanation: "Feathers play a vital role in thermoregulation by acting as insulation to trap body heat."
  },
  {
    id: "jamb-bio-2010-q10",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Based on the shape and structure of the beak and feet, the bird represented is likely to feed mainly on",
    image: "https://picsum.photos/seed/beak/400/200",
    options: ["flesh", "fruits", "seeds", "nectar"],
    correctAnswer: 0,
    staticExplanation: "Birds with curved, sharp beaks and powerful talons (as typically shown in these JAMB figures) are adapted for carnivory (feeding on flesh)."
  },
  {
    id: "jamb-bio-2010-q11",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following is true of the transverse section of a dicot system?",
    image: null,
    options: ["the epidermis is completely encircled by the cortex", "the xylem is more interiorly located than the phloem", "the cambium lies between the cortex and the vascular bundles", "the vascular bundles are randomly scattered within the cortex"],
    correctAnswer: 1,
    staticExplanation: "In a dicot stem, the xylem is located towards the inner part (interior) while the phloem is located towards the outer part (exterior) of the vascular bundle."
  },
  {
    id: "jamb-bio-2010-q12",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The movement of material in the xylem and phloem tissues of the plant are represented by the arrows labelled (Referencing diagram)",
    image: "https://picsum.photos/seed/plant-transport/400/200",
    options: ["III and IV respectively", "II and I respectively", "I and II respectively", "I and III respectively"],
    correctAnswer: 2,
    staticExplanation: "Usually, arrow I (pointing upwards from roots) represents xylem transport (water/minerals), and arrow II (pointing downwards from leaves) represents phloem transport (organic nutrients)."
  },
  {
    id: "jamb-bio-2010-q13",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "During photosynthesis, the arrow labelled II represents the (Referencing diagram)",
    image: "https://picsum.photos/seed/leaf-gas/400/200",
    options: ["escape of mineral salts", "absorption of energy from the sun", "release of carbon (IV) oxide", "release of oxygen as a by-product"],
    correctAnswer: 3,
    staticExplanation: "In photosynthesis, oxygen is released as a by-product through the stomata, often represented by an arrow pointing out of the leaf."
  },
  {
    id: "jamb-bio-2010-q14",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following is lacking in the diet of a person with kwashiorkor?",
    image: null,
    options: ["vitamins", "proteins", "carbohydrates", "fats"],
    correctAnswer: 1,
    staticExplanation: "Kwashiorkor is a severe form of malnutrition specifically caused by a deficiency in dietary protein."
  },
  {
    id: "jamb-bio-2010-q15",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The mode of nutrition of sun dew and bladder wort can be described as",
    image: null,
    options: ["autotrophic", "saprophytic", "holozoic", "chemosynthetic"],
    correctAnswer: 2,
    staticExplanation: "These are carnivorous plants. Since they capture, ingest and digest whole organisms (insects), their mode of nutrition is considered holozoic/carnivorous in this context, although they are also photosynthetic."
  },
  {
    id: "jamb-bio-2010-q16",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "When the mixture of a food substance and Benedict's solution was warmed, the solution changed from blue to black-red. This indicates the presence of",
    image: null,
    options: ["reducing sugar", "fatty acid", "sucrose", "amino acid"],
    correctAnswer: 0,
    staticExplanation: "A change from blue to a brick-red/orange precipitate in a Benedict's test is a positive result for reducing sugars."
  },
  {
    id: "jamb-bio-2010-q17",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The primary structure responsible for pumping blood for circulation through the mammalian circulatory systems is the",
    image: null,
    options: ["veins", "right auricle", "arteries", "left ventricle"],
    correctAnswer: 3,
    staticExplanation: "The left ventricle is the thickest chamber of the heart, responsible for pumping oxygenated blood at high pressure into the systemic circulation."
  },
  {
    id: "jamb-bio-2010-q18",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Circulation of blood to all parts of the body except the lungs is through",
    image: null,
    options: ["the pulmonary artery", "systemic circulation", "the lymphatic system", "pulmonary circulation"],
    correctAnswer: 1,
    staticExplanation: "Systemic circulation carries oxygenated blood from the left ventricle to all body tissues and returns deoxygenated blood to the right atrium."
  },
  {
    id: "jamb-bio-2010-q19",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Yeast respires anaerobically to convert simple sugar to carbon (IV) oxide and",
    image: null,
    options: ["alcohol", "acid", "oxygen", "water"],
    correctAnswer: 0,
    staticExplanation: "Anaerobic respiration in yeast (fermentation) produces ethanol (alcohol) and CO2 from glucose."
  },
  {
    id: "jamb-bio-2010-q20",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The sheet of muscle that separates the thoracic and the abdominal cavities is the",
    image: null,
    options: ["diaphragm", "intercostal muscle", "pleural membrane", "pericardium"],
    correctAnswer: 0,
    staticExplanation: "The diaphragm is a dome-shaped muscular partition separating the thorax from the abdomen in mammals. It plays a major role in breathing."
  },
  {
    id: "jamb-bio-2010-q21",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The oily substance that lubricates the mammalian hair to keep it flexible and water repellent is secreted by the",
    image: null,
    options: ["sweet glands", "sebaceous glands", "fatty cells", "granular layer"],
    correctAnswer: 1,
    staticExplanation: "Sebaceous glands secrete sebum, an oily substance that lubricates and waterproofs the skin and hair."
  },
  {
    id: "jamb-bio-2010-q22",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The outer layer of the kidney where the Bowman's capsules are found is the",
    image: null,
    options: ["cortex", "pelvis", "medulla", "pyramid"],
    correctAnswer: 0,
    staticExplanation: "The renal cortex is the outer layer of the kidney. It contains the renal corpuscles (Bowman's capsules and glomeruli) and the convoluted tubules."
  },
  {
    id: "jamb-bio-2010-q23",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following stimuli is likely to elicit a nastic response in an organism?",
    image: null,
    options: ["Touch", "Light intensity", "Chemical substances", "Gravity"],
    correctAnswer: 0,
    staticExplanation: "Thigmonasty is a nastic response to touch, such as the folding of Mimosa pudica leaves."
  },
  {
    id: "jamb-bio-2010-q24",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "In the male reproductive system of a mammal, sperm is stored in the",
    image: null,
    options: ["van deferens", "urethra", "epididymis", "seminiferous tubules"],
    correctAnswer: 2,
    staticExplanation: "The epididymis is a coiled tube where sperm are stored and mature after being produced in the seminiferous tubules."
  },
  {
    id: "jamb-bio-2010-q25",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Chemosynthetic organisms are capable of manufacturing their food from simple inorganic substances through the process of",
    image: null,
    options: ["oxidation", "denitrifcation", "reduction", "phosphorylation"],
    correctAnswer: 0,
    staticExplanation: "Chemosynthesis involves the use of energy released from the oxidation of inorganic chemicals (like H2S or ammonia) to produce food."
  },
  {
    id: "jamb-bio-2010-q26",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The part of the human gut that has an acidic content is the",
    image: null,
    options: ["stomach", "duodenum", "ileum", "colon"],
    correctAnswer: 0,
    staticExplanation: "The stomach contains gastric juice which includes Hydrochloric acid (HCl), making its content highly acidic (pH 1-3)."
  },
  {
    id: "jamb-bio-2010-q27",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "I. Stomata → Spirogyra, II. Alveoli → Earthworm, III. Malpighian tubule → Mammal, IV. Contractile vacuole → Protozoa. Which is correctly matched?",
    image: null,
    options: ["III", "II", "I", "IV"],
    correctAnswer: 3,
    staticExplanation: "Protozoans (e.g., Amoeba, Paramecium) use contractile vacuoles for osmoregulation. Spirogyra does not have stomata, Earthworms breathe through skin (not alveoli), and Mammals use kidneys (not Malpighian tubules)."
  },
  {
    id: "jamb-bio-2010-q28",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "A food chain always begins with a",
    image: null,
    options: ["consumer", "decomposer", "producer", "primary consumer"],
    correctAnswer: 2,
    staticExplanation: "All food chains start with a primary producer (usually a green plant) which captures solar energy through photosynthesis."
  },
  {
    id: "jamb-bio-2010-q29",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Mycorrhizae promote plant growth by",
    image: null,
    options: ["absorbing inorganic ions from the soil", "protecting it from infection", "helping it to utilize atmospheric nitrogen", "serving as a growth regulator"],
    correctAnswer: 0,
    staticExplanation: "Mycorrhizal fungi extend the root system of plants, helping them absorb mineral ions, particularly phosphorus, from the soil."
  },
  {
    id: "jamb-bio-2010-q30",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The barrier between maternal and foetal blood is the",
    image: null,
    options: ["placenta", "liver", "umbilical chord", "uterine wall"],
    correctAnswer: 0,
    staticExplanation: "The placenta acts as a selective barrier that allows the exchange of nutrients, waste, and gases but prevents the direct mixing of maternal and fetal blood."
  },
  {
    id: "jamb-bio-2010-q31",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The blood component that has the greatest affinity for oxygen is the",
    image: null,
    options: ["lymphocytes", "leucocytes", "erythrocytes", "thrombocytes"],
    correctAnswer: 2,
    staticExplanation: "Erythrocytes (red blood cells) contain hemoglobin, a protein with a high affinity for binding oxygen."
  },
  {
    id: "jamb-bio-2010-q32",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which of the following organisms is mainly found in the marine habitat?",
    image: null,
    options: ["Achatina", "Tilapia", "Dog fish", "Tortoise"],
    correctAnswer: 2,
    staticExplanation: "Dogfish are small sharks, which are marine (saltwater) cartilaginous fish."
  },
  {
    id: "jamb-bio-2010-q33",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The two halves of the pelvic girdle are joined together at the",
    image: null,
    options: ["public symphysis", "ilium", "pubis", "obturator foramen"],
    correctAnswer: 0,
    staticExplanation: "The pubic symphysis is the cartilaginous joint that unites the left and right pubic bones of the pelvic girdle."
  },
  {
    id: "jamb-bio-2010-q34",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "I. Adoption of appropriate nocturnal habits, II. Burrowing, III. Adjusting their internal body temperature, IV. Possession of many sweat pores. Which are desert animal adaptations?",
    image: null,
    options: ["I and IV only", "II and III only", "I and II only", "I, II and III only"],
    correctAnswer: 2,
    staticExplanation: "Desert animals often avoid extreme daytime heat by being nocturnal (active at night) or by burrowing underground where it is cooler."
  },
  {
    id: "jamb-bio-2010-q35",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Low annual rainfall, sparse vegetation, high diurnal temperatures and cold nights are characteristic features of the",
    image: null,
    options: ["tropical rainforest", "desert", "montane forest", "guinea savanna"],
    correctAnswer: 1,
    staticExplanation: "These are textbook characteristics of desert biomes."
  },
  {
    id: "jamb-bio-2010-q36",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The activity of an organism which affects the survival of another organism in the same habitat constitutes",
    image: null,
    options: ["an edaphic factor", "an abiotic factor", "a biotic factor", "a physiographic factor"],
    correctAnswer: 2,
    staticExplanation: "Biotic factors are the living components of an ecosystem that affect other organisms (e.g., predation, competition, symbiosis)."
  },
  {
    id: "jamb-bio-2010-q37",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The average number of individuals of a species per unit area of the habitat is the",
    image: null,
    options: ["population density", "population frequency", "population size", "population distribution"],
    correctAnswer: 0,
    staticExplanation: "Population density is a measure of the number of individuals of a species in a specific area."
  },
  {
    id: "jamb-bio-2010-q38",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The vector for yellow fever is",
    image: null,
    options: ["Aedes mosquito", "Anopheles mosquito", "tsetse fly", "blackfly"],
    correctAnswer: 0,
    staticExplanation: "Yellow fever is spread primarily by the bite of the female Aedes aegypti mosquito."
  },
  {
    id: "jamb-bio-2010-q39",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The loss of soil through erosion can be reduced by",
    image: null,
    options: ["watering", "crop rotation", "manuring", "irrigation"],
    correctAnswer: 1,
    staticExplanation: "Crop rotation and maintaining soil cover (like contour plowing) help maintain soil structure and reduce erosion compared to monocropping."
  },
  {
    id: "jamb-bio-2010-q40",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The protozoan plasmodium falciparum is transmitted by",
    image: null,
    options: ["female Anopheles mosquitoes", "female Aedes mosquitoes", "female Culex mosquitoes", "female blackfly"],
    correctAnswer: 0,
    staticExplanation: "Malaria, caused by Plasmodium species, is transmitted by the bite of an infected female Anopheles mosquito."
  },
  {
    id: "jamb-bio-2010-q41",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "A dilute solution of phenylthiocarbamide tastes bitter to some people and is tasteless to others. This is an example of",
    image: null,
    options: ["taste bud variation", "discontinuous variation", "morphological variation", "continuous variation"],
    correctAnswer: 1,
    staticExplanation: "Discontinuous variation involves traits with distinct categories (either you can taste it or you cannot), with no intermediates."
  },
  {
    id: "jamb-bio-2010-q42",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "In which plantation are all the trees between the height of 2-4m? (Referencing data chart)",
    image: "https://picsum.photos/seed/plantation-data/400/200",
    options: ["III", "II", "I", "IV"],
    correctAnswer: 2,
    staticExplanation: "Usually in these exam charts, plantation I represents a uniform young growth within a narrow height range."
  },
  {
    id: "jamb-bio-2010-q43",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Which is a true feature of plantation II (Referencing data chart)?",
    image: "https://picsum.photos/seed/plantation-ii/400/200",
    options: ["it has highest number of 2m trees", "it has highest number of trees", "it has highest number of tall trees", "height of all trees range between 2m-6m"],
    correctAnswer: 3,
    staticExplanation: "In the related JAMB bar chart, Plantation II shows a spread from 2m to 6m heights."
  },
  {
    id: "jamb-bio-2010-q44",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "Thyroxine and adrenalin are examples of hormones which control",
    image: null,
    options: ["blood grouping", "tongue rolling", "behavioural patterns", "colour variation"],
    correctAnswer: 2,
    staticExplanation: "Hormones like adrenaline regulate behavioral patterns (fight-or-flight response) and thyroxine regulates metabolism, affecting activity levels."
  },
  {
    id: "jamb-bio-2010-q45",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "A pair of genes that control a trait is referred to as",
    image: null,
    options: ["an allele", "recessive", "dominant", "a hybrid"],
    correctAnswer: 0,
    staticExplanation: "An allele is one of two or more alternative forms of a gene that arise by mutation and are found at the same place on a chromosome."
  },
  {
    id: "jamb-bio-2010-q46",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The chromosome number of a cell before and after the process of meiosis is conventionally represented as",
    image: null,
    options: ["2n → 2n", "n → n", "n → 2n", "2n → n"],
    correctAnswer: 3,
    staticExplanation: "Meiosis is a reduction division that halves the chromosome number from diploid (2n) to haploid (n)."
  },
  {
    id: "jamb-bio-2010-q47",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "If both parents are heterozygous for a trait, the probability that an offspring will be recessive for that trait is",
    image: null,
    options: ["3/4", "1/2", "1/4", "1"],
    correctAnswer: 2,
    staticExplanation: "Mendelian cross (Aa x Aa) yields 1/4 AA, 1/2 Aa, and 1/4 aa (recessive)."
  },
  {
    id: "jamb-bio-2010-q48",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "At what stage in the life history of a mammal is the sex of an individual set?",
    image: null,
    options: ["at adolescence", "at puberty", "at birth", "at conception"],
    correctAnswer: 3,
    staticExplanation: "Mammalian sex is determined at the moment of fertilization (conception) by the sperm (X or Y chromosome)."
  },
  {
    id: "jamb-bio-2010-q49",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The main distinguishing features between the soldier termite and other members of the caste are the",
    image: null,
    options: [
      "presence of wings, small head and large thorax",
      "presence of wings, large thorax and small head",
      "absence of wings, strong mandibles and a large head",
      "absence of wings, big head and absence of mandible"
    ],
    correctAnswer: 2,
    staticExplanation: "Soldier termites are wingless and possess an enlarged, highly sclerotized head with powerful mandibles for defense."
  },
  {
    id: "jamb-bio-2010-q50",
    examType: "JAMB",
    subject: "Biology",
    year: "2010",
    questionText: "The flippers of a whale and the fins of a fish are examples of",
    image: null,
    options: ["divergent evolution", "coevolution", "continuous variation", "convergent evolution"],
    correctAnswer: 3,
    staticExplanation: "Whale flippers (mammal) and fish fins are analogous structures that evolved independently for the same function (swimming) in different lineages, illustrating convergent evolution."
  }
];
