"use server";
import Airtable from "airtable";

interface Data {
  isArchitectNeeded?: boolean;
  hasMultipleRealizationsOnSameConstructionPermit?: boolean;
  realizationsOnSameConstructionPermitNumber?: number;
  cerfaFilling?: boolean;
  pluVerification?: boolean;
  rdcPlanVerification?: boolean;
  rdcPlanNumber?: number;
  bbioStudy?: boolean;
  seismicStudy?: boolean;
  expressDelivery?: boolean;
  displayPanel?: boolean;
  hasMultipleRealizationsOnSameDeclaration?: boolean;
  realizationsOnSameDeclarationNumber?: number;
  hasMultipleRealizationsOnSameUrbanismCertificate?: boolean;
  realizationsOnSameUrbanismCertificateNumber?: number;
  hasMultipleRealizationsOnSamePlanRequest?: boolean;
  realizationsOnSamePlanRequestNumber?: number;
  doesNeedPlan?: boolean;
  neededPlans?: string[];
  shouldMakeRDCPlan?: boolean;
  rdcPlanCount?: number;
  renderCount3d?: number;
  render3D?: boolean;
}

export interface DevisRecord {
  designation: string;
  quantity?: number;
  pu?: number;
  tva?: number;
  totalht?: number;
}

const designationsMapping: Record<
  string,
  {
    designation: string;
    pu?: number;
    tva?: number;
  }
