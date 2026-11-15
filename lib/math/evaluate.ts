/**
 * Tokenizer + shunting-yard evaluator for the scientific calculator.
 *
 * Deliberately not eval / new Function: those execute arbitrary code, throw on
 * half-typed input, and give no control over precedence or angle mode. A real
 * parser lets a partial expression simply return null so the display stays
 * blank instead of flashing an error while the user is still typing.
 */

export type AngleMode = "DEG" | "RAD";

type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: string }
  | { type: "function"; value: string }
  | { type: "paren"; value: "(" | ")" }
  | { type: "percent" };

interface OperatorSpec {
  precedence: number;
  associativity: "left" | "right";
  arity: 1 | 2;
}

const OPERATORS: Record<string, OperatorSpec> = {
  "+": { precedence: 2, associativity: "left", arity: 2 },
  "-": { precedence: 2, associativity: "left", arity: 2 },
  "*": { precedence: 3, associativity: "left", arity: 2 },
  "/": { precedence: 3, associativity: "left", arity: 2 },
  // Unary minus binds tighter than × ÷ but looser than ^, so -2^2 is -4.
  "u-": { precedence: 4, associativity: "right", arity: 1 },
  "^": { precedence: 5, associativity: "right", arity: 2 },
};

const FUNCTIONS = new Set(["sin", "cos", "tan", "log", "ln", "sqrt"]);

/** Symbols the keypad emits, mapped to their parser equivalents. */
function normalize(input: string): string {
  return input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/√/g, "sqrt")
    .replace(/,/g, "");
}

function tokenize(source: string): Token[] {
  const src = normalize(source);
  const tokens: Token[] = [];
  let i = 0;

  const previous = () => tokens[tokens.length - 1];

  /** True when the previous token can end an operand — so a following
   *  number, constant, function or "(" implies multiplication. */
  const previousEndsOperand = () => {
    const p = previous();
    if (!p) return false;
    return (
      p.type === "number" ||
      p.type === "percent" ||
      (p.type === "paren" && p.value === ")")
    );
  };

  while (i < src.length) {
    const char = src[i];

    if (char === " ") {
      i++;
      continue;
    }

    // Numbers, including a bare leading decimal point.
    if (/[0-9.]/.test(char)) {
      let literal = "";
      while (i < src.length && /[0-9.]/.test(src[i])) literal += src[i++];
      if ((literal.match(/\./g) ?? []).length > 1) {
        throw new Error("malformed number");
      }
      const value = Number(literal);
      if (!Number.isFinite(value)) throw new Error("malformed number");
      if (previousEndsOperand()) tokens.push({ type: "operator", value: "*" });
      tokens.push({ type: "number", value });
      continue;
    }

    // Constants.
    if (char === "π") {
      if (previousEndsOperand()) tokens.push({ type: "operator", value: "*" });
      tokens.push({ type: "number", value: Math.PI });
      i++;
      continue;
    }
    if (src.startsWith("e", i) && !/[a-z]/i.test(src[i + 1] ?? "")) {
      if (previousEndsOperand()) tokens.push({ type: "operator", value: "*" });
      tokens.push({ type: "number", value: Math.E });
      i++;
      continue;
    }

    // Function names.
    const name = /^[a-z]+/i.exec(src.slice(i))?.[0];
    if (name) {
      const lower = name.toLowerCase();
      if (!FUNCTIONS.has(lower)) throw new Error(`unknown function ${name}`);
      if (previousEndsOperand()) tokens.push({ type: "operator", value: "*" });
      tokens.push({ type: "function", value: lower });
      i += name.length;
      continue;
    }

    if (char === "(") {
      if (previousEndsOperand()) tokens.push({ type: "operator", value: "*" });
      tokens.push({ type: "paren", value: "(" });
      i++;
      continue;
    }
    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      i++;
      continue;
    }

    if (char === "%") {
      tokens.push({ type: "percent" });
      i++;
      continue;
    }

    if (char in OPERATORS || char === "-") {
      if (char === "-") {
        // Unary when nothing precedes it that could be a left operand.
        const p = previous();
        const isUnary =
          !p ||
          p.type === "function" ||
          (p.type === "operator") ||
          (p.type === "paren" && p.value === "(");
        tokens.push({ type: "operator", value: isUnary ? "u-" : "-" });
        i++;
        continue;
      }
      if (char === "+") {
        // A leading or post-operator "+" is a no-op sign, not an addition.
        const p = previous();
        const isUnary =
          !p ||
          p.type === "function" ||
          p.type === "operator" ||
          (p.type === "paren" && p.value === "(");
        if (isUnary) {
          i++;
          continue;
        }
      }
      tokens.push({ type: "operator", value: char });
      i++;
      continue;
    }

    throw new Error(`unexpected character ${char}`);
  }

  return tokens;
}

