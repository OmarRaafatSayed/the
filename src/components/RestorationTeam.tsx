
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const supervisor = { name: "Dr. Ola Mohamed", role: "Supervisor", image: "" };

const teamMembers = [
  { name: "Amira", role: "", image: "/images/team/amira-mohamed.jpeg" },
  { name: "Konoz", role: "", image: "/images/team/konoz-salem.jpeg" },
  { name: "Maryam Tabark", role: "", image: "/images/team/maryam-tabark.jpeg" },
  { name: "Maryam Esmail", role: "", image: "/images/team/maryam-esmail.jpeg" },
  { name: "Mayar", role: "", image: "/images/team/mayar-ali.jpeg" },
  { name: "Omar Raafat", role: "", image: "/images/team/omar-raafat.jpeg" },
  { name: "Samar Atef", role: "", image: "/images/team/samar-atef.jpeg" },
  { name: "Shahd Mohamed", role: "", image: "/images/team/shahd-mohamed.jpeg" },
  { name: "Waad", role: "", image: "/images/team/waad-waled.jpeg" },
  { name: "Safia", role: "", image: "/images/team/safia-sayed.jpeg" },
  { name: "Kamal", role: "", image: "" },
  { name: "Manar", role: "", image: "" },
  { name: "Abdulrahman", role: "", image: "" },
];

export function RestorationTeam() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-24 py-12 sm:py-14 md:py-16 bg-background">
      <div className="w-full max-w-[1400px] space-y-8 sm:space-y-10 md:space-y-16">
        {/* Editorial Header */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 border-l-4 border-primary pl-4 sm:pl-6 md:pl-8">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-primary/60 uppercase">Scientific_Consortium</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground italic leading-none">Research Group</h2>
          <p className="text-xs sm:text-sm text-foreground/40 font-mono tracking-widest uppercase">Archive_Protocol_013_Participants</p>
        </div>

        {/* Supervisor — full row, centered */}
        <div className="flex justify-center">
          <div
            className="flex flex-col items-center text-center space-y-3 group animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <div className="relative">
              <div className="absolute -inset-2 border border-primary/20 rounded-full scale-100 group-hover:scale-110 group-hover:border-primary/60 transition-all duration-700" />
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-primary/30 shadow-2xl transition-all duration-700">
                <AvatarImage src={supervisor.image} />
                <AvatarFallback className="bg-primary/15 text-primary font-bold text-base">
                  {supervisor.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] sm:text-[12px] font-bold text-foreground uppercase tracking-wider leading-tight">
                {supervisor.name}
              </h4>
              <p className="text-[8px] text-primary font-mono uppercase tracking-[0.3em]">
                {supervisor.role}
              </p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-6 sm:gap-y-8 md:gap-y-12 gap-x-3 sm:gap-x-4 md:gap-x-8 items-start justify-center">
        {teamMembers.map((member, i) => (
            <div 
              key={member.name} 
              className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4 group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="relative">
                <div className="absolute -inset-1.5 sm:-inset-2 border border-primary/10 rounded-full scale-100 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-700" />
                <Avatar className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-background shadow-2xl transition-all duration-700">
                  <AvatarImage src={member.image} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs sm:text-sm">{member.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-foreground uppercase tracking-wider leading-tight px-1">{member.name}</h4>
                {member.role && <p className="text-[7px] sm:text-[8px] text-primary font-mono uppercase tracking-[0.2em]">{member.role}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 border-t border-foreground/5 opacity-20">
          <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em]">Heritage_Systems_Archive</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
