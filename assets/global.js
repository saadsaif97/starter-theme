class DeleteBtn extends HTMLElement {
  constructor() {
    super();
    this.deleteLink = this.querySelector(".remove-btn");
  }

  connectedCallback() {
    this.deleteLink.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log(this.deleteLink);
      const deleteURL = this.deleteLink.href;
      try {
        await fetch(deleteURL);
        document.dispatchEvent(new CustomEvent("refresh:cart"));
      } catch (error) {
        console.log("delete error:", error);
      }
    });
  }
}

customElements.define("delete-btn", DeleteBtn);

class QuantityBtns extends HTMLElement {
  constructor() {
    super();
    this.plusBtn = this.querySelector(".plus");
    this.minusBtn = this.querySelector(".minus");
    this.qty = this.querySelector("input[type='number']").valueAsNumber;
    this.variantId = this.dataset.variantId;
  }

  connectedCallback() {
    console.log("QTY:", this.qty);

    this.plusBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const updatedQty = this.qty + 1;

      console.log("plus:", updatedQty, this.variantId);

      let updates = {
        [this.variantId]: updatedQty,
      };

      try {
        const res = await fetch(window.Shopify.routes.root + "cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates }),
        });

        document.dispatchEvent(new CustomEvent("refresh:cart"))
      } catch (error) {
        console.log("error plus:", error);
      }
    });

    this.minusBtn.addEventListener("click", (e) => {
      e.preventDefault();

      console.log("minus");
    });
  }
}

customElements.define("quantity-btns", QuantityBtns);
