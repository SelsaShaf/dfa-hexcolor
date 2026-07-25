document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-uji");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Memproses...";

    try {
      const res = await fetch("/api/uji-dataset");
      const data = await res.json();

      document.getElementById("hasil-uji").style.display = "block";
      document.getElementById("stat-total").textContent = data.total;
      document.getElementById("stat-valid").textContent = data.valid;
      document.getElementById("stat-invalid").textContent = data.invalid;

      const ctx = document.getElementById("chart-hasil").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Valid", "Tidak Valid"],
          datasets: [{
            label: "Jumlah data",
            data: [data.valid, data.invalid],
            backgroundColor: ["#2f6f4f", "#a3423e"],
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    } catch (err) {
      alert("Gagal memuat hasil pengujian.");
    } finally {
      btn.disabled = true;
      btn.textContent = "Pengujian selesai";
    }
  });
});
