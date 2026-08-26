import jason from "../assets/official/Jason_Duval_02.jpg";
import lucia from "../assets/official/Lucia_Caminos_02.jpg";
import cal from "../assets/official/Cal_Hampton_03.jpg";
import boobie from "../assets/official/Boobie_Ike_01.jpg";
import dreQuan from "../assets/official/DreQuan_Priest_01.jpg";
import realDimez from "../assets/official/Real_Dimez_01.jpg";
import raul from "../assets/official/Raul_Bautista_01.jpg";
import brian from "../assets/official/Brian_Heder_01.jpg";
const photos: Record<string, string> = {
  JD: jason,
  LC: lucia,
  CH: cal,
  BI: boobie,
  DP: dreQuan,
  RD: realDimez,
  RB: raul,
  BH: brian,
};
export function Avatar({
  initials,
  small = false,
}: {
  initials: string;
  small?: boolean;
}) {
  const photo = photos[initials];
  return (
    <span className={small ? "avatar small" : "avatar"}>
      {photo ? <img src={photo} alt="" /> : initials}
    </span>
  );
}
