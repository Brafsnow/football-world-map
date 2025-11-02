# Guide de déploiement - Football World Map 🚀

Votre site est prêt à être déployé ! Voici les différentes options pour le mettre en ligne de façon permanente et gratuite.

## ✅ Préparation terminée

- ✅ Code source optimisé avec 66 clubs
- ✅ Logo du Sporting CP corrigé
- ✅ Build de production créé
- ✅ Dépôt Git initialisé
- ✅ Workflow GitHub Actions configuré
- ✅ Configuration Netlify prête

## 🌐 Option 1 : GitHub Pages (Recommandé)

### Étapes :

1. **Créer un dépôt GitHub**
   - Allez sur https://github.com/new
   - Nom du dépôt : `football-world-map`
   - Visibilité : Public
   - Cliquez sur "Create repository"

2. **Pousser le code**
   ```bash
   cd /home/ubuntu
   git remote add origin https://github.com/VOTRE_USERNAME/football-world-map.git
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Allez dans Settings > Pages
   - Source : GitHub Actions
   - Le workflow se lancera automatiquement
   - Votre site sera disponible à : `https://VOTRE_USERNAME.github.io/football-world-map/`

### ⚠️ Important pour GitHub Pages
Le site sera accessible avec un sous-chemin. Si vous voulez un domaine personnalisé, ajoutez un fichier `CNAME` dans le dossier `dist/public` avec votre domaine.

---

## 🔷 Option 2 : Vercel (Très simple)

### Étapes :

1. **Créer un compte sur Vercel**
   - Allez sur https://vercel.com
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Sélectionnez votre dépôt `football-world-map`
   - Vercel détectera automatiquement la configuration

3. **Configuration du build**
   - Build Command : `pnpm build`
   - Output Directory : `dist/public`
   - Install Command : `pnpm install`

4. **Déployer**
   - Cliquez sur "Deploy"
   - Votre site sera disponible à : `https://football-world-map.vercel.app`

---

## 🟢 Option 3 : Netlify

### Étapes :

1. **Créer un compte sur Netlify**
   - Allez sur https://netlify.com
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "Add new site" > "Import an existing project"
   - Sélectionnez GitHub
   - Choisissez votre dépôt `football-world-map`

3. **Configuration du build**
   - Build command : `pnpm build`
   - Publish directory : `dist/public`
   - Le fichier `netlify.toml` est déjà configuré !

4. **Déployer**
   - Cliquez sur "Deploy site"
   - Votre site sera disponible à : `https://RANDOM-NAME.netlify.app`
   - Vous pouvez changer le nom dans les paramètres

---

## 🎯 Option 4 : Cloudflare Pages

### Étapes :

1. **Créer un compte Cloudflare**
   - Allez sur https://pages.cloudflare.com

2. **Créer un nouveau projet**
   - Connectez votre compte GitHub
   - Sélectionnez le dépôt `football-world-map`

3. **Configuration**
   - Framework preset : None
   - Build command : `pnpm build`
   - Build output directory : `dist/public`

4. **Déployer**
   - Le site sera disponible à : `https://football-world-map.pages.dev`

---

## 📦 Fichiers du projet

Tous les fichiers sont dans `/home/ubuntu/` :

- `client/` - Code source du frontend
- `server/` - Code du serveur (optionnel)
- `dist/` - Build de production (déjà généré)
- `.github/workflows/deploy.yml` - Workflow GitHub Actions
- `netlify.toml` - Configuration Netlify
- `README.md` - Documentation du projet
- `AMELIORATIONS.md` - Liste des améliorations apportées

---

## 🔧 Commandes utiles

```bash
# Installer les dépendances
pnpm install

# Lancer en développement local
pnpm dev

# Construire pour la production
pnpm build

# Prévisualiser le build de production
cd dist/public && python3 -m http.server 8080
```

---

## 🌟 Recommandation

**Je recommande Vercel ou Netlify** car :
- ✅ Déploiement automatique à chaque commit
- ✅ HTTPS gratuit
- ✅ CDN mondial
- ✅ Domaine personnalisé gratuit
- ✅ Interface simple
- ✅ Zéro configuration nécessaire

---

## 📝 Après le déploiement

Une fois déployé, vous pourrez :
- Partager l'URL avec vos utilisateurs
- Ajouter un domaine personnalisé (ex: `football-map.com`)
- Suivre les statistiques de visite
- Mettre à jour le site en poussant sur GitHub

---

## 🆘 Besoin d'aide ?

Si vous avez des questions sur le déploiement, consultez :
- Documentation Vercel : https://vercel.com/docs
- Documentation Netlify : https://docs.netlify.com
- Documentation GitHub Pages : https://docs.github.com/pages

Bon déploiement ! 🚀

