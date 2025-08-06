class DeleteBtn extends HTMLElement {
  constructor() {
    super();
    this.deleteLink = this.querySelector(".remove-btn");
  }

  connectedCallback() {
    console.log("added to DOM");

    this.deleteLink.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log(this.deleteLink)
      const deleteURL = this.deleteLink.href;
      try {
        await fetch(deleteURL);
        document.dispatchEvent(new CustomEvent("refresh:cart"));
      } catch (error) {
        console.log("delete error:", error)
      }
    });
  }
}

customElements.define("delete-btn", DeleteBtn);
