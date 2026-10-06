# Catherine — 50 ans

Premier prototype d’une galerie familiale statique. Le contenu visible est en français. Les emplacements abstraits sont explicitement marqués « à venir » : aucune photographie, histoire ou vidéo personnelle n’a été inventée.

## Ouvrir et modifier

Ouvrir `index.html` directement dans un navigateur, ou servir ce dossier avec un serveur HTTP statique. Aucun paquet, compilation ou service externe n’est nécessaire. Les fichiers du dossier peuvent être hébergés tels quels sur GitHub Pages ou un autre hébergeur statique. `.nojekyll` évite un traitement Jekyll sur GitHub Pages.

- `index.html` : contenu et compositions des salles, dans l’ordre de lecture.
- `styles.css` : palette, typographie, espacements et compositions réutilisables.
- `script.js` : apparition discrète des titres et visionneuse commune.
- `assets/photos/`, `posters/`, `videos/`, `books/` : copies optimisées à ajouter ultérieurement.
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

Renseigner `data-book="assets/books/livre.pdf"` sur la couverture. La visionneuse ouvre le PDF dans un iframe, avec un lien de secours vers un nouvel onglet. Le PDF n’est demandé qu’à l’ouverture. La pagination dépend du lecteur PDF du navigateur ; un lecteur de pages plus élaboré pourra remplacer le contenu de la visionneuse sans refaire la salle. Le navigateur mobile peut préférer le lien de secours. Un PDF externe doit autoriser son affichage dans un iframe. La couverture peut ensuite recevoir l’image réelle du livre.

### Textes et extension du grand hall

Remplacer les blocs `text-placeholder` par les textes fournis. Le poème doit conserver sa place avant tous les médias de la salle I. Les classes `pair`, `triptych`, `voice-feature`, `voice-cluster`, `memory-cluster` et `wide-memory` sont des compositions réutilisables. Pour agrandir la salle IV, ajouter des groupes de souvenirs entrecoupés de grands médias et de textes ; conserver des identifiants et libellés accessibles distincts. Aucun système de données ou générateur n’est requis.

## Interactions et accessibilité

Le défilement reste natif. Chaque passage est un panneau rose plein écran, maintenu brièvement par `position: sticky`, qui recouvre la fin de la salle précédente puis révèle la suivante. Seuls les titres utilisent une animation d’opacité et de déplacement légère. La préférence de réduction des mouvements est respectée. Sans JavaScript, les salles et les titres restent visibles ; les visionneuses nécessitent JavaScript.

Le dialogue natif gère le focus et la touche Échap. La fermeture interrompt le média et restitue le focus au bouton d’origine. Aucun lecteur, PDF ou grand média n’est chargé en arrière-plan.

## Confidentialité

Les directives `noindex, noarchive, nofollow` sont déjà présentes. Elles demandent aux moteurs de ne pas indexer le site, mais ne limitent pas son accès. La confidentialité réelle sera réglée au niveau de l’hébergement. Ne pas activer une publication publique avec des médias privés sans choisir les conditions d’accès. Ne pas mettre de secrets dans le code statique.

## Cadre de la première version

Le brief fourni reste la référence. Cette version montre l’ouverture, la grande photographie de famille, la phrase de sincérité, les quatre salles dans leur ordre et leurs titres exacts, le livre intégré et la conclusion. Les salles I et II montrent les volumes prévus de base, la salle III huit emplacements vidéo et la salle IV un petit échantillon extensible. Le projet ne contient pas les médias source ni les 50 photographies finales. Les futures révisions doivent se faire dans ces mêmes fichiers.
