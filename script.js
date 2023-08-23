fetch("data.json")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    handleData(data);
  })
  .catch((error) => console.error("Error fetching or parsing JSON:", error));

let labels = [];
let amounts = [];
let colors = [];
let hoverColors = [];
function handleData(data) {
  data.forEach((element) => {
    labels.push(element.day);
    amounts.push(element.amount);
    colors.push("hsl(10, 79%, 65%)");
    hoverColors.push("hsla(10, 79%, 65%, 0.75)");
  });

  render();
}

function render() {
  const data = {
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  };

  const ctx = document.querySelector("#chart");

  const largestValue = Math.max(...data.datasets[0].data);
  const largestValueIndex = data.datasets[0].data.indexOf(largestValue);

  data.datasets[0].backgroundColor[largestValueIndex] = "hsl(186, 34%, 60%)";
  data.datasets[0].hoverBackgroundColor[largestValueIndex] =
    "hsla(186, 34%, 60%, 0.75)";

  const myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderRadius: 4,
        },
      },
    },
  });
}
