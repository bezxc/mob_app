import Svg, { Path, SvgProps } from "react-native-svg";

export const NotificationReminderIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M15 13.302l-3.25-5.629a2.5 2.5 0 014.33-2.5l5 8.66"
        stroke={props.fill || props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.169 16.668l-4.75-8.227a2.5 2.5 0 114.33-2.5L15 13.302"
        stroke={props.fill || props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.25 20.664a5 5 0 011.83-6.83l-1.25-2.166a2.5 2.5 0 114.33-2.5l2.5 4.33a9.998 9.998 0 01-7.355 14.917 10 10 0 01-9.966-4.916l-4.75-8.228a2.5 2.5 0 014.33-2.5l2.25 3.897M10.137 30A13.944 13.944 0 016 25.5M22 3.875a6.496 6.496 0 015.628 3.25"
        stroke={props.fill || props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const NotificationCompititionIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M5.641 24.502a1.002 1.002 0 001.247.733 34.237 34.237 0 0118.218-.002 1 1 0 001.246-.732l3.186-13.54a1 1 0 00-1.379-1.143l-6.323 2.81a1 1 0 01-1.28-.428l-3.682-6.627a1 1 0 00-1.748 0L11.444 12.2a1 1 0 01-1.28.428L3.84 9.818a1 1 0 00-1.38 1.142l3.181 13.542zM12 20.21c2.66-.28 5.34-.28 8 0"
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const NotificationTrainingIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M11 7H8a1 1 0 00-1 1v16a1 1 0 001 1h3a1 1 0 001-1V8a1 1 0 00-1-1zM24 7h-3a1 1 0 00-1 1v16a1 1 0 001 1h3a1 1 0 001-1V8a1 1 0 00-1-1zM25 10h3a1 1 0 011 1v10a1 1 0 01-1 1h-3M7 22H4a1 1 0 01-1-1V11a1 1 0 011-1h3M12 16h8M29 16h2M1 16h2"
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const NotificationActionIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M12 29.999l2-10-8-3 14-15-2 10 8 3-14 15z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export function NotificationPartyIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M3 5h26L16 18 3 5zM16 18v9M11 27h10M7 9h18"
        stroke={props.fill || props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
