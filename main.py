import json

def filter_lr_cards(json_file):
    # Lire le fichier JSON
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Filtrer uniquement les cartes avec "rarity": "LR"
    data["cards"] = [card for card in data["cards"] if card.get("rarity") == "LR"]

    # Écrire les modifications dans le fichier JSON
    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

    print(f"Les cartes non 'LR' ont été supprimées de {json_file}")

# 📌 Exemple d'utilisation
json_file_path = "cards.json"  # Assure-toi que ce fichier existe
filter_lr_cards(json_file_path)
