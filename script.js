const items = {
  heart: {
    key: "heart",
    emoji: "🤍",
    label: "heart",
    tags: ["plain"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  blueHeart: {
    key: "blueHeart",
    emoji: "💙",
    label: "blue heart",
    tags: ["blue"],
    visual: {
      scale: "normal",
      tint: "blue",
    },
  },
  cat: {
    key: "cat",
    emoji: "🐱",
    label: "cat",
    tags: ["small"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  hatCat: {
    key: "hatCat",
    emoji: "🎩🐱",
    label: "hat cat",
    tags: ["hat"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  dotCircle: {
    key: "dotCircle",
    emoji: "⚪",
    label: "circle",
    tags: ["plain"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  stripeCircle: {
    key: "stripeCircle",
    emoji: "🎯",
    label: "striped circle",
    tags: ["stripes"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  blueStripeCircle: {
    key: "blueStripeCircle",
    emoji: "🔵🎯",
    label: "blue striped circle",
    tags: ["blue", "stripes"],
    visual: {
      scale: "normal",
      tint: "blue",
    },
  },
  apple: {
    key: "apple",
    emoji: "🍎",
    label: "apple",
    tags: ["red"],
    visual: {
      scale: "normal",
      tint: "normal",
    },
  },
  bigApple: {
    key: "bigApple",
    emoji: "🍎",
    label: "big apple",
    tags: ["big"],
    visual: {
      scale: "big",
      tint: "normal",
    },
  },
  blueBigApple: {
    key: "blueBigApple",
    emoji: "🍎",
    label: "big blue apple",
    tags: ["big", "blue"],
    visual: {
      scale: "big",
      tint: "blue",
    },
  },
  greenBigApple: {
    key: "greenBigApple",
    emoji: "🍎",
    label: "big green apple",
    tags: ["big", "green"],
    visual: {
      scale: "big",
      tint: "green",
    },
  },
};

const machines = {
  makeBlue: {
    key: "makeBlue",
    icon: "🫐",
    name: "Make Blue",
    label: "Turns it blue",
  },
  makeGreen: {
    key: "makeGreen",
    icon: "🍏",
    name: "Make Green",
    label: "Turns it green",
  },
  addHat: {
    key: "addHat",
    icon: "🎩",
    name: "Add a Hat",
    label: "Puts a hat on top",
  },
  addStripes: {
    key: "addStripes",
    icon: "🦓",
    name: "Add Stripes",
    label: "Gives it stripes",
  },
  growBig: {
    key: "growBig",
    icon: "📏",
    name: "Grow Big",
    label: "Makes it bigger",
  },
};

let scenes = createScenes();

const sceneBody = document.getElementById("sceneBody");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const choiceButtonTemplate = document.getElementById("choiceButtonTemplate");

let currentSceneIndex = 0;
const sceneState = new Map();

document.addEventListener("click", handleBubbleClick);
document.addEventListener("keydown", handleBubbleKeydown);

renderScene();

function createScenes() {
  return [
    {
      type: "welcome",
      title: "Meet the Function Machine",
      prompt: "In and out.",
      badge: "Start",
      support: "One job every time.",
      visualSetup: {
        input: items.heart,
        output: items.blueHeart,
        machine: machines.makeBlue,
      },
      interaction: {
        kind: "next_only",
      },
      correctAnswer: null,
      successFeedback: "Watch it go.",
    },
    {
      type: "teach",
      title: "A Function",
      prompt: "Watch this.",
      badge: "Learn",
      support: "Heart in. Blue heart out.",
      visualSetup: {
        input: items.heart,
        output: items.blueHeart,
        machine: machines.makeBlue,
      },
      interaction: {
        kind: "next_only",
      },
      correctAnswer: null,
      successFeedback: "Same job each time.",
    },
    {
      type: "single_function_choice",
      title: "Your Turn",
      prompt: "What comes out?",
      badge: "Try",
      support: "Tap one picture.",
      visualSetup: {
        machine: machines.addHat,
        input: items.cat,
      },
      interaction: {
        kind: "single_function_choice",
        choices: [items.hatCat, items.blueHeart, items.stripeCircle],
      },
      correctAnswer: "hatCat",
      successFeedback: "Yes. Hat cat.",
      retryFeedback: "This machine adds a hat.",
    },
    {
      type: "teach_chain",
      title: "Make a Chain",
      prompt: "One step. Then one more.",
      badge: "Chain",
      support: "The first answer goes into the next machine.",
      visualSetup: {
        input: items.apple,
        machines: [machines.growBig, machines.makeGreen],
        middle: items.bigApple,
        output: items.greenBigApple,
      },
      interaction: {
        kind: "next_only",
      },
      correctAnswer: null,
      successFeedback: "Left to right.",
    },
    {
      type: "chain_function_choice",
      title: "Two Machines!",
      prompt: "What comes out now?",
      badge: "Play",
      support: "Go left to right.",
      visualSetup: {
        input: items.dotCircle,
        machines: [machines.addStripes, machines.makeBlue],
      },
      interaction: {
        kind: "chain_function_choice",
        choices: [items.stripeCircle, items.blueHeart, items.blueStripeCircle],
      },
      correctAnswer: "blueStripeCircle",
      successFeedback: "Yes. Stripes, then blue.",
      retryFeedback: "First stripes. Then blue.",
    },
    ...createNumberScenes(),
    {
      type: "celebrate",
      title: "You Did It!",
      prompt: "You learned pictures and numbers.",
      badge: "Yay",
      support: "One job. Then another.",
      visualSetup: null,
      interaction: {
        kind: "restart",
      },
      correctAnswer: null,
      successFeedback: "You are ready to play again.",
    },
  ];
}

function createNumberScenes() {
  const example = buildOneStepExample();
  const oneStepQuiz = buildOneStepQuiz();
  const chainExample = buildNumberChainExample();
  const chainQuizA = buildChainQuizPlusThenTriple();
  const chainQuizB = buildChainQuizMinusThenDouble();
  const chainQuizC = buildChainQuizHalfThenAdd();

  return [example, oneStepQuiz, chainExample, chainQuizA, chainQuizB, chainQuizC];
}

function buildOneStepExample() {
  const machine = pickRandom([makeAddMachine(1), makeAddMachine(2), makeDoubleMachine()]);
  const input = randomChoiceForMachine(machine);
  const output = applyMachine(machine, input);

  return {
    type: "number_example",
    title: "Try Numbers",
    prompt: "Functions work on numbers too.",
    badge: "7",
    support: `${input} goes in. ${machine.name}. ${output} comes out.`,
    visualSetup: {
      input,
      output,
      machine,
    },
    interaction: {
      kind: "next_only",
    },
    correctAnswer: null,
    successFeedback: "Now you try.",
  };
}

function buildOneStepQuiz() {
  const machine = pickRandom([makeAddMachine(1), makeAddMachine(2), makeSubtractMachine(1), makeDoubleMachine()]);
  const input = randomChoiceForMachine(machine);
  const answer = applyMachine(machine, input);

  return {
    type: "number_choice",
    title: "Your Number Turn",
    prompt: "What comes out?",
    badge: "8",
    support: `${input} goes in. ${machine.name}.`,
    visualSetup: {
      input,
      machine,
    },
    interaction: {
      kind: "number_choice",
      choices: buildNumberChoices(answer),
    },
    correctAnswer: answer,
    successFeedback: `Yes. ${answer} comes out.`,
    retryFeedback: `${machine.name} changes ${input} to ${answer}.`,
  };
}

function buildNumberChainExample() {
  const firstMachine = makeAddMachine(1);
  const secondMachine = pickRandom([makeAddMachine(1), makeAddMachine(2), makeDoubleMachine()]);
  const input = randomInt(1, secondMachine.icon === "×2" ? 4 : 6);
  const middle = applyMachine(firstMachine, input);
  const output = applyMachine(secondMachine, middle);

  return {
    type: "number_chain_example",
    title: "Chain Numbers",
    prompt: "First this. Then this.",
    badge: "9",
    support: `${input} goes in. ${firstMachine.name}. Then ${secondMachine.name.toLowerCase()}.`,
    visualSetup: {
      input,
      middle,
      output,
      machines: [firstMachine, secondMachine],
    },
    interaction: {
      kind: "next_only",
    },
    correctAnswer: null,
    successFeedback: `${input}, ${middle}, ${output}. That is a chain.`,
  };
}

function buildChainQuizPlusThenTriple() {
  const input = randomInt(1, 3);
  const firstMachine = makeAddMachine(randomInt(1, 2));
  const secondMachine = makeTripleMachine();
  const middle = applyMachine(firstMachine, input);
  const answer = applyMachine(secondMachine, middle);

  return {
    type: "number_chain_choice",
    title: "Number Chain Quiz",
    prompt: "What comes out now?",
    badge: "10",
    support: `${input} goes in. ${firstMachine.name}. Then ${secondMachine.name.toLowerCase()}.`,
    visualSetup: {
      input,
      machines: [firstMachine, secondMachine],
    },
    interaction: {
      kind: "number_chain_choice",
      choices: buildNumberChoices(answer),
    },
    correctAnswer: answer,
    successFeedback: `Yes. ${answer} comes out.`,
    retryFeedback: `${input} becomes ${middle}. Then ${middle} becomes ${answer}.`,
  };
}

function buildChainQuizMinusThenDouble() {
  const input = randomInt(6, 9);
  const firstMachine = makeSubtractMachine(randomInt(1, 2));
  const secondMachine = makeDoubleMachine();
  const middle = applyMachine(firstMachine, input);
  const answer = applyMachine(secondMachine, middle);

  return {
    type: "number_chain_choice",
    title: "Number Chain Quiz",
    prompt: "What comes out now?",
    badge: "11",
    support: `${input} goes in. ${firstMachine.name}. Then ${secondMachine.name.toLowerCase()}.`,
    visualSetup: {
      input,
      machines: [firstMachine, secondMachine],
    },
    interaction: {
      kind: "number_chain_choice",
      choices: buildNumberChoices(answer),
    },
    correctAnswer: answer,
    successFeedback: `Yes. ${answer} comes out.`,
    retryFeedback: `${input} becomes ${middle}. Then ${middle} becomes ${answer}.`,
  };
}

function buildChainQuizHalfThenAdd() {
  const input = pickRandom([4, 6, 8, 10]);
  const firstMachine = makeHalfMachine();
  const secondMachine = makeAddMachine(randomInt(1, 3));
  const middle = applyMachine(firstMachine, input);
  const answer = applyMachine(secondMachine, middle);

  return {
    type: "number_chain_choice",
    title: "Number Chain Quiz",
    prompt: "What comes out now?",
    badge: "12",
    support: `${input} goes in. ${firstMachine.name}. Then ${secondMachine.name.toLowerCase()}.`,
    visualSetup: {
      input,
      machines: [firstMachine, secondMachine],
    },
    interaction: {
      kind: "number_chain_choice",
      choices: buildNumberChoices(answer),
    },
    correctAnswer: answer,
    successFeedback: `Yes. ${answer} comes out.`,
    retryFeedback: `${input} becomes ${middle}. Then ${middle} becomes ${answer}.`,
  };
}

function randomChoiceForMachine(machine) {
  if (machine.kind === "add") {
    return randomInt(1, 7);
  }

  if (machine.kind === "subtract") {
    return randomInt(machine.amount + 2, 10);
  }

  if (machine.kind === "double") {
    return randomInt(1, 5);
  }

  if (machine.kind === "half") {
    return pickRandom([2, 4, 6, 8, 10]);
  }

  return randomInt(1, 3);
}

function applyMachine(machine, value) {
  if (machine.kind === "add") {
    return value + machine.amount;
  }

  if (machine.kind === "subtract") {
    return value - machine.amount;
  }

  if (machine.kind === "double") {
    return value * 2;
  }

  if (machine.kind === "triple") {
    return value * 3;
  }

  if (machine.kind === "half") {
    return value / 2;
  }

  return value;
}

function buildNumberChoices(answer) {
  const pool = [answer];
  let offset = 1;

  while (pool.length < 3) {
    const lower = answer - offset;
    const upper = answer + offset;

    if (lower >= 1 && !pool.includes(lower)) {
      pool.push(lower);
    }

    if (pool.length < 3 && upper <= 18 && !pool.includes(upper)) {
      pool.push(upper);
    }

    offset += 1;
  }

  return shuffleArray(pool);
}

function makeAddMachine(amount) {
  return {
    kind: "add",
    amount,
    icon: `+${amount}`,
    name: `Add ${amount}`,
    label: `${amount} more`,
  };
}

function makeSubtractMachine(amount) {
  return {
    kind: "subtract",
    amount,
    icon: `-${amount}`,
    name: `Take Away ${amount}`,
    label: `${amount} less`,
  };
}

function makeDoubleMachine() {
  return {
    kind: "double",
    icon: "×2",
    name: "Double",
    label: "Two times",
  };
}

function makeTripleMachine() {
  return {
    kind: "triple",
    icon: "×3",
    name: "Triple",
    label: "Three times",
  };
}

function makeHalfMachine() {
  return {
    kind: "half",
    icon: "1/2",
    name: "Half",
    label: "Split in two",
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(values) {
  return values[randomInt(0, values.length - 1)];
}

function shuffleArray(values) {
  const copy = [...values];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function renderScene() {
  const scene = scenes[currentSceneIndex];
  const state = sceneState.get(currentSceneIndex) || {};
  const sceneElement = document.createElement("article");
  sceneElement.className = "scene";
  const sceneMode = getSceneMode(scene.type);
  sceneElement.classList.add(`scene-${sceneMode.kind}`);

  sceneElement.appendChild(renderSceneHeader(scene, sceneMode));

  if (scene.type === "welcome") {
    sceneElement.appendChild(renderWelcomeScene(scene));
  } else if (scene.type === "teach") {
    sceneElement.appendChild(renderTeachScene(scene));
  } else if (scene.type === "single_function_choice") {
    sceneElement.appendChild(renderSingleChoiceScene(scene, state));
  } else if (scene.type === "teach_chain") {
    sceneElement.appendChild(renderTeachChainScene(scene));
  } else if (scene.type === "chain_function_choice") {
    sceneElement.appendChild(renderChainChoiceScene(scene, state));
  } else if (scene.type === "celebrate") {
    sceneElement.appendChild(renderCelebrateScene(scene));
  } else if (scene.type === "number_example") {
    sceneElement.appendChild(renderNumberExampleScene(scene));
  } else if (scene.type === "number_choice") {
    sceneElement.appendChild(renderNumberChoiceScene(scene, state));
  } else if (scene.type === "number_chain_example") {
    sceneElement.appendChild(renderNumberChainExampleScene(scene));
  } else if (scene.type === "number_chain_choice") {
    sceneElement.appendChild(renderNumberChainChoiceScene(scene, state));
  }

  sceneElement.appendChild(renderControls(scene, state));
  sceneBody.replaceChildren(sceneElement);
  renderProgress();
}

function renderSceneHeader(scene, sceneMode) {
  const header = document.createElement("header");
  header.className = "scene-header";
  header.innerHTML = `
    <div class="scene-header-main">
      <div class="scene-header-art scene-header-art-${sceneMode.kind} bubble-button" data-bubble-kind="${sceneMode.kind}" role="button" tabindex="0" aria-label="${sceneMode.label}">
        ${sceneMode.icon}
      </div>
      <div>
        <div class="scene-kind scene-kind-${sceneMode.kind} bubble-button" data-bubble-kind="${sceneMode.kind}" role="button" tabindex="0" aria-label="${sceneMode.label}">
          ${sceneMode.label}
        </div>
        <h2 class="scene-title">${scene.title}</h2>
        <p class="scene-prompt">${scene.prompt}</p>
      </div>
    </div>
    <div class="badge bubble-button" data-bubble-kind="${sceneMode.kind}" role="button" tabindex="0" aria-label="${scene.badge}">
      ${scene.badge}
    </div>
  `;
  return header;
}

function renderWelcomeScene(scene) {
  const stage = document.createElement("section");
  stage.className = "stage welcome";
  stage.innerHTML = `
    <div class="support-box">
      <p>${scene.support}</p>
      <p>${scene.successFeedback}</p>
    </div>
  `;

  stage.appendChild(renderHeroMachine(scene.visualSetup));
  return stage;
}

function renderTeachScene(scene) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  const grid = document.createElement("div");
  grid.className = "visual-grid";
  grid.appendChild(renderItemCard("Input", scene.visualSetup.input));
  grid.appendChild(renderMachineCard(scene.visualSetup.machine));
  grid.appendChild(renderItemCard("Output", scene.visualSetup.output));
  wrapper.appendChild(grid);

  return wrapper;
}

function renderSingleChoiceScene(scene, state) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  wrapper.appendChild(
    renderVisualSentence(
      scene.visualSetup.input,
      scene.visualSetup.machine,
      state.revealed
        ? scene.interaction.choices.find((choice) => choice.key === state.selected)
        : null,
      state,
    ),
  );

  wrapper.appendChild(renderChoices(scene, state));
  wrapper.appendChild(renderFeedback(scene, state));
  return wrapper;
}

function renderTeachChainScene(scene) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  wrapper.appendChild(
    renderChainWalkthrough(
      scene.visualSetup.input,
      scene.visualSetup.machines,
      scene.visualSetup.middle,
      scene.visualSetup.output,
    ),
  );
  return wrapper;
}

function renderChainChoiceScene(scene, state) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  const row = document.createElement("div");
  row.className = "mini-machine-row";
  row.appendChild(renderItemCard("Start", scene.visualSetup.input));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machines[0]));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machines[1]));
  wrapper.appendChild(row);

  wrapper.appendChild(renderChoices(scene, state));
  wrapper.appendChild(renderFeedback(scene, state));
  return wrapper;
}

function renderCelebrateScene(scene) {
  const wrapper = document.createElement("section");
  wrapper.className = "celebration";
  wrapper.innerHTML = `
    <div class="celebration-burst">
      <span class="big">🎉</span>
      <h3 class="scene-title">${scene.title}</h3>
      <p class="scene-prompt">${scene.prompt}</p>
    </div>
    <div class="recap-list">
      <div class="support-box">A function changes something.</div>
      <div class="support-box">A chain uses 2 machines in order.</div>
      <div class="support-box">Tap play again.</div>
    </div>
  `;
  return wrapper;
}

function renderNumberExampleScene(scene) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  const row = document.createElement("div");
  row.className = "visual-sentence number-sentence";
  row.appendChild(renderNumberCard("Input", scene.visualSetup.input));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machine));
  row.appendChild(renderArrow());
  row.appendChild(renderNumberCard("Output", scene.visualSetup.output));
  wrapper.appendChild(row);

  const note = document.createElement("div");
  note.className = "feedback-box";
  note.innerHTML = `
    <strong>Numbers can use machines too.</strong>
    <span>${scene.successFeedback}</span>
  `;
  wrapper.appendChild(note);

  return wrapper;
}

function renderNumberChoiceScene(scene, state) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  const row = document.createElement("div");
  row.className = "visual-sentence number-sentence";
  row.appendChild(renderNumberCard("Input", scene.visualSetup.input));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machine));
  row.appendChild(renderArrow());
  row.appendChild(renderNumberResultCard(state.revealed ? state.selected : null, state));
  wrapper.appendChild(row);

  wrapper.appendChild(renderNumberChoices(scene, state));
  wrapper.appendChild(renderFeedback(scene, state));
  return wrapper;
}

