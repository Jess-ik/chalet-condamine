import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Equipements`.
 */
export type EquipementsProps = SliceComponentProps<Content.EquipementsSlice>;

/**
 * Component for "Equipements" Slices.
 */
const Equipements = ({ slice }: EquipementsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for equipements (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Equipements;
