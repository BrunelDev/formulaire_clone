export enum IconProp {
  Location = "Location",
  Estimation = "Estimation",
  Projets = "Projets",
  Details = "Détails",
  Coordonnees = "Coordonnées",
  Finalisation = "Finalisation",
}

export const IconStep = ({
  className,
}: {
  property1: IconProp;
  className?: string;
}) => {
  return <div className={`h-[1px] w-[1px] ${className}`} />;
};
