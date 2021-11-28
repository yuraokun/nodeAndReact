const btn = document.querySelector("#alert");

btn.addEventListener("click", function () {
  alert("Hey this is an alert");
});

const result = document.querySelector(".result");

const fetchProducts = async () => {
  try {
    let data = await axios.get("/api/products");

    const products = data.data.map((product) => {
      return `<h5>${product.name}</5>`;
    });
    console.log(products.join(""));
    result.innerHTML = products.join("");
  } catch (err) {
    console.log(err);
    result.innerHTML = `<div>Can't Fetch Data</div>`;
  }
};

fetchProducts();

//submit form

const btn2 = document.querySelector(".submit-btn");
const input = document.querySelector(".form-input");
const formAlert = document.querySelector(".form-alert");

btn2.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameValue = input.value;
  formAlert.textContent = "";

  try {
    const { data } = await axios.post("/api/products/add", { name: nameValue });
    const h5 = document.createElement("h5");
    h5.textContent = data.name;
    result.appendChild(h5);
  } catch (err) {
    formAlert.textContent = err.response.data.errMsg;
  }
});
