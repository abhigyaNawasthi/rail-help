const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || "";
const RAPID_API_HOST = "irctc1.p.rapidapi.com";

// 1. Fetch the exact route and stations for the train
export async function getTrainInfo(trainNumber: string) {
  if (!RAPID_API_KEY) {
    throw new Error("Missing API Key. Add VITE_RAPIDAPI_KEY to your .env file and restart Vite.");
  }

  const url = `https://${RAPID_API_HOST}/api/v1/getTrainSchedule?trainNo=${trainNumber}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  });

  const data = await response.json();
  if (!data.status) throw new Error(data.message || "Invalid Train Number");
  return data;
}

// 2. Ping the IRCTC servers for real-time seat tracking
export async function checkSeatAvailability(params: {
  trainNo: string;
  fromStationCode: string;
  toStationCode: string;
  date: string;
  classType: string;
}) {
  if (!RAPID_API_KEY) {
    throw new Error("Missing API Key. Add VITE_RAPIDAPI_KEY to your .env file.");
  }

  const { trainNo, fromStationCode, toStationCode, date, classType } = params;
  
  // quota=GN means General Quota. You can expand this later to include Tatkal (TQ)
  const url = `https://${RAPID_API_HOST}/api/v1/checkSeatAvailability?trainNo=${trainNo}&fromStationCode=${fromStationCode}&toStationCode=${toStationCode}&date=${date}&classType=${classType}&quota=GN`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  });

  const data = await response.json();
  if (!data.status) throw new Error(data.message || "Failed to fetch live availability");
  return data;
}