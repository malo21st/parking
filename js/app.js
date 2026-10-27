const GAS_URL =
  "https://script.google.com/macros/s/AKfycbznkbLwXpRkjfSmfOJuAgjA9kz7wU8UoSSEErnHmT52qD8yUwOObQxOmGUETy1_9X72/exec";

document
  .getElementById("applyForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      phone: form.email.value,
      plan: form.request.value,
      message: form.message.value
    };

    try {

      const response = await fetch(
        GAS_URL,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result =
        await response.json();

      if (result.success) {

        document
          .getElementById("result")
          .innerHTML =
          "お申し込みを受け付けました。";

        form.reset();

      } else {

        throw new Error(
          result.error
        );

      }

    } catch (error) {

      document
        .getElementById("result")
        .innerHTML =
        "送信エラーが発生しました。";

      console.error(error);
    }

});
