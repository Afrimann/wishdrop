export type EventType =
  | "birthday"
  | "wedding"
  | "graduation"
  | "christmas"
  | "party"
  | "custom";

export type EventOption = {
  type: EventType;
  label: string;
};

export const EVENT_OPTIONS: EventOption[] = [
  { type: "birthday", label: "Birthday" },
  { type: "wedding", label: "Wedding" },
  { type: "graduation", label: "Graduation" },
  { type: "christmas", label: "Christmas" },
  { type: "party", label: "Party" },
  { type: "custom", label: "Other" },
];

export const EVENT_LABELS: Record<EventType, string> = {
  birthday: "Birthday",
  wedding: "Wedding",
  graduation: "Graduation",
  christmas: "Christmas",
  party: "Party",
  custom: "Custom Event",
};

export function isEventType(value: string): value is EventType {
  return (
    value === "birthday" ||
    value === "wedding" ||
    value === "graduation" ||
    value === "christmas" ||
    value === "party" ||
    value === "custom"
  );
}
