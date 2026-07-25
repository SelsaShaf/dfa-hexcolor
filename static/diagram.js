document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("input-hex");
  const statusBox = document.getElementById("status-box");
  const statusText = document.getElementById("status-text");
  const previewWarna = document.getElementById("preview-warna");
  const traceLog = document.getElementById("trace-log");
  const currentStateText = document.getElementById("current-state-text");

  if (!inputEl) return;

  const KETERANGAN_STATE = {
    q0: "q0 (awal, belum ada karakter dibaca)",
    q1: "q1 (sudah menerima tanda #)",
    q2: "q2 (1 digit hex diterima)",
    q3: "q3 (2 digit hex diterima)",
    q4: "q4 (3 digit hex diterima)",
    q5: "q5 (4 digit hex diterima)",
    q6: "q6 (5 digit hex diterima)",
    q7: "q7 (6 digit hex lengkap - diterima)",
    qtrap: "qtrap (format tidak sesuai - ditolak)",
  };

  function resetDiagram() {
    document.querySelectorAll(".state").forEach((el) => el.classList.remove("active"));
  }

  function highlightState(stateId) {
    resetDiagram();
    const el = document.getElementById("state-" + stateId);
    if (el) el.classList.add("active");
  }

  function jalankanValidasi(nilai) {
    if (nilai === "") {
      statusBox.className = "status-box";
      statusText.textContent = "Belum ada input";
      previewWarna.style.background = "transparent";
      if (traceLog) traceLog.textContent = "q0";
      if (currentStateText) currentStateText.textContent = KETERANGAN_STATE.q0;
      resetDiagram();
      return;
    }

    const hasil = validateHexDFA(nilai);
    highlightState(hasil.finalState);

    if (traceLog) traceLog.textContent = hasil.trace.join(" \u2192 ");
    if (currentStateText) {
      currentStateText.textContent = KETERANGAN_STATE[hasil.finalState] || hasil.finalState;
    }

    if (hasil.valid) {
      statusBox.className = "status-box valid";
      statusText.textContent = "Valid: format kode warna benar";
      previewWarna.style.background = nilai;
    } else {
      statusBox.className = "status-box invalid";
      statusText.textContent = "Tidak valid: format tidak sesuai #RRGGBB";
      previewWarna.style.background = "transparent";
    }
  }

  inputEl.addEventListener("input", () => jalankanValidasi(inputEl.value.trim()));

  document.querySelectorAll(".contoh-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      inputEl.value = chip.dataset.contoh;
      jalankanValidasi(chip.dataset.contoh);
      inputEl.focus();
    });
  });
});