function renderNumberChainExampleScene(scene) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  wrapper.appendChild(
    renderNumberChainWalkthrough(
      scene.visualSetup.input,
      scene.visualSetup.machines,
      scene.visualSetup.middle,
      scene.visualSetup.output,
    ),
  );

  const note = document.createElement("div");
  note.className = "feedback-box";
  note.innerHTML = `
    <strong>Numbers can chain too.</strong>
    <span>${scene.successFeedback}</span>
  `;
  wrapper.appendChild(note);

  return wrapper;
}

function renderNumberChainChoiceScene(scene, state) {
  const wrapper = document.createElement("section");
  wrapper.className = "stage";

  const support = document.createElement("div");
  support.className = "support-box";
  support.textContent = scene.support;
  wrapper.appendChild(support);

  const row = document.createElement("div");
  row.className = "mini-machine-row";
  row.appendChild(renderNumberCard("Start", scene.visualSetup.input));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machines[0]));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(scene.visualSetup.machines[1]));
  wrapper.appendChild(row);

  const resultRow = document.createElement("div");
  resultRow.className = "number-chain-result";
  resultRow.appendChild(renderNumberCard("Input", scene.visualSetup.input));
  resultRow.appendChild(renderArrow());
  resultRow.appendChild(renderMachineChip("1", scene.visualSetup.machines[0]));
  resultRow.appendChild(renderArrow());
  resultRow.appendChild(renderMachineChip("2", scene.visualSetup.machines[1]));
  resultRow.appendChild(renderArrow());
  resultRow.appendChild(renderNumberResultCard(state.revealed ? state.selected : null, state));
  wrapper.appendChild(resultRow);

  wrapper.appendChild(renderNumberChoices(scene, state));
  wrapper.appendChild(renderFeedback(scene, state));
  return wrapper;
}

