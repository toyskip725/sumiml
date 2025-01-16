function onClickProof (id) {
  const button = document.getElementById(`${id}/button`);
  const content = document.getElementById(`${id}/content`);
  const isOpen = button.innerText === "証明";
    
  button.innerText = isOpen ? "証明を表示" : "証明";
  content.style.display = isOpen ? "none" : "block";
}