/** Shunting-yard: infix tokens to reverse Polish notation. */
function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const stack: Token[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "number":
        output.push(token);
        break;

      case "percent":
        // Postfix: binds to the operand already emitted.
        output.push(token);
        break;

      case "function":
        stack.push(token);
        break;

      case "operator": {
        const spec = OPERATORS[token.value];
        while (stack.length) {
          const top = stack[stack.length - 1];
          if (top.type !== "operator") break;
          const topSpec = OPERATORS[top.value];
          const shouldPop =
            topSpec.precedence > spec.precedence ||
            (topSpec.precedence === spec.precedence &&
              spec.associativity === "left");
          if (!shouldPop) break;
          output.push(stack.pop()!);
        }
        stack.push(token);
        break;
      }

      case "paren":
        if (token.value === "(") {
          stack.push(token);
        } else {
          let matched = false;
          while (stack.length) {
            const top = stack.pop()!;
            if (top.type === "paren" && top.value === "(") {
              matched = true;
              break;
            }
            output.push(top);
          }
          if (!matched) throw new Error("unbalanced parenthesis");
          const top = stack[stack.length - 1];
          if (top && top.type === "function") output.push(stack.pop()!);
        }
        break;
    }
  }

  while (stack.length) {
    const top = stack.pop()!;
    if (top.type === "paren") throw new Error("unbalanced parenthesis");
    output.push(top);
  }

  return output;
}

function applyFunction(name: string, x: number, angleMode: AngleMode): number {
  // Angle mode converts the argument of the circular functions only.
  const angle = angleMode === "DEG" ? (x * Math.PI) / 180 : x;
  switch (name) {
    case "sin":
      return Math.sin(angle);
    case "cos":
      return Math.cos(angle);
    case "tan":
      return Math.tan(angle);
    case "log":
      return Math.log10(x);
    case "ln":
      return Math.log(x);
    case "sqrt":
      return Math.sqrt(x);
    default:
      throw new Error(`unknown function ${name}`);
  }
}

function evaluateRPN(rpn: Token[], angleMode: AngleMode): number {
  const stack: number[] = [];

  for (const token of rpn) {
    if (token.type === "number") {
      stack.push(token.value);
      continue;
    }
    if (token.type === "percent") {
      const x = stack.pop();
      if (x === undefined) throw new Error("missing operand");
      stack.push(x / 100);
      continue;
    }
    if (token.type === "function") {
      const x = stack.pop();
      if (x === undefined) throw new Error("missing operand");
      stack.push(applyFunction(token.value, x, angleMode));
      continue;
    }
    if (token.type === "operator") {
      const spec = OPERATORS[token.value];
      if (spec.arity === 1) {
        const x = stack.pop();
        if (x === undefined) throw new Error("missing operand");
        stack.push(-x);
        continue;
      }
      const right = stack.pop();
      const left = stack.pop();
      if (right === undefined || left === undefined) {
        throw new Error("missing operand");
      }
      switch (token.value) {
        case "+":
          stack.push(left + right);
          break;
        case "-":
          stack.push(left - right);
          break;
        case "*":
          stack.push(left * right);
          break;
        case "/":
          stack.push(left / right);
          break;
        case "^":
          stack.push(Math.pow(left, right));
          break;
      }
    }
  }

  if (stack.length !== 1) throw new Error("incomplete expression");
  return stack[0];
}

/**
 * Evaluate an expression. Returns null for anything that does not yet parse,
 * so a half-typed expression renders as blank rather than as an error.
 */
export function evaluateExpression(
  expression: string,
  angleMode: AngleMode = "DEG"
): number | null {
  if (!expression.trim()) return null;
  try {
    const tokens = tokenize(expression);
    if (!tokens.length) return null;
    return evaluateRPN(toRPN(tokens), angleMode);
  } catch {
    return null;
  }
}

/** 12 significant digits with trailing zeros trimmed. */
export function formatResult(value: number | null): string {
  if (value === null) return "";
  if (Number.isNaN(value)) return "Undefined";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "-∞";
  if (value === 0) return "0";

  const magnitude = Math.abs(value);
  if (magnitude >= 1e12 || magnitude < 1e-9) {
    return value
      .toExponential(11)
      .replace(/\.?0+e/, "e")
      .replace("e+", "e");
  }

  const rounded = Number(value.toPrecision(12));
  // toPrecision can re-introduce exponent form; String() gives the plain value.
  return String(rounded);
}
