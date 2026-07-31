/*
Aevira Museum
第一階段：標題、注意事項、主選單
*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // 取得 HTML 元素
    // ==============================

    const titleScreen =
        document.getElementById("titleScreen");

    const noticeScreen =
        document.getElementById("noticeScreen");

    const menuScreen =
        document.getElementById("menuScreen");

    const mainMenu =
        document.getElementById("mainMenu");

    const fade =
        document.getElementById("fade");
const guideScreen =
    document.getElementById("guideScreen");

const guideLabel =
    document.getElementById("guideLabel");

const exhibitLabel =
    document.getElementById("exhibitLabel");

const dialogueArea =
    document.getElementById("dialogueArea");

const dialogueText =
    document.getElementById("dialogueText");

const dialogueChoices =
    document.getElementById("dialogueChoices");

const dialogueNext =
    document.getElementById("dialogueNext");

const guideReturnButton =
    document.getElementById("guideReturnButton");

const unlockNotice =
    document.getElementById("unlockNotice");

const resetButton =
    document.getElementById("resetButton");

    // ==============================
    // 基本狀態
    // ==============================

    let isTransitioning = false;

    const FADE_TIME = 750;


    // ==============================
    // 共用工具
    // ==============================

    function wait(milliseconds) {
        return new Promise(function (resolve) {
            window.setTimeout(resolve, milliseconds);
        });
    }


    function showScreen(screen) {
        screen.classList.remove("hidden");
    }


    function hideScreen(screen) {
        screen.classList.add("hidden");
    }


    async function changeScreen(
        currentScreen,
        nextScreen
    ) {

        if (isTransitioning) {
            return;
        }

        isTransitioning = true;

        fade.style.pointerEvents = "auto";
        fade.style.opacity = "1";

        await wait(FADE_TIME);

        hideScreen(currentScreen);
        showScreen(nextScreen);

        await wait(80);

        fade.style.opacity = "0";

        await wait(FADE_TIME);

        fade.style.pointerEvents = "none";

        isTransitioning = false;
    }


    // ==============================
    // 主選單
    // ==============================

    const menuItems = [
        {
            id: "ran",
            label: "Ran"
        },
        {
            id: "world",
            label: "世界観"
        },
        {
            id: "history",
            label: "歴史"
        },
        {
            id: "food",
            label: "食べ物"
        }
    ];


    function buildMainMenu() {

        mainMenu.innerHTML = "";

        menuItems.forEach(function (item) {

            const button =
                document.createElement("button");

            button.type = "button";
            button.className = "menuButton";
            button.dataset.menuId = item.id;


            const arrow =
                document.createElement("span");

            arrow.className = "menuArrow";
            arrow.textContent = "▶";


            const label =
                document.createElement("span");

            label.textContent = item.label;


            button.appendChild(arrow);
            button.appendChild(label);


            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    openExhibit(item);
                }
            );


            mainMenu.appendChild(button);
        });
    }


   function openExhibit(item) {

    if (isTransitioning) {
        return;
    }

    if (item.id === "world") {
        openWorldGuide();
        return;
    }

    window.alert(
        `「${item.label}」の展示は準備中です。`
    );
}
// ==============================
// 玩家資料
// ==============================

const SAVE_KEY = "aeviraMuseumSave_v1";


function createDefaultPlayerData() {

    return {

        knowledge: {
            aevira: false,
            god: false,
            wish: false,
            exchange: false,
            ability: false,
            lifeForce: false,
            academy: false,
            characters: false,
            ran: false,
            felu: false
        },

        interest: {
            ran: 0,
            felu: 0,
            world: 0,
            academy: 0,
            characters: 0
        },

        visits: {
            museum: 0,
            world: 0,
            ran: 0,
            felu: 0
        },

        familiarity: 0,

        flags: {
            metFelu: false,
            acceptedWorldGuide: false,
            refusedWorldGuide: false,
            finishedWorldIntro: false
        }
    };
}


function loadPlayerData() {

    const savedData =
        localStorage.getItem(SAVE_KEY);

    if (!savedData) {
        return createDefaultPlayerData();
    }

    try {

        const parsedData =
            JSON.parse(savedData);

        const defaultData =
            createDefaultPlayerData();

        return {
            ...defaultData,
            ...parsedData,

            knowledge: {
                ...defaultData.knowledge,
                ...parsedData.knowledge
            },

            interest: {
                ...defaultData.interest,
                ...parsedData.interest
            },

            visits: {
                ...defaultData.visits,
                ...parsedData.visits
            },

            flags: {
                ...defaultData.flags,
                ...parsedData.flags
            }
        };

    } catch (error) {

        console.error(
            "存檔讀取失敗：",
            error
        );

        return createDefaultPlayerData();
    }
}


let playerData =
    loadPlayerData();


function savePlayerData() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(playerData)
    );
}
// ==============================
// 博物館記憶系統
// ==============================

function upgradeMuseumMemory() {

    const knowledgeDefaults = {
        aevira: false,
        god: false,
        wish: false,
        exchange: false,
        ability: false,
        academy: false,

        companions: false,

      ran: false,

ranAbility: false,
ranExchange: false,
ranExchangeCost: false,

kou: false,
minato: false,
mochizuki: false,
felu: false,

        anomaly: false,
        spiritWorld: false,
        timeFlow: false,
        memoryMechanism: false
    };


    const interestDefaults = {
        world: 0,
        god: 0,
        wish: 0,
        exchange: 0,
        ability: 0,
        academy: 0,

        companions: 0,

        ran: 0,
        kou: 0,
        minato: 0,
        mochizuki: 0,
        felu: 0,

        anomaly: 0
    };


    const visitDefaults = {
        museum: 0,
        world: 0,

        god: 0,
        wish: 0,
        exchange: 0,
        ability: 0,
        academy: 0,

        companions: 0,

        ran: 0,
        kou: 0,
        minato: 0,
        mochizuki: 0,
        felu: 0,

        anomaly: 0
    };


    const flagDefaults = {
        metFelu: false,
        acceptedWorldGuide: false,
        refusedWorldGuide: false,
        finishedWorldIntro: false,

        noticedRanInterest: false,
        noticedAbilityInterest: false,
        noticedFeluInterest: false,

        minatoFeelingsHinted: false,
        mochizukiConcernHinted: false,

        allCompanionsVisited: false
    };


    playerData.knowledge = {
        ...knowledgeDefaults,
        ...(playerData.knowledge || {})
    };


    playerData.interest = {
        ...interestDefaults,
        ...(playerData.interest || {})
    };


    playerData.visits = {
        ...visitDefaults,
        ...(playerData.visits || {})
    };


    playerData.flags = {
        ...flagDefaults,
        ...(playerData.flags || {})
    };


    savePlayerData();
}


upgradeMuseumMemory();


// ==============================
// 話題判斷工具
// ==============================

function playerKnows(topic) {

    return Boolean(
        playerData.knowledge[topic]
    );
}


function teachPlayer(topic) {

    playerData.knowledge[topic] = true;

    savePlayerData();
}


function addTopicInterest(topic) {

    if (
        typeof playerData.interest[topic]
        !== "number"
    ) {
        playerData.interest[topic] = 0;
    }


    if (
        typeof playerData.visits[topic]
        !== "number"
    ) {
        playerData.visits[topic] = 0;
    }


    playerData.interest[topic] += 1;
    playerData.visits[topic] += 1;

    savePlayerData();
}


function getTopicInterest(topic) {

    return (
        playerData.interest[topic] || 0
    );
}


function getTopicVisits(topic) {

    return (
        playerData.visits[topic] || 0
    );
}


function createDialogueChoice(
    text,
    action
) {

    return {
        text: text,
        action: action
    };
}


// ==============================
// 特殊知識解鎖
// ==============================

// 「異変」不會因為玩家一直點某個角色而自動知道。
// 之後只有真正看過相關劇情時，才呼叫這個函式。

function unlockAnomalyTopic() {

    if (playerKnows("anomaly")) {
        return;
    }


    teachPlayer("anomaly");
}

// ==============================
// 對話系統
// ==============================

const TYPE_SPEED = 38;

let currentDialogue = [];
let currentDialogueIndex = 0;

let isTyping = false;
let typingTimer = null;
let completeText = "";

let dialogueFinishedCallback = null;
let choicesAreVisible = false;


function clearTypingTimer() {

    if (typingTimer !== null) {

        window.clearTimeout(typingTimer);

        typingTimer = null;
    }
}


function hideDialogueChoices() {

    choicesAreVisible = false;

    dialogueChoices.innerHTML = "";

    dialogueChoices.classList.add("hidden");
}


function clearDialogue() {

    clearTypingTimer();

    currentDialogue = [];
    currentDialogueIndex = 0;

    isTyping = false;
    completeText = "";

    dialogueFinishedCallback = null;

    dialogueText.textContent = "";

    hideDialogueChoices();
    dialogueText.textContent = "";

    dialogueNext.classList.add("hidden");
}


function typeDialogueLine(text) {

    clearTypingTimer();

    dialogueText.textContent = "";

    completeText = text;

    isTyping = true;

    dialogueNext.classList.add("hidden");

    let characterIndex = 0;


    function typeNextCharacter() {

        if (!isTyping) {
            return;
        }

        dialogueText.textContent +=
            text[characterIndex] || "";

        characterIndex += 1;


        if (characterIndex < text.length) {

            typingTimer =
                window.setTimeout(
                    typeNextCharacter,
                    TYPE_SPEED
                );

        } else {

            isTyping = false;

            typingTimer = null;

            dialogueNext.classList.remove("hidden");
        }
    }


    if (text.length === 0) {

        isTyping = false;

        dialogueNext.classList.remove("hidden");

        return;
    }


    typeNextCharacter();
}


function finishCurrentLine() {

    if (!isTyping) {
        return false;
    }

    clearTypingTimer();

    dialogueText.textContent =
        completeText;

    isTyping = false;

    dialogueNext.classList.remove("hidden");

    return true;
}


function startDialogue(
    lines,
    finishedCallback = null
) {

    clearTypingTimer();

    hideDialogueChoices();

    currentDialogue =
        [...lines];

    currentDialogueIndex = 0;

    dialogueFinishedCallback =
        finishedCallback;

    if (currentDialogue.length === 0) {

        finishDialogueSequence();

        return;
    }

    typeDialogueLine(
        currentDialogue[0]
    );
}


function advanceDialogue() {

    if (
        isTransitioning ||
        choicesAreVisible
    ) {
        return;
    }


    // 如果文字還正在打：
    // 第一次點擊只負責把這一句完整顯示。
    if (finishCurrentLine()) {
        return;
    }


    if (currentDialogue.length === 0) {
        return;
    }


    // ------------------------------
    // 已經在最後一句
    // ------------------------------

    if (
        currentDialogueIndex ===
        currentDialogue.length - 1
    ) {

        dialogueText.textContent = "";

        finishDialogueSequence();

        return;
    }


    // ------------------------------
    // 還有下一句
    // ------------------------------

    currentDialogueIndex += 1;

    typeDialogueLine(
        currentDialogue[
            currentDialogueIndex
        ]
    );
}

function finishDialogueSequence() {

    dialogueNext.classList.add("hidden");

    currentDialogue = [];
    currentDialogueIndex = 0;

    const callback =
        dialogueFinishedCallback;

    dialogueFinishedCallback = null;


    if (
        typeof callback === "function"
    ) {
        callback();
    }
}


function showDialogueChoices(choices) {

    clearTypingTimer();

    isTyping = false;

    choicesAreVisible = true;

    dialogueNext.classList.add("hidden");

    dialogueChoices.innerHTML = "";

    dialogueChoices.classList.remove("hidden");


    choices.forEach(function (choice) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "dialogueChoice";


        const arrow =
            document.createElement("span");

        arrow.className =
            "choiceArrow";

        arrow.textContent = "▶";


        const label =
            document.createElement("span");

        label.textContent =
            choice.text;


        button.appendChild(arrow);

        button.appendChild(label);


        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                hideDialogueChoices();

                choice.action();
            }
        );


        dialogueChoices.appendChild(
            button
        );
    });
}


// ==============================
// 世界觀導覽
// ==============================

async function openWorldGuide() {

    clearDialogue();

    playerData.visits.world += 1;
    playerData.visits.museum += 1;

    playerData.interest.world += 1;

    playerData.familiarity += 1;

    savePlayerData();


    exhibitLabel.textContent =
        "WORLD / AEVIRA";

    exhibitLabel.classList.remove(
        "hidden"
    );

    guideReturnButton.classList.remove(
        "hidden"
    );


    await changeScreen(
        menuScreen,
        guideScreen
    );


    if (!playerData.flags.metFelu) {

        playFirstFeluMeeting();

    } else {

        playReturningFeluMeeting();
    }
}


function playFirstFeluMeeting() {

    playerData.flags.metFelu = true;

    playerData.knowledge.felu = true;

    playerData.visits.felu += 1;

    savePlayerData();


    startDialogue(
        [
            "……",
            "あれ？",
            "こんにちは！",
            "地球から来た……「人間」？",
            "……",
            "それじゃあ……",
            "Aevira のこと、",
            "少しだけ聞いてみる？"
        ],

        showFirstWorldChoices
    );
}


function showFirstWorldChoices() {

    showDialogueChoices([
        {
            text: "聞いてみたい",

            action: function () {

                playerData.flags
                    .acceptedWorldGuide = true;

                playerData.interest
                    .world += 1;

                savePlayerData();

                startDialogue(
                    [
                        "うん。",
                        "それじゃあ、",
                        "まずはこの星のことから話そうか。"
                    ],

                    finishWorldIntroduction
                );
            }
        },

        {
            text: "今はいい",

            action: function () {

                playerData.flags
                    .refusedWorldGuide = true;

                savePlayerData();

                startDialogue(
                    [
                        "そっか。",
                        "また気が向いたら来てね。"
                    ],

                    showReturnToMenuChoice
                );
            }
        }
    ]);
}


function finishWorldIntroduction() {

    playerData.knowledge.aevira = true;

    playerData.flags
        .finishedWorldIntro = true;

    savePlayerData();


    startDialogue(
        [
            "Aevira。",
            "ぼくたちが暮らしている星の名前だよ。",
            "今日はここまで。",
            "次に来た時は、",
            "もう少し詳しく案内できると思う。"
        ],

        showWorldEndChoices
    );
}


function playReturningFeluMeeting() {

    const visits =
        playerData.visits.world;


    if (
        playerData.flags.refusedWorldGuide &&
        !playerData.flags.acceptedWorldGuide
    ) {

        startDialogue(
            [
                "あ。",
                "また来たんだね。",
                "今日は、",
                "Aevira のことを聞いてみる？"
            ],

            showReturningWorldChoices
        );

        return;
    }


    if (
        !playerData.flags
            .finishedWorldIntro
    ) {

        startDialogue(
            [
                "あ、来た。",
                "この前の続き、",
                "聞いていく？"
            ],

            showReturningWorldChoices
        );

        return;
    }


    if (visits >= 5) {

        startDialogue(
            [
                "おかえり。",
                "もうここにも慣れたみたいだね。",
                "今日は何を見ていく？"
            ],

            showWorldEndChoices
        );

        return;
    }


    if (visits >= 3) {

        startDialogue(
            [
                "あ、また来た。",
                "今日は何を見ていく？"
            ],

            showWorldEndChoices
        );

        return;
    }


    startDialogue(
        [
            "こんにちは。",
            "また来てくれたんだね。",
            "今日は何を見ていく？"
        ],

        showWorldEndChoices
    );
}


function showReturningWorldChoices() {

    showDialogueChoices([
        {
            text: "聞いてみたい",

            action: function () {

                playerData.flags
                    .acceptedWorldGuide = true;

                savePlayerData();

                startDialogue(
                    [
                        "うん。",
                        "それじゃあ、始めようか。"
                    ],

                    finishWorldIntroduction
                );
            }
        },

        {
            text: "やっぱり今はいい",

            action: function () {

                startDialogue(
                    [
                        "そっか。",
                        "無理に聞かなくても大丈夫だよ。"
                    ],

                    showReturnToMenuChoice
                );
            }
        }
    ]);
}


function showWorldEndChoices() {

    const choices = [];


    // ------------------------------
    // Aevira
    // ------------------------------

    choices.push(
        createDialogueChoice(
            "Aevira について",
            function () {

                addTopicInterest("world");

                startDialogue(
                    [
                        "Aevira。",
                        "ぼくたちが暮らしている星だよ。",
                        "地球とは違うところも多いけど……",
                        "ぼくにとっては、ずっとここが普通だった。"
                    ],
                    showWorldEndChoices
                );
            }
        )
    );


    // ------------------------------
    // 神明
    // Aevira を知った後に出現
    // ------------------------------

    if (playerKnows("aevira")) {

        choices.push(
            createDialogueChoice(
                "「神様」について",
                function () {

                    addTopicInterest("god");

                    const firstTime =
                        !playerKnows("god");


                    if (firstTime) {

                        teachPlayer("god");

                        startDialogue(
                            [
                                "神様……って呼ばれてるもののこと？",
                                "うーん。",
                                "地球で言う神様とは、少し違うと思う。",
                                "誰かの姿をしているわけじゃない。",
                                "願いに応える……仕組みみたいなものなんだ。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "「神様」か。",
                            "姿も声もない。",
                            "それでも、願いを伝えれば応えてくれる。",
                            "ぼくたちにとっては、そういう存在なんだ。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 願望
    // 神明を知った後に出現
    // ------------------------------

    if (playerKnows("god")) {

        choices.push(
            createDialogueChoice(
                "願いについて",
                function () {

                    addTopicInterest("wish");

                    const firstTime =
                        !playerKnows("wish");


                    if (firstTime) {

                        teachPlayer("wish");

                        startDialogue(
                            [
                                "願いを伝える方法は、一つじゃないよ。",
                                "祈ってもいいし、",
                                "文字にしてもいい。",
                                "大事なのは、",
                                "自分が何を望んでいるのかを、はっきり示すこと。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "願いそのものに、決まった形はない。",
                            "ちゃんと伝わればいいんだ。",
                            "……もちろん、",
                            "願えば何でも無料でもらえる、ってわけじゃないけどね。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 交換
    // 願望を知った後に出現
    // ------------------------------

    if (playerKnows("wish")) {

        choices.push(
            createDialogueChoice(
                "交換について",
                function () {

                    addTopicInterest("exchange");

                    const firstTime =
                        !playerKnows("exchange");


                    if (firstTime) {

                        teachPlayer("exchange");

                        startDialogue(
                            [
                                "願いを叶える代わりに、",
                                "自分の何かを差し出す。",
                                "それが「交換」。",
                                "一度きりで、",
                                "あとから取り消すことはできないんだ。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "交換は、一生に一度。",
                            "何を差し出すのかも、",
                            "その結果どうなるのかも、",
                            "簡単に決めていいことじゃないと思う。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 能力
    // 交換を知った後に出現
    // ------------------------------

    if (playerKnows("exchange")) {

        choices.push(
            createDialogueChoice(
                "能力のこと",
                function () {

                    addTopicInterest("ability");

                    const firstTime =
                        !playerKnows("ability");


                    if (firstTime) {

                        teachPlayer("ability");

                        startDialogue(
                            [
                                "能力には、大きく分けて二種類ある。",
                                "生まれた時から持っているものと、",
                                "交換によって得るもの。",
                                "どちらも便利なだけじゃない。",
                                "使うことで、身体や心に負担が出ることもあるよ。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "能力の話、好きなんだね。",
                            "生まれつきのものは強いことが多いけど、不安定だったりする。",
                            "交換で得たものも、代償とは別に負担がある。",
                            "力だけを見れば便利だけど……",
                            "付き合い方のほうが、ずっと大事だと思う。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 学院
    // 能力を知った後に出現
    // ------------------------------

    if (playerKnows("ability")) {

        choices.push(
            createDialogueChoice(
                "学院について",
                function () {

                    addTopicInterest("academy");

                    const firstTime =
                        !playerKnows("academy");


                    if (firstTime) {

                        teachPlayer("academy");

                        startDialogue(
                            [
                                "学院？",
                                "ぼくも長いこと関わってる場所だよ。",
                                "能力のことを学んだり、",
                                "扱い方を練習したりする人も多い。",
                                "……ぼくにとっては、",
                                "仕事場って言ったほうが近いかな。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "学院には、本当にいろんな人がいる。",
                            "能力も、考え方も、育った場所も違う。",
                            "だから退屈しないよ。",
                            "……心配事も増えるけど。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 仲間
    // 学院を知った後に出現
    // ------------------------------

    if (playerKnows("academy")) {

        choices.push(
            createDialogueChoice(
                "Felu の仲間について",
                function () {

                    addTopicInterest(
                        "companions"
                    );

                    const firstTime =
                        !playerKnows(
                            "companions"
                        );


                    if (firstTime) {

                        teachPlayer(
                            "companions"
                        );

                        startDialogue(
                            [
                                "ぼくの仲間？",
                                "……ふふ。",
                                "気になる？",
                                "Ran や煌、湛、望月。",
                                "いろんな人がいるよ。",
                                "少しずつ紹介しようか。"
                            ],
                            showWorldEndChoices
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "みんなのこと？",
                            "もちろん。",
                            "誰について聞きたい？"
                        ],
                        showCompanionChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // Ran
    // 既存の入口は残す
    // ------------------------------

    choices.push(
        createDialogueChoice(
            "Ran について",
            function () {

          reactToRanInterest(
    showWorldEndChoices
);
            }
        )
    );


    // ------------------------------
    // 異変
    // 自動解放しない
    // ------------------------------

    if (playerKnows("anomaly")) {

        choices.push(
            createDialogueChoice(
                "異変について",
                function () {

                    addTopicInterest(
                        "anomaly"
                    );

                    startDialogue(
                        [
                            "異変……。",
                            "それについては、",
                            "軽く話せることじゃない。",
                            "でも、君がもう知っているなら……",
                            "少しずつ話してもいいと思う。"
                        ],
                        showWorldEndChoices
                    );
                }
            )
        );
    }


    // ------------------------------
    // 返回
    // ------------------------------

    choices.push(
        createDialogueChoice(
            "メインメニューへ戻る",
            function () {

                returnToMainMenu();
            }
        )
    );


    showDialogueChoices(choices);
}
function showCompanionChoices() {

    showDialogueChoices([
        
          {
    text: "Ran",

    action: function () {
        reactToRanInterest(
            showCompanionChoices
        );
    }
},

        {
            text: "煌",

            action: function () {
                openCompanionIntro("kou");
            }
        },

        {
            text: "湛",

            action: function () {
                openCompanionIntro("minato");
            }
        },

        {
            text: "望月",

            action: function () {
                openCompanionIntro(
                    "mochizuki"
                );
            }
        },

        {
            text: "Felu",

            action: function () {
                openCompanionIntro("felu");
            }
        },

        {
            text: "話題を戻す",

            action: function () {
                showWorldEndChoices();
            }
        }
    ]);
}
// ==============================
// 夥伴：基本介紹
// ==============================

function openCompanionIntro(
    companionId
) {

    addTopicInterest(
        companionId
    );


    const introFlag =
        "companionIntro_" +
        companionId;

    const firstTime =
        !playerData.flags[
            introFlag
        ];


    if (firstTime) {

        playerData.flags[
            introFlag
        ] = true;

        savePlayerData();
    }


    // ------------------------------
    // 煌
    // ------------------------------

    if (companionId === "kou") {

        teachPlayer("kou");

        if (firstTime) {

            startDialogue(
                [
                    "煌？",
                    "Ran が学院に入ってから知り合った子だよ。",
                    "かなり負けず嫌いで、",
                    "Ran と張り合ってることも多い。",
                    "……二人とも無茶するから、",
                    "見てる側は大変なんだけどね。"
                ],
                showCompanionChoices
            );

        } else {

            startDialogue(
                [
                    "煌のこと？",
                    "相変わらず、Ran とはよく張り合ってるよ。",
                    "ああいう関係も、",
                    "二人にはちょうどいいのかもしれないね。"
                ],
                showCompanionChoices
            );
        }

        return;
    }


    // ------------------------------
    // 湛
    // ------------------------------

    if (companionId === "minato") {

        teachPlayer("minato");

        if (firstTime) {

            startDialogue(
                [
                    "湛？",
                    "静かな子だよ。",
                    "Ran とは学院で知り合った。",
                    "あまり自分から前に出るタイプじゃないけど……",
                    "周りのことは、よく見てると思う。"
                ],
                showCompanionChoices
            );

        } else {

            startDialogue(
                [
                    "湛か。",
                    "静かだけど、",
                    "何も考えてないわけじゃないよ。",
                    "むしろ、よく見てる。"
                ],
                showCompanionChoices
            );
        }

        return;
    }


    // ------------------------------
    // 望月
    // ------------------------------

    if (
        companionId ===
        "mochizuki"
    ) {

        teachPlayer(
            "mochizuki"
        );

        if (firstTime) {

            startDialogue(
                [
                    "望月？",
                    "しっかりして見える子だよ。",
                    "勉強もできるし、",
                    "周りから頼られることも多い。",
                    "……でも、",
                    "少し無理をしてるように見える時があった。"
                ],
                showCompanionChoices
            );

        } else {

            startDialogue(
                [
                    "望月のこと、気になる？",
                    "ちゃんとしてる子だよ。",
                    "だからこそ、",
                    "ぼくは少し心配してた。"
                ],
                showCompanionChoices
            );
        }

        return;
    }


    // ------------------------------
    // Felu
    // ------------------------------

    if (companionId === "felu") {

        if (firstTime) {

            startDialogue(
                [
                    "……ぼく？",
                    "ぼくのことも聞くんだ。",
                    "学院で働いてるよ。",
                    "ずっと昔からね。",
                    "Ran のことは、",
                    "彼が小さい頃から知ってる。"
                ],
                showCompanionChoices
            );

        } else {

            startDialogue(
                [
                    "また、ぼくのこと？",
                    "ふふ。",
                    "今日はみんなじゃなくて、",
                    "ぼくに会いに来たの？"
                ],
                showCompanionChoices
            );
        }
    }
}
// ==============================
// Ran：正式話題
// ==============================

function reactToRanInterest(
    returnCallback = showWorldEndChoices
) {

    addTopicInterest("ran");

    const firstTime =
        !playerKnows("ran");


    // 第一次正式詢問 Ran
    if (firstTime) {

        teachPlayer("ran");

        startDialogue(
            [
                "Ran？",
                "彼のことが気になるの？",
                "ぼくは、彼が小さい頃から知ってる。",
                "明るくて、よく動いて、",
                "気になったものにはすぐ近づいていく。",
                "……それから、少し無茶をする。",
                "見てる側は、けっこう大変なんだよ。"
            ],

            function () {
                showRanChoices(
                    returnCallback
                );
            }
        );

        return;
    }


    const interest =
        getTopicInterest("ran");


    // 問很多次之後 Felu 會注意到
    if (interest >= 5) {

        startDialogue(
            [
                "……また Ran？",
                "ふふ。",
                "そんなに彼のことが気になるの？"
            ],

            function () {
                showRanChoices(
                    returnCallback
                );
            }
        );

        return;
    }


    if (interest >= 3) {

        startDialogue(
            [
                "また Ran のこと？",
                "ずいぶん気になるみたいだね。",
                "何が聞きたい？"
            ],

            function () {
                showRanChoices(
                    returnCallback
                );
            }
        );

        return;
    }


    startDialogue(
        [
            "Ran のこと？",
            "うん。",
            "何が聞きたい？"
        ],

        function () {
            showRanChoices(
                returnCallback
            );
        }
    );
}


// ==============================
// Ran：話題選択
// ==============================

function showRanChoices(
    returnCallback
) {

    const choices = [];


    // ------------------------------
    // Ran 本人
    // ------------------------------

    choices.push(
        createDialogueChoice(
            "Ran について",
            function () {

                startDialogue(
                    [
                        "昔から好奇心が強いんだ。",
                        "気になったら、",
                        "自分で確かめないと気が済まない。",
                        "人にもよく話しかけるし、",
                        "知らないものにも平気で近づいていく。",
                        "……危なっかしいとも言うけどね。"
                    ],

                    function () {
                        showRanChoices(
                            returnCallback
                        );
                    }
                );
            }
        )
    );


    // ------------------------------
    // 先天能力
    // 世界觀裡「能力」を知ってから
    // ------------------------------

    if (playerKnows("ability")) {

        choices.push(
            createDialogueChoice(
                "Ran の能力について",
                function () {

                    const firstTime =
                        !playerKnows(
                            "ranAbility"
                        );


                    if (firstTime) {

                        teachPlayer(
                            "ranAbility"
                        );

                        startDialogue(
                            [
                                "Ran は、生まれつき能力を持ってる。",
                                "繊維質のものを腐食させる能力だよ。",
                                "植物や木、紙なんかが対象になる。",
                                "基本は触れて使うけど、",
                                "ある程度なら離れたところまで広げることもできる。",
                                "……ただ、使うと彼の腕にも傷ができる。",
                                "本人、痛いのは苦手なんだけどね。",
                                "普段つけてる手袋は、能力を抑えるためのものだよ。"
                            ],

                            function () {
                                showRanChoices(
                                    returnCallback
                                );
                            }
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "腐食の能力のこと？",
                            "使えば使うほど、",
                            "腕の傷も増えていく。",
                            "だから、ぼくとしては",
                            "あまり無茶してほしくないんだけど……",
                            "Ran だからね。"
                        ],

                        function () {
                            showRanChoices(
                                returnCallback
                            );
                        }
                    );
                }
            )
        );
    }


    // ------------------------------
    // Ran 的交換能力
    // 玩家先知道世界觀的「交換」
    // ------------------------------

    if (playerKnows("exchange")) {

        choices.push(
            createDialogueChoice(
                "Ran も交換したの？",
                function () {

                    const firstTime =
                        !playerKnows(
                            "ranExchange"
                        );


                    if (firstTime) {

                        teachPlayer(
                            "ranExchange"
                        );

                        startDialogue(
                            [
                                "うん。",
                                "Ran も交換をしたことがある。",
                                "かなり小さい頃にね。",
                                "彼が得たのは、",
                                "他人の「意志」を感じ取る能力。",
                                "感情や意図、",
                                "残っている意識なんかも感じ取れる。",
                                "でも、感じ取りすぎると",
                                "耳鳴りや頭痛が出ることもある。",
                                "今つけてる髪飾りは、",
                                "その力を抑えるためのものでもあるよ。"
                            ],

                            function () {
                                showRanChoices(
                                    returnCallback
                                );
                            }
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "意志を感じ取る能力のこと？",
                            "便利な時もある。",
                            "でも、知りたくないものまで",
                            "感じ取ってしまうこともあるからね。",
                            "強ければいい、ってものでもないよ。"
                        ],

                        function () {
                            showRanChoices(
                                returnCallback
                            );
                        }
                    );
                }
            )
        );
    }


    // ------------------------------
    // 交換代價
    // Ran 有交換能力這件事を知った後
    // ------------------------------

    if (playerKnows("ranExchange")) {

        choices.push(
            createDialogueChoice(
                "何を交換したの？",
                function () {

                    const firstTime =
                        !playerKnows(
                            "ranExchangeCost"
                        );


                    if (firstTime) {

                        teachPlayer(
                            "ranExchangeCost"
                        );

                        startDialogue(
                            [
                                "……性別。",
                                "Ran は、それを交換に使った。",
                                "だから今の彼には、",
                                "男性や女性としての身体的な特徴はない。",
                                "かなり小さい頃に、",
                                "Ran 自身が決めたことだよ。"
                            ],

                            function () {
                                showRanChoices(
                                    returnCallback
                                );
                            }
                        );

                        return;
                    }


                    startDialogue(
                        [
                            "性別を交換したこと？",
                            "うん。",
                            "ぼくは交換する前から彼を知ってるけど、",
                            "今も昔も、",
                            "ぼくにとっては Ran だよ。"
                        ],

                        function () {
                            showRanChoices(
                                returnCallback
                            );
                        }
                    );
                }
            )
        );
    }


    // ------------------------------
    // 返回
    // ------------------------------

    choices.push(
        createDialogueChoice(
            "戻る",
            function () {

                returnCallback();
            }
        )
    );


    showDialogueChoices(
        choices
    );
}
async function returnToMainMenu() {

    if (isTransitioning) {
        return;
    }

    clearDialogue();

    exhibitLabel.classList.add(
        "hidden"
    );

    guideReturnButton.classList.add(
        "hidden"
    );


    await changeScreen(
        guideScreen,
        menuScreen
    );
}


// 點對話框前進

guideScreen.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest("button")
        ) {
            return;
        }

        advanceDialogue();
    }
);


// 返回按鈕

guideReturnButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        returnToMainMenu();
    }
);


// 重置記錄

resetButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        const shouldReset =
            window.confirm(
                "閲覧記録をリセットしますか？"
            );


        if (!shouldReset) {
            return;
        }


        localStorage.removeItem(
            SAVE_KEY
        );

        window.location.reload();
    }
);

    // ==============================
    // 畫面流程
    // ==============================

    titleScreen.addEventListener(
        "click",
        function () {

            changeScreen(
                titleScreen,
                noticeScreen
            );
        }
    );


    noticeScreen.addEventListener(
        "click",
        function () {

            changeScreen(
                noticeScreen,
                menuScreen
            );
        }
    );


    // ==============================
    // 啟動網站
    // ==============================

buildMainMenu();

exhibitLabel.classList.add("hidden");
guideReturnButton.classList.add("hidden");
dialogueChoices.classList.add("hidden");
dialogueNext.classList.add("hidden");

});