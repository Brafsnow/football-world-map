# Guide de Déploiement sur GitHub Pages

## 🚀 Déploiement Automatique avec GitHub Actions

Votre site est configuré pour se déployer automatiquement sur GitHub Pages à chaque push sur la branche `main`.

---

## 📋 Étapes de Déploiement

### 1. Créer un Repository GitHub

1. Allez sur https://github.com
2. Connectez-vous à votre compte
3. Cliquez sur le bouton **"New"** (ou **"+"** en haut à droite → **"New repository"**)
4. Nommez votre repository : `football-world-map` (ou le nom de votre choix)
5. Choisissez **Public** (obligatoire pour GitHub Pages gratuit)
6. **NE cochez PAS** "Initialize this repository with a README"
7. Cliquez sur **"Create repository"**

### 2. Uploader le Code

#### Option A : Via l'Interface Web (Plus Simple)

1. Sur la page de votre nouveau repository, cliquez sur **"uploading an existing file"**
2. Décompressez le fichier `football-world-map-github.zip` sur votre ordinateur
3. Glissez-déposez **TOUS les fichiers et dossiers** dans la zone d'upload
4. Ajoutez un message de commit : "Initial commit"
5. Cliquez sur **"Commit changes"**

#### Option B : Via Git (Ligne de commande)

```bash
# Décompressez le fichier ZIP
unzip football-world-map-github.zip -d football-world-map
cd football-world-map

# Initialisez Git
git init
git add .
git commit -m "Initial commit"

# Ajoutez le remote (remplacez USERNAME et REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Poussez le code
git branch -M main
git push -u origin main
```

### 3. Activer GitHub Pages

1. Allez dans les **Settings** de votre repository
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous **"Source"**, sélectionnez :
   - Source : **GitHub Actions**
4. Cliquez sur **"Save"**

### 4. Vérifier le Déploiement

1. Allez dans l'onglet **"Actions"** de votre repository
2. Vous devriez voir un workflow **"Deploy to GitHub Pages"** en cours d'exécution
3. Attendez que le workflow se termine (environ 2-3 minutes)
4. Une fois terminé, retournez dans **Settings → Pages**
5. Vous verrez l'URL de votre site : `https://USERNAME.github.io/REPO_NAME/`

---

## 🌐 URL de Votre Site

Une fois déployé, votre site sera accessible à :

```
https://VOTRE_USERNAME.github.io/football-world-map/
```

Par exemple, si votre username GitHub est `johndoe` :
```
https://johndoe.github.io/football-world-map/
```

---

## 🔄 Mises à Jour Automatiques

À chaque fois que vous modifiez le code et que vous faites un `git push` sur la branche `main`, le site sera automatiquement reconstruit et redéployé !

---

## 🎨 Personnaliser le Domaine (Optionnel)

Si vous avez votre propre nom de domaine :

1. Allez dans **Settings → Pages**
2. Sous **"Custom domain"**, entrez votre domaine : `www.votresite.com`
3. Configurez les DNS de votre domaine :
   - Type : `CNAME`
   - Name : `www`
   - Value : `USERNAME.github.io`

---

## ❓ Problèmes Courants

### Le site ne s'affiche pas

**Solution :**
1. Vérifiez que le workflow dans **Actions** s'est terminé avec succès
2. Attendez 5-10 minutes après le premier déploiement
3. Videz le cache de votre navigateur (Ctrl+F5)

### Erreur 404

**Solution :**
1. Vérifiez que vous avez bien uploadé **tous les fichiers**
2. Vérifiez que la branche est bien `main` (pas `master`)
3. Vérifiez que GitHub Pages est activé dans Settings

### Le workflow échoue

**Solution :**
1. Allez dans **Actions** et cliquez sur le workflow qui a échoué
2. Lisez les logs d'erreur
3. Vérifiez que tous les fichiers nécessaires sont présents :
   - `package.json`
   - `pnpm-lock.yaml`
   - `.github/workflows/deploy.yml`

---

## 📊 Statistiques et Analytics

Pour suivre le trafic de votre site, vous pouvez :

1. **Google Analytics** : Ajoutez votre code de tracking dans `client/index.html`
2. **GitHub Insights** : Allez dans **Insights → Traffic** pour voir les visiteurs

---

## 💡 Conseils

1. **Testez localement** avant de pousser : `pnpm dev`
2. **Construisez avant de pousser** : `pnpm build` pour vérifier qu'il n'y a pas d'erreurs
3. **Utilisez des branches** pour les nouvelles fonctionnalités
4. **Documentez vos changements** dans les messages de commit

---

## 🆘 Besoin d'Aide ?

- Documentation GitHub Pages : https://docs.github.com/pages
- Documentation GitHub Actions : https://docs.github.com/actions
- Community Forum : https://github.community

---

**Bon déploiement ! 🚀**

