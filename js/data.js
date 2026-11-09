/* ============================================================
   Games4You — game & content data
   ============================================================ */

const GAMES = [
  // Family
  {
    id: "vozic-do-kuce",
    group: "family",
    name: { sr: "Тикет ту рајд", en: "Ticket to Ride" },
    tagline: { sr: "Повежи градове, испуни своју руту", en: "Connect the cities, complete your route" },
    shortDesc: {
      sr: "Игра постављања пруга и сакупљања вагона у боји, инспирисана класичним железничким играма.",
      en: "A route-building game of laying rail lines and collecting colored train cards, inspired by classic railway games."
    },
    longDesc: {
      sr: "Играчи сакупљају вагоне у бојама и користе их да полажу пруге између градова на великој мапи. Свака довршена рута доноси поене, а тајни циљеви путовања на крају партије могу донети бонус или казну ако нису остварени. Игра комбинује лаку механику сакупљања карата са дубљим планирањем најкраћих и најисплативијих путева.",
      en: "Players collect colored train cards and use them to claim railway routes between cities on a large map. Each completed route scores points, and secret destination tickets can reward or penalize players at the end of the game. The game blends simple card-collecting with deeper route-planning strategy."
    },
    players: "2–5", age: "8+", duration: "30–60 min",
    price: 2490, discount: 15,
    imgSeed: "ticketToRide",
    isNew: true,
    baseRatings: [5,4,5,4]
  },
  {
    id: "lov-na-blago",
    group: "family",
    name: { sr: "Монопол", en: "Monopoly" },
    tagline: { sr: "Купуј, гради, постани најбогатији на табли", en: "Buy, build, become the richest on the board" },
    shortDesc: {
      sr: "Класична игра трговине некретнинама и управљања новцем за целу породицу.",
      en: "A classic property-trading and money-management game for the whole family."
    },
    longDesc: {
      sr: "У Царству некретнина играчи се крећу око табле, купују улице и граде куће и хотеле, наплаћују закупнину од противника који стану на њихово поље и покушавају да остану солвентни док други играчи банкротирају. Партије умеју да буду дуге и пуне преокрета, нарочито када неко стекне монопол над целом бојом улица.",
      en: "In Property Empire, players move around the board buying streets, building houses and hotels, collecting rent from opponents who land on their properties, and trying to stay solvent while others go bankrupt. Games can run long and are full of swings, especially once someone locks down an entire color group of streets."
    },
    players: "2–6", age: "8+", duration: "60–120 min",
    price: 3190, discount: 0,
    imgSeed: "monopoly",
    isNew: false,
    baseRatings: [5,5,4,5,3]
  },
  {
    id: "farma-srece",
    group: "family",
    name: { sr: "Човече, не љути се", en: "Čoveče, ne ljuti se (Ludo)" },
    tagline: { sr: "Прва боја до краја побеђује", en: "First color to the finish wins" },
    shortDesc: {
      sr: "Класична породична игра трке пионима кроз четири боје, уз бацање коцке.",
      en: "A classic family dice-race game with four colors of pawns."
    },
    longDesc: {
      sr: "Играчи бацају коцку и померају своје пионе по стази у боји свог тима, покушавајући да их све доведу до циља пре осталих. Ако пион противника заврши на истом пољу, враћа се на почетак. Правила су једноставна и разумеју их и најмлађи, а партије су брзе и пуне неочекиваних преокрета захваљујући срећи у бацању коцке.",
      en: "Players roll the die and move their pawns along their team's colored track, trying to get them all home before the others. Landing on an opponent's pawn sends it back to start. The rules are simple enough for the youngest players, and games are quick and full of unexpected swings thanks to the luck of the die."
    },
    players: "2–6", age: "3+", duration: "20–40 min",
    price: 2790, discount: 0,
    imgSeed: "coveceNeLjutiSe",
    isNew: false,
    baseRatings: [4,4,5]
  },

  // Strategy
  {
    id: "teraformiranje-marsa",
    group: "strategy",
    name: { sr: "Тераформирање Марса", en: "Terraforming Mars" },
    tagline: { sr: "Изгради дисајућу планету, корпорацију по корпорацију", en: "Build a breathable planet, corporation by corporation" },
    shortDesc: {
      sr: "Дубока стратешка игра управљања ресурсима на површини Црвене планете.",
      en: "A deep resource-management strategy game set on the Red Planet's surface."
    },
    longDesc: {
      sr: "Играчи преузимају улогу корпорација задужених за подизање температуре, кисеоника и океана на Марсу до нивоа погодних за живот. Кроз десетине пројектних карата играчи граде сопствену стратегију развоја, балансирајући краткорочну добит и дугорочни утицај на планету. Партије су захтевне, али сваки потез доноси видљив напредак на табли.",
      en: "Players take on the role of corporations tasked with raising Mars' temperature, oxygen and ocean coverage to livable levels. Dozens of project cards let each player build their own development strategy, balancing short-term gain against long-term planetary impact. Games are demanding, but every turn brings visible progress on the board."
    },
    players: "1–5", age: "12+", duration: "90–150 min",
    price: 6990, discount: 10,
    imgSeed: "terraformingMars",
    isNew: true,
    baseRatings: [5,5,5,4,5,4]
  },
  {
    id: "osvajaci-zvezda",
    group: "strategy",
    name: { sr: "Катан", en: "Catan" },
    tagline: { sr: "Насели острво, тргуј сировинама, гради своје царство", en: "Settle the island, trade resources, build your empire" },
    shortDesc: {
      sr: "Игра насељавања хексагоналног острва уз трговину сировинама између играча.",
      en: "A hex-tile island-settling game built around resource trading between players."
    },
    longDesc: {
      sr: "Играчи насељавају острво састављено од хексагоналних поља различитих сировина — дрвета, опеке, жита, вуне и руде. Бацањем коцке се одређује која поља производе сировине тог круга, а играчи их међусобно размењују да би изградили насеља, градове и путеве. Побеђује онај ко први сакупи довољно поена изградњом и развојем своје мреже насеља.",
      en: "Players settle an island made up of hexagonal resource tiles — wood, brick, wheat, sheep and ore. A die roll determines which tiles produce resources each turn, and players trade with each other to build settlements, cities and roads. The first to reach enough points through building and expanding their settlement network wins."
    },
    players: "3–4", age: "10+", duration: "60–120 min",
    price: 8490, discount: 0,
    imgSeed: "katan",
    isNew: false,
    baseRatings: [5,4,4,5]
  },
  {
    id: "put-svile",
    group: "strategy",
    name: { sr: "Сајд", en: "Scythe" },
    tagline: { sr: "Ратне машине, ресурси и моћ у алтернативној Европи", en: "War machines, resources and power in an alternate Europe" },
    shortDesc: {
      sr: "Стратешка игра асиметричних фракција, механичких јединица и борбе за територије.",
      en: "A strategic game of asymmetric factions, mechanized units and territorial combat."
    },
    longDesc: {
      sr: "У овој игри играчи воде једну од неколико асиметричних фракција у алтернативној историји почетка 20. века, сакупљају ресурсе, граде механичке јединице и шире се преко мапе освајајући територије. Одлуке о томе да ли се фокусирати на економију, војску или тајне циљеве директно обликују ток сваке партије, а сукоби између играча су ретки, али значајни.",
      en: "In this game, players lead one of several asymmetric factions in an alternate early-20th-century history, gathering resources, building mechanized units, and expanding across the map to claim territory. Decisions about focusing on economy, military strength or hidden objectives shape the course of each game, and direct conflicts between players are rare but significant."
    },
    players: "1–5", age: "14+", duration: "90–120 min",
    price: 3990, discount: 20,
    imgSeed: "scythe",
    isNew: false,
    baseRatings: [4,3,4,4]
  },

  // Party
  {
    id: "ludi-crtez",
    group: "party",
    name: { sr: "Код нејмс", en: "Codenames" },
    tagline: { sr: "Једна реч, много агената, само један тим побеђује", en: "One word, many agents, only one team wins" },
    shortDesc: {
      sr: "Тимска игра погађања речи у којој један играч даје једнoречне кључеве саиграчима.",
      en: "A team word-guessing game where one player gives one-word clues to their teammates."
    },
    longDesc: {
      sr: "Играчи су подељени у два тима, а у сваком тиму један играч зна које речи на табли припадају његовом тиму и покушава да их наведе једнoречним кључем који повезује више речи одjeдном. Остатак тима покушава да погоди тачне речи на основу тог кључа, избегавајући речи противничког тима и посебно опасну реч која одмах завршава партију поразом.",
      en: "Players are split into two teams. In each team, one player knows which words on the board belong to their team and tries to lead teammates to those words using a single-word clue that links several words at once. The rest of the team tries to guess the correct words from that clue, avoiding the opposing team's words and one especially dangerous word that ends the game immediately in defeat."
    },
    players: "4–8", age: "12+", duration: "15–30 min",
    price: 1990, discount: 0,
    imgSeed: "codeNames",
    isNew: true,
    baseRatings: [5,5,4,5]
  },
  {
    id: "brzi-odgovori",
    group: "party",
    name: { sr: "Диксит", en: "Dixit" },
    tagline: { sr: "Смисли причу, погоди туђу, изненади се сликама", en: "Make up a story, guess others', be surprised by the art" },
    shortDesc: {
      sr: "Игра причања прича у којој играчи погађају која сликовита карта одговара датој реченици.",
      en: "A storytelling game where players guess which illustrated card matches a given phrase."
    },
    longDesc: {
      sr: "Сваки круг један играч бира карту из своје руке и смишља кратку реченицу или асоцијацију која је описује, а да остали не виде коју карту је изабрао. Остали играчи потајно бирају карту из своје руке која најбоље одговара тој реченици, све карте се промешају и открију, а играчи гласају за ону коју мисле да је оригинална. Поени се добијају балансирањем између превише очигледних и превише нејасних описа.",
      en: "Each round, one player picks a card from their hand and comes up with a short phrase or association describing it, without showing the card to the others. The other players secretly pick a card from their own hand that best matches that phrase, all the cards are shuffled and revealed, and everyone votes for the one they think is the original. Points come from balancing clues that are too obvious against ones that are too obscure."
    },
    players: "3–6", age: "8+", duration: "30 min",
    price: 1690, discount: 0,
    imgSeed: "dixit",
    isNew: false,
    baseRatings: [4,4,3,4]
  },
  {
    id: "glasine",
    group: "party",
    name: { sr: "Експлозивни мачићи", en: "Exploding Kittens" },
    tagline: { sr: "Извлачи карте, избегавај експлозију, остани последњи", en: "Draw cards, dodge the explosion, be the last one standing" },
    shortDesc: {
      sr: "Брза карташка игра пуна ризика у којој нико не жели да извуче погрешну карту.",
      en: "A fast card game full of risk where no one wants to draw the wrong card."
    },
    longDesc: {
      sr: "Играчи наизменично извлаче карте из шпила, покушавајући да избегну опасну карту која их одмах избацује из игре. Специјалне карте омогућавају играчима да прескоче потез, погледају шта долази или приморају другог играча да извуче две карте уместо једне. Игра комбинује коцкање са тактичким коришћењем карата, а последњи преживели играч побеђује.",
      en: "Players take turns drawing cards from the deck, trying to avoid the dangerous card that instantly knocks them out of the game. Special cards let players skip their turn, peek at what's coming, or force another player to draw two cards instead of one. The game blends push-your-luck tension with tactical card play, and the last player standing wins."
    },
    players: "2–5", age: "7+", duration: "15 min",
    price: 1890, discount: 25,
    imgSeed: "explodingKittens",
    isNew: false,
    baseRatings: [5,4,5]
  }
];

