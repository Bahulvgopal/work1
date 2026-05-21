"use client";

import { useState } from "react";

import InvitationOpening from "@/components/InvitationOpening";
// import FloatingFlowers from "@/components/FloatingFlowers";
import Countdown from "@/components/Countdown";
import EventSchedule from "@/components/EventSchedule";
import WeddingTimeline from "@/components/WeddingTimeline";
import Gallery from "@/components/Gallery";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import MusicPlayer from "@/components/MusicPlayer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
export default function Home() {
  const [isInvitationOpen, setIsInvitationOpen] =
    useState(false);

  return (
    <>
      <InvitationOpening
        isOpen={isInvitationOpen}
        onOpen={() =>
          setIsInvitationOpen(true)
        }
      />

      {/* <FloatingFlowers /> */}

        <Navbar />

      <main className="relative z-10">
        {/* HERO */}
        <Hero />

        {/* COUNTDOWN */}
        <Countdown />


        <ContactSection />

        
        {/* EventSchedule */}
        <EventSchedule />


        {/* <WeddingTimeline /> */}


        <Gallery />


        <MapSection />


        


        <MusicPlayer />


        <Footer/>
      </main>
    </>
  );
}