import test from "node:test";
import assert from "node:assert/strict";
import katex from "katex";
import { analyzeMatrix, interpolate, transform, PRESETS, derivationTex, complexTex, numberTex } from "./eigenMath.js";

const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);

function verifyEigenpairs(matrix) {
  const result = analyzeMatrix(matrix);
  for (const pair of result.eigenpairs) {
    for (const vector of pair.vectors) {
      close(Math.hypot(...vector), 1);
      const applied = transform(matrix, vector);
      applied.forEach((value, i) => close(value, pair.real * vector[i]));
    }
    if (pair.complexVector) {
      const real = pair.complexVector.map((v) => v.real);
      const imaginary = pair.complexVector.map((v) => v.imaginary);
      const appliedReal = transform(matrix, real);
      const appliedImaginary = transform(matrix, imaginary);
      for (let i = 0; i < 2; i++) {
        close(appliedReal[i], pair.real * real[i] - pair.imaginary * imaginary[i]);
        close(appliedImaginary[i], pair.real * imaginary[i] + pair.imaginary * real[i]);
      }
    }
    close(pair.real ** 2 - pair.imaginary ** 2 - result.trace * pair.real + result.determinant, 0, 1e-8);
    close(2 * pair.real * pair.imaginary - result.trace * pair.imaginary, 0);
  }
  return result;
}

test("every preset satisfies Av = lambda v and its characteristic polynomial", () => {
  for (const preset of PRESETS) verifyEigenpairs(preset.matrix);
});

test("distinct eigenvalues, determinant and trace", () => {
  const result = verifyEigenpairs([4, 1, 2, 3]);
  assert.deepEqual(result.eigenpairs.map((p) => p.real), [5, 2]);
  assert.equal(result.trace, 7);
  assert.equal(result.determinant, 10);
  assert.equal(result.diagonalizableReal, true);
});

test("scalar and zero matrices have two-dimensional eigenspaces", () => {
  for (const value of [0, 1, -3, 1e-8]) {
    const result = verifyEigenpairs([value, 0, 0, value]);
    assert.equal(result.eigenpairs[0].vectors.length, 2);
    assert.equal(result.diagonalizableReal, true);
    assert.equal(result.eigenpairs[0].real, value);
  }
});

test("Jordan and nontriangular defective matrices have one eigenvector direction", () => {
  for (const matrix of [[2, 1, 0, 2], [1, 1, -1, 3], [0, 0, 2, 0]]) {
    const result = verifyEigenpairs(matrix);
    assert.equal(result.kind, "repeated");
    assert.equal(result.eigenpairs[0].vectors.length, 1);
    assert.equal(result.diagonalizableReal, false);
    assert.equal(result.diagonalizableComplex, false);
  }
});

test("complex roots are displayed as conjugates and diagonalize only over C", () => {
  const result = verifyEigenpairs([1, -2, 2, 1]);
  assert.deepEqual(result.eigenpairs.map(({ real, imaginary }) => [real, imaginary]), [[1, 2], [1, -2]]);
  assert.equal(result.diagonalizableReal, false);
  assert.equal(result.diagonalizableComplex, true);
  assert.ok(result.eigenpairs.every((pair) => pair.vectors.length === 0));
});

test("singular, negative, small and nearly repeated eigenvalues", () => {
  for (const matrix of [[1, 2, 2, 4], [-2, 0, 0, -3], [1e-8, 0, 0, 2e-8], [1, 0, 0, 1 + 1e-8], [1000, 0, 0, 1e-8]]) verifyEigenpairs(matrix);
  assert.equal(analyzeMatrix([1, 0, 0, 1 + 1e-8]).kind, "distinct");
});

test("interpolation is identity at zero, A at one, and linear in between", () => {
  const matrix = [2, 3, -4, 5];
  assert.deepEqual(interpolate(matrix, 0).map((x) => x || 0), [1, 0, 0, 1]);
  assert.deepEqual(interpolate(matrix, 1), matrix);
  assert.deepEqual(interpolate(matrix, 0.5), [1.5, 1.5, -2, 3]);
  assert.deepEqual(transform([1, 2, 3, 4], [2, 1]), [4, 10]);
});

test("invalid input is rejected", () => {
  for (const matrix of [[NaN, 0, 0, 1], [Infinity, 0, 0, 1], [1001, 0, 0, 1], [1, 2]]) assert.throws(() => analyzeMatrix(matrix), RangeError);
});

test("tiny matrices retain distinct and complex eigenvalue classifications", () => {
  const distinct = analyzeMatrix([1e-200, 0, 0, 2e-200]);
  assert.equal(distinct.kind, "distinct");
  assert.deepEqual(distinct.eigenpairs.map((pair) => pair.real), [2e-200, 1e-200]);
  const complex = analyzeMatrix([0, -1e-200, 1e-200, 0]);
  assert.equal(complex.kind, "complex");
  assert.equal(complex.eigenpairs[0].imaginary, 1e-200);
});

test("derivations and complex expressions render with KaTeX", () => {
  for (const { matrix } of PRESETS) {
    const result = analyzeMatrix(matrix);
    const expressions = [...derivationTex(matrix, result), ...result.eigenpairs.map(complexTex), numberTex(1e-8)];
    for (const tex of expressions) assert.ok(katex.renderToString(tex).includes("katex"));
  }
});

test("eigenpair residuals across 200 deterministic matrices", () => {
  let seed = 42;
  const next = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return (seed % 21) - 10; };
  for (let i = 0; i < 200; i++) verifyEigenpairs([next(), next(), next(), next()]);
});
