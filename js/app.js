const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwKb4YRnz8LcKuu2H35Wrwz2A1NV70LAQdE-GKfumvuhYCEYemNArh8I7c5iIZSQ6yH/exec";

document
  .getElementById("applyForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    try {

      document.getElementById("result").innerHTML =
        "送信中...";

      const formData = new FormData();

      formData.append("name", form.name.value);
      formData.append("email", form.email.value);
      formData.append("request", form.request.value);
      formData.append("message", form.message.value);

      const response = await fetch(
        GAS_URL,
        {
          method: "POST",
          body: formData
        }
      );

      const text = await response.text();

      console.log(text);

      document.getElementById("result").innerHTML =
        "お申し込みを受け付けました。";

      form.reset();

    } catch (error) {

      console.error(error);

      document.getElementById("result").innerHTML =
        "送信エラー: " + error.message;
    }

  });
