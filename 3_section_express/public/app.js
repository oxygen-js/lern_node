const toCurrency = price => {
    return new Intl.NumberFormat("ru-Ru", {
        currency: "rub",
        style: "currency"
    }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector(".card-block");
if ($card) {
    $card.addEventListener("click", event => {
        if (event.target.classList.contains("js-remove")) {
            const id = event.target.dataset.id;
            
            fetch("/card/remove/" + id, { 
                method: "delete"
             })
             .then(res => res.json())
             .then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(x => {
                        return `
                            <tr>
                                <td>${x.title}</td>
                                <td>${x.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${x.id}">X</button>
                                </td>
                            </tr>
                        `
                    }).join("");

                    $card.querySelector("tbody").innerHTML = html;
                    $card.querySelector(".price").textContent = toCurrency(card.all_price);
                } else {
                    $card.innerHTML = "<p>Card is empty</p>"
                }
             });
        }
    });
}
