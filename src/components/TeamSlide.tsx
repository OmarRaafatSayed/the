"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  { name: "Ahmed Salem", role: "Principal Investigator", id: "1" },
  { name: "Sarah Khan", role: "Conservation Lead", id: "2" },
  { name: "Omar Farouk", role: "Structural Analysis", id: "3" },
];

export function TeamSlide() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-8 md:px-16 py-16">
      <div className="w-full max-w-[1400px] space-y-20">
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/60">The Visionaries</span>
          <h2 className="text-6xl md:text-7xl font-headline font-bold text-foreground">Research Group</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 flex-1 w-full">
            {team.map((member) => (
              <div key={member.id} className="group space-y-6 text-center">
                <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48">
                  <div className="absolute -inset-4 border border-primary/10 rounded-full scale-100 group-hover:scale-105 transition-transform duration-700" />
                  <Avatar className="w-full h-full border-4 border-background shadow-2xl">
                    <AvatarImage src={`https://i.pravatar.cc/300?u=${member.id}`} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-headline font-bold tracking-tight text-foreground">{member.name}</h4>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block w-[1px] h-64 bg-foreground/10 self-center rounded-full" />

          <div className="space-y-8 min-w-[200px] bg-card/50 p-8 rounded-3xl border border-foreground/5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Other Participants</h5>
            <ul className="space-y-4 text-foreground/50 font-light tracking-wide">
              {["Nour Idris", "Zaid Amari", "Layla Hassan", "Hana Refaat", "Mostafa Gad"].map(name => (
                <li key={name} className="flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}