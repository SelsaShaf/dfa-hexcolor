from flask import Flask, render_template, jsonify, request
from dfa import HexColorDFA
from data_loader import load_dataset, build_test_cases

app = Flask(__name__)

DATASET_PATH = "data/color_names.csv"
dfa = HexColorDFA()
colors = load_dataset(DATASET_PATH)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/dataset")
def dataset():
    preview = colors[:50]
    return render_template("dataset.html", preview=preview, total=len(colors))


@app.route("/cara-pakai")
def cara_pakai():
    return render_template("cara_pakai.html")


@app.route("/tentang")
def tentang():
    return render_template("tentang.html")


@app.route("/api/validate", methods=["POST"])
def api_validate():
    data = request.get_json(silent=True) or {}
    kode = data.get("kode", "")
    hasil = dfa.validate(kode)
    return jsonify(hasil)


@app.route("/api/uji-dataset")
def api_uji_dataset():
    test_cases = build_test_cases(colors)
    detail = []
    jumlah_valid = 0
    jumlah_invalid = 0

    for tc in test_cases:
        hasil = dfa.validate(tc["input"])
        if hasil["valid"]:
            jumlah_valid += 1
        else:
            jumlah_invalid += 1
        detail.append({
            "nama": tc["name"],
            "input": tc["input"],
            "valid": hasil["valid"],
            "diharapkan_valid": tc["expected"],
            "sesuai_prediksi": hasil["valid"] == tc["expected"],
        })

    return jsonify({
        "total": len(test_cases),
        "valid": jumlah_valid,
        "invalid": jumlah_invalid,
        "detail": detail[:100],  # dibatasi biar respons tidak terlalu besar
    })


if __name__ == "__main__":
    app.run(debug=True)