export interface DevisRecord {
  designation: string;
  quantity?: number;
}

export default function generateResumePdf(
  devis: DevisRecord[],
  client: { nom: string; prenom: string, email : string, tel : string },
  serviceTitle: string
) {
  const devisRows = devis
    .map(
      (item) => `
    <tr>
      <td>${item.designation}</td>
      <td class="text-center">${item.quantity || 1}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devis - ${serviceTitle}</title>
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
            font-size: 12pt;
            color: #021327;
            padding: 40px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #042347;
        }
        
        .service-title {
            font-size: 24pt;
            font-weight: bold;
            color: #042347;
            margin-bottom: 20px;
        }
        
        .client-info {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .client-name {
            font-weight: 600;
            color: #042347;
            font-size: 14pt;
            margin-bottom: 10px;
        }
        
        .client-contacts {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 8px;
        }
        
        .contact-item {
            color: #555;
            font-size: 11pt;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .contact-icon {
            color: #042347;
            font-weight: 600;
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
            padding: 15px 10px;
            text-align: left;
            font-weight: bold;
            font-size: 11pt;
            border: 1px solid #042347;
        }
        
        td {
            padding: 12px 10px;
            border: 1px solid #ddd;
            font-size: 11pt;
        }
        
        tbody tr:hover {
            background: #f5f5f5;
        }
        
        .text-center {
            text-align: center;
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
            <div class="service-title">${serviceTitle}</div>
        </div>
        
        <!-- Informations client -->
        <div class="client-info">
            <div class="client-name">${client.nom} ${client.prenom}</div>
            <div class="client-contacts">
                <span class="contact-item">
                    <span class="contact-icon">✉</span> ${client.email}
                </span>
                <span class="contact-item">
                    <span class="contact-icon">☎</span> ${client.tel}
                </span>
            </div>
        </div>
        
        <!-- Tableau des prestations -->
        <table>
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th class="text-center">Quantité</th>
                </tr>
            </thead>
            <tbody>
                ${devisRows}
            </tbody>
        </table>
    </div>
</body>
</html>`;
}