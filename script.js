fetch("data.json")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    handleData(data);
  })
  .catch((error) => console.error("Error fetching or parsing JSON:", error));

let labels = [];
let amounts = [];
let colors = [];
function handleData(data) {
  data.forEach((element) => {
    labels.push(element.day);
    amounts.push(element.amount);
    colors.push("hsl(10, 79%, 65%)");
  });

  render();
}

function render() {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Data",
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  const ctx = document.querySelector("#chart");

  const largestValue = Math.max(...data.datasets[0].data);
  const largestValueIndex = data.datasets[0].data.indexOf(largestValue);

  data.datasets[0].backgroundColor[largestValueIndex] = "hsl(186, 34%, 60%)";

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
          display: false,
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
    },
  });
}