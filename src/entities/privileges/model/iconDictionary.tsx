import {
  Baby,
  Brain,
  Car,
  CarFront,
  ChevronDown,
  Dumbbell,
  Fuel,
  HeartPulse,
  Hotel,
  House,
  Joystick,
  PartyPopper,
  PiggyBank,
  Plane,
  Tablets,
  Telescope,
  TentTree,
  Utensils,
} from "lucide-react-native";
import { SvgProps } from "react-native-svg";

export const iconDictionary = [
  {
    icon: (props: SvgProps) => <Utensils {...props} />,
    value: "utensils",
  },
  {
    icon: (props: SvgProps) => <Brain {...props} />,
    value: "brain",
  },
  {
    icon: (props: SvgProps) => <House {...props} />,
    value: "house",
  },
  {
    icon: (props: SvgProps) => <Dumbbell {...props} />,
    value: "dumbbell",
  },
  {
    icon: (props: SvgProps) => <Tablets {...props} />,
    value: "tablets",
  },
  {
    icon: (props: SvgProps) => <HeartPulse {...props} />,
    value: "heartpulse",
  },
  {
    icon: (props: SvgProps) => <Baby {...props} />,
    value: "baby",
  },
  {
    icon: (props: SvgProps) => <PartyPopper {...props} />,
    value: "partypopper",
  },
  {
    icon: (props: SvgProps) => <Fuel {...props} />,
    value: "fuel",
  },
  {
    icon: (props: SvgProps) => <PiggyBank {...props} />,
    value: "piggybank",
  },
  {
    icon: (props: SvgProps) => <Car {...props} />,
    value: "car",
  },
  {
    icon: (props: SvgProps) => <CarFront {...props} />,
    value: "carfront",
  },
  {
    icon: (props: SvgProps) => <Hotel {...props} />,
    value: "hotel",
  },
  {
    icon: (props: SvgProps) => <TentTree {...props} />,
    value: "tenttree",
  },
  {
    icon: (props: SvgProps) => <Plane {...props} />,
    value: "plane",
  },
  {
    icon: (props: SvgProps) => <Telescope {...props} />,
    value: "telescope",
  },
  {
    icon: (props: SvgProps) => <Joystick {...props} />,
    value: "joystick",
  },
];

export const getIcon = (value: string) => {
  return (
    iconDictionary.find((item) => item.value === value)?.icon ||
    ((props: SvgProps) => <ChevronDown {...props} />)
  );
};
