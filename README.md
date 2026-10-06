# Catherine — 50 ans

Galerie familiale statique en cours de création. L’accueil et les salles I, II et III contiennent les médias et textes fournis par la famille. La salle IV conserve leurs emplacements « à venir ». Le contenu visible est en français.

## Voir le site

Le dépôt GitHub et la demande de fusion affichent le code, pas une version hébergée du site. Pour une visite locale durable, extraire entièrement `catherine-gallery.zip`, puis ouvrir le dossier `catherine-gallery` et double-cliquer sur `index.html`. Si Windows ouvre un éditeur, faire **clic droit → Ouvrir avec → Microsoft Edge** (ou Chrome/Firefox). Garder le dossier `assets` à côté du fichier : ne pas ouvrir `index.html` depuis l’intérieur du ZIP. Les photographies, vidéos et sept pages du livre se consultent ainsi sans serveur ni installation.

Le lien `http://127.0.0.1:8766/` utilisé pendant les vérifications ne fonctionne que lorsque le serveur de prévisualisation est en cours d’exécution. Il ne constitue pas une adresse publiée permanente.

## Où ajouter mes fichiers ?

Les dossiers `assets` se trouvent à côté de `index.html` dans le projet :

| Contenu | Dossier | Exemple actuel |
| --- | --- | --- |
| Photographies optimisées | `assets/photos/` | `famille-coucher-soleil.webp` |
| Images d’aperçu des vidéos | `assets/posters/` | `message-max.webp` |
| Vidéos optimisées | `assets/videos/` | `message-max.mp4` |
| Livre PDF | `assets/books/` | `livre-50-ans-miteux.pdf` |

Sur votre ordinateur : copier les fichiers destinés au site dans ces dossiers, puis remplacer leur chemin dans `index.html` (exemples ci-dessous). Ajouter un fichier ne l’affiche pas automatiquement : il faut aussi le relier à une photographie ou un bouton vidéo de la page. Utiliser des noms simples, sans espaces ni accents, et conserver leur orthographe exacte.

Sur GitHub : ouvrir le dossier voulu sur la branche de travail, choisir **Add file → Upload files**, sélectionner les copies optimisées puis enregistrer les fichiers. Modifier ensuite `index.html` sur la même branche pour utiliser leurs chemins relatifs. Une demande de fusion permet de revoir le résultat avant de l’intégrer à `main`. Le dossier local et le dépôt GitHub sont des copies distinctes ; un ajout local doit être envoyé au dépôt pour apparaître dans une version hébergée.

Vous pouvez aussi continuer à joindre les originaux dans ce chat avec les indications de salle et d’ordre ; je préparerai leurs copies et les intégrerai au projet existant. Conserver les originaux dans votre dossier `50ans Maman`, séparément du dépôt.

La révision de l’accueil utilise `Family Photo.jpeg`. La salle I présente le poème exact de son Doudou avec `Mom and Dad Photo.JPG` à droite, puis les vidéos de danse, de Max et de Titou, le collage des six photographies restantes et `Family Photo 2.jpeg` en conclusion. La salle II présente Margny et Filipaz en vidéo à gauche, leur photographie à droite, puis le livre à gauche et AnneK en vidéo à droite ; elle se termine par le texte exact de Maryvonne. La salle III s’ouvre sur Bourron sans légende visible, puis présente séparément le texte de Belle Maman et Beau Papa transcrit du PDF et vérifié visuellement. Les parents Mahou précèdent leurs enfants, suivis de six autres vidéos par paires espacées et de la photographie de la famille Cutier. Les WebP respectent l’orientation et le cadrage complet ; trois tailles permettent au navigateur de choisir une copie adaptée. Les MP4 H.264/AAC et leurs affiches sont préparés à partir des originaux sans les modifier. La compression et le redimensionnement sont techniques ; aucune retouche esthétique, aucun montage ni coupe n’a été appliqué.

## Ouvrir et modifier

Ouvrir `index.html` directement dans un navigateur, ou servir ce dossier avec un serveur HTTP statique. Aucun paquet, compilation ou service externe n’est nécessaire. Les fichiers du dossier peuvent être hébergés tels quels sur GitHub Pages ou un autre hébergeur statique. `.nojekyll` évite un traitement Jekyll sur GitHub Pages.

- `index.html` : contenu et compositions des salles, dans l’ordre de lecture.
- `styles.css` : palette, typographie, espacements et compositions réutilisables.
- `script.js` : apparition discrète des titres et visionneuse commune.
- `assets/photos/`, `posters/`, `videos/`, `books/` : copies optimisées ; les médias de l’accueil et des salles I à III sont déjà inclus.
- `assets/paper.svg` : texture abstraite légère, sans photographie personnelle.

La maquette utilise des polices système (Georgia et Segoe UI), sans requête vers un fournisseur de polices. Elle fonctionne aussi à partir d’un sous-dossier, grâce aux chemins relatifs.

## Ajouter les médias

### Photographie

Remplacer le contenu d’un bouton `data-photo` par une image et conserver le bouton pour l’ouverture en grand :

