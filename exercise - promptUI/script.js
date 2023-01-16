function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove("open");
  await wait(1000);
  popup.remove();
  popup = null;
}

function ask(options) {
  return new Promise(async function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("popup");
    popup.insertAdjacentHTML(
      "afterbegin",
      `
    <fieldset>
    <label>${options.title}</label>
    <input type ='text' name = 'name'/>
    <button type = 'submit'>Submit</button>
    </fieldset>`
    );
    //   console.log(popup);
    if (options.cancel) {
      const skipBtn = document.createElement("button");
      skipBtn.type = "button";
      skipBtn.textContent = "Cancel";
      popup.firstElementChild.appendChild(skipBtn);

      skipBtn.addEventListener(
        "click",
        function () {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    popup.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        resolve(e.target.name.value);
        destroyPopup(popup);
      },
      { once: true }
    );
    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add("open");
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;
  const cancel = "cancel" in button.dataset; // to check if cancel property is present in given dataset
  const answer = await ask({
    title: button.dataset.questions,
    cancel,
  });
  console.log(answer);
}
const buttons = document.querySelectorAll("[data-questions]");
buttons.forEach((button) => button.addEventListener("click", askQuestion));

const questions = [
  { title: "What is your name?" },
  { title: "What is your age?", cancel: true },
  { title: "What is your dogs name?" },
];

// //1st method
// const answers = Promise.all([
//   ask(questions[0]),
//   ask(questions[1]),
//   ask(questions[2]),
// ]).then((answers) => {
//   console.log(answers);
// });

// 2nd method - using forEach loop
// questions.forEach(async function (question) {
//   console.log("Asking a question");
//   console.log(question);
//   const answer = await ask(question);
//   console.log(answer);
// });

//3rd way
// async function askMany() {
//   for (const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }

// askMany();

//4rth way using function - it returns array like map
async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    results.push(await callback(item));
  }
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
