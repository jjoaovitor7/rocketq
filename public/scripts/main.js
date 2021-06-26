import Modal from "./modal.js";
const modal = Modal();
const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

const checkButtons = document.querySelectorAll(".actions a.check");
checkButtons.forEach(function(button) {
    button.addEventListener("click", handleClick);
});

const deleteButton = document.querySelectorAll(".actions a.delete");
deleteButton.forEach(function(button) {
    button.addEventListener("click", function(event) {
        handleClick(event, false);
    });
});

function handleClick(event, check = true) {
    event.preventDefault();
    // se check for true insira "Marcar como lida", caso contrário insira "Excluir"
    const text = check ? "Marcar como lida" : "Excluir";
    // se check for true insira "check", caso contrário insira "delete"
    const slug = check ? "check" : "delete";
    const roomId = document.querySelector("#room_id").dataset.id;
    const questionId = event.target.dataset.id;

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
    check
        ?
        modalButton.classList.remove("red") :
        modalButton.classList.add("red");

    modal.open();
}