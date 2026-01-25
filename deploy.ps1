# Script de deploiement rapide vers GitHub Pages
# Usage: .\deploy.ps1 "Mon message de commit"

param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)

Write-Host "[DEPLOY] Deploiement vers GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

# Verifier qu'on est dans un repo git
if (-not (Test-Path ".git")) {
    Write-Host "[ERREUR] Ce n'est pas un repository Git!" -ForegroundColor Red
    exit 1
}

# Ajouter tous les fichiers
Write-Host "[1/3] Ajout des fichiers modifies..." -ForegroundColor Yellow
git add .

# Creer le commit
Write-Host "[2/3] Creation du commit: $Message" -ForegroundColor Yellow
git commit -m $Message

# Push vers GitHub
Write-Host "[3/3] Push vers GitHub (branch main)..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "[OK] Deploiement lance! GitHub Actions va construire et publier le site." -ForegroundColor Green
Write-Host "[INFO] Verifiez le statut sur: https://github.com/NathanMJ/my-portfolio/actions" -ForegroundColor Cyan
Write-Host ""
