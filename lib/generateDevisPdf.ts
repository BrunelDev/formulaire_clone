import { DevisRecord } from "./calculator";

export default function generateDevisPdf(
  devis: DevisRecord[],
  client: { nom: string; prenom: string; email: string; tel: string },
  reference?: string,
  numDevis?: string,
  logoBase64?: string
) {
  const logoDataUri = logoBase64
    ? `data:image/jpeg;base64,${logoBase64}`
    : "https://formulaire.mesplansdepermis.fr/images/logo.jpg";
  const totalHT = devis.reduce((sum, item) => sum + (item.totalht || 0), 0);
  const totalTVA = totalHT * 0.2;
  const totalTTC = totalHT + totalTVA;

  const formatPrice = (price: number) => price.toFixed(2);

  const dateDevis = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const devisNum = numDevis || `${Date.now()}`;
  const refDevis =
    client.nom.substring(0, 1) +
    client.prenom.substring(0, 1) +
    "#" +
    dateDevis.replaceAll("/", "");

  const devisRows = devis
    .map((item) => {
      if (
        item.designation.includes(
          `Forfait réalisation de plan à l'unité<br>
    Pièces envoyés:`
        )
      ) {
        return `
    <tr>
      <td>${item.designation}</td>
      <td class="text-center">1${item.quantity! > 1 ? "ft" : ""}</td>
      <td class="text-right">${formatPrice(item.totalht || 0)} €</td>
      <td class="text-center">${item.tva || 20}%</td>
      <td class="text-right">${formatPrice(item.totalht || 0)} €</td>
    </tr>`;
      } else {
        return `
    <tr>
      <td>${item.designation}</td>
      <td class="text-center">${item.quantity || 1}</td>
      <td class="text-right">${formatPrice(item.pu || 0)} €</td>
      <td class="text-center">${item.tva || 20}%</td>
      <td class="text-right">${formatPrice(item.totalht || 0)} €</td>
    </tr>`;
      }
    })
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
            color : #021327;
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
            border-bottom: 2px solid #042347;
        }
        
        .company-info {
            flex: 1;
        }
        
        .company-name {
            font-size: 16pt;
            font-weight: bold;
            color: #042347;
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
        }
        
        .client-info h3 {
            color: #042347;
            margin-bottom: 10px;
            font-size: 12pt;
        }
        
        .devis-info {
            margin-bottom: 30px;
            padding: 15px;
        }
        
        .devis-info div {
            margin-bottom: 5px;
            font-size: 10pt;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        thead {
            background: #042347;
            color: white;
        }
        
        th {
            padding: 0 8px;
            text-align: left;
            font-weight: bold;
            font-size: 10pt;
            border-left: 1px solid #ddd;
        }
            
        th:first-child {
            width: 40%;
        }
        
        th:nth-child(2) {
            width: 12%;
        }
        
        th:nth-child(3) {
            width: 18%;
        }
        
        th:nth-child(4) {
            width: 12%;
        }
        
        th:nth-child(5) {
            width: 18%;
        }
            
        th:last-child {
            border-right: 1px solid #ddd;
        }
        
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;

            font-size: 10pt;
        }
        
        td:last-child {
            border-right: 1px solid #ddd;
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
        
        .bottom-section {
            border: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .payment-terms {
            flex: 1;
            margin: 0 20px;
        }
        
        .payment-terms h3 {
            color: #333;
            font-size: 11pt;
            margin-bottom: 10px;
        }
        
        .payment-terms p {
            font-size: 10pt;
            line-height: 1.5;
        }
        
        .total-section {
            width: 350px;
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
            color: #042347;
        }
        
        .total-row.final span:last-child {
            font-size: 14pt;
            font-weight: 700;
            color: #042347;
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
            .conditions-generales {
    page-break-before: always;
    margin-top: 40px;
    font-size: 8pt;
    line-height: 1.3;
  }

  .conditions-generales h2 {
    text-align: center;
    color: #d95200;
    text-transform: uppercase;
    font-size: 11pt;
    margin-bottom: 12px;
  }

  .conditions-generales h3 {
    color: #d95200;
    font-size: 9pt;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .conditions-generales p, .conditions-generales ul {
    color: #333;
    margin-bottom: 6px;
    text-align: justify;
  }

  .conditions-generales ul {
    margin-left: 15px;
  }
  
  .conditions-generales ul li {
    margin-bottom: 3px;
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
                    ? `<img src="${logoDataUri}" style="width:222px; height:61px; margin-bottom: 10px;" alt="logo">`
                    : ""
                }
                <div class="company-details">
                    <strong>MES PLANS DE PERMIS</strong><br>
                    34C RUE LATAPIE<br>
                    33650 LA BRÈDE<br>
                    FRANCE<br>
                    Port. : +33 6 56 74 54 70<br>
                    <span style="text-decoration: underline;">contact@mesplansdepermis.fr</span><br>
                    <span style="text-decoration: underline;">www.mesplansdepermis.fr</span><br>
                    <strong>N° TVA Intracommunautaire:</strong> FR01937970176<br>
                    <strong>N° SIRET:</strong> 93797017600015<br>
                    <strong>Code NAF:</strong> 71.12B<br>
                    <strong>RCS:</strong> 937 970 176 R.C.S. Bordeaux<br>
                    <strong>Capital:</strong> 500 €
                </div>
            </div>
            
            <div class="reference-box">
            <div style="margin-bottom:60px;"><strong >${refDevis}</strong></div>

                <!-- Informations client -->
                <div class="client-info">
                    <strong>${client.nom} ${client.prenom}</strong><br>
                    Port. : ${client.tel}<br>
                    Email : ${client.email}
                </div>
            </div>
        </div>
        
        <!-- Informations devis -->
        <div class="devis-info">
            <div><strong>DEVIS N° ${devisNum}</strong></div>
            <div>${dateDevis}</div>
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
        
        <!-- Section totaux et paiement -->
        <div class="bottom-section">
            <!-- Conditions de paiement -->
            <div class="payment-terms">
            <p><strong>Bon pour Accord</strong></p>

                <h3>Conditions de paiement :</h3>
                <p>• 100,00 % soit <strong>${parseFloat(
                  formatPrice(totalTTC)
                ).toFixed(
                  0
                )} €</strong> : Paiement après réception de l'Avant-Projet Sommaire.</p>
            </div>
            
            <!-- Totaux -->
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
                    <span>${parseFloat(formatPrice(totalTTC)).toFixed(
                      0
                    )} €</span>
                </div>
            </div>
        </div>
        
        <!-- Signature -->
        <div class="signature-section">
            <div class="signature-box">
                Signature
            </div>
        </div>
        <section class="conditions-generales">
      <h2>Conditions générales de vente</h2>

      <h3>Objet</h3>
      <p>Les présentes conditions générales ont pour objet de définir les droits et obligations de Mes Plans de Permis et de ses clients dans le cadre de la réalisation de prestations de conception de plans nécessaires aux demandes de permis de construire ou déclarations préalables.</p>

      <h3>Acceptation du devis</h3>
      <p>La signature du devis vaut bon de commande ferme et définitif. Toute demande supplémentaire ou modification hors du cadre prévu au devis initial fera l'objet d'une facturation complémentaire. En signant un devis émis par Mes Plans de Permis, le client reconnaît avoir pris connaissance des présentes Conditions Générales de Vente et les accepter sans réserve.</p>

      <h3>Paiement</h3>
      <p>Aucun acompte n'est demandé. En conséquence, le client s'engage à régler l'intégralité du montant indiqué sur le devis après réception de l'Avant-Projet Sommaire (APS). L'APS transmis au client sera protégé par un filigrane de sécurité. Les plans définitifs, sans filigrane, seront envoyés uniquement après règlement complet du montant prévu au devis.</p>

      <h3>Responsabilités</h3>
      <p>Mes Plans de Permis fournit une assistance et un accompagnement dans la conception de plans et de dossiers graphiques. La société ne peut en aucun cas être tenue responsable :</p>
      <ul>
        <li>du refus ou de l'invalidation d'un dossier par l'administration compétente (Mairie, DDT, etc.),</li>
        <li>des évolutions réglementaires ou contraintes liées au Plan Local d'Urbanisme (PLU) ou autres règles d'urbanisme,</li>
        <li>de l'abandon, de la modification ou de la non-réalisation des travaux par le client.</li>
      </ul>

      <h3>Responsabilité et Vérification du P.L.U.</h3>
      <p>Lors de la commande, le client peut choisir entre deux formules :</p>

      <p><strong>1. Sans option "Vérification du P.L.U."</strong></p>
      <p>Dans ce cas, Mes Plans de Permis ne pourra en aucun cas être tenu responsable en cas de refus du permis de construire ou de la déclaration préalable de travaux par la mairie ou tout autre organisme compétent. Le client reste seul responsable de la conformité de son projet avec les règles d'urbanisme locales, notamment celles définies par le Plan Local d'Urbanisme (P.L.U.). Toute modification nécessaire suite à un refus, dès lors qu'elle ne résulte pas d'une erreur imputable à Mes Plans de Permis, sera facturée en supplément.</p>

      <p><strong>2. Avec option "Vérification du P.L.U."</strong></p>
      <p>En souscrivant à cette prestation, Mes Plans de Permis vérifie la conformité du projet avec le P.L.U. en vigueur et garantit l'acceptation du permis de construire ou de la déclaration préalable de travaux. Dans ce cadre, toutes les modifications demandées par la mairie seront réalisées gratuitement. En revanche, toute modification sollicitée par le client pour modifier l'aspect ou la conception initiale du projet restera facturée en supplément.</p>

      <h3>Modifications indépendantes</h3>
      <p>Toute demande de modification qui diffère du projet validé lors de la commande sera facturée en supplément, qu'il y ait ou non souscription à l'option "Vérification du P.L.U.".</p>

      <h3>Limites de prestation</h3>
      <p>Mes Plans de Permis réalise des plans destinés aux demandes administratives. Ces documents ne constituent pas des plans d'exécution. L'exécution des travaux doit impérativement être confiée à un maître d'œuvre, un architecte ou une entreprise compétente.</p>

      <h3>Modifications de projet</h3>
      <p>Toute modification de programme ou de conception après validation du devis et réalisation des premières esquisses pourra entraîner des frais supplémentaires.</p>

      <h3>Propriété intellectuelle</h3>
      <p>Les plans réalisés par Mes Plans de Permis restent la propriété intellectuelle du prestataire jusqu'au paiement intégral de la prestation.</p>

      <h3>Loi applicable et litiges</h3>
      <p>Les présentes conditions générales sont soumises au droit français. Tout litige sera porté devant les tribunaux compétents.</p>
    </section>
    </div>
</body>
</html>`;
}
