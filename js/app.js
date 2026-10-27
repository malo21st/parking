document
  .getElementById("applyForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    document.getElementById("result").innerHTML =
      "送信しました。";

});
