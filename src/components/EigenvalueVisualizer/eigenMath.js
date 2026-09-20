export const PRESETS = [
  { name: "Horizontal stretch", matrix: [2, 0, 0, 1] },
  { name: "Vertical stretch", matrix: [1, 0, 0, 3] },
  { name: "Shear", matrix: [1, 1, 0, 1] },
  { name: "Reflection", matrix: [1, 0, 0, -1] },
  { name: "Rotation (90 degrees)", matrix: [0, -1, 1, 0] },
  { name: "Repeated eigenvalue", matrix: [2, 0, 0, 2] },
  { name: "Defective matrix", matrix: [2, 1, 0, 2] },
  { name: "Complex eigenvalues", matrix: [1, -2, 2, 1] },
];

export function transform([a, b, c, d], [x, y]) {
  return [a * x + b * y, c * x + d * y];
}

export function interpolate([a, b, c, d], t) {
  return [1 - t + t * a, t * b, t * c, 1 - t + t * d];
}

function realVector([a, b, c, d], lambda) {
  // A perpendicular to the larger row of A-lambda I avoids a tiny pivot.
  const first = [a - lambda, b];
  const second = [c, d - lambda];
  const [x, y] = Math.hypot(...first) >= Math.hypot(...second) ? first : second;
  const length = Math.hypot(x, y);
  const vector = [-y / length, x / length];
  const sign = vector.find((value) => Math.abs(value) > 1e-14) < 0 ? -1 : 1;
  return vector.map((value) => value * sign);
}

export function analyzeMatrix(matrix) {
  if (matrix.length !== 4 || matrix.some((value) => !Number.isFinite(value) || Math.abs(value) > 1000)) {
    throw new RangeError("Enter four finite numbers between -1000 and 1000.");
  }
  const [a, b, c, d] = matrix;
  const trace = a + d;
  const determinant = a * d - b * c;
  const difference = (a - d) ** 2;
  const product = 4 * b * c;
  let discriminant = difference + product;
  const tolerance = 16 * Number.EPSILON * (Math.abs(difference) + Math.abs(product));
  const nearRepeated = discriminant !== 0 && Math.abs(discriminant) <= tolerance;
  if (nearRepeated) discriminant = 0;
  const scalar = a === d && b === 0 && c === 0;
  const base = { trace, determinant, discriminant, nearRepeated, scalar };
  if (discriminant < 0) {
    const real = trace / 2;
    const imaginary = Math.sqrt(-discriminant) / 2;
    // [b, lambda-a] is a nonzero complex eigenvector when the roots are nonreal.
    const eigenpairs = [imaginary, -imaginary].map((im) => {
      const length = Math.hypot(b, real - a, im);
      return { real, imaginary: im, vectors: [], complexVector: [
        { real: b / length, imaginary: 0 },
        { real: (real - a) / length, imaginary: im / length },
      ] };
    });
    return { ...base, kind: "complex", eigenpairs, diagonalizableReal: false, diagonalizableComplex: true };
  }
  if (discriminant === 0) {
    const real = trace / 2;
    return { ...base, kind: "repeated", diagonalizableReal: scalar, diagonalizableComplex: scalar,
      eigenpairs: [{ real, imaginary: 0, multiplicity: 2,
        vectors: scalar ? [[1, 0], [0, 1]] : [realVector(matrix, real)] }] };
  }
  // Compute the larger-magnitude root first and use the product of roots to
  // avoid cancellation in the smaller root of the quadratic formula.
  const root = Math.sqrt(discriminant);
  const first = (trace + (trace >= 0 ? root : -root)) / 2;
  const second = determinant / first;
  return { ...base, kind: "distinct", diagonalizableReal: true, diagonalizableComplex: true,
    eigenpairs: [first, second].sort((x, y) => y - x).map((real) => ({
      real, imaginary: 0, multiplicity: 1, vectors: [realVector(matrix, real)],
    })) };
}

export function formatNumber(value) {
  if (value === 0) return "0";
  return Number(value.toPrecision(6)).toString();
}

export function numberTex(value) {
  return formatNumber(value).replace(/e([+-]?\d+)/, "\\times 10^{$1}");
}

export function complexTex({ real, imaginary }) {
  if (!imaginary) return numberTex(real);
  return `${numberTex(real)} ${imaginary < 0 ? "-" : "+"} ${numberTex(Math.abs(imaginary))}i`;
}

export function derivationTex(matrix, result) {
  const [a, b, c, d] = matrix.map(numberTex);
  return [
    String.raw`\det(A-\lambda I)=\begin{vmatrix}a-\lambda&b\\c&d-\lambda\end{vmatrix}=0`,
    String.raw`(${a}-\lambda)(${d}-\lambda)-(${b})(${c})=0`,
    String.raw`p(\lambda)=\lambda^2-(${a}+(${d}))\lambda+(${a})(${d})-(${b})(${c})`,
    String.raw`p(\lambda)=\lambda^2-(${numberTex(result.trace)})\lambda+(${numberTex(result.determinant)})=0`,
    String.raw`\lambda=\frac{\operatorname{tr}(A)\pm\sqrt{\operatorname{tr}(A)^2-4\det(A)}}{2}`,
  ];
}
