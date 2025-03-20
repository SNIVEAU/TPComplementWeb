
export default function addFavoris(card) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    if (!favoris.some(fav => fav.id === card.id)) {
        favoris.push(card);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        alert(`${card.name} a été ajouté aux favoris !`);
    } else {
        alert(`${card.name} est déjà dans les favoris.`);
    }
    console.log(localStorage.getItem("favoris"));
}