```html
<button class="photo-placeholder" data-photo data-full="assets/photos/exemple-grand.webp" aria-label="Ouvrir la photographie">
  <img src="assets/photos/exemple.webp" alt="Description réelle de la photographie" width="900" height="1200" loading="lazy" decoding="async">
</button>
```

Adapter le format de la composition (`portrait`, `landscape`) au média, ainsi que sa description et ses dimensions. Utiliser `object-fit: contain` si le cadrage complet doit être préservé. Pour la photographie de famille en tête, remplacer le div d’emplacement par un `img` responsive avec ses dimensions réelles, sans chargement paresseux pour ce premier grand média. Ajouter éventuellement `srcset` et `sizes` pour les copies adaptées aux écrans.

### Vidéo

Renseigner `data-video` et `data-poster` sur le bouton existant. Les chemins locaux et les URL HTTPS directes vers un fichier vidéo sont possibles. Une URL de page YouTube/Vimeo ne constitue pas une source vidéo directe.

```html
<button class="video-placeholder" data-video="assets/videos/exemple.mp4" data-poster="assets/posters/exemple.webp" data-captions="assets/videos/exemple.fr.vtt" aria-label="Ouvrir le message vidéo">
  <span class="play" aria-hidden="true">▷</span>
  <span>Un message pour toi</span>
</button>
```

Remplacer éventuellement le fond du bouton par une image d’affiche (`img` avec `loading="lazy"`), en conservant le libellé et le contrôle de lecture. Le lecteur reçoit sa source uniquement après un clic, utilise `preload="none"`, ne joue pas automatiquement et est déchargé à la fermeture. Le poster et les sous-titres français sont facultatifs. Les vidéos originales restent conservées ailleurs ; privilégier des copies compressées et des affiches légères. Pour un hébergement externe, vérifier le type MIME, l’accès et la prise en charge des requêtes partielles.

### Livre

Le livre de la salle II utilise une copie intacte du PDF `assets/books/livre-50-ans-miteux.pdf` et sept pages rendues en WebP (`miteux-page-1.webp` à `miteux-page-7.webp`). La couverture est la première page. `data-pages="assets/books/miteux-page-"` et `data-page-count="7"` activent le lecteur intégré : pages précédente/suivante, flèches du clavier, agrandissement avec défilement et enregistrement facultatif du PDF. La page sélectionnée est chargée à la demande. Le lecteur reste dans le dialogue et dans le même onglet ; il fonctionne aussi depuis le dossier local et sur téléphone, sans bibliothèque PDF externe.

Pour un autre livre, préparer les pages correspondantes et remplacer ce préfixe, leur nombre et le chemin PDF. Une couverture portant seulement `data-book="assets/books/livre.pdf"` conserve la solution simple par iframe et son lien de secours ; cette solution dépend alors du lecteur PDF du navigateur.

### Textes et extension du grand hall

Remplacer les blocs `text-placeholder` par les textes fournis. Le poème doit conserver sa place avant tous les médias de la salle I. Les classes `pair`, `triptych`, `voice-feature`, `voice-cluster`, `memory-cluster` et `wide-memory` sont des compositions réutilisables. Pour agrandir la salle IV, ajouter des groupes de souvenirs entrecoupés de grands médias et de textes ; conserver des identifiants et libellés accessibles distincts. Aucun système de données ou générateur n’est requis.

## Interactions et accessibilité

Le défilement reste natif. Chaque passage est un panneau rose plein écran, maintenu brièvement par `position: sticky`, qui remplace visuellement la salle précédente puis révèle la suivante. Les sections restent dans le flux normal, avec un espace après chaque contenu : le panneau ne masque ni la phrase de sincérité, ni un texte, ni une photographie. Seuls les titres utilisent une animation d’opacité et de déplacement légère. La préférence de réduction des mouvements est respectée. Sans JavaScript, les salles et les titres restent visibles ; les visionneuses nécessitent JavaScript.

Le dialogue natif gère le focus et la touche Échap. La fermeture interrompt le média et restitue le focus au bouton d’origine. Aucun lecteur, PDF ou grand média n’est chargé en arrière-plan.

## Confidentialité

Les directives `noindex, noarchive, nofollow` sont déjà présentes. Elles demandent aux moteurs de ne pas indexer le site, mais ne limitent pas son accès. La confidentialité réelle sera réglée au niveau de l’hébergement. Ne pas activer une publication publique avec des médias privés sans choisir les conditions d’accès. Ne pas mettre de secrets dans le code statique.

## Cadre de la première version

Le brief fourni reste la référence. Cette version montre l’ouverture, la grande photographie de famille, la phrase de sincérité, les quatre salles dans leur ordre et leurs titres exacts, le livre intégré et la conclusion. Les salles I à III contiennent les médias reçus ; la salle IV conserve un petit échantillon extensible. Le projet ne contient pas les médias source ni les 50 photographies finales. Les futures révisions doivent se faire dans ces mêmes fichiers.
