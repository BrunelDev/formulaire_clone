import { DevisRecord } from "./calculator";

export default function generateDevisPdf(
  devis: DevisRecord[],
  client: { nom: string; prenom: string; email: string; tel: string },
  reference?: string,
  numDevis?: string,
  logoBase64?: string
) {
  // Créer le data URI pour le logo si fourni
  const logoDataUri = logoBase64 ? `data:image/jpeg;base64,${logoBase64}` : "";
  // Calculer les totaux
  const totalHT = devis.reduce((sum, item) => sum + (item.totalht || 0), 0);
  const totalTVA = totalHT * 0.2;
  const totalTTC = totalHT + totalTVA;

  // Formatter les nombres
  const formatPrice = (price: number) => price.toFixed(2);

  // Date du jour
  const dateDevis = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Générer le numéro de devis automatiquement si non fourni
  const devisNum = numDevis || `${Date.now()}`;
  const refDevis = reference || `DEVIS-${new Date().getFullYear()}`;

  // Générer les lignes du tableau dynamiquement
  const devisRows = devis
    .map(
      (item) => `
    <tr>
      <td>${item.designation}</td>
      <td class="text-center">${item.quantity || 1}</td>
      <td class="text-right">${formatPrice(item.pu || 0)} €</td>
      <td class="text-center">${item.tva || 20}%</td>
      <td class="text-right">${formatPrice(item.totalht || 0)} €</td>
    </tr>
  `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devis - Mes Plans de Permis</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Figtree', Arial, sans-serif;
            font-size: 11pt;
            color: #333;
            padding: 40px;
            line-height: 1.4;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #0066cc;
        }
        
        .company-info {
            flex: 1;
        }
        
        .company-name {
            font-size: 16pt;
            font-weight: bold;
            color: #0066cc;
            margin-bottom: 10px;
        }
        
        .company-details {
            font-size: 9pt;
            line-height: 1.6;
        }
        
        .reference-box {
            text-align: right;
            padding: 15px;
        }
        
        .reference-box div {
            margin-bottom: 5px;
            font-size: 10pt;
        }
        
        .client-info {
            margin-bottom: 30px;
            padding: 15px;
            background: #f9f9f9;
            border-left: 3px solid #0066cc;
        }
        
        .client-info h3 {
            color: #0066cc;
            margin-bottom: 10px;
            font-size: 12pt;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        thead {
            background: #0066cc;
            color: white;
        }
        
        th {
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            font-size: 10pt;
            border-right: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        th:last-child {
            border-right: none;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-size: 10pt;
        }
        
        td:last-child {
            border-right: none;
        }
        
        tbody tr:hover {
            background: #f5f5f5;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .total-section {
            margin-left: auto;
            width: 400px;
            background: #f8f9fa;
            padding: 25px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            font-size: 11pt;
            font-weight: 700;

        }
        
        .total-row:not(:last-child) {
            border-bottom: 1px solid #e0e0e0;
        }
        
        .total-row span:first-child {
            color: #333;
        }
        
        .total-row span:last-child {
            color: #1a1a1a;
        }
        
        .total-row.final {
            background: transparent;
            padding: 15px 0 0 0;
            margin-top: 10px;
            border-bottom: none;
        }
        
        .total-row.final span:first-child {
            font-size: 13pt;
            font-weight: 700;
            color: #0066cc;
        }
        
        .total-row.final span:last-child {
            font-size: 14pt;
            font-weight: 700;
            color: #0066cc;
        }
        
        .payment-terms {
            margin-left: 12px;
        }
        
       
        
        .payment-terms h3 {
            color: #333;
            font-size: 11pt;
        }
        
        .signature-section {
            margin-top: 40px;
            text-align: right;
        }
        
        .signature-box {
            display: inline-block;
            border: 1px solid #333;
            padding: 15px 30px;
            margin-top: 10px;
        }
        
        @media print {
            body {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- En-tête -->
        <div class="header">
            <div class="company-info">
                ${
                  logoDataUri
                    ? `<img src="${logoDataUri}" style="width:150px; height:150px; margin-bottom: 10px;" alt="logo">`
                    : ""
                }
                <div class="company-name">MES PLANS DE PERMIS</div>
                <div class="company-details">
                    34C RUE LATAPIE<br>
                    33650 LA BRÈDE<br>
                    FRANCE<br><br>
                    Port. : +33 6 56 74 54 70<br>
                    Email : contact@mesplansdepermis.fr<br>
                    Web : www.mesplansdepermis.fr<br><br>
                    N° TVA Intracommunautaire: FR01937970176<br>
                    N° SIRET: 93797017600015<br>
                    Code NAF: 71.12B<br>
                    RCS: 937 970 176 R.C.S. Bordeaux<br>
                    Capital: 500 €
                </div>
            </div>
            
            <div class="reference-box">
                <div><strong>${refDevis}</strong></div>
                <div><strong>N° ${devisNum}</strong></div>
                <div>${dateDevis}</div>
            </div>
        </div>
        
        <!-- Informations client -->
        <div class="client-info">
            <h3>Client</h3>
            <strong>${client.nom} ${client.prenom}</strong><br>
            Port. : ${client.tel}<br>
            Email : ${client.email}
        </div>
        
        <!-- Tableau des prestations -->
        <table>
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th class="text-center">Quantité</th>
                    <th class="text-right">PU</th>
                    <th class="text-center">TVA</th>
                    <th class="text-right">Montant HT</th>
                </tr>
            </thead>
            <tbody>
                ${devisRows}
            </tbody>
        </table>
        
        <!-- Section totaux -->
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
         <!-- Conditions de paiement -->
        <div class="payment-terms">
            <h3>Conditions de paiement :</h3>
            <p>• 100,00 % soit <strong>${formatPrice(
              totalTTC
            )} €</strong> : Paiement après réception de l'Avant-Projet Sommaire.</p>
        </div>
        <div class="total-section">
            <div class="total-row">
                <span>Total HT</span>
                <span>${formatPrice(totalHT)} €</span>
            </div>
            <div class="total-row">
                <span>TVA (20%)</span>
                <span>${formatPrice(totalTVA)} €</span>
            </div>
            <div class="total-row final">
                <span>Total TTC</span>
                <span>${formatPrice(totalTTC)} €</span>
            </div>
        </div>
        </div>
        
       
        
        <!-- Signature -->
        <div class="signature-section">
            <p><strong>Bon pour Accord</strong></p>
            <div class="signature-box">
                Signature
            </div>
        </div>
    </div>
</body>
</html>`;
}
