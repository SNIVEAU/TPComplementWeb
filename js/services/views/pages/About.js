export default class About {
    static async render() {
        return `
            <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
            <h1>Bienvenue sur mon Wiki Dokkan</h1>
            <p>Découvrez toutes les informations, astuces et actualités sur le jeu Dragon Ball Z Dokkan Battle.</p>
            <img src="https://dbz-dokkanbattle.com/img/ui/logo.png" alt="Dokkan Battle" style="max-width: 100%; height: auto; margin-top: 20px;">
            <p style="margin-top: 20px;">Explorez les différentes sections pour en savoir plus sur les personnages</p>
            </div>
        `;
    }
}