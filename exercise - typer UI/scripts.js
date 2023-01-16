function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min = 20, max = 150, randomNum = Math.random()) {
  return Math.floor(randomNum * (max - min) + min);
}

//it is preferable way
async function draw(el) {
  const text = el.textContent;
  let soFar = "";
  for (const letter of text) {
    // console.log(letter);
    soFar += letter;
    // console.log(soFar);
    el.textContent = soFar;
    // await wait(10);
    const { typeMin, typeMax } = el.dataset;
    const amountOfTimeToWait = getRandomNumber(typeMin, typeMax);
    await wait(amountOfTimeToWait);
  }
}

//another way - recursion
// function draw(el) {
//   let index = 1;
//   const text = el.textContent;
//   // console.log(text);
//   const { typeMin, typeMax } = el.dataset;
//   async function drawLetter() {
//     el.textContent = text.slice(0, index);
//     index += 1;
//     const amountOfTimeToWait = getRandomNumber(typeMin, typeMax);
//     await wait(amountOfTimeToWait);
//     if (index <= text.length) {
//       drawLetter();
//     }
//   }
//   drawLetter();
// }
document.querySelectorAll("[data-type]").forEach(draw);
