const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwKb4YRnz8LcKuu2H35Wrwz2A1NV70LAQdE-GKfumvuhYCEYemNArh8I7c5iIZSQ6yH/exec";

document
  .getElementById("applyForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    const submitButton =
      document.getElementById("submitButton");

    // ボタン無効化
    submitButton.disabled = true;

    try {

      document.getElementById("result").innerHTML =
        "送信中です。しばらくお待ちください。";

      const formData = new FormData();

      formData.append("name", form.name.value);
      formData.append("email", form.email.value);
      formData.append("request", form.request.value);
      formData.append("message", form.message.value);

      await fetch(
        GAS_URL,
        {
          method: "POST",
          body: formData
        }
      );

      document.getElementById("result").innerHTML =
        "お申し込みを受け付けました。";

      form.reset();

    } catch (error) {

      console.error(error);

      document.getElementById("result").innerHTML =
        "送信エラーが発生しました。";

      // エラー時は再度押せるようにする
      submitButton.disabled = false;
    }

  });

async function loadParkingStatus() {

  try {

    const response =
      await fetch(GAS_URL);

    const spots =
      await response.json();

    let html = "";

    spots.forEach(spot => {

      let icon = "";
      let className = "";

      switch (spot.status) {

        case "空き":
          icon = "🟢";
          className = "vacant";
          break;

        case "契約済":
          icon = "🔴";
          className = "contract";
          break;

        case "商談中":
          icon = "🟡";
          className = "negotiating";
          break;

        case "利用停止":
          icon = "⚫";
          className = "disabled";
          break;
      }

      html += `
        <div class="parking-card ${className}">
          <strong>区画 ${spot.number}</strong>
          <br>
          ${icon} ${spot.status}
        </div>
      `;
    });

    document.getElementById(
      "parking-status"
    ).innerHTML = html;

  } catch (error) {

    console.error(error);

    document.getElementById(
      "parking-status"
    ).innerHTML =
      "利用状況を取得できませんでした。";
  }
}

loadParkingStatus();
