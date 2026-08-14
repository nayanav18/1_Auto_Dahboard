import { useState, useRef } from "react";
import * as XLSX from "xlsx";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [datasetInfo, setDatasetInfo] = useState(null);

  const fileInputRef = useRef(null);

  const steps = [
    "Upload Dataset",
    "Dataset Analysis",
    "Define Requirement",
    "Choose Visualization",
    "Build Dashboard",
    "Interactions",
    "Final Dashboard",
  ];

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, {
        type: "array",
      });

      const firstSheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });

      const columns =
        rows.length > 0
          ? Object.keys(rows[0])
          : [];

      setDatasetInfo({
        fileName: selectedFile.name,
        sheetName: firstSheetName,
        rows: rows.length,
        columns: columns.length,
        columnNames: columns,
      });

      setCurrentStep(2);
    } catch (error) {
      console.error("Dataset reading failed:", error);

      alert("Could not read this dataset.");
    }
  };

  return (
    <div className="app">

      {/* TOP BAR */}

      <header className="topbar">

        <div className="brand">
          <span className="brand-icon">✦</span>
          <span>Dashboard AI</span>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Ready
        </div>

      </header>


      {/* MAIN WORKSPACE */}

      <div className="workspace">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <h3>Dashboard Builder</h3>

          <div className="steps">

            {steps.map((step, index) => {

              const stepNumber = index + 1;

              return (
                <button
                  key={step}
                  className={
                    currentStep === stepNumber
                      ? "step active"
                      : "step"
                  }
                  onClick={() =>
                    setCurrentStep(stepNumber)
                  }
                >

                  <span className="step-number">
                    {stepNumber}
                  </span>

                  <span>{step}</span>

                </button>
              );

            })}

          </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="main-content">

          <div className="page-header">

            <div>

              <p className="eyebrow">
                STEP {currentStep} OF {steps.length}
              </p>

              <h1>
                {steps[currentStep - 1]}
              </h1>

              <p className="description">
                Build your interactive dashboard with AI.
              </p>

            </div>

          </div>


          {/* CONTENT CARD */}

          <section className="content-card">


            {/* STEP 1 — UPLOAD DATASET */}

            {currentStep === 1 && (

              <div className="upload-section">

                <div className="upload-icon">
                  ↑
                </div>

                <h2>
                  Upload your dataset
                </h2>

                <p>
                  Upload a CSV or Excel file to begin
                  creating your dashboard.
                </p>


                {/* Hidden file input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />


                <button
                  className="primary-button"
                  onClick={() =>
                    fileInputRef.current.click()
                  }
                >
                  Choose Dataset
                </button>


                {file && (

                  <p className="selected-file">

                    Selected:{" "}

                    <strong>
                      {file.name}
                    </strong>

                  </p>

                )}


                <span className="file-types">
                  CSV · XLSX · XLS
                </span>

              </div>

            )}


            {/* STEP 2 — DATASET ANALYSIS */}

            {currentStep === 2 && (

              <div>

                <h2>
                  Dataset Analysis
                </h2>


                {datasetInfo ? (

                  <>

                    <p>
                      Dataset:{" "}

                      <strong>
                        {datasetInfo.fileName}
                      </strong>
                    </p>


                    {/* Dataset summary */}

                    <div className="info-grid">


                      <div className="info-box">

                        <span>
                          Sheet
                        </span>

                        <strong>
                          {datasetInfo.sheetName}
                        </strong>

                      </div>


                      <div className="info-box">

                        <span>
                          Rows
                        </span>

                        <strong>
                          {datasetInfo.rows}
                        </strong>

                      </div>


                      <div className="info-box">

                        <span>
                          Columns
                        </span>

                        <strong>
                          {datasetInfo.columns}
                        </strong>

                      </div>


                      <div className="info-box">

                        <span>
                          Status
                        </span>

                        <strong>
                          Ready
                        </strong>

                      </div>


                    </div>


                    {/* Columns */}

                    <h3 className="columns-heading">
                      Columns
                    </h3>


                    <div className="column-list">

                      {datasetInfo.columnNames.map(
                        (column) => (

                          <span
                            className="column-tag"
                            key={column}
                          >
                            {column}
                          </span>

                        )
                      )}

                    </div>


                    <button
                      className="primary-button"
                      onClick={() =>
                        setCurrentStep(3)
                      }
                    >
                      Continue to Requirement
                    </button>

                  </>

                ) : (

                  <p>
                    No dataset has been uploaded yet.
                  </p>

                )}

              </div>

            )}


            {/* STEP 3 — DEFINE REQUIREMENT */}

            {currentStep === 3 && (

              <div>

                <h2>
                  What would you like to analyze?
                </h2>

                <p>
                  Describe what you want to see in
                  your dashboard.
                </p>


                <textarea
                  className="question-box"
                  placeholder="Example: Show revenue by region for 2025"
                />


                <button
                  className="primary-button"
                  onClick={() =>
                    setCurrentStep(4)
                  }
                >
                  Analyze Request
                </button>

              </div>

            )}


            {/* STEP 4 — CHOOSE VISUALIZATION */}

            {currentStep === 4 && (

              <div>

                <h2>
                  Choose your visualization
                </h2>

                <p>
                  AI will recommend the best
                  visualization based on your
                  request and dataset.
                </p>


                <div className="recommendation-box">

                  <span>
                    AI Recommendation
                  </span>

                  <strong>
                    Bar Chart
                  </strong>

                  <p>
                    Recommended for comparing
                    values across categories.
                  </p>

                </div>


                <h3 className="choose-heading">
                  Or choose your own
                </h3>


                <div className="chart-options">

                  {[
                    "Bar",
                    "Line",
                    "Pie",
                    "Scatter",
                    "Table",
                    "KPI",
                  ].map((chart) => (

                    <button
                      className="chart-option"
                      key={chart}
                    >
                      {chart}
                    </button>

                  ))}

                </div>


                <button
                  className="primary-button"
                  onClick={() =>
                    setCurrentStep(5)
                  }
                >
                  Generate Chart
                </button>

              </div>

            )}


            {/* STEP 5 — DASHBOARD */}

            {currentStep === 5 && (

              <div>

                <h2>
                  Dashboard Canvas
                </h2>

                <p>
                  Generated visualizations will
                  appear here.
                </p>


                <div className="canvas-placeholder">

                  <span>
                    Generated charts will appear here
                  </span>

                </div>


                <button
                  className="primary-button"
                  onClick={() =>
                    setCurrentStep(6)
                  }
                >
                  Continue
                </button>

              </div>

            )}


            {/* STEP 6 — INTERACTIONS */}

            {currentStep === 6 && (

              <div>

                <h2>
                  Interactions & Filters
                </h2>

                <p>
                  Filters and cross-chart interactions
                  will be configured here.
                </p>


                <button
                  className="primary-button"
                  onClick={() =>
                    setCurrentStep(7)
                  }
                >
                  Preview Dashboard
                </button>

              </div>

            )}


            {/* STEP 7 — FINAL DASHBOARD */}

            {currentStep === 7 && (

              <div className="final-preview">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Dashboard Ready
                </h2>

                <p>
                  Your interactive dashboard is ready.
                </p>


                <button className="primary-button">
                  Open Dashboard
                </button>

              </div>

            )}

          </section>

        </main>

      </div>

    </div>
  );
}

export default App;