function renderHeroMachine(visual) {
  const machine = document.createElement("div");
  machine.className = "hero-machine support-box";
  machine.innerHTML = `
    <div class="sparkles">✦ ✦ ✦</div>
    <div class="pipe left"></div>
    <div class="pipe right"></div>
    ${renderHeroItem("input", visual.input, "Input")}
    ${renderHeroItem("output", visual.output, "Output")}
    <div class="machine-beam" aria-hidden="true"></div>
    <div class="machine-face">
      <div class="machine-smile"></div>
    </div>
    <div class="tag" style="position:absolute; left:36px; bottom:28px;">In</div>
    <div class="tag" style="position:absolute; right:34px; bottom:28px;">Out</div>
    <div class="tag" style="position:absolute; left:50%; bottom:28px; transform:translateX(-50%);">${visual.machine.name}</div>
  `;
  return machine;
}

function renderHeroItem(role, item, label) {
  return `
    <div class="hero-item ${role}" aria-label="${label}">
      ${renderItemVisual(item)}
    </div>
  `;
}

function renderItemCard(title, item) {
  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <div class="badge">${title}</div>
    ${renderItemVisual(item)}
    <span class="item-name">${capitalize(item.label)}</span>
    <div class="item-tags">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
  `;
  return card;
}

function renderMachineCard(machine) {
  const card = document.createElement("div");
  card.className = "machine-card";
  card.innerHTML = `
    <div class="machine-icon">${machine.icon}</div>
    <div class="machine-name">${machine.name}</div>
    <div class="machine-label">${machine.label}</div>
  `;
  return card;
}

function renderNumberCard(title, count) {
  const card = document.createElement("div");
  card.className = "item-card number-card";
  card.innerHTML = `
    <div class="badge">${title}</div>
    <div class="number-dots" aria-hidden="true">${renderDots(count)}</div>
    <span class="number-value">${count}</span>
  `;
  return card;
}

function renderDots(count) {
  return Array.from({ length: count }, () => '<span class="number-dot"></span>').join("");
}

function renderNumberChainWalkthrough(input, machineList, middle, output) {
  const grid = document.createElement("div");
  grid.className = "chain-walkthrough";

  const stepOne = document.createElement("div");
  stepOne.className = "chain-step";
  stepOne.appendChild(renderNumberCard("Start", input));
  stepOne.appendChild(renderMachineChip("1", machineList[0]));
  stepOne.appendChild(renderNumberCard("Now", middle));

  const stepTwo = document.createElement("div");
  stepTwo.className = "chain-step";
  stepTwo.appendChild(renderNumberCard("Use This", middle));
  stepTwo.appendChild(renderMachineChip("2", machineList[1]));
  stepTwo.appendChild(renderNumberCard("Finish", output));

  grid.appendChild(stepOne);
  grid.appendChild(stepTwo);
  return grid;
}

function renderNumberResultCard(value, state) {
  const card = document.createElement("div");
  card.className = "answer-card result-card number-card";

  if (value === null) {
    card.classList.add("is-empty");
    card.innerHTML = `
      <div class="badge">Result</div>
      <span class="result-mark">?</span>
      <span class="item-name">What comes out?</span>
    `;
    return card;
  }

  if (state?.revealed) {
    card.classList.add(state.solved ? "is-correct" : "is-wrong");
  }

  card.innerHTML = `
    <div class="badge">Result</div>
    <div class="number-dots" aria-hidden="true">${renderDots(value)}</div>
    <span class="number-value">${value}</span>
  `;
  return card;
}

function renderNumberChoices(scene, state) {
  const grid = document.createElement("div");
  grid.className = "choice-grid";

  scene.interaction.choices.forEach((choice) => {
    const button = choiceButtonTemplate.content.firstElementChild.cloneNode(true);
    button.setAttribute("aria-pressed", String(state.selected === choice));
    button.innerHTML = `
      <div class="number-dots" aria-hidden="true">${renderDots(choice)}</div>
      <span class="number-value">${choice}</span>
    `;

    if (state.revealed) {
      if (choice === scene.correctAnswer) {
        button.classList.add("is-correct");
      } else if (state.selected === choice) {
        button.classList.add("is-wrong");
      }
    }

    button.addEventListener("click", () => {
      const isCorrect = choice === scene.correctAnswer;
      sceneState.set(currentSceneIndex, {
        selected: choice,
        revealed: true,
        solved: isCorrect,
      });
      renderScene();
    });

    grid.appendChild(button);
  });

  return grid;
}

function renderResultCard(result, state) {
  const card = document.createElement("div");
  card.className = "answer-card result-card";

  if (!result) {
    card.classList.add("is-empty");
    card.innerHTML = `
      <div class="badge">Result</div>
      <span class="result-mark">?</span>
      <span class="item-name">What comes out?</span>
    `;
    return card;
  }

  if (state?.revealed) {
    card.classList.add(state.solved ? "is-correct" : "is-wrong");
  }

  card.innerHTML = `
    <div class="badge">Result</div>
    ${renderItemVisual(result)}
    <span class="item-name">${capitalize(result.label)}</span>
    <div class="item-tags">${result.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
  `;
  return card;
}

function renderItemVisual(item) {
  const scaleClass = item.visual?.scale === "big" ? "is-big" : "";
  const tintClass = item.visual?.tint === "blue" ? "is-blue" : "";
  const isHeart = item.key === "heart" || item.key === "blueHeart";
  const isHatCat = item.key === "hatCat";
  const isApple =
    item.key === "apple" ||
    item.key === "bigApple" ||
    item.key === "blueBigApple" ||
    item.key === "greenBigApple";
  const isCircle =
    item.key === "dotCircle" || item.key === "stripeCircle" || item.key === "blueStripeCircle";

  if (isHeart) {
    return `
      <span class="item-emoji-wrap ${scaleClass}">
        ${renderHeartVisual(item.visual?.tint === "blue" ? "#2f6fff" : "#f0f1f5")}
      </span>
    `;
  }

  if (isHatCat) {
    return `
      <span class="item-emoji-wrap ${scaleClass}">
        ${renderHatCatVisual()}
      </span>
    `;
  }

  if (isApple) {
    const appleFill =
      item.visual?.tint === "blue"
        ? "#2f6fff"
        : item.visual?.tint === "green"
          ? "#5bbf4b"
          : "#ef4444";
    return `
      <span class="item-emoji-wrap ${scaleClass}">
        ${renderAppleVisual(appleFill)}
      </span>
    `;
  }

  if (isCircle) {
    return `
      <span class="item-emoji-wrap ${scaleClass}">
        ${renderCircleVisual(item)}
      </span>
    `;
  }

  return `
    <span class="item-emoji-wrap ${scaleClass}">
      <span class="item-emoji ${tintClass}">${item.emoji}</span>
    </span>
  `;
}

function renderHeartVisual(fill) {
  return `
    <svg class="item-illustration item-illustration-heart" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 104 18 61c-12-13-12-34 0-46 12-12 31-12 43 0l-1 1 1-1c12-12 31-12 43 0 12 12 12 33 0 46L60 104z" fill="${fill}" stroke="#24324a" stroke-width="4" stroke-linejoin="round"></path>
      <path d="M60 104 18 61c-12-13-12-34 0-46 12-12 31-12 43 0l-1 1 1-1c12-12 31-12 43 0 12 12 12 33 0 46L60 104z" fill="white" opacity="0.12"></path>
      <ellipse cx="43" cy="34" rx="10" ry="7" fill="white" opacity="0.38" transform="rotate(-18 43 34)"></ellipse>
    </svg>
  `;
}

function renderHatCatVisual() {
  return `
    <svg class="item-illustration item-illustration-hat-cat" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="61" cy="27" rx="28" ry="6" fill="#1f1f22"></ellipse>
      <rect x="40" y="5" width="42" height="24" rx="6" fill="#1f1f22" stroke="#24324a" stroke-width="4"></rect>
      <rect x="40" y="24" width="42" height="7" fill="#ffd75a"></rect>
      <ellipse cx="61" cy="31" rx="34" ry="8" fill="#1f1f22" stroke="#24324a" stroke-width="4"></ellipse>
      <circle cx="60" cy="72" r="31" fill="#f4c75c" stroke="#24324a" stroke-width="4"></circle>
      <path d="M37 49 24 33l-4 26z" fill="#f4c75c" stroke="#24324a" stroke-width="4" stroke-linejoin="round"></path>
      <path d="M83 49 96 33l4 26z" fill="#f4c75c" stroke="#24324a" stroke-width="4" stroke-linejoin="round"></path>
      <circle cx="48" cy="71" r="4" fill="#24324a"></circle>
      <circle cx="72" cy="71" r="4" fill="#24324a"></circle>
      <path d="M60 76 55 83h10z" fill="#e68a6a" stroke="#24324a" stroke-width="3" stroke-linejoin="round"></path>
      <path d="M52 89c2 4 14 4 16 0" fill="none" stroke="#24324a" stroke-width="3" stroke-linecap="round"></path>
      <path d="M40 80 24 76" fill="none" stroke="#24324a" stroke-width="3" stroke-linecap="round"></path>
      <path d="M40 86 22 86" fill="none" stroke="#24324a" stroke-width="3" stroke-linecap="round"></path>
      <path d="M80 80 96 76" fill="none" stroke="#24324a" stroke-width="3" stroke-linecap="round"></path>
      <path d="M80 86 98 86" fill="none" stroke="#24324a" stroke-width="3" stroke-linecap="round"></path>
      <ellipse cx="48" cy="61" rx="8" ry="5" fill="white" opacity="0.24"></ellipse>
    </svg>
  `;
}

function renderAppleVisual(fill) {
  return `
    <svg class="item-illustration item-illustration-apple" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 20c8 0 12-8 12-12-7 0-13 4-16 10-2 3-2 7-2 10 2-4 4-8 6-8z" fill="#7a4b2d"></path>
      <path d="M68 18c9-8 20-7 28-2-8 10-22 12-32 8 0-2 1-4 4-6z" fill="#39b56a"></path>
      <path d="M60 34c-16-12-41-6-45 22-5 30 16 52 45 52s50-22 45-52c-4-28-29-34-45-22z" fill="${fill}" stroke="#24324a" stroke-width="4" stroke-linejoin="round"></path>
      <ellipse cx="44" cy="54" rx="10" ry="18" fill="white" opacity="0.35" transform="rotate(18 44 54)"></ellipse>
    </svg>
  `;
}

function renderCircleVisual(item) {
  const isBlue = item.visual?.tint === "blue";
  const hasStripes = item.tags.includes("stripes");
  const fill = isBlue ? "#2f6fff" : "#d9d9de";
  const stripeColor = isBlue ? "#9dc0ff" : "#ffffff";

  if (!hasStripes) {
    return `
      <svg class="item-illustration item-illustration-circle" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="38" fill="${fill}" stroke="#24324a" stroke-width="4"></circle>
        <ellipse cx="46" cy="44" rx="12" ry="9" fill="white" opacity="0.4"></ellipse>
      </svg>
    `;
  }

  return `
    <svg class="item-illustration item-illustration-circle" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="38" fill="${fill}" stroke="#24324a" stroke-width="4"></circle>
      <circle cx="60" cy="60" r="28" fill="none" stroke="${stripeColor}" stroke-width="10"></circle>
      <circle cx="60" cy="60" r="15" fill="none" stroke="${stripeColor}" stroke-width="10"></circle>
      <circle cx="60" cy="60" r="4" fill="${stripeColor}"></circle>
      <ellipse cx="46" cy="44" rx="12" ry="9" fill="white" opacity="0.18"></ellipse>
    </svg>
  `;
}

function renderVisualSentence(input, machine, result, state) {
  const row = document.createElement("div");
  row.className = "visual-sentence";
  row.appendChild(renderItemCard("Input", input));
  row.appendChild(renderArrow());
  row.appendChild(renderMachineCard(machine));
  row.appendChild(renderArrow());
  row.appendChild(renderResultCard(result, state));
  return row;
}

function renderChoices(scene, state) {
  const grid = document.createElement("div");
  grid.className = "choice-grid";

  scene.interaction.choices.forEach((choice) => {
    const button = choiceButtonTemplate.content.firstElementChild.cloneNode(true);
    button.setAttribute("aria-pressed", String(state.selected === choice.key));
    button.innerHTML = `
      ${renderItemVisual(choice)}
      <span class="item-name">${capitalize(choice.label)}</span>
      <div class="item-tags">${choice.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    `;

    if (state.revealed) {
      if (choice.key === scene.correctAnswer) {
        button.classList.add("is-correct");
      } else if (state.selected === choice.key) {
        button.classList.add("is-wrong");
      }
    }

    button.addEventListener("click", () => {
      const isCorrect = choice.key === scene.correctAnswer;
      sceneState.set(currentSceneIndex, {
        selected: choice.key,
        revealed: true,
        solved: isCorrect,
      });
      renderScene();
    });

    grid.appendChild(button);
  });

  return grid;
}

function renderFeedback(scene, state) {
  const box = document.createElement("div");
  box.className = "feedback-box";

  if (!state.revealed) {
    box.innerHTML = `
      <strong>Pick one.</strong>
      <span>We can check it.</span>
    `;
    return box;
  }

  const message = state.solved ? scene.successFeedback : scene.retryFeedback;
  box.innerHTML = `
    <strong>${state.solved ? "Yes!" : "Try again!"}</strong>
    <span>${message}</span>
  `;
  return box;
}

function renderAnswerGrid(input, machineList, output) {
  const grid = document.createElement("div");
  grid.className = "answer-grid";
  grid.appendChild(renderItemCard("Start", input));
  grid.appendChild(renderItemCard("Finish", output));
  const note = document.createElement("div");
  note.className = "answer-card";
  note.innerHTML = `
    <div class="badge">Order</div>
    <span class="item-name">${machineList[0].name} and then ${machineList[1].name}</span>
    <div class="item-tags">
      <span class="tag">first</span>
      <span class="tag">next</span>
    </div>
  `;
  grid.appendChild(note);
  return grid;
}

function renderChainWalkthrough(input, machineList, middle, output) {
  const grid = document.createElement("div");
  grid.className = "chain-walkthrough";

  const stepOne = document.createElement("div");
  stepOne.className = "chain-step";
  stepOne.appendChild(renderItemCard("Start", input));
  stepOne.appendChild(renderMachineChip("1", machineList[0]));
  stepOne.appendChild(renderItemCard("Now", middle));

  const stepTwo = document.createElement("div");
  stepTwo.className = "chain-step";
  stepTwo.appendChild(renderItemCard("Use This", middle));
  stepTwo.appendChild(renderMachineChip("2", machineList[1]));
  stepTwo.appendChild(renderItemCard("Finish", output));

  grid.appendChild(stepOne);
  grid.appendChild(stepTwo);
  return grid;
}

function renderMachineChip(step, machine) {
  const chip = document.createElement("div");
  chip.className = "machine-chip";
  chip.innerHTML = `
    <div class="badge">Step ${step}</div>
    <div class="machine-icon">${machine.icon}</div>
    <div class="item-name">${machine.name}</div>
  `;
  return chip;
}

function renderArrow() {
  const arrow = document.createElement("div");
  arrow.className = "arrow";
  arrow.textContent = "→";
  return arrow;
}

function renderControls(scene, state) {
  const controls = document.createElement("div");
  controls.className = currentSceneIndex === 0 ? "controls compact" : "controls";

  if (currentSceneIndex > 0) {
    const backButton = document.createElement("button");
    backButton.className = "control-button";
    backButton.type = "button";
    backButton.textContent = "Back";
    backButton.addEventListener("click", () => {
      currentSceneIndex -= 1;
      renderScene();
    });
    controls.appendChild(backButton);
  }

  const nextButton = document.createElement("button");
  nextButton.className = "control-button primary";
  nextButton.type = "button";

  if (currentSceneIndex === scenes.length - 1) {
    nextButton.textContent = "Play Again";
    nextButton.addEventListener("click", () => {
      currentSceneIndex = 0;
      sceneState.clear();
      scenes = createScenes();
      renderScene();
    });
  } else {
    nextButton.textContent = "Next";
    const needsAnswer =
      scene.type === "single_function_choice" ||
      scene.type === "chain_function_choice" ||
      scene.type === "number_choice" ||
      scene.type === "number_chain_choice";
    nextButton.disabled = needsAnswer && !state.revealed;
    nextButton.addEventListener("click", () => {
      currentSceneIndex += 1;
      renderScene();
    });
  }

  controls.appendChild(nextButton);
  return controls;
}

function renderProgress() {
  const step = currentSceneIndex + 1;
  progressText.textContent = `${step} / ${scenes.length}`;
  progressBar.style.width = `${(step / scenes.length) * 100}%`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function handleBubbleClick(event) {
  const bubbleButton = event.target.closest(".bubble-button");
  if (!bubbleButton) {
    return;
  }

  popBubbleButton(bubbleButton);
}

function popBubbleButton(target) {
  target.classList.remove("is-popping");
  void target.offsetWidth;
  target.classList.add("is-popping");

  const burst = document.createElement("div");
  burst.className = `bubble-burst bubble-burst-${target.dataset.bubbleKind || "teach"}`;

  for (let index = 0; index < 8; index += 1) {
    const bubble = document.createElement("span");
    bubble.className = "bubble-pop";
    bubble.style.setProperty("--dx", `${Math.cos((Math.PI * 2 * index) / 8) * 52}px`);
    bubble.style.setProperty("--dy", `${Math.sin((Math.PI * 2 * index) / 8) * 52}px`);
    bubble.style.setProperty("--delay", `${index * 18}ms`);
    burst.appendChild(bubble);
  }

  const rect = target.getBoundingClientRect();
  burst.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
  burst.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
  document.body.appendChild(burst);

  window.setTimeout(() => {
    target.classList.remove("is-popping");
    burst.remove();
  }, 900);
}

function handleBubbleKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const bubbleButton = event.target.closest(".bubble-button");
  if (!bubbleButton) {
    return;
  }

  event.preventDefault();
  popBubbleButton(bubbleButton);
}

function getSceneMode(type) {
  if (
    type === "single_function_choice" ||
    type === "chain_function_choice" ||
    type === "number_choice" ||
    type === "number_chain_choice"
  ) {
    return {
      kind: "quiz",
      label: "Try It",
      icon: "✏️",
    };
  }

  if (type === "celebrate") {
    return {
      kind: "finish",
      label: "Celebrate",
      icon: "🏁",
    };
  }

  return {
    kind: "teach",
    label: "Learn It",
    icon: "👀",
  };
}