> = {
  isArchitectNeeded: {
    designation: `Forfait réalisation des pièces pour permis de construire (-150m2).<br>
<br>
Réalisation des plans à jour du projet en vue en plans, coupe et façades, implantation sur plan de masse. Perspectives filaires pour préciser les différents volumes. Perspectives couleur façade avant et arrière. Livraison du dossiers de permis de construire. prêts à dé poser en mairie. Les photos du terrain sont réalisées par le client.<br> 
<br>
Plans envoyés:<br>
-PC 1 (plan de situation)<br>
-PC 2 (plan de masse)<br>
-PC 3 ( plan de coupe)<br>
-PC 4 (notice descriptive)<br>
-PC 5 (plan de façades)<br>
-PC 6 (document graphique 3D)<br>
-PC 7 (photographie situant le terrain dans son environnement proche)<br>
-PC 8 (photographie situant le terrain dans l’environnement lointain)<br>
<br>
Remplissage Cerfa et prise de côte non compris. Le donneur d'ordre est tenu de fournir toutes informations techniques permettant d'établir les documents.`,
    pu: 350 / 1.2,
    tva: 20,
  },
  hasMultipleRealizationsOnSameConstructionPermit: {
    designation: `Plus-value pour modélisation et précisions<br><br>
    La plus-value inclut :<br><br>
    - La modélisation et la précision d'un bâtiment supplémentaire à modéliser<br><br>
    Le projet comprend plusieurs volets. Par conséquent, une plus-value sera appliquée en fonction du nombre d'heures supplémentaires nécessaires à la réalisation de ce projet.`,
    pu: 80 / 1.2,
    tva: 20,
  },
  cerfaFilling: {
    designation: `Remplissage Cerfa et dépôt en mairie. Le dépôt en mairie sera possible que si le service urbanisme a un service de dépôt dématerialisé. Le cas échéant, le client devra lui-même déposer son permis dans la mairie concernée.`,
    pu: 80 / 1.2,
    tva: 20,
  },
  pluVerification: {
    designation: `Vérification PLU :<br><br>
    Mes Plans de Permis vérifie la conformité de votre projet au Plan Local d'Urbanisme afin d'assurer qu'il respecte les règles d'urbanisme en vigueur.`,
    pu: 180 / 1.2,
    tva: 20,
  },
  rdcPlanVerification: {
    designation: `Réalisation d'un plan de niveau RDC (distribution des pièces) (125 € TTC / niveau. Ex: pour un R+1 compter 250€ TTC)<br><br>
    Conception non incluse.<br><br>
    Des croquis des plans de niveaux seront à fournir afin de permettre leur réalisation et leur intégration dans le dossier de déclaration préalable.<br><br>
    Si des plans ont déjà été réalisés par un architecte, un géomètre ou un dessinateur, ils pourront être utilisés et intégrés au dossier, permettant ainsi d'éviter la facturation de ce service.`,
    pu: 125 / 1.2,
    tva: 20,
  },
  bbioStudy: {
    designation: `Étude BBIO:<br><br>
    Fourniture de l'attestation RE2020 permis de construire du projet. Ce forfait permet de valider uniquement le permis de construire.<br><br>
    Les livrables:<br>
    - Rapport thermique des préconisations<br>
    - Attestation Bbio, DH<br><br>
    Note : Pour l'élaboration de l'étude thermique, des plans de niveaux avec côtes sont nécessaires.`,
    pu: 300 / 1.2,
    tva: 20,
  },

  seismicStudy: {
    designation: `Étude sismique:<br><br>
    - Vérification de la conformité des plans aux règles sismiques<br>
    - Vérification de la conformité en fonction de la typologie de la Zone<br>
    - Prise en compte des normes des PPR<br>
    - Préconisation du type d'étude à réaliser<br>
    - Attestation du controleur technique : PCMI 13`,
    pu: 400 / 1.2,
    tva: 20,
  },
  expressDelivery: {
    designation: `Service livraison express :<br>
    Recevez votre A.P.S sous 5 jours ouvrés.`,
    pu: 90 / 1.2,
    tva: 20,
  },
  displayPanel: {
    designation: `Fourniture d'un panneau d'affichage de permis de construire 80 x 120 cm`,
    pu: 25 / 1.2,
    tva: 20,
  },
  hasMultipleRealizationsOnSameDeclaration: {
    designation: `Plus-value pour modélisation et précisions<br><br>
    La plus-value inclut :<br><br>
    - La modélisation et la précision d'un bâtiment supplémentaire à modéliser<br><br>
    Le projet comprend plusieurs volets. Par conséquent, une plus-value sera appliquée en fonction du nombre d'heures supplémentaires nécessaires à la réalisation de ce projet.`,
    pu: 80 / 1.2,
    tva: 20,
  },
  hasMultipleRealizationsOnSameUrbanismCertificate: {
    designation: `Plus-value pour modélisation et précisions<br><br>
    La plus-value inclut :<br><br>
    - La modélisation et la précision d'un bâtiment supplémentaire à modéliser<br><br>
    Le projet comprend plusieurs volets. Par conséquent, une plus-value sera appliquée en fonction du nombre d'heures supplémentaires nécessaires à la réalisation de ce projet.`,
    pu: 80 / 1.2,
    tva: 20,
  },
  hasMultipleRealizationsOnSamePlanRequest: {
    designation: `Plus-value pour modélisation et précisions<br><br>
    La plus-value inclut :<br><br>
    - La modélisation et la précision d'un bâtiment supplémentaire à modéliser<br><br>
    Le projet comprend plusieurs volets. Par conséquent, une plus-value sera appliquée en fonction du nombre d'heures supplémentaires nécessaires à la réalisation de ce projet.`,
    pu: 80 / 1.2,
    tva: 20,
  },
  doesNeedPlan: {
    designation: `Forfait réalisation de plan à l'unité<br>
    Pièces envoyés:`,
    pu: 50 / 1.2,
    tva: 20,
  },
  shouldMakeRDCPlan: {
    designation: `Réalisation d'un plan de niveau RDC (distribution des pièces) (125 € TTC/ niveau. Ex: pour un R+1 compter 250€ TTC)<br><br>
    Conception non incluse.<br><br>
    Des croquis des plans de niveaux seront à fournir afin de permettre leur réalisation et leur intégration dans le dossier de déclaration préalable.<br><br>
    Si des plans ont déjà été réalisés par un architecte, un géomètre ou un dessinateur, ils pourront être utilisés et intégrés au dossier, permettant ainsi d'éviter la facturation de ce service.`,
    pu: 125 / 1.2,
    tva: 20,
  },
  shouldMake3dRender: {
    designation: `Réalisation d'un plan rendu 3D de l'aménagement intérieur.<br><br>
    Conception non incluse.<br><br>
    Des croquis des plans de niveaux seront à fournir afin de permettre leur réalisation.<br><br>
    Si des plans ont déjà été réalisés par un architecte, un géomètre ou un dessinateur, ils pourront être utilisés et intégrés au dossier, permettant ainsi d'éviter la facturation de ce service.`,
    pu: 150 / 1.2,
    tva: 20,
  },
  render3D: {
    designation: `Réalisation d'un plan rendu 3D de l'aménagement intérieur.<br><br>
    Conception non incluse.<br><br>
    Des croquis des plans de niveaux seront à fournir afin de permettre leur réalisation.<br><br>
    Si des plans ont déjà été réalisés par un architecte, un géomètre ou un dessinateur, ils pourront être utilisés et intégrés au dossier, permettant ainsi d'éviter la facturation de ce service.`,
    pu: 150 / 1.2,
    tva: 20,
  },
  dpDevis: {
    designation: `Forfait réalisation des pièces pour déclaration préalable de travaux.<br>
<br>
Réalisation des plans à jour du projet en vue en plans, coupe et façades, implantation sur plan de masse. Perspectives filaires pour préciser les différents volumes. Perspectives couleur façade avant et arrière.<br>
<br>
Pièces envoyées:<br>
-DP1 (plan de situation)<br>
-DP2 (plan de masse)<br>
-DP3 (plan de coupe)<br>
-DP4 & DP5 (plan d'élévation)<br>
-DP6 (insertion graphique)<br>
-DP7 (vues rapprochées)<br>
-DP8 (vues éloignées)<br>
-DP11 (notice descriptive)<br>
<br>
Les photos du terrain sont réalisées par le client. Le donneur d'ordre est tenu de fournir toutes informations techniques permettant d'établir les documents`,
    pu: 350 / 1.2,
    tva: 20,
  },
  urbanismDevis: {
    designation: `Certificat d’Urbanisme opérationnel (CUb) – Réalisation des plans graphiques nécessaires à la demande (plan de situation, plan cadastral, plan sommaire du projet)<br>
<br>
Plans envoyés:<br>
- Plan de situation<br>
-Plan de masse<br>
-Plan de façades<br>
<br>
(les plans de niveaux seront intégrés au C.U)`,
    pu: 290 / 1.2,
    tva: 20,
  },
  erpDevis: {
    designation: `Création d'un dossier ERP (-150m2)<br>
<br>
Nous réalisons votre dossier ERP au complet, avec :<br>
<br>
- La notice de sécurité<br>
- La notice d'accessibilité<br>
- Les plans sur 1 niveau (situation, cadastre, masse,…)<br>
- Remplissage CERFA ERP 13824*04<br>
<br>
Le donneur d'ordre est tenu de fournir toutes informations techniques permettant d'établir les documents.`,
    pu: 450 / 1.2,
    tva: 20,
  },
};

