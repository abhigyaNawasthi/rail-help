import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Train, MapPin, Search, Sofa, TrainFront, Route as RouteIcon, ArrowRight, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { SeatCard, type Seat } from "@/components/SeatCard";
import { LOADING_LINES, EMPTY_LINES } from "@/data/trains";
import { getTrainInfo } from "@/lib/railwaydata";
import { MarkerHighlight } from "@/components/MarkerHighlight";
import { CustomSelect } from "@/components/CustomSelect";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RailVacant - Find empty seats on Indian trains" },
      { name: "description", content: "Modern seat vacancy finder for Indian Railways." },
    ],
  }),
  component: Index,
});

function Index() {
  const [train, setTrain] = useState("");
  const [trainName, setTrainName] = useState("");
  const [apiStations, setApiStations] = useState<string[]>([]);
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [trainVerified, setTrainVerified] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [coach, setCoach] = useState<string>(""); 
  const [results, setResults] = useState<Seat[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState(LOADING_LINES[0]);

  const coaches = ["SL", "3A", "2A", "1A", "CC", "2S"];

  const fromIndex = apiStations.indexOf(from);
  const validToStations = fromIndex !== -1 ? apiStations.slice(fromIndex + 1) : [];

  const handleTrainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrain(e.target.value);
    if (trainVerified) {
      setTrainVerified(false);
      setApiStations([]);
      setTrainName("");
      setResults(null);
      setCoach(""); 
    }
  };

  useEffect(() => {
    if (to && !validToStations.includes(to)) {
      setTo(validToStations[0] || "");
    }
  }, [from, validToStations, to]);

  // LIVE DATA: Hits RapidAPI to get the exact stations and route
  const verifyTrain = async () => {
    const trainNumber = train.trim();

    if (!trainNumber || trainNumber.length !== 5) {
      alert("Please enter a valid 5-digit train number.");
      return;
    }

    setIsVerifying(true);
    setResults(null);

    try {
      const data = await getTrainInfo(trainNumber);
      
      const trainData = data?.data || data?.body || data;
      if (!trainData) throw new Error("Invalid API Response");

      const tName = trainData.trainName || trainData.train_name || trainData.name || "Live Route Found";
      setTrainName(tName);
      
      const routeArray = trainData.route || trainData.schedule || trainData.stations || [];
      
      const fetchedStations = routeArray.map((s: any) => {
        if (typeof s === 'string') return s; 
        const name = s.stationName || s.station_name || s.name || s.stnName || s.source_station_name || "Unknown";
        const code = s.stationCode || s.station_code || s.code || s.stnCode || s.source_station_code || "UNK";
        return `${name} (${code})`;
      });

      setApiStations(fetchedStations);
    
      if (fetchedStations.length > 0) {
        setFrom(fetchedStations[0]);
        setTo(fetchedStations[fetchedStations.length - 1] || "");
      }
      
      setTrainVerified(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Train not found or API Key is missing.");
    } finally {
      setIsVerifying(false);
    }
  };

  // SIMULATED DATA: Generates physical vacant seats for the UI
  const onSearch = () => {
    if (!to) return alert("Please select a dropping station.");
    if (!coach) return alert("Please select a coach class.");

    setLoading(true);
    setLoadingLine(LOADING_LINES[Math.floor(Math.random() * LOADING_LINES.length)]);
    setResults(null);

    setTimeout(() => {
      const fromCode = from.match(/\(([^)]+)\)/)?.[1] || from;
      const toCode = to.match(/\(([^)]+)\)/)?.[1] || to;

      // Generate 8 dummy vacant seats
      const generatedSeats: Seat[] = Array.from({ length: 8 }, () => ({
        train: `${train} ${trainName}`,
        coach: coach,
        seatNumber: String(Math.floor(Math.random() * 72) + 1).padStart(2, "0"),
        berth: ["Lower", "Middle", "Upper", "Side Lower", "Side Upper"][Math.floor(Math.random() * 5)],
        vacantTill: toCode,
        fromStation: fromCode,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
      }));

      // Sort seats chronologically
      generatedSeats.sort((a, b) => Number(a.seatNumber) - Number(b.seatNumber));

      setResults(generatedSeats);
      setLoading(false);
    }, 1200);
  };

  const emptyLine = useMemo(() => EMPTY_LINES[Math.floor(Math.random() * EMPTY_LINES.length)], []);

  const headerStats = useMemo(() => [
    { label: "Trains", value: "13k+" },
    { label: "Live", value: "24×7" },
    { label: "Stations", value: "7k+" },
  ], []);

  return (
    <div className="min-h-screen mx-auto max-w-md px-5 pb-24 pt-8 text-slate-200">
      <header className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg">
            <TrainFront className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-slate-100">
              RailVacant
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1">
              seat scanner
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
            live route
          </span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-[2rem] font-black leading-[1.05] tracking-tight text-slate-100">
          <MarkerHighlight 
            before="Find" 
            highlight="empty seats" 
            after="before you board." 
          />
        </h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          crowdsourced vacancy intel for Indian Railways — coach by coach,
          station by station. no cap. 
        </p>

        <div className="flex gap-2 mt-4">
          {headerStats.map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm px-3 py-2 text-center"
            >
              <p className="text-sm font-bold text-slate-200">{s.value}</p>
              <p className="text-[9px] uppercase tracking-widest text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl p-5 border border-white/5 bg-slate-950/60 backdrop-blur-md mb-7 shadow-2xl transition-all duration-300 overflow-hidden">
        
        <Field icon={<Train className="h-4 w-4" />} label="train — drop the digits">
          <input
            value={train}
            onChange={handleTrainChange}
            placeholder="e.g. 12951, 12051, 12627"
            className="w-full bg-transparent outline-none text-base font-semibold text-slate-100 placeholder:text-slate-600"
          />
        </Field>

        <AnimatePresence mode="wait">
          {!trainVerified ? (
            <motion.button
              key="verify-btn"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onClick={verifyTrain}
              disabled={isVerifying || train.length < 5}
              className="w-full h-13 py-4 mt-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/5"
            >
              {isVerifying ? "Locating Train..." : "Find Route 🚂"}
              {!isVerifying && <ArrowRight className="h-4 w-4 opacity-50" />}
            </motion.button>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-1"
            >
              
              <RouteProgress stations={apiStations} active={from} />

              <div className="grid grid-cols-1 gap-3">
                <Field icon={<MapPin className="h-4 w-4" />} label="boarding stn — where u hopping on">
                  <CustomSelect
                    value={from}
                    onChange={(val) => setFrom(val)}
                    options={apiStations.slice(0, -1)} 
                    placeholder="Select boarding station"
                  />
                </Field>

                <Field icon={<Flag className="h-4 w-4" />} label="dropping stn — where u getting off">
                  <CustomSelect
                    value={to}
                    onChange={(val) => setTo(val)}
                    options={validToStations}
                    placeholder="Select drop station"
                  />
                </Field>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-2">
                  <Sofa className="h-3 w-3" /> coach — pick ur whip
                </label>
                <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-1 no-scrollbar">
                  {coaches.map((c) => {
                    const active = c === coach;
                    return (
                      <button
                        key={c}
                        onClick={() => setCoach(c)}
                        className={`shrink-0 px-3.5 py-2 rounded-xl text-sm font-bold transition-all border ${
                          active
                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                            : "bg-transparent text-slate-400 border-white/5 hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={onSearch}
                disabled={loading}
                className="w-full h-13 py-4 mt-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_4px_20px_-4px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_25px_-4px_rgba(99,102,241,0.6)] border border-white/10"
              >
                <Search className="h-4 w-4" />
                {loading ? loadingLine : "clock empty seats 👀"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3 px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            {results
              ? `live scans secured · ${coach} 🔓`
              : "recent scans"}
          </h3>
        </div>

        {loading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl border border-white/5 bg-slate-800/30 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && results && results.length > 0 && (
          <div className="space-y-3">
            {results.map((s, i) => (
              <SeatCard key={i} seat={s} index={i} route={apiStations} />
            ))}
          </div>
        )}

        {!loading && results && results.length === 0 && (
          <div className="rounded-2xl p-6 border border-dashed border-white/10 bg-slate-900/40 backdrop-blur-sm text-center">
            <p className="text-sm text-slate-400">
              nah this coach cooked — try another one 
            </p>
          </div>
        )}

        {!loading && !results && (
          <div className="rounded-2xl p-6 border border-dashed border-white/10 bg-slate-900/40 backdrop-blur-sm text-center">
            <p className="text-sm text-slate-400">{emptyLine}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function RouteProgress({ stations, active }: { stations: string[]; active: string; }) {
  const displayStations =
    stations.length > 8
      ? [
          stations[0],
          stations[Math.floor(stations.length / 2)],
          stations[stations.length - 1],
        ]
      : stations;
  const activeIdx = Math.max(0, stations.indexOf(active));
  const pct =
    stations.length > 1 ? (activeIdx / (stations.length - 1)) * 100 : 0;
  return (
    <div className="mb-4 px-1">
      <div className="flex items-center gap-1.5 mb-2 text-[10px] uppercase tracking-widest text-slate-500">
        <RouteIcon className="h-3 w-3" /> route — big ride
      </div>
      <div className="relative h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between gap-1">
        {displayStations.map((s, i) => {
          const passed = i <= activeIdx;
          const code = s.match(/\(([^)]+)\)/)?.[1] ?? s.slice(0, 3).toUpperCase();
          return (
            <div
              key={s}
              className="flex flex-col items-center gap-1 flex-1 min-w-0"
            >
              <span
                className={`h-2 w-2 rounded-full transition-all ${
                  passed ? "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" : "bg-slate-800"
                }`}
              />
              <span
                className={`text-[9px] font-bold tracking-wider truncate ${
                  passed ? "text-indigo-200" : "text-slate-600"
                }`}
              >
                {code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode; }) {
  return (
    <div className="rounded-2xl px-4 py-3 mb-3 border border-white/5 bg-slate-900/50 shadow-inner">
      <label className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}