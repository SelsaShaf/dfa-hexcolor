import csv
import random


def load_dataset(path):
    warna = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            nama = (row.get("Name") or "").strip()
            kode_hex = (row.get("Hex (24 bit)") or "").strip()
            if nama and kode_hex:
                warna.append({"name": nama, "hex": kode_hex})
    return warna


def _korupsi_hex(kode_hex):
    varian = [
        kode_hex[1:],                    # tanda '#' hilang
        kode_hex[:-1],                   # kurang satu digit
        kode_hex + "0",                  # kelebihan satu digit
        kode_hex[:4] + "ZZ",             # ada karakter bukan hex
        kode_hex.replace("#", ""),       # tanpa tanda '#' sama sekali
    ]
    return random.choice(varian)


def build_test_cases(colors, corrupt_ratio=0.15, seed=42):
    """
    Menyusun data uji dari dataset asli: seluruh data asli (label valid)
    ditambah sebagian data yang sengaja "dirusak" formatnya (label invalid),
    supaya pengujian DFA mencakup kasus valid maupun tidak valid.
    """
    random.seed(seed)
    test_cases = []

    for c in colors:
        test_cases.append({"name": c["name"], "input": c["hex"], "expected": True})

    jumlah_korupsi = int(len(colors) * corrupt_ratio)
    sampel = random.sample(colors, jumlah_korupsi)
    for c in sampel:
        korup = _korupsi_hex(c["hex"])
        test_cases.append({
            "name": c["name"] + " (dimodifikasi)",
            "input": korup,
            "expected": False,
        })

    random.shuffle(test_cases)
    return test_cases