const fetchDesignation = async (): Promise<
  Record<
    string,
    {
      designation: string;
      pu?: number;
      tva?: number;
    }
  >
> => {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
      "appIqaoe6YNiflxLh"
    );

    return new Promise((resolve, reject) => {
      const res: Record<
        string,
        {
          designation: string;
          pu?: number | undefined;
          tva?: number | undefined;
        }
      > = {};

      base("Imported table")
        .select({ view: "Grid view" })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              res[record.get("clé") as string] = {
                designation: (record
                  .get("désignation")
                  ?.toString()
                  .replaceAll("\n", "<br>") ?? "") as string,
                pu: record.get("Prix Unitaire HT") as number,
                tva: record.get("TVA") as number,
              };
            });

            fetchNextPage();
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};

export const genreratePermisDevis = async (data: Data) => {
  const designationsMapping = await fetchDesignation();
  console.log("===designation====", designationsMapping);
  const payload: DevisRecord[] = [
    {
      designation: designationsMapping.isArchitectNeeded.designation,
      quantity: 1,
      pu: designationsMapping.isArchitectNeeded.pu,
      tva: designationsMapping.isArchitectNeeded.tva,
      totalht: designationsMapping.isArchitectNeeded.pu,
    },
  ];

  if (data.isArchitectNeeded) {
    const mapping = designationsMapping.isArchitectNeeded;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.hasMultipleRealizationsOnSameConstructionPermit) {
    const mapping =
      designationsMapping.hasMultipleRealizationsOnSameConstructionPermit;
    const quantity = data.realizationsOnSameConstructionPermitNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.cerfaFilling) {
    const mapping = designationsMapping.cerfaFilling;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.pluVerification) {
    const mapping = designationsMapping.pluVerification;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.rdcPlanVerification) {
    const mapping = designationsMapping.rdcPlanVerification;
    const quantity = data.rdcPlanNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.bbioStudy) {
    const mapping = designationsMapping.bbioStudy;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.seismicStudy) {
    const mapping = designationsMapping.seismicStudy;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.expressDelivery) {
    const mapping = designationsMapping.expressDelivery;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.displayPanel) {
    const mapping = designationsMapping.displayPanel;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  return payload;
};

export const generateResume = async (data: Data): Promise<DevisRecord[]> => {
  const simpleDesignations = {
    isArchitectNeeded: {
      designation: "Services d'architecte",
      quantity: 1,
    },
    hasMultipleRealizationsOnSameConstructionPermit: {
      designation: "Plus-value pour modélisation et précisions",
      quantity: data.realizationsOnSameConstructionPermitNumber,
    },
    cerfaFilling: {
      designation: "Remplissage Cerfa et dépôt en mairie.",
      quantity: 1,
    },
    pluVerification: {
      designation: "Vérification PLU.",
      quantity: 1,
    },
    rdcPlanVerification: {
      designation: "Réalisation d'un plan de niveau RDC",
      quantity: 1,
    },
    bbioStudy: {
      designation: "Étude BBIO",
      quantity: 1,
    },
    seismicStudy: {
      designation: "Étude sismique",
      quantity: 1,
    },
    expressDelivery: {
      designation: "Service livraison express.",
      quantity: 1,
    },
    displayPanel: {
      designation:
        "Fourniture d'un panneau d'affichage de permis de construire 80 x 120 cm",
      quantity: 1,
    },
    hasMultipleRealizationsOnSameDeclaration: {
      designation: "Plus-value pour modélisation et précisions",
      quantity: data.realizationsOnSameDeclarationNumber,
    },
    hasMultipleRealizationsOnSameUrbanismCertificate: {
      designation: "Plus-value pour modélisation et précision",
      quantity: data.realizationsOnSameUrbanismCertificateNumber,
    },
    hasMultipleRealizationsOnSamePlanRequest: {
      designation: "Plus-value pour modélisation et précision",
      quantity: data.realizationsOnSamePlanRequestNumber,
    },
    doesNeedPlan: {
      designation:
        "Forfait réalisation de plan à l'unité : " +
        (data.neededPlans?.join(", ") || ""),
      quantity: data.neededPlans?.length || 0,
    },
    shouldMakeRDCPlan: {
      designation:
        "Réalisation d'un plan de niveau RDC (distribution des pièces)",
      quantity: data.rdcPlanCount,
    },
    render3D: {
      designation: "Réalisation d'un plan rendu 3D de l'aménagement intérieur",
      quantity: data.renderCount3d,
    },
  };

  const payload: DevisRecord[] = [];

  for (const [key, value] of Object.entries(simpleDesignations)) {
    if (data[key as keyof Data] && value.quantity && value.quantity > 0) {
      payload.push(value);
    }
  }

  return payload;
};

export const generateDpDevis = async (data: Data) => {
  const payload: DevisRecord[] = [
    {
      designation: designationsMapping.dpDevis.designation,
      quantity: 1,
      pu: designationsMapping.dpDevis.pu,
      tva: designationsMapping.dpDevis.tva,
      totalht: designationsMapping.dpDevis.pu,
    },
  ];

  if (data.hasMultipleRealizationsOnSameDeclaration) {
    const mapping =
      designationsMapping.hasMultipleRealizationsOnSameDeclaration;
    const quantity = data.realizationsOnSameDeclarationNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.cerfaFilling) {
    const mapping = designationsMapping.cerfaFilling;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.pluVerification) {
    const mapping = designationsMapping.pluVerification;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.rdcPlanVerification) {
    const mapping = designationsMapping.rdcPlanVerification;
    const quantity = data.rdcPlanNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.expressDelivery) {
    const mapping = designationsMapping.expressDelivery;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.displayPanel) {
    const mapping = designationsMapping.displayPanel;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  return payload;
};

export const generateUniteDevis = async (data: Data) => {
  const payload: DevisRecord[] = [];

  if (data.hasMultipleRealizationsOnSamePlanRequest) {
    const mapping =
      designationsMapping.hasMultipleRealizationsOnSamePlanRequest;
    const quantity = data.realizationsOnSamePlanRequestNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.doesNeedPlan && data.neededPlans) {
    const mapping = designationsMapping.doesNeedPlan;
    let tempDesignation = mapping.designation;
    data.neededPlans.forEach((plan) => {
      tempDesignation += "<br>" + plan;
    });
    tempDesignation +=
      "<br>Le donneur d'ordre est tenu de fournir toutes informations techniques permettant d'établir les documents.";

    const quantity = data.neededPlans.length;
    payload.push({
      designation: tempDesignation,
      quantity: quantity,
      pu: quantity * mapping.pu! + 130 / 1.2,
      tva: mapping.tva,
      totalht: quantity * mapping.pu! + 130 / 1.2,
    });
  }

  if (data.rdcPlanVerification) {
    const mapping = designationsMapping.rdcPlanVerification;
    const quantity = data.rdcPlanCount || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.render3D) {
    const mapping = designationsMapping.render3D;
    const quantity = data.renderCount3d || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu!,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.expressDelivery) {
    const mapping = designationsMapping.expressDelivery;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  return payload;
};

export const generateErpDevis = async (data: Data) => {
  const payload: DevisRecord[] = [
    {
      designation: designationsMapping.erpDevis.designation,
      quantity: 1,
      pu: designationsMapping.erpDevis.pu,
      tva: designationsMapping.erpDevis.tva,
      totalht: designationsMapping.erpDevis.pu,
    },
  ];

  if (data.isArchitectNeeded) {
    const mapping = designationsMapping.isArchitectNeeded;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.expressDelivery) {
    const mapping = designationsMapping.expressDelivery;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  return payload;
};

export const generateUrbanismFormDevis = async (data: Data) => {
  const payload: DevisRecord[] = [
    {
      designation: designationsMapping.urbanismDevis.designation,
      quantity: 1,
      pu: designationsMapping.urbanismDevis.pu,
      tva: designationsMapping.urbanismDevis.tva,
      totalht: designationsMapping.urbanismDevis.pu,
    },
  ];

  if (data.hasMultipleRealizationsOnSameUrbanismCertificate) {
    const mapping =
      designationsMapping.hasMultipleRealizationsOnSameUrbanismCertificate;
    const quantity = data.realizationsOnSameUrbanismCertificateNumber || 0;
    payload.push({
      designation: mapping.designation,
      quantity: quantity,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: quantity * mapping.pu!,
    });
  }

  if (data.pluVerification) {
    const mapping = designationsMapping.pluVerification;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  if (data.expressDelivery) {
    const mapping = designationsMapping.expressDelivery;
    payload.push({
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    });
  }

  return payload;
};

export const generateRe2020Devis = async () => {
  const mapping = designationsMapping.bbioStudy;
  const payload: DevisRecord[] = [
    {
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    },
  ];
  return payload;
};

export const generateSismicDevis = async () => {
  const mapping = designationsMapping.seismicStudy;
  const payload: DevisRecord[] = [
    {
      designation: mapping.designation,
      quantity: 1,
      pu: mapping.pu,
      tva: mapping.tva,
      totalht: mapping.pu!,
    },
  ];
  return payload;
};
