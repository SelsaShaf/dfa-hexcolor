const HEX_CHARS = new Set("0123456789abcdefABCDEF".split(""));
const URUTAN_STATE_HEX = ["q1", "q2", "q3", "q4", "q5", "q6"];

function validateHexDFA(input) {
  let state = "q0";
  const trace = [state];

  for (const ch of input) {
    if (state === "qtrap") {
      trace.push("qtrap");
      continue;
    }
    if (state === "q0") {
      state = ch === "#" ? "q1" : "qtrap";
    } else if (URUTAN_STATE_HEX.includes(state)) {
      const idx = URUTAN_STATE_HEX.indexOf(state);
      const stateBerikut = "q" + (idx + 2);
      state = HEX_CHARS.has(ch) ? stateBerikut : "qtrap";
    } else if (state === "q7") {
      state = "qtrap";
    }
    trace.push(state);
  }

  return {
    input,
    valid: state === "q7",
    finalState: state,
    trace,
  };
}