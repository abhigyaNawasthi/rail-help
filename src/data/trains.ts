import type { Seat } from "@/components/SeatCard";
import type { TrainOption } from "@/components/TrainAutocomplete";

export interface TrainData extends TrainOption {
  coaches: string[];
  stations: string[]; // ordered route
  seats: Seat[];
}

export const TRAINS: TrainData[] = [
  {
    number: "12951",
    name: "Rajdhani Express",
    route: "NDLS → LKO",
    stations: [
      "New Delhi (NDLS)",
      "Ghaziabad (GZB)",
      "Aligarh Jn (ALJN)",
      "Kanpur Central (CNB)",
      "Lucknow Nr (LKO)",
    ],
    coaches: ["A1", "A2", "B1", "B2", "B3", "B4"],
    seats: [
      { train: "12951 Rajdhani Express", coach: "A1", seatNumber: "07", berth: "Lower",      vacantTill: "Kanpur Central (CNB)", fromStation: "New Delhi (NDLS)", confidence: 96 },
      { train: "12951 Rajdhani Express", coach: "A1", seatNumber: "14", berth: "Upper",      vacantTill: "Aligarh Jn (ALJN)",    fromStation: "New Delhi (NDLS)", confidence: 71 },
      { train: "12951 Rajdhani Express", coach: "B1", seatNumber: "12", berth: "Lower",      vacantTill: "Lucknow Nr (LKO)",     fromStation: "New Delhi (NDLS)", confidence: 88 },
      { train: "12951 Rajdhani Express", coach: "B2", seatNumber: "33", berth: "Side Upper", vacantTill: "Kanpur Central (CNB)", fromStation: "New Delhi (NDLS)", confidence: 82 },
      { train: "12951 Rajdhani Express", coach: "B3", seatNumber: "21", berth: "Middle",     vacantTill: "Ghaziabad (GZB)",      fromStation: "New Delhi (NDLS)", confidence: 54 },
      { train: "12951 Rajdhani Express", coach: "B4", seatNumber: "48", berth: "Side Lower", vacantTill: "Lucknow Nr (LKO)",     fromStation: "New Delhi (NDLS)", confidence: 93 },
    ],
  },
  {
    number: "22435",
    name: "Vande Bharat Express",
    route: "NDLS → BPL",
    stations: [
      "New Delhi (NDLS)",
      "Mathura Jn (MTJ)",
      "Agra Cantt (AGC)",
      "Gwalior Jn (GWL)",
      "Jhansi Jn (JHS)",
      "Bhopal Jn (BPL)",
    ],
    coaches: ["C1", "C2", "C3", "C4", "C5", "E1"],
    seats: [
      { train: "22435 Vande Bharat Express", coach: "C1", seatNumber: "18", berth: "Window", vacantTill: "Agra Cantt (AGC)",  fromStation: "New Delhi (NDLS)", confidence: 92 },
      { train: "22435 Vande Bharat Express", coach: "C2", seatNumber: "44", berth: "Aisle",  vacantTill: "Gwalior Jn (GWL)",  fromStation: "New Delhi (NDLS)", confidence: 79 },
      { train: "22435 Vande Bharat Express", coach: "C3", seatNumber: "24", berth: "Window", vacantTill: "Bhopal Jn (BPL)",   fromStation: "New Delhi (NDLS)", confidence: 95 },
      { train: "22435 Vande Bharat Express", coach: "C4", seatNumber: "08", berth: "Aisle",  vacantTill: "Jhansi Jn (JHS)",   fromStation: "New Delhi (NDLS)", confidence: 67 },
      { train: "22435 Vande Bharat Express", coach: "C5", seatNumber: "48", berth: "Window", vacantTill: "Mathura Jn (MTJ)",  fromStation: "New Delhi (NDLS)", confidence: 48 },
      { train: "22435 Vande Bharat Express", coach: "E1", seatNumber: "12", berth: "Window", vacantTill: "Bhopal Jn (BPL)",   fromStation: "New Delhi (NDLS)", confidence: 90 },
    ],
  },
  {
    number: "12230",
    name: "Lucknow Mail",
    route: "LKO → NDLS",
    stations: [
      "Lucknow Nr (LKO)",
      "Kanpur Central (CNB)",
      "Aligarh Jn (ALJN)",
      "Ghaziabad (GZB)",
      "New Delhi (NDLS)",
    ],
    coaches: ["S1", "S2", "S4", "S7", "B1", "A1"],
    seats: [
      { train: "12230 Lucknow Mail", coach: "S1", seatNumber: "11", berth: "Lower",      vacantTill: "Kanpur Central (CNB)", fromStation: "Lucknow Nr (LKO)", confidence: 84 },
      { train: "12230 Lucknow Mail", coach: "S2", seatNumber: "29", berth: "Middle",     vacantTill: "Aligarh Jn (ALJN)",    fromStation: "Lucknow Nr (LKO)", confidence: 73 },
      { train: "12230 Lucknow Mail", coach: "S4", seatNumber: "34", berth: "Middle",     vacantTill: "Aligarh Jn (ALJN)",    fromStation: "Lucknow Nr (LKO)", confidence: 58 },
      { train: "12230 Lucknow Mail", coach: "S7", seatNumber: "41", berth: "Side Upper", vacantTill: "New Delhi (NDLS)",     fromStation: "Lucknow Nr (LKO)", confidence: 87 },
      { train: "12230 Lucknow Mail", coach: "B1", seatNumber: "22", berth: "Side Lower", vacantTill: "New Delhi (NDLS)",     fromStation: "Lucknow Nr (LKO)", confidence: 91 },
      { train: "12230 Lucknow Mail", coach: "A1", seatNumber: "06", berth: "Lower",      vacantTill: "Kanpur Central (CNB)", fromStation: "Lucknow Nr (LKO)", confidence: 46 },
    ],
  },
  {
    number: "12046",
    name: "Shatabdi Express",
    route: "NDLS → CDG",
    stations: [
      "New Delhi (NDLS)",
      "Panipat Jn (PNP)",
      "Kurukshetra Jn (KKDE)",
      "Ambala Cantt (UMB)",
      "Chandigarh (CDG)",
    ],
    coaches: ["C1", "C2", "C3", "E1", "E2"],
    seats: [
      { train: "12046 Shatabdi Express", coach: "C1", seatNumber: "19", berth: "Window", vacantTill: "Ambala Cantt (UMB)",   fromStation: "New Delhi (NDLS)", confidence: 89 },
      { train: "12046 Shatabdi Express", coach: "C2", seatNumber: "27", berth: "Aisle",  vacantTill: "Chandigarh (CDG)",     fromStation: "New Delhi (NDLS)", confidence: 94 },
      { train: "12046 Shatabdi Express", coach: "C3", seatNumber: "44", berth: "Window", vacantTill: "Kurukshetra Jn (KKDE)",fromStation: "New Delhi (NDLS)", confidence: 65 },
      { train: "12046 Shatabdi Express", coach: "E1", seatNumber: "08", berth: "Window", vacantTill: "Panipat Jn (PNP)",     fromStation: "New Delhi (NDLS)", confidence: 42 },
      { train: "12046 Shatabdi Express", coach: "E2", seatNumber: "16", berth: "Aisle",  vacantTill: "Chandigarh (CDG)",     fromStation: "New Delhi (NDLS)", confidence: 81 },
    ],
  },
  {
    number: "12262",
    name: "Mumbai Duronto Express",
    route: "BCT → NDLS",
    stations: [
      "Mumbai Central (BCT)",
      "Vadodara Jn (BRC)",
      "Ratlam Jn (RTM)",
      "Kota Jn (KOTA)",
      "Sawai Madhopur (SWM)",
      "New Delhi (NDLS)",
    ],
    coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "B5"],
    seats: [
      { train: "12262 Mumbai Duronto Express", coach: "A1", seatNumber: "03", berth: "Lower",      vacantTill: "Kota Jn (KOTA)",       fromStation: "Mumbai Central (BCT)", confidence: 90 },
      { train: "12262 Mumbai Duronto Express", coach: "A2", seatNumber: "11", berth: "Upper",      vacantTill: "Vadodara Jn (BRC)",    fromStation: "Mumbai Central (BCT)", confidence: 52 },
      { train: "12262 Mumbai Duronto Express", coach: "B1", seatNumber: "26", berth: "Side Lower", vacantTill: "New Delhi (NDLS)",     fromStation: "Mumbai Central (BCT)", confidence: 95 },
      { train: "12262 Mumbai Duronto Express", coach: "B2", seatNumber: "39", berth: "Middle",     vacantTill: "Ratlam Jn (RTM)",      fromStation: "Mumbai Central (BCT)", confidence: 74 },
      { train: "12262 Mumbai Duronto Express", coach: "B3", seatNumber: "47", berth: "Side Upper", vacantTill: "Sawai Madhopur (SWM)", fromStation: "Mumbai Central (BCT)", confidence: 68 },
      { train: "12262 Mumbai Duronto Express", coach: "B4", seatNumber: "12", berth: "Lower",      vacantTill: "New Delhi (NDLS)",     fromStation: "Mumbai Central (BCT)", confidence: 86 },
      { train: "12262 Mumbai Duronto Express", coach: "B5", seatNumber: "29", berth: "Middle",     vacantTill: "Kota Jn (KOTA)",       fromStation: "Mumbai Central (BCT)", confidence: 38 },
    ],
  },
];

export function findTrain(query: string): TrainData | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    TRAINS.find(
      (t) =>
        q.startsWith(t.number) ||
        q.includes(t.number) ||
        t.name.toLowerCase().includes(q),
    ) ?? null
  );
}

// vibe helpers
export function confidenceVibe(c: number): { label: string; tone: "hi" | "mid" | "lo" } {
  if (c >= 85) return { label: "W seat fr 🔥", tone: "hi" };
  if (c >= 65) return { label: "might be valid 👀", tone: "mid" };
  return { label: "hell nah gang 😭", tone: "lo" };
}

export const LOADING_LINES = [
  "clocking the coach… 👀",
  "asking the TTE rn fr",
  "scanning seats, hold up",
  "doing the math no cap",
];

export const EMPTY_LINES = [
  "type a train and lock in 🔒",
  "we got the seats, you got the vibes",
  "tap search to clock empty seats 👀",
];