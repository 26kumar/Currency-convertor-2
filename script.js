document.addEventListener("DOMContentLoaded", () => {
  const coverteButton = document.getElementById("convert-btn");
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const resultDisplay = document.getElementById("result");

  const API_KEY = "fca_live_TmNvINsv6ybYllYIW4UFRISbkEhOVMIvHORmTWdj";

  coverteButton.addEventListener("click", async function () {
    try {
      const response = await fetchData();
      displayData(response);
    } catch (error) {
      showError();
    }
  });

  async function fetchData() {
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

    console.log("Fetching started...");
    const response = await fetch(url);
    console.log("Fetching completed");
    console.log(response);

    if (!response.ok) throw new Error("Error occured");

    const currdata = await response.json();
    console.log(currdata);

    const tocurr = toCurrency.value;
    const fromcurr = fromCurrency.value;

    let factor = currdata.data[tocurr] / currdata.data[fromcurr];

    const finalResult = factor * amountInput.value;
    return finalResult;
  }

  function displayData(response) {
    resultDisplay.textContent = `${amountInput.value} ${fromCurrency.value} = ${response} ${toCurrency.value}`;
  }

  function showError() {
    resultDisplay.textContent = "Something went wrong !!";
  }
});