const GROUP_LABELS = {
  family:   { sr: "Породичне игре", en: "Family Games" },
  strategy: { sr: "Стратешке игре", en: "Strategy Games" },
  party:    { sr: "Забавне игре",   en: "Party Games" }
};

const ANNOUNCEMENTS = [
  {
    title: { sr: "Турнир: Тераформирање Марса", en: "Tournament: Terraforming Mars" },
    date: { sr: "9. август 2026.", en: "August 9, 2026" },
    text: {
      sr: "Пријавите се за наш четврти годишњи турнир и освојите вредне награде из продавнице.",
      en: "Sign up for our fourth annual tournament and win valuable store prizes."
    }
  },
  {
    title: { sr: "Вече брзих игара", en: "Quick Games Night" },
    date: { sr: "22. јул 2026.", en: "July 22, 2026" },
    text: {
      sr: "Дођите на опуштено вече журка-игара уз освежење и добро друштво.",
      en: "Join us for a relaxed party-games night with refreshments and good company."
    }
  },
  {
    title: { sr: "Радионица за родитеље и децу", en: "Parent & Child Workshop" },
    date: { sr: "5. септембар 2026.", en: "September 5, 2026" },
    text: {
      sr: "Научите правила три нове породичне игре кроз кратку радионицу у продавници.",
      en: "Learn the rules of three new family games through a short in-store workshop."
    }
  }
];

const GALLERY_STORE = [
  "boardgame-shop-interior-1","boardgame-shop-interior-2","boardgame-shop-shelves",
  "boardgame-shop-counter","boardgame-shop-table","boardgame-shop-window"
];
const GALLERY_GAMES = [
  "boardgame-pieces-closeup","boardgame-dice-macro","boardgame-cards-fan",
  "boardgame-tokens","boardgame-board-topdown","boardgame-meeples"
];
const GALLERY_VIDEOS = [
  { id: "ETu4RDkOxfg", title: { sr: "Најава турнира 2026", en: "2026 Tournament Announcement" } },
  { id: "3ZuPk6oXaXY", title: { sr: "Правила игре за почетнике", en: "Rules Explained for Beginners" } },
  { id: "eR6MRRMt6XI", title: { sr: "Промо: нова сезона игара", en: "Promo: New Game Season" } }
];
