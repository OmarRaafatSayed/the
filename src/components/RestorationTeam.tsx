
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: "Amira", role: "", image: "/images/team/Amira.jpeg" },
  { name: "Konoz", role: "", image: "/images/team/konoz.jpeg" },
  { name: "Maryam Tabark", role: "", image: "/images/team/Maryam tabark.jpeg" },
  { name: "Mayar", role: "", image: "/images/team/Mayar.jpeg" },
  { name: "Omar Raafat", role: "", image: "/images/team/Omar raafat.jpeg" },
  { name: "Samar Atef", role: "", image: "/images/team/samar atef.jpeg" },
  { name: "Shahd Mohamed", role: "", image: "/images/team/Shahd mohamed.jpeg" },
  { name: "Waad", role: "", image: "/images/team/waad.jpeg" },
];

export function RestorationTeam() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-8 md:px-24 py-16 bg-background">
      <div className="w-full max-w-[1400px] space-y-16">
        {/* Editorial Header */}
        <div className="space-y-4 border-l-4 border-primary pl-8">
          <span className="text-[10px] font-mono tracking-[0.5em] text-primary/60 uppercase">Scientific_Consortium</span>
          <h2 className="text-6xl font-headline font-bold text-foreground italic leading-none">Research Group</h2>
          <p className="text-sm text-foreground/40 font-mono tracking-widest uppercase">Archive_Protocol_013_Participants</p>
        </div>

        {/* 13 Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-12 gap-x-8 items-start justify-center">
        {teamMembers.map((member, i) => (
            <div 
              key={member.name} 
              className="flex flex-col items-center text-center space-y-4 group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="relative">
                {/* Decorative Ring */}
                <div className="absolute -inset-2 border border-primary/10 rounded-full scale-100 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-700" />
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-background shadow-2xl transition-all duration-700">
                  <AvatarImage src={member.image} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{member.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider leading-tight px-2">{member.name}</h4>
                {member.role && <p className="text-[8px] text-primary font-mono uppercase tracking-[0.2em]">{member.role}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="pt-8 flex justify-between items-center border-t border-foreground/5 opacity-20">
          <span className="text-[8px] font-mono uppercase tracking-[0.4em]">Heritage_Systems_Archive</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
