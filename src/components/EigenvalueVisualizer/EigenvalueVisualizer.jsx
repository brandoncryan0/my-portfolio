import { useState } from "react";
import { analyzeMatrix, complexTex, derivationTex, interpolate, numberTex, PRESETS } from "./eigenMath";
import CoordinatePlane from "./CoordinatePlane";
import MathFormula from "./MathFormula";
import "./EigenvalueVisualizer.css";

const matrixTex = ([a, b, c, d]) => String.raw`\begin{bmatrix}${numberTex(a)}&${numberTex(b)}\\${numberTex(c)}&${numberTex(d)}\end{bmatrix}`;
const vectorTex = (vector) => String.raw`\begin{bmatrix}${vector.map(numberTex).join("\\")}\end{bmatrix}`;

export default function EigenvalueVisualizer() {
  const [entries, setEntries] = useState(["2", "0", "0", "1"]);
  const [t, setT] = useState(1);
  const matrix = entries.map(Number);
  const valid = entries.every((entry, index) => entry.trim() !== "" && Number.isFinite(matrix[index]) && Math.abs(matrix[index]) <= 1000);
  const result = valid ? analyzeMatrix(matrix) : null;

  return <section className="eigen-visualizer" aria-label="Interactive eigenvalue and eigenvector visualizer">
    <h2>Explore a linear transformation</h2>
    <p>Change the matrix to calculate its eigenvalues and eigenspaces. Results describe A; the slider controls the displayed transformation A(t).</p>
    <label className="eigen-preset">Example matrix
      <select value={PRESETS.findIndex((preset) => preset.matrix.every((value, i) => valid && value === matrix[i]))}
        onChange={(event) => { setEntries(PRESETS[Number(event.target.value)].matrix.map(String)); }}>
        <option value={-1} disabled>Custom matrix</option>
        {PRESETS.map((preset, index) => <option value={index} key={preset.name}>{preset.name}</option>)}
      </select>
    </label>

    <div className="eigen-input-row">
      <fieldset className="eigen-matrix-input">
        <legend>Matrix A</legend>
        <div className="eigen-matrix-brackets">
          {entries.map((entry, index) => <label key={index}>
            <span>{["a", "b", "c", "d"][index]}</span>
            <input type="number" step="any" min="-1000" max="1000" value={entry}
              aria-label={`Matrix entry ${["a", "b", "c", "d"][index]}, row ${Math.floor(index / 2) + 1}, column ${index % 2 + 1}`}
              aria-invalid={entry.trim() === "" || !Number.isFinite(matrix[index]) || Math.abs(matrix[index]) > 1000}
              onChange={(event) => setEntries(entries.map((value, i) => i === index ? event.target.value : value))} />
          </label>)}
        </div>
      </fieldset>
      <p>Use finite values from -1000 to 1000. Displayed numbers are rounded to six significant digits; calculations use full floating-point precision.</p>
    </div>
    {!valid ? <p role="alert">Enter a number between -1000 and 1000 in every matrix entry to display the results.</p> : <>
      <div className="eigen-summary">
        <div><h3>Trace</h3><MathFormula tex={String.raw`\operatorname{tr}(A)=${numberTex(result.trace)}`} /></div>
        <div><h3>Determinant</h3><MathFormula tex={String.raw`\det(A)=${numberTex(result.determinant)}`} /></div>
      </div>
      <h3>Eigenvalues and eigenvectors</h3>
      {result.nearRepeated && <p role="status">The discriminant is within floating-point rounding tolerance of zero. These results treat the eigenvalue as repeated; tiny perturbations may change the classification.</p>}
      {result.eigenpairs.map((pair, index) => <div className="eigen-pair" key={index}>
        <MathFormula tex={String.raw`\lambda_{${index + 1}}=${complexTex(pair)}`} />
        {pair.multiplicity === 2 && <p>Algebraic multiplicity 2; eigenspace dimension {pair.vectors.length}.</p>}
        {pair.vectors.map((vector, i) => {
          const vectorIndex = index + i + 1;
          return <MathFormula key={i} tex={String.raw`v_{${vectorIndex}}=${vectorTex(vector)},\quad Av_{${vectorIndex}}=(${numberTex(pair.real)})v_{${vectorIndex}}`} />;
        })}
        {pair.complexVector && <MathFormula tex={String.raw`v_{${index + 1}}=\begin{bmatrix}${pair.complexVector.map(complexTex).join("\\")}\end{bmatrix}\in\mathbb{C}^2`} />}
      </div>)}
      <p>{result.kind === "complex"
        ? "There are no real eigenvectors: no nonzero real direction is preserved by this matrix. The complex eigenvectors above live in complex space; the plot still shows the real plane transformation."
        : result.scalar
          ? "Every nonzero vector is an eigenvector. The two coordinate basis vectors are shown as representatives."
          : "Each displayed unit vector spans an eigenspace: any nonzero multiple is also an eigenvector. Negative eigenvalues reverse direction; zero eigenvalues send eigenvectors to the origin."}</p>
      <p><strong>Diagonalizable over the real numbers: {result.diagonalizableReal ? "Yes" : "No"}.</strong>{" "}
        Over the complex numbers: {result.diagonalizableComplex ? "Yes" : "No"}.
        {result.kind === "repeated" && !result.scalar && " This matrix is defective: the repeated eigenvalue has only one independent eigenvector."}
        {result.kind === "distinct" && " Two distinct real eigenvalues give two independent real eigenvectors."}
      </p>

      <div className="eigen-animation">
        <h3>Transform the plane</h3>
        <MathFormula tex={String.raw`A(t)=(1-t)I+tA,\quad 0\le t\le1`} />
        <label htmlFor="eigen-time">Transformation progress: <output>{t.toFixed(2)}</output></label>
        <input id="eigen-time" type="range" min="0" max="1" step="0.005" value={t} onChange={(event) => setT(Number(event.target.value))} />
        <div className="eigen-slider-labels"><span>0: identity</span><span>1: matrix A</span></div>
        <MathFormula tex={`A(${t.toFixed(2)})=${matrixTex(interpolate(matrix, t))}`} />
        <p>The interpolation is linear in the matrix entries. A rotation matrix may shrink the circle during this transition; intermediate matrices are not necessarily rotations.</p>
        <CoordinatePlane matrix={matrix} result={result} t={t} />
      </div>

      <h3>Characteristic polynomial: step by step</h3>
      <p>An eigenvector is nonzero, so (A - λI)v = 0 has a solution exactly when A - λI is singular.</p>
      {derivationTex(matrix, result).map((tex, index) => <MathFormula key={index} tex={tex} />)}
      <p>Solving this polynomial gives the eigenvalues above. For each eigenvalue, solve (A - λI)v = 0 to obtain its eigenspace.</p>
    </>}
  </section>;
}
