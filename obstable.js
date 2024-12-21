// Dropdown button and table element references
const dropdownButton = document.getElementById('dropdownMenuButton');
const circuitcomp = document.getElementById('circ-comp');

// Map table input IDs to easily update values
const tableFields = {
  Red: ['led-r', 'w-r', 'V-r', 'E-r', 'F-r', 'h-r'],
  Yellow: ['led-y', 'w-y', 'V-y', 'E-y', 'F-y', 'h-y'],
  Green: ['led-g', 'w-g', 'V-g', 'E-g', 'F-g', 'h-g'],
  Blue: ['led-b', 'w-b', 'V-b', 'E-b', 'F-b', 'h-b'],
};

// Data for table values
const tableData = {
  Red: ["6950", "1.8", "24", "6", "6.634e-34"],
  Yellow: ["5900", "2.1", "24", "6", "5.75e-34"],
  Green: ["5700", "2.4", "24", "6", "7.85e-34"],
  Blue: ["4720", "3.0", "24", "6", "6.1e-34"],
};

// Disable dropdown initially
dropdownButton.disabled = true;

// Circuit completion click event
circuitcomp.addEventListener("click", () => {
  console.log("Circuit completed");

  // Enable the dropdown after circuit is completed
  dropdownButton.disabled = false;

  // Optional: Provide visual feedback (e.g., color change)
  dropdownButton.classList.remove('btn-secondary');
  dropdownButton.classList.add('btn-primary');
});

// Dropdown item click event
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const selectedColor = this.getAttribute('data-value');

    // Update dropdown button text
    dropdownButton.textContent = selectedColor;

    // Update table values based on the selected color
    updateTableValues(selectedColor);
  });
});

// Function to update table values dynamically
function updateTableValues(color) {
  if (!tableFields[color] || !tableData[color]) return;

  // Get the fields and values for the selected color
  const fields = tableFields[color];
  const values = tableData[color];

  // Set the first field (LED input value) to the color name
  document.getElementById(fields[0]).value = color;

  // Loop through the remaining fields and update their values
  for (let i = 1; i < fields.length; i++) {
    document.getElementById(fields[i]).value = values[i - 1];
  }
}


// // graph

// Energy values in Joules
const energyValues = [2.8836e-19, 3.3642e-19, 3.8448e-19, 4.806e-19];
const frequencyValues = [4.2857e14, 5.0847e14, 5.6604e14, 6.3829e14];

let chartInstance = null; // Keep track of Chart.js instance

function drawGraph() {
  const canvas = document.getElementById('popupGraph');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Destroy the existing chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Create data points in {x, y} format for the line chart
  const dataPoints = frequencyValues.map((freq, index) => ({
    x: freq,
    y: energyValues[index],
  }));

  // Create a new Chart.js instance for the line chart
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Energy vs. Frequency',
          data: dataPoints,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,  // Line chart without filling
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Frequency (Hz, Log Scale)',
          },
          min: 4e14,  // Adjusted min value for better visualization
          max: 7e14,  // Adjusted max value for better visualization
          ticks: {
            callback: function (value) {
              return value.toExponential(1);  // Display values in exponential form
            },
            stepSize: 1e14,  // Control step size for tick marks
          },
        },
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Energy (J, Log Scale)',
          },
          min: 2.8e-19,  // Adjusted min value for better visualization
          max: 5e-19,  // Adjusted max value for better visualization
          ticks: {
            callback: function (value) {
              return value.toExponential(1);  // Display values in exponential form
            },
            stepSize: 0.05e-19,  // Control step size for tick marks
          },
        },
      },
    },
  });
}

// Call the drawGraph function to display the graph
drawGraph();


// Show modal and draw graph
document.getElementById('showGraph').addEventListener('click', (event) => {
  event.preventDefault();
  const modal = document.getElementById('graphModal');
  modal.classList.add('show');
  drawGraph();
});

// Close modal when clicking the close button
document.getElementById('closeModal').addEventListener('click', () => {
  const modal = document.getElementById('graphModal');
  modal.classList.remove('show');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('graphModal');
  if (event.target === modal) {
    modal.classList.remove('show');
  }
});

document.getElementById('closeModal').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent any default action (e.g., form submission)
  document.getElementById('graphModal').style.display = 'none'; // Hide the modal
});


// Slope function 


// // pdf generation by html2canvas and jsPDF

//   document.getElementById('downloadPdf').addEventListener('click', async () => {
//     const { jsPDF } = window.jspdf;
//     const pdf = new jsPDF();

//     // Capture table
//     const tableElement = document.getElementById('table1');
//     const tableCanvas = await html2canvas(tableElement);
//     const tableImgData = tableCanvas.toDataURL('image/png');
//     pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 0);

//     // Add a page for the modal
//     pdf.addPage();

//     // Capture modal
//     const modalElement = document.getElementById('graphModal');
//     const modalCanvas = await html2canvas(modalElement);
//     const modalImgData = modalCanvas.toDataURL('image/png');
//     pdf.addImage(modalImgData, 'PNG', 10, 10, 190, 0);

//     // Save the PDF
//     pdf.save('Plancks_Constant.pdf');
//   });


  // document.getElementById('downloadPdf').addEventListener('click', async () => {
  //   const { jsPDF } = window.jspdf;
  //   const pdf = new jsPDF();
  
  //   // Capture table
  //   const tableElement = document.getElementById('table1');
  //   const tableCanvas = await html2canvas(tableElement);
  //   const tableImgData = tableCanvas.toDataURL('image/png');
  //   pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 0);
  
  //   // Add a page for the modal
  //   pdf.addPage();
  
  //   // Ensure the modal is visible before capturing
  //   const modalElement = document.getElementById('graphModal');
  //   modalElement.classList.add('active'); // Temporarily show modal
  //   const modalCanvas = await html2canvas(modalElement);
  //   const modalImgData = modalCanvas.toDataURL('image/png');
  //   modalElement.classList.remove('active'); // Hide modal again
  
  //   pdf.addImage(modalImgData, 'PNG', 10, 10, 190, 0);
  
  //   // Save the PDF
  //   pdf.save('Plancks_Constant.pdf');
  // });

  document.getElementById('downloadPdf').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF()
  
  
    // Ensure the modal is visible temporarily for capture
    const modal = document.getElementById('graphModal');
    modal.style.display = 'block';
  
    // Capture table and modal
    try {
      const tableCanvas = await html2canvas(document.getElementById('table1'), {
        useCORS: true, // Enable CORS
        allowTaint: false, // Disallow tainting
      });
  
      const tableImgData = tableCanvas.toDataURL('image/png');
      pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 0);
  
      pdf.addPage();
  
      const modalCanvas = await html2canvas(modal, {
        useCORS: true, // Enable CORS
        allowTaint: false, // Disallow tainting
      });
  
      const modalImgData = modalCanvas.toDataURL('image/png');
      pdf.addImage(modalImgData, 'PNG', 10, 10, 190, 0);
  
      pdf.save('Plancks_Constant.pdf');
    } catch (error) {
      console.error('Error capturing canvas:', error);
      alert('Could not capture content due to tainted canvas issues.');
    } finally {
      // Hide modal again after capture
      modal.style.display = 'none';
    }
  });
  


