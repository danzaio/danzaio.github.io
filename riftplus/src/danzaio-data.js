import { lsChampions } from "./ls-champions.generated.js";

const splash = (champion) =>
	`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;

const yasuoFeatureGroups = [
	{
		title: "Quick setup",
		items: [
			"Turn Yasuo on or off instantly",
			"Choose farm, flee, dive, and semi-auto ultimate keys",
			"Decide when the script may fight under turret",
			"Keep advanced toggles close without opening every menu",
		],
	},
	{
		title: "Combo plan",
		items: [
			"Use Q and tornado at the right distance",
			"Dash through minions or enemies to reach better angles",
			"Spin with EQ when it creates pressure",
			"Ult only when the airborne target is worth it",
			"Prefer tornado before risky dash-ins",
		],
	},
	{
		title: "Harass",
		items: [
			"Trade with Q when the angle is clean",
			"Use E for short pressure without overcommitting",
			"Keep poke rules separate from full all-in rules",
		],
	},
	{
		title: "Finish kills",
		items: [
			"Look for Q, dash, and ultimate kill windows",
			"Use damage padding so close calls do not become wasted casts",
			"Keep finishing logic separate from normal combo behavior",
		],
	},
	{
		title: "Lane clear",
		items: [
			"Clear waves with Q, tornado, dash, or EQ",
			"Avoid greedy waveclear when enemies are close",
			"Let last-hit rules stay stricter than fast clear rules",
		],
	},
	{
		title: "Jungle clear",
		items: [
			"Use Q and E on monsters",
			"Spin with EQ when it speeds up camps",
			"Keep jungle logic separate from lane behavior",
		],
	},
	{
		title: "Last hit",
		items: [
			"Secure low-health minions with Q or E",
			"Use strict last-hit mode when you want safer farming",
			"Avoid spending dash when it is not needed",
		],
	},
	{
		title: "Escape",
		items: [
			"Dash through safe targets while fleeing",
			"Stack Q while leaving danger",
			"Use tornado to peel the closest threat or selected target",
		],
	},
	{
		title: "Manual plays",
		items: [
			"Trigger Q Flash or EQ Flash yourself",
			"Use manual ultimate when you want full control",
			"Blacklist targets you never want to ult manually",
		],
	},
	{
		title: "Q and tornado",
		items: [
			"Tune Q and tornado ranges",
			"Build and hold tornado for better fights",
			"Prioritize champions before minions when it matters",
			"Use tornado to interrupt channels or stop dashes",
			"Enable Flash plays only when you want them",
		],
	},
	{
		title: "Wind Wall",
		items: [
			"Block dangerous projectiles for yourself",
			"Protect allies when their health is low",
			"Delay Wind Wall enough to avoid panic casts",
			"Reserve Wind Wall for spells worth blocking",
		],
	},
	{
		title: "Dash control",
		items: [
			"Pick aggressive, safe bridge, or flee-focused dash style",
			"Dash to minions, monsters, or enemies for better paths",
			"Avoid dashes that end too close to danger",
			"Respect turret and enemy-count safety before going in",
		],
	},
	{
		title: "Last Breath",
		items: [
			"Choose kill-confirm, low-health, multi-target, or always-ready ultimate style",
			"Use airborne checks before casting",
			"Support Airblade and Bayblade play patterns",
			"Reserve ultimate for high-value moments",
		],
	},
	{
		title: "Reactions",
		items: [
			"Interrupt important enemy casts with tornado",
			"Stop gapclosers before they reach you",
			"Use Wind Wall against dangerous missiles",
			"Keep experimental reactions easy to spot",
		],
	},
	{
		title: "Cooldown discipline",
		items: [
			"Hold tornado for interrupt windows",
			"Save Wind Wall for real danger",
			"Keep dash available for escape",
			"Reserve ultimate for multi-target or kill-confirm plays",
		],
	},
	{
		title: "Extra dash paths",
		items: [
			"Use minions, jungle monsters, enemies, or plants as dash bridges",
			"Stack Q during dash movement",
			"Turn risky path options on only when you want them",
		],
	},
	{
		title: "Enemy rules",
		items: [
			"Tune behavior against specific enemy champions",
			"Disable reactions against targets you do not care about",
			"Blacklist bad ultimate targets",
		],
	},
	{
		title: "On-screen info",
		items: [
			"Show Q, Wind Wall, dash, and ultimate ranges",
			"Show damage and Q state",
			"Show current dash mode without clutter",
		],
	},
	{
		title: "Troubleshooting",
		items: [
			"Show why a cast was blocked",
			"Trace combo, clear, flee, prediction, damage, and cooldown decisions",
			"Use diagnostics only when support asks for details",
		],
	},
];

const localizeYasuoFeatureGroups = (translations) =>
	yasuoFeatureGroups.map((group) => ({
		title: translations[group.title]?.title || group.title,
		items: translations[group.title]?.items || group.items,
	}));

export const platformCards = [
	{
		key: "ven",
		title: "VEN",
		kicker: "Focused VEN suite",
		href: "ven/",
		image: splash("Yasuo"),
		stats: ["3 champions", "real pred", "fight-ready controls"],
		body: "Caitlyn, Ezreal, and Yasuo with real feature coverage, safer casts, prediction controls, and readable in-game menus.",
	},
	{
		key: "ls",
		title: "LS",
		kicker: "LegendSense suite",
		href: "ls/",
		image: splash("Hwei"),
		stats: [
			`${lsChampions.length} champions`,
			"easy champion browser",
			"grouped controls",
		],
		body: "Browse the full LegendSense lineup, see what each champion can do, and pick your next setup with confidence.",
	},
	{
		key: "hanbot",
		title: "Hanbot",
		kicker: "Rift+ script suite",
		href: "hanbot/",
		image: splash("Ezreal"),
		stats: ["30 champions", "clean setup", "Telegram + Discord"],
		body: "A broad champion lineup for players who want quick setup, familiar controls, and picks that are easy to browse.",
	},
	{
		key: "yasuo",
		title: "Yasuo",
		kicker: "DanZ Yasuo deep suite",
		href: "yasuo/",
		image: splash("Yasuo"),
		stats: ["full player toolkit", "Q3 + Wind Wall", "E bridge + Last Breath"],
		body: "A dedicated Yasuo page for players who want tornado control, Wind Wall saves, dash paths, and clean ultimate windows.",
	},
];

export const yasuoSuite = {
	key: "yasuo",
	name: "DanZ Yasuo",
	platformLabel: "Rift+ // Yasuo for Hanbot",
	headline: "Control the wind without losing the fight.",
	lede: "Stack Q with purpose, cut key projectiles with Wind Wall, dash through the wave for better angles, and save Last Breath for knockups that can decide the fight.",
	heroImage: splash("Yasuo"),
	panelImage: splash("Yasuo"),
	stats: [
		{
			label: "Champion",
			value: "YASUO",
			note: "Tornado pressure, dash paths, Wind Wall saves, and ultimate timing.",
		},
		{
			label: "Fight style",
			value: "AGILE",
			note: "Trade short, bridge through targets, punish knockups, and keep an exit route.",
		},
		{
			label: "Platform",
			value: "HB",
			note: "For Hanbot players who want Yasuo to feel sharp without becoming reckless.",
		},
	],
	signals: [
		"yasuo // lane pressure",
		"tornado // peel + engage",
		"wind wall // clutch saves",
		"dash // bridge + escape",
		"ultimate // fight finisher",
	],
	primaryAction: "VIEW YASUO KIT",
	secondaryAction: "REQUEST NEW CHAMPION",
	discordAction: "JOIN DISCORD",
	bugAction: "REPORT BUG",
	featureAction: "REQUEST FEATURE",
	requestsLabel: "requests",
	panelTitle: "Q stacks. Wind Wall saves. Dash angles. Last Breath finishers.",
	panelBody:
		"Yasuo is built around finding an angle, taking it fast, and still having enough discipline to leave danger alive.",
	systemsTitle: "Built for real Yasuo moments",
	systemsBody:
		"Poke with Steel Tempest, hold tornado for threat, block the spell that matters, dash through the fight, and ult when the knockup is worth it.",
	championTitle: "Yasuo kit",
	championBody:
		"From lane pressure to all-in windows, every option points back to how Yasuo wins fights.",
	updatesTitle: "Pressure, discipline, finish",
	updatesBody:
		"The strongest plays come from knowing when to hold Q3, when to save Wind Wall, when to dash, and when to commit with R.",
	requestTitle:
		"Want Yasuo to handle a matchup or fight differently? Send the moment in.",
	supportLinks: [
		{ text: "Yasuo toolkit", href: "#all-champions" },
		{ text: "Request Yasuo feature", action: "feature", champion: "YASUO" },
		{ text: "Discord", href: "https://dsc.gg/danzaio" },
	],
	features: [
		{
			kicker: "Lane pressure",
			title: "Poke with Q while building the tornado threat.",
			body: "Steel Tempest keeps pressure up, Q3 gives space to start or stop a fight, and short trades stay separate from full commits.",
		},
		{
			kicker: "All-in angles",
			title: "Dash through the wave when the path is worth it.",
			body: "E can bridge through minions, monsters, or champions to create EQ pressure, chase windows, or a safer way out.",
		},
		{
			kicker: "Tornado control",
			title: "Hold Q3 for peel, engage, or interrupts.",
			body: "A saved tornado can stop a dash, break a channel, protect space, or set up the knockup that turns into Last Breath.",
		},
		{
			kicker: "Wind Wall",
			title: "Save the wall for the spell that changes the fight.",
			body: "Wind Wall matters most against key projectiles, low-health saves, and moments where one blocked cast decides the trade.",
		},
		{
			kicker: "Last Breath",
			title: "Ult when the airborne target is worth the commit.",
			body: "R can favor kill confirms, high-value targets, or bigger knockups instead of burning on every possible airborne enemy.",
		},
		{
			kicker: "Escape routes",
			title: "Use the map as a way out, not only a way in.",
			body: "Dash targets can become escape bridges, Q stacks can build while leaving, and tornado can peel the closest threat.",
		},
	],
	champions: [
		{
			name: "YASUO",
			label: "FULL KIT",
			role: "Tornado Pressure / Wind Wall Saves",
			description:
				"For Yasuo players who want sharper Q rhythm, smarter dash angles, clutch Wind Wall value, and Last Breath windows that actually matter.",
			image: splash("Yasuo"),
			position: "center top",
			features: [
				"Steel Tempest pressure for trades, clear, and tornado setup.",
				"Dash bridges through minions, monsters, and enemies for better angles.",
				"Wind Wall protection for dangerous projectiles and low-health fights.",
				"Last Breath logic for kill confirms, multi-target knockups, and high-value commits.",
			],
			featureGroups: yasuoFeatureGroups,
		},
	],
	facts: [
		{
			version: "Fight",
			date: "Yasuo",
			type: "player control",
			title: "Yasuo is built around real match moments.",
			bullets: [
				"Short trades, all-ins, escapes, and farming each have their own rules.",
				"Tornado, dash, Wind Wall, and ultimate choices are easy to scan before game start.",
				"Advanced options stay available without hiding the core playstyle.",
			],
		},
		{
			version: "Safety",
			date: "in game",
			type: "smarter risk",
			title: "Aggression stays tied to danger checks.",
			bullets: [
				"Dash logic can respect turrets, enemy count, and escape needs.",
				"Wind Wall can be saved for projectiles that actually matter.",
				"Ultimate rules can favor kill confirms or bigger multi-target moments.",
			],
		},
		{
			version: "Support",
			date: "feedback",
			type: "fast fixes",
			title: "Reports should describe real game moments.",
			bullets: [
				"Send matchup, clip, mode, and what you expected Yasuo to do.",
				"Use feature requests for new combo rules, safer dashes, or matchup behavior.",
				"Discord stays one click away from the Yasuo page.",
			],
		},
	],
	locales: {
		en: {
			languageLabel: "EN",
		},
		ptbr: {
			languageLabel: "PT-BR",
			platformLabel: "Rift+ // Yasuo para Hanbot",
			headline: "Controle o vento sem perder a luta.",
			lede: "Acumule Q com intenção, corte projéteis decisivos com Wind Wall, atravesse a wave para criar ângulos e guarde o Last Breath para knockups que viram a fight.",
			primaryAction: "VER KIT DO YASUO",
			secondaryAction: "PEDIR NOVO CAMPEÃO",
			discordAction: "ENTRAR NO DISCORD",
			systemsTitle: "Feito para momentos reais de Yasuo",
			systemsBody:
				"Pressione com Steel Tempest, segure o tornado como ameaça, bloqueie o spell certo, use o dash para reposicionar e finalize quando o knockup valer o commit.",
			championTitle: "Kit do Yasuo",
			championBody:
				"Da pressão na lane até janelas de all-in, cada escolha aponta para como Yasuo vence lutas.",
			updatesTitle: "Pressão, disciplina e finalização",
			updatesBody:
				"As melhores jogadas vêm de saber quando segurar Q3, guardar Wind Wall, entrar com E e comprometer o R.",
			requestTitle:
				"Quer que o Yasuo lide melhor com algum matchup ou luta? Envie o momento.",
			bugAction: "REPORTAR BUG",
			featureAction: "PEDIR FEATURE",
			requestsLabel: "pedidos",
			panelTitle:
				"Stacks de Q. Wind Wall decisivo. Ângulos de dash. Last Breath para finalizar.",
			panelBody:
				"Yasuo encontra uma abertura, entra rápido e ainda precisa de disciplina para sair vivo.",
			stats: [
				{
					label: "Campeão",
					value: "YASUO",
					note: "Pressão de tornado, rotas de dash, bloqueios de Wind Wall e timing de ultimate.",
				},
				{
					label: "Estilo",
					value: "ÁGIL",
					note: "Troque curto, atravesse alvos, puna knockups e mantenha uma rota de saída.",
				},
				{
					label: "Plataforma",
					value: "HB",
					note: "Para jogadores de Hanbot que querem Yasuo afiado sem virar kamikaze.",
				},
			],
			signals: [
				"yasuo // pressão de lane",
				"tornado // peel + engage",
				"wind wall // saves decisivos",
				"dash // ponte + fuga",
				"ultimate // finalização",
			],
			supportLinks: [
				{ text: "Kit do Yasuo", href: "#all-champions" },
				{
					text: "Pedir feature do Yasuo",
					action: "feature",
					champion: "YASUO",
				},
				{ text: "Discord", href: "https://dsc.gg/danzaio" },
			],
			features: [
				{
					kicker: "Pressão de lane",
					title: "Use Q para trocar enquanto prepara o tornado.",
					body: "Steel Tempest mantém pressão, Q3 cria espaço para iniciar ou parar uma luta, e trades curtas não viram all-in sem motivo.",
				},
				{
					kicker: "Ângulos de entrada",
					title: "Atravesse a wave quando o caminho valer o risco.",
					body: "E pode usar minions, monstros ou campeões para criar pressão de EQ, perseguir aberturas ou encontrar uma saída melhor.",
				},
				{
					kicker: "Controle de tornado",
					title: "Guarde Q3 para peel, engage ou interrupção.",
					body: "Um tornado bem guardado para dash, canalização ou knockup de sequência vale mais que gastar pressão cedo.",
				},
				{
					kicker: "Wind Wall",
					title: "Use a parede na habilidade que muda a luta.",
					body: "Wind Wall tem mais valor contra projéteis-chave, defesas de vida baixa e momentos em que bloquear um cast decide a troca.",
				},
				{
					kicker: "Last Breath",
					title: "Use R quando o alvo airborne valer a entrada.",
					body: "Last Breath pode priorizar confirmação de abate, alvos de alto valor ou knockups maiores, em vez de ultar qualquer alvo levantado.",
				},
				{
					kicker: "Rotas de fuga",
					title: "Use o mapa para sair, não só para entrar.",
					body: "Alvos de E viram pontes de escape, stacks de Q podem crescer durante a fuga e tornado pode afastar a ameaça mais próxima.",
				},
			],
			champions: [
				{
					name: "YASUO",
					label: "KIT COMPLETO",
					role: "Pressão de Tornado / Defesas com Wind Wall",
					description:
						"Para jogadores de Yasuo que querem ritmo de Q mais limpo, ângulos de E melhores, Wind Wall decisivo e Last Breath usado só quando importa.",
					image: splash("Yasuo"),
					position: "center top",
					features: [
						"Pressão de Steel Tempest para troca, limpeza e preparo do tornado.",
						"E por minions, monstros e campeões para criar melhores ângulos.",
						"Wind Wall para projéteis perigosos e lutas de vida baixa.",
						"Last Breath para confirmar abates, punir knockups múltiplos e entrar só em jogadas de alto valor.",
					],
					featureGroups: localizeYasuoFeatureGroups({
						"Quick setup": {
							title: "Configuração rápida",
							items: [
								"Ative ou pause o Yasuo instantaneamente",
								"Escolha teclas de farm, fuga, dive e ultimate semi-auto",
								"Defina quando lutar debaixo da torre",
								"Mantenha controles avançados acessíveis sem poluir o jogo",
							],
						},
						"Combo plan": {
							title: "Plano de combo",
							items: [
								"Use Q e tornado na distância certa",
								"Atravesse minions ou campeões para criar ângulos melhores",
								"Gire com EQ quando isso cria pressão real",
								"Use R só quando o alvo airborne valer o commit",
								"Prefira preparar tornado antes de dashes arriscados",
							],
						},
						Harass: {
							title: "Harass",
							items: [
								"Troque com Q quando o ângulo estiver limpo",
								"Use E para pressão curta sem se comprometer demais",
								"Mantenha poke separado do all-in completo",
							],
						},
						"Finish kills": {
							title: "Finalização",
							items: [
								"Procure janelas de kill com Q, dash e ultimate",
								"Use margem de dano para evitar casts desperdiçados",
								"Separe finalização da rotação normal de combo",
							],
						},
						"Lane clear": {
							title: "Limpeza de lane",
							items: [
								"Limpe waves com Q, tornado, dash ou EQ",
								"Evite clear ganancioso quando inimigos estão perto",
								"Mantenha last-hit mais rígido que limpeza rápida",
							],
						},
						"Jungle clear": {
							title: "Limpeza da jungle",
							items: [
								"Use Q e E em monstros",
								"Gire com EQ quando acelerar o camp",
								"Separe lógica da jungle da lógica da lane",
							],
						},
						"Last hit": {
							title: "Último golpe",
							items: [
								"Garanta minions baixos com Q ou E",
								"Use modo rígido quando quiser farm seguro",
								"Evite gastar E quando não precisa",
							],
						},
						Escape: {
							title: "Fuga",
							items: [
								"Dashe por alvos seguros enquanto foge",
								"Acumule Q enquanto sai do perigo",
								"Use tornado para afastar a ameaça mais próxima ou o alvo selecionado",
							],
						},
						"Manual plays": {
							title: "Jogadas manuais",
							items: [
								"Acione Q Flash ou EQ Flash quando quiser",
								"Use ultimate manual para controle total",
								"Bloqueie alvos que você nunca quer ultar manualmente",
							],
						},
						"Q and tornado": {
							title: "Q e tornado",
							items: [
								"Ajuste alcance do Q e do tornado",
								"Prepare e segure tornado para fights melhores",
								"Priorize campeões antes de minions quando importar",
								"Use tornado para interromper canais ou parar dashes",
								"Ative jogadas com Flash só quando quiser esse risco",
							],
						},
						"Wind Wall": {
							title: "Wind Wall",
							items: [
								"Bloqueie projéteis perigosos para você",
								"Proteja aliados quando estiverem com pouca vida",
								"Use atraso para evitar Wind Wall em pânico",
								"Guarde a parede para spells que valem o cooldown",
							],
						},
						"Dash control": {
							title: "Controle de dash",
							items: [
								"Escolha estilo agressivo, ponte segura ou foco em fuga",
								"Dashe em minions, monstros ou inimigos para caminhos melhores",
								"Evite terminar o dash perto demais do perigo",
								"Respeite torre e número de inimigos antes de entrar",
							],
						},
						"Last Breath": {
							title: "Last Breath",
							items: [
								"Escolha ultimate para kill confirm, alvo low HP, multi-target ou sempre que passar nos filtros",
								"Cheque airborne antes de castar",
								"Suporte padrões de Airblade e Bayblade",
								"Guarde R para momentos de alto valor",
							],
						},
						Reactions: {
							title: "Reações",
							items: [
								"Interrompa casts importantes com tornado",
								"Pare gapclosers antes que cheguem em você",
								"Use Wind Wall contra mísseis perigosos",
								"Mantenha reações arriscadas fáceis de identificar",
							],
						},
						"Cooldown discipline": {
							title: "Disciplina de recarga",
							items: [
								"Segure tornado para janelas de interrupção",
								"Guarde Wind Wall para perigo real",
								"Mantenha E disponível para escapar",
								"Reserve ultimate para múltiplos alvos ou confirmação de abate",
							],
						},
						"Extra dash paths": {
							title: "Rotas extras de dash",
							items: [
								"Use minions, monstros, inimigos ou plantas como pontes",
								"Acumule Q durante o movimento do dash",
								"Ative caminhos arriscados só quando quiser",
							],
						},
						"Enemy rules": {
							title: "Regras por inimigo",
							items: [
								"Ajuste comportamento contra campeões específicos",
								"Desative reações contra alvos que não importam",
								"Bloqueie alvos ruins para ultimate",
							],
						},
						"On-screen info": {
							title: "Informação na tela",
							items: [
								"Mostre alcance de Q, Wind Wall, E e ultimate",
								"Mostre dano e estado do Q",
								"Mostre o modo atual de dash sem poluir a tela",
							],
						},
						Troubleshooting: {
							title: "Diagnóstico",
							items: [
								"Mostre por que um cast foi bloqueado",
								"Trace decisões de combo, limpeza, fuga, predição, dano e recarga",
								"Use diagnóstico só quando suporte pedir detalhes",
							],
						},
					}),
				},
			],
			facts: [
				{
					version: "Luta",
					date: "Yasuo",
					type: "controle do jogador",
					title: "Cada modo existe para um momento de luta.",
					bullets: [
						"Trocas curtas, all-ins, fugas e farm têm regras próprias.",
						"Tornado, E, Wind Wall e ultimate ficam separados por impacto real.",
						"Opções avançadas continuam disponíveis sem atrapalhar o plano principal.",
					],
				},
				{
					version: "Segurança",
					date: "em jogo",
					type: "risco menor",
					title: "Agressividade vem junto de checagens de perigo.",
					bullets: [
						"E pode respeitar torre, quantidade de inimigos e necessidade de fuga.",
						"Wind Wall pode ser guardado para projéteis importantes.",
						"Ultimate pode priorizar confirmação de abate ou janelas de múltiplos alvos.",
					],
				},
				{
					version: "Suporte",
					date: "feedback",
					type: "ajustes rápidos",
					title: "Relatos devem mostrar o momento exato da luta.",
					bullets: [
						"Envie matchup, clipe, modo usado e o que você esperava do Yasuo.",
						"Use pedidos de recurso para novas regras de combo, E seguro ou matchups.",
						"Discord fica a um clique da página do Yasuo.",
					],
				},
			],
		},
		cn: {
			languageLabel: "CN",
			platformLabel: "Rift+ // Hanbot 亚索",
			headline: "御风而战, 不把自己送进危险。",
			lede: "有节奏地叠 Q, 用风墙挡关键弹道, 借兵线穿出更好的角度, 把 Last Breath 留给真正能改变团战的击飞。",
			primaryAction: "查看亚索套件",
			secondaryAction: "请求新英雄",
			discordAction: "加入 Discord",
			systemsTitle: "为真实亚索时刻而做",
			systemsBody:
				"用 Steel Tempest 施压, 把吹风留作威胁, 挡下关键技能, 用 E 改变站位, 在击飞值得跟进时才交大招。",
			championTitle: "亚索套件",
			championBody:
				"从对线压制到 all-in 窗口, 每个选择都围绕亚索如何赢下战斗。",
			updatesTitle: "压力、纪律、收割",
			updatesBody:
				"强势操作来自知道何时留 Q3、何时保留风墙、何时进场、何时用 R 承诺击杀。",
			requestTitle: "希望亚索更好处理某个 matchup 或团战? 把具体时刻发给我们。",
			bugAction: "报告 BUG",
			featureAction: "请求功能",
			requestsLabel: "请求",
			panelTitle: "Q 层数。关键风墙。E 角度。Last Breath 收割。",
			panelBody: "亚索要找到开口, 快速切入, 同时仍然有足够纪律活着离开。",
			stats: [
				{
					label: "英雄",
					value: "YASUO",
					note: "吹风压制、E 路线、风墙保护和大招时机。",
				},
				{
					label: "风格",
					value: "灵活",
					note: "短换血, 穿越目标, 惩罚击飞, 并保留退路。",
				},
				{
					label: "平台",
					value: "HB",
					note: "给想要亚索更锋利但不鲁莽的 Hanbot 玩家。",
				},
			],
			signals: [
				"yasuo // 对线压制",
				"tornado // 保护 + 开团",
				"wind wall // 关键保护",
				"dash // 桥接 + 逃跑",
				"ultimate // 收割战斗",
			],
			supportLinks: [
				{ text: "亚索套件", href: "#all-champions" },
				{ text: "请求亚索功能", action: "feature", champion: "YASUO" },
				{ text: "Discord", href: "https://dsc.gg/danzaio" },
			],
			features: [
				{
					kicker: "对线压制",
					title: "用 Q 换血, 同时制造吹风威胁。",
					body: "Steel Tempest 保持压力, Q3 可以开战也可以止战, 短换血不会无故变成硬上。",
				},
				{
					kicker: "进场角度",
					title: "路径值得冒险时再穿过兵线。",
					body: "E 可以借小兵、野怪或英雄制造 EQ 压力、追击机会或更安全的退路。",
				},
				{
					kicker: "吹风控制",
					title: "把 Q3 留给保护、开团或打断。",
					body: "留住吹风可以拦住位移、打断引导、保护空间, 或接上能转成 Last Breath 的击飞。",
				},
				{
					kicker: "风墙",
					title: "把墙交给能改变战斗的技能。",
					body: "风墙在关键弹道、低血量保护和一个格挡就能决定换血结果时最有价值。",
				},
				{
					kicker: "Last Breath",
					title: "目标 airborne 值得承诺时再开 R。",
					body: "R 可以偏向击杀确认、高价值目标或多人击飞, 而不是见到任何击飞就交。",
				},
				{
					kicker: "逃跑路线",
					title: "地图不只是进场工具, 也是退路。",
					body: "E 目标可以变成逃跑桥梁, 离场时也能叠 Q, 吹风可以推开最近威胁。",
				},
			],
			champions: [
				{
					name: "YASUO",
					label: "完整套件",
					role: "吹风压制 / 风墙保护",
					description:
						"给想要更干净 Q 节奏、更好 E 角度、关键风墙和有价值 Last Breath 的亚索玩家。",
					image: splash("Yasuo"),
					position: "center top",
					features: [
						"Steel Tempest 用于换血、清线和准备吹风。",
						"借小兵、野怪和英雄位移来创造更好角度。",
						"风墙用于危险弹道和低血量战斗。",
						"Last Breath 用于击杀确认、多人击飞和高价值进场。",
					],
					featureGroups: localizeYasuoFeatureGroups({
						"Quick setup": {
							title: "快速设置",
							items: [
								"快速开启或暂停亚索",
								"选择补刀、逃跑、越塔和半自动大招按键",
								"决定何时允许塔下作战",
								"保持高级控制可用, 但不让画面变乱",
							],
						},
						"Combo plan": {
							title: "连招计划",
							items: [
								"在正确距离使用 Q 和吹风",
								"借小兵或英雄穿出更好角度",
								"EQ 能制造真实压力时再使用",
								"只有 airborne 目标值得承诺时才用 R",
								"高风险 E 前优先准备吹风",
							],
						},
						Harass: {
							title: "消耗",
							items: [
								"角度干净时用 Q 换血",
								"用 E 做短压制, 避免过度承诺",
								"把 poke 和完整 all-in 分开",
							],
						},
						"Finish kills": {
							title: "收割",
							items: [
								"寻找 Q、E 和 R 的击杀窗口",
								"保留伤害余量, 避免浪费技能",
								"把收割逻辑和普通连招分开",
							],
						},
						"Lane clear": {
							title: "清线",
							items: [
								"用 Q、吹风、E 或 EQ 清 wave",
								"敌人靠近时避免贪清线",
								"补刀规则比快速清线更严格",
							],
						},
						"Jungle clear": {
							title: "清野",
							items: [
								"对野怪使用 Q 和 E",
								"EQ 能加快营地时再使用",
								"清野逻辑和对线逻辑分开",
							],
						},
						"Last hit": {
							title: "补刀",
							items: [
								"用 Q 或 E 收低血量小兵",
								"想要安全 farming 时使用严格补刀",
								"不需要时避免浪费 E",
							],
						},
						Escape: {
							title: "逃跑",
							items: [
								"逃跑时借安全目标位移",
								"离开危险时继续叠 Q",
								"用吹风推开最近威胁或选中目标",
							],
						},
						"Manual plays": {
							title: "手动操作",
							items: [
								"需要时手动触发 Q Flash 或 EQ Flash",
								"想要完全控制时使用手动 R",
								"禁用你永远不想手动 R 的目标",
							],
						},
						"Q and tornado": {
							title: "Q 与吹风",
							items: [
								"调整 Q 和吹风距离",
								"为了更好团战准备并保留吹风",
								"关键时优先英雄而不是小兵",
								"用吹风打断引导或阻止位移",
								"只在你接受风险时启用 Flash 操作",
							],
						},
						"Wind Wall": {
							title: "风墙",
							items: [
								"为自己挡危险弹道",
								"队友低血量时提供保护",
								"加入延迟避免恐慌交墙",
								"把风墙留给值得挡的技能",
							],
						},
						"Dash control": {
							title: "E 控制",
							items: [
								"选择激进、安全桥接或逃跑优先",
								"借小兵、野怪或敌人寻找更好路径",
								"避免 E 到危险位置",
								"进场前考虑防御塔和敌人数量",
							],
						},
						"Last Breath": {
							title: "Last Breath",
							items: [
								"选择击杀确认、低血量目标、多人目标或通过条件就 R 的风格",
								"施放前检查 airborne",
								"支持 Airblade 和 Bayblade 思路",
								"把 R 留给高价值时刻",
							],
						},
						Reactions: {
							title: "反应",
							items: [
								"用吹风打断重要施法",
								"在突进者贴脸前阻止他们",
								"用风墙挡危险飞行技能",
								"让高风险反应保持清晰可见",
							],
						},
						"Cooldown discipline": {
							title: "冷却纪律",
							items: [
								"把吹风留给打断窗口",
								"把风墙留给真正危险",
								"保留 E 用于逃跑",
								"把大招留给多人击飞或击杀确认",
							],
						},
						"Extra dash paths": {
							title: "额外 E 路线",
							items: [
								"借小兵、野怪、敌人或植物作为桥梁",
								"E 移动中继续叠 Q",
								"只在你想要时开启高风险路线",
							],
						},
						"Enemy rules": {
							title: "敌人规则",
							items: [
								"针对特定敌方英雄调整行为",
								"对不重要目标关闭反应",
								"禁用糟糕的大招目标",
							],
						},
						"On-screen info": {
							title: "屏幕信息",
							items: [
								"显示 Q、风墙、E 和 R 范围",
								"显示伤害和 Q 状态",
								"显示当前 E 模式但不制造杂乱",
							],
						},
						Troubleshooting: {
							title: "诊断",
							items: [
								"显示技能为什么被阻止",
								"追踪 combo、清线、逃跑、prediction、伤害和冷却决策",
								"只在支持需要细节时使用诊断",
							],
						},
					}),
				},
			],
			facts: [
				{
					version: "战斗",
					date: "Yasuo",
					type: "玩家控制",
					title: "每个模式都服务于具体战斗时刻。",
					bullets: [
						"短换血、all-in、逃跑和补刀各有规则。",
						"吹风、E、风墙和大招按真实影响分开。",
						"高级选项保留, 但不会打乱主要玩法。",
					],
				},
				{
					version: "安全",
					date: "游戏内",
					type: "降低风险",
					title: "进攻会结合危险判断。",
					bullets: [
						"E 可以考虑防御塔、敌人数量和逃跑需求。",
						"风墙可以留给真正重要的弹道。",
						"大招可以偏向击杀确认或多人机会。",
					],
				},
				{
					version: "支持",
					date: "反馈",
					type: "快速调整",
					title: "反馈请描述具体战斗时刻。",
					bullets: [
						"发送 matchup、录像、使用模式和你期待亚索怎么做。",
						"用功能请求提交新的 combo、E 安全或 matchup 行为。",
						"Discord 从亚索页面一键进入。",
					],
				},
			],
		},
	},
};

export const venSuite = {
	key: "ven",
	name: "VEN",
	platformLabel: "DanZAIO // VEN suite",
	headline: "Three polished VEN champions with real in-game feature coverage.",
	lede: "Caitlyn, Ezreal, and Yasuo are the current VEN lineup: prediction-driven skillshots, champion-specific safety, clear combat routing, farming, kill pressure, and useful HUD tools.",
	panelTitle: "Caitlyn, Ezreal, Yasuo.",
	heroImage: splash("Yasuo"),
	panelImage: splash("Caitlyn"),
	stats: [
		{
			label: "Supported champions",
			value: "3",
			note: "Caitlyn, Ezreal, and Yasuo are ready to play on VEN.",
		},
		{
			label: "Platform",
			value: "VEN",
			note: "Made for VEN players who want fast setup, readable menus, and exact champion tools.",
		},
		{
			label: "Core feel",
			value: "Sharp",
			note: "Prediction, safety checks, reactive casts, damage windows, and visuals stay close to the fight.",
		},
	],
	signals: [
		"champions // Caitlyn Ezreal Yasuo",
		"prediction // real cast engines",
		"fights // safer pressure",
		"support // telegram + discord",
	],
	supportLinks: [
		{ text: "Champions", href: "#all-champions" },
		{ text: "Request champion", action: "new-champion" },
		{ text: "Discord", href: "https://dsc.gg/danzaio" },
	],
	features: [
		{
			kicker: "Ready now",
			title: "Only Caitlyn, Ezreal, and Yasuo on this VEN page.",
			body: "The lineup is trimmed to the three active VEN picks so the page matches the real DLL scope instead of listing old or unrelated champions.",
		},
		{
			kicker: "Prediction",
			title: "Skillshot casts use champion-specific prediction settings.",
			body: "Caitlyn and Yasuo expose VEN SDK and RiftPred engine choices. Ezreal exposes Q/W/R hitchance, ping delay, trace tools, and outcome panels for his EzPred runtime.",
		},
		{
			kicker: "Combat flow",
			title: "Each champion follows its actual win pattern.",
			body: "Caitlyn controls trap zones and long-range picks, Ezreal keeps Q/W pressure and safe E repositioning, and Yasuo manages Q3, E routes, Wind Wall, and Last Breath windows.",
		},
		{
			kicker: "Safety",
			title: "Aggressive actions still respect danger.",
			body: "Turret checks, dash end-position checks, collision checks, spell shields, stasis and invulnerability blocks, reactive anti-gap logic, and reserve rules keep casts from becoming blind commits.",
		},
		{
			kicker: "HUD",
			title: "On-screen information focuses on decisions.",
			body: "Ranges, damage indicators, kill text, Q stack timers, locked target markers, prediction outcome panels, status overlays, and debug probes are available without forcing clutter.",
		},
		{
			kicker: "Feedback",
			title: "Report exact champion moments from the same page.",
			body: "Use requests for bugs, feature ideas, or next champion work. Clips and gameplay examples help tune prediction, safety, and cast priority.",
		},
	],
	champions: [
		{
			name: "CAITLYN",
			label: "TRAPS",
			role: "Trap Control and Long-Range Picks",
			description: "Use prediction-backed Q, trap immobilized or channeling targets, peel or combo with E, and finish kills with safer Ace in the Hole checks.",
			image: splash("Caitlyn"),
			position: "center top",
			features: [
				"Prediction Settings menu with VEN SDK and RiftPred engine choice, RiftPred default, global hitchance, ping delay, and runtime tuning",
				"Q combo and harass casts with collision checks, hitchance gates, locked-target direct Q, clear route, lasthit route, mana gate, and min-hit control",
				"W trap logic for CC, channeling, stationary targets, combo trap, E follow-up trap, anti-melee trap, dash landing trap, ammo reserve, mana gate, and duplicate-trap radius",
				"Generated W spell rows for channel and gapclose reactions plus per-enemy anti-melee rows",
				"E combo, E -> Q follow-up, peel, flee, anti-melee, anti-gap, and evade logic with end-position and enemy turret safety",
				"R execute and semi-manual R with min/max range, overkill buffer, body-block path check, nearby-enemy block, spell safety, and blocker debug",
				"Farm controls for Q clear and Q lasthit with min hits, mana gate, and rules to avoid spending W/E while farming",
				"Draw and HUD for Q/W/E/R ranges, damage indicator, R kill text, trap zones, state text, debug text, and reactive probe logs",
			],
		},
		{
			name: "EZREAL",
			label: "SKILLSHOT",
			role: "Mystic Shot Pressure and Safe Arcane Shift",
			description: "Keep Q pressure active, use W mark windows, reposition with E only when safety allows, and finish targets with configurable R and killsteal logic.",
			image: splash("Ezreal"),
			position: "center top",
			features: [
				"Prediction menu for Q/W/R hitchance, ping-delay toggle, trace console, decision/reject/collision/path/candidate logs, cast-attempt tracing, and throttle control",
				"Q controls for auto Q toggle, passive stack hold, Q + Flash, turret-disable, harass while clearing, range, combo, harass, and auto Q on CC",
				"W controls for combo, harass, W only when Q or AA can proc, tower W, tower AA-range check, range, and auto W on CC",
				"E controls for killsteal, minimum HP gate, better Q positioning, turret prevention, enemy-count safety, enemy radius checks, and guaranteed-kill override",
				"R semi-manual key, usage modes, HP threshold, default or multi-hit mode, min targets, max range, AA/Q kill avoidance, turret block, spell-shield block, stasis and invulnerability block, and auto R on CC",
				"Combo routing for W-mark focus, Q priority or force on W mark, minion collision override, smart AA weaving, max DPS mode, and spell-save rules when AA/Q/W already kills",
				"Farm, jungle, and killsteal controls for Q clear toggle, mana gate, last-hit-only Q, harass priority, jungle Q/W, and Q/W/R killsteal routing",
				"Draw and HUD for passive status, auto Q status, hitchance status, Q farm mode, Q/W/E/R ranges, R minimap, legacy text, head shader styles, prediction debugger, and Q/W/R outcome panels",
			],
		},
		{
			name: "YASUO",
			label: "WIND",
			role: "Q3 Control, Dash Routes, and Wind Wall Defense",
			description: "Stack and spend Steel Tempest cleanly, route Sweeping Blade dashes with safety checks, block dangerous projectiles, and use Last Breath only when value is real.",
			image: splash("Yasuo"),
			position: "center top",
			features: [
				"Core safety for turret/end-position gates, Q stacking while dashing, debug spam suppression, escape preservation, R-ready advanced combo checks, and turret override key",
				"Q menu with Q1/Q2, Q3 tornado, VEN SDK or RiftPred prediction engine, Q/Q3 ranges, Q3-after-E delay, auto Q on CC, Q3 reserve for R or interrupt, expiry spend, auto stacking, runtime Q3 detection, and anti-gap Q3",
				"W Wind Wall logic for self and ally projectile blocks, candidate per-spell block list, HP gates, delay, combat-only mode, danger threshold, auto attack rows, and minion/turret missile ignore",
				"E Sweeping Blade logic for direct combat dash, minion bridge to target, harass routes, flee dash, anti-melee, anti-gap, spell evade, turret safety, target-under-turret block, end-position distance, and enemy-count gates",
				"Generated reactive rows for Wind Wall blocks, champion auto attack blocks, E/Q3 anti-gap, E evade, Q3 interrupts, and anti-melee blacklist entries",
				"R Last Breath modes for target HP, killable, multi/value, or always-if-legal, with max range, HP/count gates, ineffective-R prevention, and Double Windy/Airblade logic",
				"Advanced combo tools for Airblade, auto Airblade, courtesy combo before R, EQ Flash/Beyblade, auto EQ Flash, solo auto EQ Flash, Keyblade, and EQ Flash min-hit settings",
				"Harass, clear, and killsteal controls for E > Q > E routes, lane Q, lane E last-hit, jungle Q/E, last-hit Q/E, farm enemy checks, and Q/E/R killsteal",
				"Drawings and probes for Q range, E range, R range, Q stack timer, Q HUD, Q3 target marker, E locked targets, harass route, buffs, missiles, Q state, block reasons, mode routing, casts, generated menus, R decisions, and lifecycle",
			],
		},
	],
	facts: [
		{
			version: "Champions",
			date: "3 ready now",
			type: "VEN lineup",
			title: "A focused VEN page for the three active picks.",
			bullets: [
				"Caitlyn, Ezreal, and Yasuo are ready to browse.",
				"Old VEN cards were removed so the page matches current scope.",
				"Each champion card lists real menu-backed features from the local VEN modules.",
			],
		},
		{
			version: "Prediction",
			date: "in game",
			type: "cast engines",
			title: "Prediction options stay visible and tunable.",
			bullets: [
				"Caitlyn and Yasuo expose VEN SDK and RiftPred selection with RiftPred as default.",
				"Ezreal exposes Q/W/R hitchance, ping delay, trace categories, and prediction outcome panels.",
				"Skillshot casts are described by real champion menus, not generic claims.",
			],
		},
		{
			version: "Safety",
			date: "combat",
			type: "controlled aggression",
			title: "Big plays keep safety gates attached.",
			bullets: [
				"Caitlyn checks traps, E end positions, R blockers, and farm spell reserves.",
				"Ezreal checks E safety, turret rules, spell shields, invulnerability, and R waste cases.",
				"Yasuo checks dash end positions, projectile danger, anti-gap rows, and legal Last Breath windows.",
			],
		},
	],
};

export const lsSuite = {
	key: "ls",
	name: "LS",
	platformLabel: "DanZAIO // LegendSense suite",
	headline: "Browse every LegendSense champion in one place.",
	lede: "Pick your champion, scan what it helps with, and decide if the setup fits your playstyle before loading into a match.",
	heroImage: splash("Hwei"),
	panelImage: splash("Aphelios"),
	stats: [
		{
			label: "Supported champions",
			value: String(lsChampions.length),
			note: "A broad LS roster ready to browse.",
		},
		{
			label: "Platform",
			value: "LS",
			note: "Built for LegendSense players who want fast champion discovery.",
		},
		{
			label: "Focus",
			value: "CLARITY",
			note: "Champion cards group fight, farm, defense, visuals, and tuning choices so they are easy to compare.",
		},
	],
	signals: [
		"legendsense // roster ready",
		"champions // easy to compare",
		"controls // grouped by purpose",
		"support // telegram + discord",
	],
	supportLinks: [
		{ text: "Champions", href: "#all-champions" },
		{ text: "Request champion", action: "new-champion" },
		{ text: "Discord", href: "https://dsc.gg/danzaio" },
	],
	features: [
		{
			kicker: "Full roster",
			title: "Find the LS champion you care about fast.",
			body: "The page keeps supported champions in one catalog so you can compare picks without searching through folders or Discord messages.",
		},
		{
			kicker: "Readable groups",
			title: "Controls are grouped by what players try to do.",
			body: "Combo, harass, farm, defense, visuals, and champion-specific options stay separated so large kits are easier to scan.",
		},
		{
			kicker: "Fast comparison",
			title: "See whether a champion has the tools you want.",
			body: "Cards make it easier to check if a pick supports the fight patterns, safety rules, and visuals you care about.",
		},
		{
			kicker: "Deep picks",
			title: "Complex champions do not become a wall of text.",
			body: "Aphelios, Zed, Hwei, Jinx, and other detailed picks keep their important choices organized for quick reading.",
		},
		{
			kicker: "Player support",
			title: "Ask for fixes with useful match context.",
			body: "Bug and feature request buttons stay close to each champion so reports can include the right pick and moment.",
		},
		{
			kicker: "Next champions",
			title: "Request what you want added next.",
			body: "If your champion is missing or needs better behavior, send the request directly from the page.",
		},
	],
	champions: lsChampions,
	facts: [
		{
			version: "Roster",
			date: `${lsChampions.length} champions`,
			type: "ready to browse",
			title: "The LS page is for choosing and comparing champions.",
			bullets: [
				"Every card gives players a quick view of what the pick supports.",
				"Large champion kits stay grouped so important options are not buried.",
				"Requests are available when something feels missing.",
			],
		},
		{
			version: "Controls",
			date: "in game",
			type: "clear setup",
			title: "The page explains controls by player need.",
			bullets: [
				"Fight, poke, clear, defense, visuals, and advanced tuning stay easy to separate.",
				"Players can scan a champion before committing to it in game.",
				"Detailed cards help support understand reports faster.",
			],
		},
		{
			version: "Feedback",
			date: "community",
			type: "next updates",
			title: "Better reports create better updates.",
			bullets: [
				"Mention champion, mode, matchup, and what happened.",
				"Send clips when a cast, dash, shield, or combo choice looked wrong.",
				"Use new champion requests when your pick is not listed.",
			],
		},
	],
};

export const hanbotSuite = {
	key: "hanbot",
	name: "Rift+ Hanbot",
	locked: true,
	platformLabel: "Rift+ // Hanbot suite",
	headline: "Hanbot lineup reveal coming soon.",
	lede: "The Hanbot page is locked while the lineup is being prepared. Join the community for release updates.",
	heroImage: splash("Ezreal"),
	panelImage: splash("Jinx"),
	stats: [
		{
			label: "Status",
			value: "TBA",
			note: "The Hanbot lineup will be announced when it is ready for players.",
		},
		{
			label: "Platform",
			value: "HB",
			note: "Rift+ Hanbot details are currently locked.",
		},
		{
			label: "Community",
			value: "CHAT",
			note: "Telegram and Discord are always one click away.",
		},
	],
	signals: [
		"hanbot // to be announced",
		"lineup // locked",
		"release // coming soon",
		"support // telegram + discord",
	],
	supportLinks: [
		{ text: "Champions", href: "#all-champions" },
		{ text: "Request champion", action: "new-champion" },
		{ text: "Discord", href: "https://dsc.gg/danzaio" },
	],
	features: [
		{
			kicker: "Current lineup",
			title: "30 supported champions are ready now.",
			body: "From Ezreal and Jinx to Pyke, Zed, Senna, Zoe, Mel, Yunara, and more, Rift+ keeps the current lineup easy to scan and easy to pick from.",
		},
		{
			kicker: "Skillshots",
			title: "Tune key casts without menu clutter.",
			body: "Supported champions like Ezreal, Jinx, and Blitzcrank give you clear spell controls so important casts feel consistent.",
		},
		{
			kicker: "Core modes",
			title: "The essentials stay easy to reach.",
			body: "Combo, Harass, Clear, visuals, and kill pressure stay organized so you can shape each champion around your playstyle quickly.",
		},
		{
			kicker: "Useful extras",
			title: "The best picks go deeper when they need to.",
			body: "Selected champions include manual keys, target rules, defensive reactions, and unique tools that fit how the champion wins fights.",
		},
		{
			kicker: "Champion depth",
			title: "Specialist champions keep their identity.",
			body: "Ezreal keeps pressure high, Pyke hunts resets, Aphelios plays around weapons, and Zed looks for explosive shadow windows.",
		},
		{
			kicker: "Feedback",
			title: "Player requests are one click away.",
			body: "Every champion card can open bug reports and feature requests, while the page also accepts new champion requests.",
		},
	],
	champions: [
		{
			name: "EZREAL",
			label: "HOT",
			role: "Mystic Shot Pressure",
			description:
				"For players who want reliable poke, W mark windows, and fast access to Ezreal core tools.",
			image: splash("Ezreal"),
			position: "center top",
		},
		{
			name: "ZERI",
			label: "UPD",
			role: "The Spark of Zaun",
			description:
				"Updated support for players who want a lighter, mobile marksman profile with core options close at hand.",
			image: splash("Zeri"),
			position: "center top",
		},
		{
			name: "JINX",
			label: "HOT",
			role: "Get Excited Reset",
			description:
				"A high-tempo marksman setup with smarter spell choices, automatic options, clear visuals, and kill pressure tools.",
			image: splash("Jinx"),
			position: "center top",
		},
		{
			name: "JAX",
			label: "BETA",
			role: "Leap Strike Pressure",
			description:
				"A developing Jax setup for players who want jump-in pressure and simple fighter controls.",
			image: splash("Jax"),
			position: "center top",
		},
		{
			name: "YUNARA",
			label: "NEW",
			role: "Fresh Champion Support",
			description:
				"Fresh champion support for players who want to try the newest picks as they arrive.",
			image: "assets/latest/yunara.jpg",
			position: "center center",
		},
		{
			name: "ZAAHEN",
			label: "NEW",
			role: "The Unsundered",
			description:
				"Early support for players who want to explore a newer champion with Rift+ controls.",
			image: "assets/hero/zaahen.jpg",
			position: "center top",
		},
		{
			name: "KOG'MAW",
			label: "RIFT+",
			role: "Orbwalker Limit",
			description:
				"A dedicated KogMaw setup built for players who want fast access to core options.",
			image: splash("KogMaw"),
			position: "center top",
		},
		{
			name: "TWITCH",
			label: "RIFT+",
			role: "Stealth Pressure",
			description:
				"A Twitch setup for players who like ambush windows, poison pressure, and cleaner fight timing.",
			image: splash("Twitch"),
			position: "center top",
		},
		{
			name: "SAMIRA",
			label: "HOT",
			role: "S-Rank Combo",
			description:
				"For players who want fast all-in flow, reset pressure, and a setup that stays aggressive.",
			image: splash("Samira"),
			position: "center top",
		},
		{
			name: "APHELIOS",
			label: "NEW",
			role: "Weapon Pair Control",
			description:
				"One of the deepest picks in the lineup, built around weapon flow, fight timing, and safe reset pressure.",
			image: splash("Aphelios"),
			position: "center top",
		},
		{
			name: "CAITLYN",
			label: "RIFT+",
			role: "Trap Logic",
			description:
				"A Caitlyn setup for players who want cleaner lane pressure, trap control, and fast menu access.",
			image: splash("Caitlyn"),
			position: "center top",
		},
		{
			name: "KAI'SA",
			label: "RIFT+",
			role: "Void Seeker",
			description:
				"A focused KaiSa setup for players who want quick, clean core combat controls.",
			image: splash("Kaisa"),
			position: "center top",
		},
		{
			name: "SHYVANA",
			label: "NEW",
			role: "Dragon Form Pressure",
			description:
				"For players who want dragon-form engage pressure, Flame Breath value, and clear fight timing.",
			image: "assets/hero/shyvana.jpg",
			position: "center top",
		},
		{
			name: "QIYANA",
			label: "NEW",
			role: "Element Combo Control",
			description:
				"For players who want tighter element choices, burst windows, and quick access to key controls.",
			image: splash("Qiyana"),
			position: "center top",
		},
		{
			name: "ZED",
			label: "NEW",
			role: "Shadow Kill Windows",
			description:
				"For assassin players who want shadow pressure, flash tools, and clearer lethal windows.",
			image: splash("Zed"),
			position: "center top",
		},
		{
			name: "SENNA",
			label: "UPD",
			role: "Soul Farming",
			description:
				"Updated support for players who want long-range utility, scaling pressure, and a clean Senna setup.",
			image: splash("Senna"),
			position: "center top",
		},
		{
			name: "TRISTANA",
			label: "RIFT+",
			role: "Explosive Charge",
			description:
				"A Tristana setup made for players who want explosive all-ins without menu clutter.",
			image: splash("Tristana"),
			position: "center top",
		},
		{
			name: "MILIO",
			label: "RIFT+",
			role: "Campfire Support",
			description:
				"A dedicated Milio setup for players who want support-focused control and clean access to key options.",
			image: splash("Milio"),
			position: "center top",
		},
		{
			name: "BLITZ",
			label: "RIFT+",
			role: "Hook Pressure",
			description:
				"A hook-first setup with cleaner grabs, utility moments, and quick access to core tools.",
			image: splash("Blitzcrank"),
			position: "center top",
		},
		{
			name: "PYKE",
			label: "RIFT+",
			role: "Execute Resets",
			description:
				"An engage-heavy setup for hook pressure, E plays, and aggressive execute windows.",
			image: splash("Pyke"),
			position: "center top",
		},
		{
			name: "ORIANNA",
			label: "RIFT+",
			role: "Ball Management",
			description:
				"A dedicated Orianna setup for players who want ball control and clean access to core pages.",
			image: splash("Orianna"),
			position: "center top",
		},
		{
			name: "XERATH",
			label: "RIFT+",
			role: "Sniper Mode",
			description:
				"Made for players who want long-range pressure and quick access to their artillery setup.",
			image: splash("Xerath"),
			position: "center top",
		},
		{
			name: "SERAPHINE",
			label: "RIFT+",
			role: "Double Cast",
			description:
				"A dedicated Seraphine setup for players who want supportive control with clean menu access.",
			image: splash("Seraphine"),
			position: "center top",
		},
		{
			name: "CORKI",
			label: "RIFT+",
			role: "Package Timer",
			description:
				"A focused Corki setup for players who want package timing support and fast core setup.",
			image: splash("Corki"),
			position: "center top",
		},
		{
			name: "OLAF",
			label: "RIFT+",
			role: "Axe Pressure",
			description:
				"A direct Olaf setup for players who want aggressive axes without extra clutter.",
			image: splash("Olaf"),
			position: "center top",
		},
		{
			name: "CASSIO",
			label: "RIFT+",
			role: "Twin Fang",
			description:
				"A dedicated Cassiopeia setup for players who want quick access to core poison-fight control.",
			image: splash("Cassiopeia"),
			position: "center top",
		},
		{
			name: "MEL",
			label: "NEW",
			role: "Arcane Pressure",
			description:
				"For players who want one of the newer arcane-flavored picks with quick Rift+ access.",
			image: "assets/latest/mel.jpg",
			position: "center top",
		},
		{
			name: "ZOE",
			label: "NEW",
			role: "Arcane Skillshots",
			description:
				"A specialist setup for players who want bubble pressure, long-range picks, and fast access to key controls.",
			image: splash("Zoe"),
			position: "center top",
		},
		{
			name: "SYNDRA",
			label: "NEW",
			role: "Sphere Control",
			description:
				"For players who want tighter sphere pressure, burst windows, and a cleaner mage setup.",
			image: splash("Syndra"),
			position: "center top",
		},
		{
			name: "XAYAH",
			label: "NEW",
			role: "Feather Control",
			description:
				"For players who want feather-focused fights, cleaner pullback timing, and strong marksman control.",
			image: splash("Xayah"),
			position: "center top",
		},
	],
	facts: [
		{
			version: "Lineup",
			date: "30 champions",
			type: "ready to browse",
			title: "The lineup is broad, fast to scan, and easy to choose from.",
			bullets: [
				"Marksmen, assassins, mages, supports, and fighters are all represented.",
				"Popular picks are easy to find in one clean champion grid.",
				"New champion requests are available when your pick is missing.",
			],
		},
		{
			version: "Controls",
			date: "easy setup",
			type: "in game",
			title: "The important options stay easy to find.",
			bullets: [
				"Combo, Harass, Clear, visuals, and kill pressure are organized around common player needs.",
				"Selected champions add manual keys, defensive reactions, and target rules for deeper tuning.",
				"Champion-specific tools stay focused on what helps you play the pick better.",
			],
		},
		{
			version: "Support",
			date: "Telegram + Discord",
			type: "quick access",
			title: "Community access stays close to the action.",
			bullets: [
				"Telegram is linked directly from the page.",
				"Discord is linked directly from the page.",
				"English and Chinese UI text are available where supported.",
			],
		},
	],
};
