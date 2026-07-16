"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const [splashActive, setSplashActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const splashLogoRef = useRef<HTMLImageElement>(null);
  const splashTextRef = useRef<HTMLDivElement>(null);

  // Handle splash screen exit animation
  useGSAP(() => {
    if (!splashLogoRef.current || !splashTextRef.current || !splashRef.current) return;

    const tl = gsap.timeline();

    // Entrance animation
    tl.from(splashLogoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
      .to(splashTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

    // Exit animation
    const timer = setTimeout(() => {
      tl.to(splashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setSplashActive(false);
          // Trigger entry animations for main elements
          gsap.timeline()
            .to(".hero-content h1", { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" })
            .to(".hero-content p", { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
            .to(".cta-btn", { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, { scope: containerRef });

  // Handle active body overflow when splash screen is active
  useEffect(() => {
    if (splashActive) {
      document.body.classList.add("splash-active");
    } else {
      document.body.classList.remove("splash-active");
    }
  }, [splashActive]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main scroll triggers
  useGSAP(() => {
    if (splashActive) return;

    // Visi Misi Reveal
    gsap.from(".visi-box", {
      scrollTrigger: {
        trigger: ".visi-box",
        start: "top 90%"
      },
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.from(".misi-box", {
      scrollTrigger: {
        trigger: ".misi-tujuan-grid",
        start: "top 90%"
      },
      x: -30,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.from(".tujuan-box", {
      scrollTrigger: {
        trigger: ".misi-tujuan-grid",
        start: "top 90%"
      },
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out"
    });

    gsap.from(".program-box", {
      scrollTrigger: {
        trigger: ".misi-tujuan-grid",
        start: "top 90%"
      },
      x: 30,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    // Section Header Reveal
    document.querySelectorAll(".section-header").forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 95%"
        },
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out"
      });
    });

    // Cards Reveal
    gsap.from(".card", {
      scrollTrigger: {
        trigger: ".section-grid",
        start: "top 95%"
      },
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Legalitas Reveal
    gsap.from(".legal-card", {
      scrollTrigger: {
        trigger: ".legal-grid",
        start: "top 90%"
      },
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // Social Connect Reveal
    gsap.from(".social-connect", {
      scrollTrigger: {
        trigger: ".social-connect",
        start: "top 95%"
      },
      scale: 0.98,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Gallery Reveal
    gsap.from(".gallery-item", {
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 90%"
      },
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    });

    // Footer Reveal
    gsap.from(".footer-info", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 85%"
      },
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".footer-links", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 85%"
      },
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.1
    });

  }, { scope: containerRef, dependencies: [splashActive] });

  // Mobile menu stagger anim
  useEffect(() => {
    if (mobileMenuOpen && typeof window !== "undefined") {
      gsap.from(".nav-links li", {
        y: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power4.inOut"
      });
    }
    setMobileMenuOpen(false);
  };

  const handleBackToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: 0,
      ease: "power4.inOut"
    });
  };

  const handleGalleryToggle = () => {
    setShowAllPhotos(!showAllPhotos);
    if (showAllPhotos) {
      const target = document.getElementById("galeri");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const galleryImages = [
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzD38CUHhtxV5wJkE14IPgMgmAT_4ouv_6pAMiUzpW35D8CkUGUv11Whfg-BVUHYAeNLahRBke_gthxckT9AlehEGG2561o21HF6hgvMfN744SzPTMs0Vks_1Xm0T6gAlgJPOtebnJ72VwuJ0h1lJ6wV2aXSECKaPqoIyazFdBPxXL0wLc6E87QDh-LkSP/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.37%20PM.jpeg", alt: "Momen Belajar" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0QZ6-w4J4lNg2iXThsi2eWIAAUXKIujYQFRSNa1APeNCG_BbGWQRypUUG1zsEoslINB__ZldO8mDkAcVJ7hFb9l9tlC96CnJCBYAzHPtRYSfZ0pngXwil-3c0koPRK9Pbs6npYtf5wUomDol29ZJOunslhNutHnS5U63_NcQwnrPuxZCcarvlyDt0d4WM/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.31%20PM%20(1).jpeg", alt: "Interaksi Kelas" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-IjEaswuGJVMvDK-SSGgS4MbHukLyUfBmeJbasbtCHEvBqrX8bo8NXQT_gL67n6vC9uAhtaQKa6EwumawywMjv3gl6_eaWqPyISClPnuxwsNDvqs0wRpu2IrEfop6MYxMFuxKJ9Nm1XN6dKLm8kXNzjD67XL3L9uhT35HuNLAgVOtwIjPjG5Z-dl99sem/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.31%20PM.jpeg", alt: "Kreativitas" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRrEtzTt1YjlHTgt6SdvPhAHQBSIeIdWWYy-6FFAKqnbmM35zT5ice8NU76_7khevvPWWi_989qObpLYy_mfQZRDcf4f4jKdpkqkH23VeCtlXpNakZTnU9EWyYtkT9DlVJnOOjOHhRlk2luim-jzNld8CQOPMyp4nU8UQTQ0iwjl5ubNlGexMHsqPxqnC6/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.32%20PM.jpeg", alt: "Kebersamaan" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnUyobuRyLRNY_b_iOl1Sh1Yd0I1n4Ed7bY-2_P0hq-CPNAIHoJ2L-U5oCeZtXyuNpZcshBkVh-9sfmP2A_epgdB8cX_U1Q6ggF6Gk1tA1j-OekGWbhTjl6Ll021cimCwTeWH2NdIr_T059bigWV3ntZzJX67ObCpxvMxco67CSav9U5APKydLPWxBE4jX/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.33%20PM.jpeg", alt: "Belajar Kelompok" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6Tup4xTQL5OwPsRYgXhe5rBHb8CSv1udMs5xhpN7NzVBuEjS25AxrHEQYBw7GgF3h7hGq_n65Ti86oNVSBoQWe_B9GepYQh-bOA2Jh4ynuMTriIkx-RTMuPaqtX_aW5VPzu0YLGGrxBd0B84M1trzSeQKVKeOOzhCMGmv4YV4ffeOGFp5dMSQqJB0Prky/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.35%20PM.jpeg", alt: "Karakter" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimPSEFxTBUnuff1qkstsSpOL8k_uLnUh1fIWq22VG9kiYuZbVwJfkXurWZRpznZdpcpXSDaN4OWDvyOGd7Wyc0sbK2LOWTaJKtRvVkrhvzCBTCT3EqYohleNNIo6Sxt-POElTOnRR14SlS0U0NhPFi1mM8_WkSWw1MjR4DMqb0aTokrp3q143MbnLm7mQf/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.38%20PM.jpeg", alt: "Keceriaan" },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmbmCt4FD8PIfg6-9vHvr_bINsPeBekUJ9erA28TIqAd-C0XtTn4d8urIG6DC7MDqUG1S1O5L3kCDhMRvNRMbFt7HTy7R5zJ29A38iriuhNVgEeTNvCWkptV2V8orxAplGF1p0yWmCbXz9bdBlEvJc7nOdUcPeD6xRZTGuuoMbW8Hu2l2iyj56UA2Inwdc/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.19.27%20PM%20(1).jpeg", alt: "Prestasi" },
    // Hidden ones initially
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLSNSEgXp0WOapg9Dc2LQRxF1cg6ca_0HoD9Zj078UHEnnRacxqWIke2vBc3PnPP_3is6H_bbQPtCyppuQP73M5ajVHUgAe6dQYb-4sUEvLJJ_zKL0pkbOBrYS8ocpPuEdqmVz3hOr9P_OgnQWcJE9OVZq6W6utxztgjkhobWpC_0eAfB9HoAKyF0pCYT-/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.19.27%20PM%20(2).jpeg", alt: "Eksplorasi", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHlbS1OX5w4388H_7kguk1M7Pe5k8Tql9lNaNYajO1aMZMhm0Mp1vpzhSyaSajQbLV8M1iirII27Oh2se6CoCAKlUYeGvZUEdGxpw6Vu43Bab7j8wKMPirGJNdPBqAs_QofKxjbOYDUpe6QK6EvWmfmdt6O-P2nQuvXzO0Sj4CAwVdALIml2lVufCBbaVt/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.19.27%20PM.jpeg", alt: "Outdoor", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj12AWK_kWYAMxT68-N8a-LLIZQDnEEctogjrmbWpMjomK2FCBMvkBg6Mxqg-9Yjbfr-ZkZMBRKZUnv0RrMXxzFtK2RoSe6TIsU8xWVcUAlCoEttHJXFuHImxgOk9tMN-nH_zmna7uIfR2jk24gnwuJW0I9NQRdbTY25i5j0g1mu-x6FoxmK1BMKXLybWK2/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.19.28%20PM%20(1).jpeg", alt: "Edukasi", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCqXLphAPSj4sI7qmGiPSD4gtBz0jhMN5Rt34Anjz55e9y3hiuzZtecvH4v1guZZviO6Tg-2aDaJ8FiSjrH6Fu2FekmSe39uJPzOumfKIsyIPy7mDSUY0zsz-9-79xSBsRtb1aZNExwaDsPcADjpCI25vAeWrHUjTgn5uOPZd2fzFxw784qDmhjq3fDzoZ/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.19.28%20PM.jpeg", alt: "Semangat", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirUw13g6dCZZrxN4s45EvvjYPS8bQDeHVEu59SqsYD8E0fAFbzLd6ud7VxqtYenG3nyhVPc83kUj6HyxO5PcgnUnhk4k9oPohA08WurhzLJ5YR3H5zVNvdHg0YXXrwIk1tsuS4q7oIWN4NYmHhWQkwWOpv8Usbs7B6Zg5VAwMiBbqvs7nDNnRlnVb3rw9A/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.24.02%20PM.jpeg", alt: "Lingkungan", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdTs5xw4nN5bSXg1eo0C_BViV7yCgjxs_YXFzoG4-fhgy26DFewllRkVpmlZKFatObQyamz-2sZx0zZa8dVcN26wfu3y08qgkbhq0cH-DYOc-aawmwXxPWDcslwPeay5Q7FUp1oZ0D_cHoczGOyn2qerCb67AES5ofVc_lpPN7tXBGuiBGMjtBYjknI0Od/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.25.23%20PM.jpeg", alt: "Inspirasi", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEib21kglKsnuY4hDXE6hyZZaF4rsb2hYUcSQ-C_vzLmceaZnWspppmJ3XqJZ40Y24aPUmzXJLJxesoi2Z105XleZw8I0qHG5PLjDgpBK-GVNXnW1PoAGfvyKr80u3NrzisZVPVjvznpITVCtVvjXRrZtadISe-9FkcjZmLjtzi6JqR4j0JKD0x-qAreiSGo/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.26.05%20PM.jpeg", alt: "Motivasi", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAVvNcKYtkvpboN5xMeR3pZe57_1fNtpdTWLLW-IZgg_4x3qHf4QdmP22VwsV4YppYif-C7pTgaH7Z7wQFD3HZdnHUs5Ts7npf_TZMR-MKmwdpnbhxmMs0p6fKNV2SFtFkV-E9Ld8FPoesa3MoOKFDn1Jk_R4YSCtxJPc4Sfq000eL7vowY1-KBA84cGIh/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.14.57%20PM.jpeg", alt: "Konsentrasi", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1lAPezf8yzhY7_mGsgFJYoYledw7vumWUn4kz05TF3QC6DVS10p-tBmS4trgq_6t5pjCIwAP_ldA2pjsnmWHi5_Y1lK4hHHYtjzFDAl2lcOnwZ9GSp6M0etW82XzmvS0C6ApKPDf561HK_3PKC2ecB1Ra16VerAtP_ttgZdvoL4SmsY0LHdPT6ZNAuvaq/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.30%20PM%20(1).jpeg", alt: "Kenangan", hidden: true },
    { src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqqUuh0fJvX-cBry9xROWpVT0LQ-W4JfIeXJMOAuL1N_bw_xsbZREWfzgDFdoCFULdP_5Ceu6KTclTfjctI22DnsV7W90TjoLSkQpI6qe63snw0FdWOGVXdqPIl6iA-75HhpxNh4r-PbOMMkArgbsj5ekUlkgGMZOTC4jr2vfPHQSYuI_bZmoEJNrPqWmX/s640-rw/WhatsApp%20Image%202026-01-31%20at%202.16.30%20PM.jpeg", alt: "Harmoni", hidden: true }
  ];

  return (
    <div ref={containerRef}>
      {/* Splash Screen */}
      {splashActive && (
        <div id="splash-screen" ref={splashRef}>
          <div className="splash-content">
            <img
              ref={splashLogoRef}
              alt="Logo SASku SDN Loji 3"
              className="splash-logo"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png"
            />
            <div className="splash-text-container" ref={splashTextRef}>
              <div className="splash-welcome">Selamat Datang Di</div>
              <div className="splash-school">SDN LOJI 3 KOTA BOGOR</div>
            </div>
            <div className="loader-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div
        id="progress-bar"
        style={{
          width: splashActive ? "70%" : "100%",
          opacity: splashActive ? 1 : 0,
        }}
      />

      {/* Navigation */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="logo-container">
            <img
              alt="Logo SDN Loji 3"
              height={55}
              width={55}
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtPHqufDTHtf9rny0ccng_oIebm_iQP4-7NAv4_ofQ4ewit8gCmjASFaaW3KoMLM9-Ekq0IiU63LCFrb5-0U0xAuZlff727HQj24v3svnSjR7maQ0nFkpZG4s5srnuC7YH2cJ4kGSw_YYurv9kA-4NRGA5wAIFMiidRXjSUPWxCF8I_mCz55lYQcuhPyse/s72-rw/Logo%20Loji%203.png"
            />
            <div className="school-name">
              SDN LOJI 3<br />
              KOTA BOGOR
            </div>
          </div>
          <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <li><a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>Beranda</a></li>
            <li><a href="#sambutan" onClick={(e) => handleSmoothScroll(e, "sambutan")}>Sambutan</a></li>
            <li><a href="#visi-misi" onClick={(e) => handleSmoothScroll(e, "visi-misi")}>Visi &amp; Misi</a></li>
            <li><a href="#fasilitas" onClick={(e) => handleSmoothScroll(e, "fasilitas")}>Fasilitas</a></li>
            <li><a href="#galeri" onClick={(e) => handleSmoothScroll(e, "galeri")}>Galeri</a></li>
            <li><a href="#berita" onClick={(e) => handleSmoothScroll(e, "berita")}>Berita</a></li>
            <li><a href="#kontak" onClick={(e) => handleSmoothScroll(e, "kontak")}>Kontak</a></li>
          </ul>
          <div
            aria-label="Buka Menu Seluler"
            className="mobile-toggle"
            role="button"
            tabIndex={0}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setMobileMenuOpen(!mobileMenuOpen);
              }
            }}
          >
            <i aria-hidden="true" className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <picture>
          <source
            srcSet="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJxf04zhN5HGNDNg4MTrGVcDifN2-RoO_2T7c9PAximoLBmlkSYuyJFLPMHcDru5W_RLPEGwxbYX2SRiH1T5ingc4XGL7i97TJySj1ot3XsEHKNxweKYgow-lTbbYPeTVmxhNXXssTLpHnZR_ri6OCYA7NBQvT_uyHKHx7NS0ahlSygmZT9HvdKkJL5xbf/s400-rw/hero.png=w400-webp 400w, https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJxf04zhN5HGNDNg4MTrGVcDifN2-RoO_2T7c9PAximoLBmlkSYuyJFLPMHcDru5W_RLPEGwxbYX2SRiH1T5ingc4XGL7i97TJySj1ot3XsEHKNxweKYgow-lTbbYPeTVmxhNXXssTLpHnZR_ri6OCYA7NBQvT_uyHKHx7NS0ahlSygmZT9HvdKkJL5xbf/s800-rw/hero.png=w800-webp 800w"
            type="image/webp"
          />
          <img
            alt="SDN Loji 3 Background"
            className="hero-bg"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJxf04zhN5HGNDNg4MTrGVcDifN2-RoO_2T7c9PAximoLBmlkSYuyJFLPMHcDru5W_RLPEGwxbYX2SRiH1T5ingc4XGL7i97TJySj1ot3XsEHKNxweKYgow-lTbbYPeTVmxhNXXssTLpHnZR_ri6OCYA7NBQvT_uyHKHx7NS0ahlSygmZT9HvdKkJL5xbf/s800-rw/hero.png"
            srcSet="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJxf04zhN5HGNDNg4MTrGVcDifN2-RoO_2T7c9PAximoLBmlkSYuyJFLPMHcDru5W_RLPEGwxbYX2SRiH1T5ingc4XGL7i97TJySj1ot3XsEHKNxweKYgow-lTbbYPeTVmxhNXXssTLpHnZR_ri6OCYA7NBQvT_uyHKHx7NS0ahlSygmZT9HvdKkJL5xbf/s400-rw/hero.png 400w, https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJxf04zhN5HGNDNg4MTrGVcDifN2-RoO_2T7c9PAximoLBmlkSYuyJFLPMHcDru5W_RLPEGwxbYX2SRiH1T5ingc4XGL7i97TJySj1ot3XsEHKNxweKYgow-lTbbYPeTVmxhNXXssTLpHnZR_ri6OCYA7NBQvT_uyHKHx7NS0ahlSygmZT9HvdKkJL5xbf/s800-rw/hero.png 800w"
          />
        </picture>
        <div className="container hero-content">
          <h1>
            Mendidik dengan Hati, <br />
            Menyiapkan Masa Depan
          </h1>
          <p>
            SDN Loji 3 Kota Bogor hadir sebagai ruang belajar yang aman, bermakna, dan menumbuhkan potensi setiap
            anak.
          </p>
          <a className="cta-btn" href="#sambutan" onClick={(e) => handleSmoothScroll(e, "sambutan")}>
            Kenali Kami Lebih Dekat
          </a>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah Section */}
      <section className="sambutan-section" id="sambutan">
        <div className="container">
          <div className="sambutan-grid">
            <div className="sambutan-img-card">
              <div className="sambutan-img-wrapper">
                <img
                  alt="Kepala Sekolah SDN Loji 3"
                  className="sambutan-img"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8ZKEGIVfVogK6GPrqZuflLqMlvwz0g6uEBu8ZrwFF869i9Af026e-pkQ5hIoNAx2SLQmkiCS0xPipAkYtAp3nntLeeptRc9FdncvVov4ubtaGFXdW_oWL9oaTgAhZQ-XO_3BEqtqTUKKNbeZJEDVqNShbulq9EoubgL88B2r6UpmMZHAlvG2W2jXbnR7k/s320/kepsek2.png"
                />
              </div>
              <div className="sambutan-author-info">
                <h3>Syarifah Yuniarti, S.Pd., M.Pd.</h3>
                <p>Kepala SDN Loji 3 Kota Bogor</p>
              </div>
            </div>

            <div className="sambutan-header">
              <span className="sambutan-badge">Sambutan Kepala Sekolah</span>
              <h2>SDN Loji 3 Kota Bogor</h2>
              <span className="sambutan-session">Tahun Ajaran 2026/2027</span>
              <div className="divider-left" />
            </div>

            <div className="sambutan-text">
              <p className="salutation">Assalamu’alaikum warahmatullahi wabarakatuh,</p>
              <p>
                Puji syukur kita panjatkan ke hadirat Allah SWT atas segala rahmat dan karunia-Nya sehingga Website SDN Loji 3 Kota Bogor dapat hadir sebagai sarana informasi, komunikasi, dan publikasi sekolah kepada seluruh warga sekolah dan masyarakat.
              </p>
              <p>
                Dengan penuh rasa syukur dan bangga, saya menyambut seluruh peserta didik, orang tua, tenaga pendidik dan kependidikan, serta masyarakat yang mengunjungi website ini. Website sekolah diharapkan menjadi jendela informasi yang memberikan gambaran tentang berbagai program, kegiatan, prestasi, serta layanan pendidikan yang dilaksanakan di SDN Loji 3.
              </p>
              <p>
                SDN Loji 3 memiliki visi: <strong>“Terwujudnya peserta didik yang cerdas, terampil, dan berbudaya berdasarkan IMTAQ dan IPTEK.”</strong>
              </p>
              <p>
                Untuk mewujudkan visi tersebut, kami terus berupaya menciptakan lingkungan belajar yang aman, nyaman, menyenangkan, dan berkarakter. Melalui pembelajaran yang berkualitas, penguatan nilai-nilai keagamaan, pengembangan literasi, numerasi, teknologi informasi, serta berbagai kegiatan ekstrakurikuler, kami berharap peserta didik dapat tumbuh menjadi generasi yang berprestasi dan memiliki akhlak mulia.
              </p>
              <p>
                Pada Tahun Ajaran 2026/2027, kami berkomitmen untuk meningkatkan mutu layanan pendidikan melalui kolaborasi yang erat antara sekolah, orang tua, komite sekolah, dan seluruh pemangku kepentingan. Dukungan dan partisipasi aktif dari semua pihak menjadi kunci keberhasilan dalam membentuk generasi penerus bangsa yang unggul.
              </p>
              <p>
                Semoga website ini dapat memberikan manfaat, menjadi media yang inspiratif, serta mempererat komunikasi antara sekolah dan masyarakat.
              </p>
              <p>
                Akhir kata, mari bersama-sama melangkah dan berkarya untuk mewujudkan pendidikan yang lebih baik.
              </p>
              <p className="salutation">Wassalamu’alaikum warahmatullahi wabarakatuh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="visi-misi-section" id="visi-misi">
        <div className="container">
          <div className="visi-container">
            <div className="section-header">
              <div className="divider" />
              <h2>Visi, Misi &amp; Tujuan</h2>
              <p>Fondasi utama SDN Loji 3 Bogor dalam membentuk generasi masa depan.</p>
            </div>

            <div className="visi-box">
              <i aria-hidden="true" className="fas fa-quote-left" />
              <h2>Visi Sekolah</h2>
              <p>&quot;Terwujudnya peserta didik yang cerdas, terampil, dan berbudaya berdasarkan IMTAQ dan IPTEK.&quot;</p>
            </div>
          </div>

          <div className="misi-tujuan-grid">
            <div className="misi-box">
              <h2>
                <i aria-hidden="true" className="fas fa-bullseye" /> Misi Kami
              </h2>
              <ul>
                <li>Menanamkan nilai-nilai keimanan, ketakwaan dan membudayakan perilaku religius.</li>
                <li>Meningkatkan prestasi akademik dan non-akademik peserta didik melalui kegiatan intrakurikuler, ekstrakurikuler, dan kokurikuler.</li>
                <li>Membentuk karakter peserta didik melalui kegiatan ekstrakurikuler yang beragam dan pembiasaan nilai-nilai luhur melalui kegiatan kokurikuler.</li>
                <li>Menyelenggarakan pembelajaran yang inovatif yang berkesadaran, bermakna, dan menggembirakan.</li>
                <li>Meningkatkan kompetensi guru melalui pelatihan berkelanjutan dan pengembangan profesional.</li>
                <li>Menyediakan fasilitas dan sumber daya yang memadai untuk mendukung kegiatan pembelajaran dan pengembangan diri peserta didik.</li>
                <li>Membangun kerjasama yang erat dengan orang tua dan masyarakat melalui kegiatan komite sekolah dan program kemitraan.</li>
              </ul>
            </div>

            <div className="tujuan-box">
              <h2>
                <i aria-hidden="true" className="fas fa-star" /> Tujuan Sekolah
              </h2>
              <ul>
                <li>Terbentuknya pribadi peserta didik yang beriman, bertakwa dan berperilaku religius.</li>
                <li>Terbentuknya pribadi peserta didik yang berakhlak mulia.</li>
                <li>Terbentuknya peserta didik yang terampil dalam memanfaatkan teknologi informasi.</li>
                <li>Terwujudnya pembelajaran dengan pendekatan deep learning (pembelajaran mendalam).</li>
                <li>Meningkatnya kompetensi literasi yang terampil dalam mengolah informasi, berkomunikasi dan berinteraksi secara positif.</li>
                <li>Terciptanya lingkungan sekolah yang kondusif, aman, nyaman, tentram, damai, tertib, disiplin, sehat, kekeluargaan dan penuh tanggung jawab.</li>
                <li>Terjalin kerjasama yang harmonis antara sekolah dengan orang tua, masyarakat, dan para stake holder.</li>
              </ul>
            </div>

            <div className="program-box">
              <h2>
                <i aria-hidden="true" className="fas fa-calendar-check" /> Program Sekolah
              </h2>
              <ul>
                <li><strong>SIRAMA:</strong> Senin Upacara Bersama.</li>
                <li><strong>SELAMAT:</strong> Selasa Rabu Kamis Senam Sehat.</li>
                <li><strong>JUM&apos;AT BERSERI:</strong> Bersih, Sehat, Religi.</li>
                <li><strong>BINTANG:</strong> Bina Minat Bakat Menuju Prestasi Gemilang.</li>
                <li><strong>KOIN:</strong> Kelola Uang dengan Inovatif dan Niat Baik.</li>
                <li><strong>BANK JELI:</strong> Bank Jelantah untuk Lingkungan Bersih.</li>
                <li><strong>LOJI 3 BERMITRA:</strong> BERsama MIliki komitmen TRAnsformatif — Program kolaborasi berkelanjutan antara sekolah dan seluruh mitra strategis untuk meningkatkan kualitas layanan pendidikan.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="special-sections" id="fasilitas">
        <div className="container">
          <div className="section-header">
            <div className="divider" />
            <h2>Fasilitas dan Kegiatan Unggulan</h2>
            <p>Kami berkomitmen menyediakan sarana terbaik untuk menunjang perkembangan intelektual dan karakter siswa.</p>
          </div>

          <div className="section-grid">
            {/* Pramuka */}
            <div className="card">
              <div className="card-img">
                <img
                  alt="Logo Pramuka SDN Loji 3"
                  height={320}
                  loading="lazy"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD_8tXBX5aEFdskgl0Ucs4ub-Qu6e9hXMEaeqjWYocR1IznE8ngNWecvGERUGYXNGvi4FMbRFKjBj-m3MCh702a83hD_lnbL21kge4aoU_K2ASImLMRc8uO1Accl1kx9G7nekSVKYV-TVxhJarawGQDOgX-nxh7SnW0coaeTEScsaCqL-F23G7kmhmeK8V/s180-rw/Gudep%20Loji3.jpeg"
                  width={320}
                />
              </div>
              <div className="card-content">
                <h2>Pramuka</h2>
                <p>
                  Berpusat di Pangkalan SD Negeri Loji 3, Gugus Depan 04.213 dan 04.214 menjadi wadah utama
                  pembentukan karakter, kemandirian, dan kerjasama tunas bangsa yang tangguh.
                </p>
              </div>
            </div>

            {/* Perpustakaan */}
            <div className="card">
              <div className="card-img">
                <img
                  alt="Logo Perpustakaan Loji 3"
                  height={320}
                  loading="lazy"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_Gybh_RbdC6gl3pcytOABOYjNmcFBFCxMy14mm32CEYoUKDfC8l0ozO2gnyKNVJ_-aNw82SOeHk4OqlGrF_0ru0iomdrQTlfObAwh3L6K7VuX6Yi106KmYrJKuGB3ZejYASY0YzRRLSw2FI_aaxh9cBcMymQlJoMYsfMHH84XetgRbQ59HELEu3Sfv7nF/s180-rw/Desain%20tanpa%20judul%20(1).png"
                  width={320}
                />
              </div>
              <div className="card-content">
                <h2>Perpustakaan</h2>
                <p>
                  Hadir dengan koleksi yang terus berkembang, Perpustakaan SDN Loji 3 menjadi pusat literasi
                  dan eksplorasi ilmu pengetahuan bagi seluruh warga sekolah.
                </p>
              </div>
            </div>

            {/* Lab Komputer */}
            <div className="card">
              <div className="card-img">
                <img
                  alt="Logo Lab Komputer SDN Loji 3"
                  height={320}
                  loading="lazy"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgkUgKi1zJMkWPKHydo-3SygiH8LnmyACmJvOJ7BFaD24ond1ng3_Tkzbk3R5yEPCNwcUXDaE3bLOgt1cQmlIqmlij78KKQTugnlmsyZNSsJOV-2VKCkyU3UQ-Hy6ARoOHInnwQdRmQqxlVRFpGtPK5_uzI2sjfIQ7Bw9sO2JTbBmwiQGDGGRaKI3M0KWVU/s180-rw/Desain%20tanpa%20judul%20(2).png"
                  width={320}
                />
              </div>
              <div className="card-content">
                <h2>Lab Komputer</h2>
                <p>
                  Dilengkapi dengan fasilitas perangkat komputer untuk mendukung pembelajaran Teknologi
                  Informasi dan Komunikasi serta literasi digital siswa.
                </p>
              </div>
            </div>

            {/* Gedung dan Lapangan */}
            <div className="card">
              <div className="card-img">
                <img
                  alt="Gedung &amp; Lapangan SDN Loji 3"
                  height={320}
                  loading="lazy"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiG29ToSgTtHcQahvN0aOjntidmunbWLPljCRtHFGTclaxnFkwMmKJe1ODWeTLolngu3UW7Vzmz3NTEYdvpE9ITOIfHhFFlw5Lwfh2Wgbf4kjz1wYNG8yva2sCaH5y-soA_kYEB-MYlytQpxXMtXONqh2-7BF4CmW2bQn3dYyWlhgdkZaZsP4QaIhAlJhqm/w322-h429/gedung%20dan%20lapangan.jpeg"
                  width={320}
                />
              </div>
              <div className="card-content">
                <h2>Gedung dan Lapangan</h2>
                <p>
                  Fasilitas gedung yang representatif serta lapangan yang cukup luas untuk mendukung aktivitas
                  olahraga, upacara, dan kegiatan luar ruangan siswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas Section */}
      <section className="legal-section" id="legalitas">
        <div className="container">
          <div className="section-header">
            <div className="divider" />
            <h2>Legalitas dan Data Sekolah</h2>
            <p>Data resmi SDN Loji 3 Bogor yang terintegrasi dengan database Kemendikdasmen.</p>
          </div>

          <div className="legal-grid">
            <div className="legal-card">
              <img
                alt="NPSN Logo"
                height={30}
                loading="lazy"
                src="https://kemendikdasmen.go.id/web/image/res.company/1/logo/unique_id"
                width={157}
              />
              <h2>NPSN</h2>
              <p>20220446</p>
              <a
                aria-label="Cek Data Referensi NPSN 20220446"
                className="legal-link"
                href="https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/20220446"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cek Data Referensi
              </a>
            </div>
            <div className="legal-card">
              <img
                alt="Sekolah Kita Logo"
                height={60}
                loading="lazy"
                src="https://sekolah.data.kemendikdasmen.go.id/assets/images/logo-sekolah-kita.svg"
                width={60}
              />
              <h2>Profil Sekolah</h2>
              <p>A (Unggul)</p>
              <a
                aria-label="Cek Profil Sekolah Kita - SDN Loji 3"
                className="legal-link"
                href="https://sekolah.data.kemendikdasmen.go.id/profil-sekolah/209E8405-2DF5-E011-BB1B-D160E5BF4E5B"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cek Sekolah Kita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="galeri">
        <div className="container">
          <div className="section-header">
            <div className="divider" />
            <h2>Galeri Kami</h2>
            <p>Momen-momen berharga dan keceriaan kami dalam berbagai kegiatan di SDN Loji 3 Bogor.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, index) => {
              if (img.hidden && !showAllPhotos) return null;
              return (
                <div key={index} className="gallery-item">
                  <img
                    alt={`Kegiatan Siswa SDN Loji 3 Bogor - ${img.alt}`}
                    height={480}
                    loading="lazy"
                    src={img.src}
                    width={640}
                  />
                </div>
              );
            })}
          </div>
          <div className="view-all-container">
            <button className="btn-view-all" id="btnViewAll" onClick={handleGalleryToggle}>
              {showAllPhotos ? "Sembunyikan Foto" : "Lihat Semua Foto"}
            </button>
          </div>
        </div>
      </section>

      {/* News dan Social Section */}
      <section className="news-section" id="berita">
        <div className="container">
          <div className="section-header">
            <div className="divider" />
            <h2>Berita Terbaru</h2>
            <p>Pantau terus kegiatan seru kami di berbagai kanal media sosial resmi SDN Loji 3 Bogor.</p>
          </div>

          <div className="social-connect">
            <h2>Mari Terhubung!</h2>
            <p>Klik logo di bawah untuk mengunjungi profil sosial media kami.</p>
            <div className="social-links">
              <a
                aria-label="Kunjungi profil TikTok resmi SDN Loji 3 Bogor"
                className="social-link tiktok"
                href="https://www.tiktok.com/@sdnloji3bogor"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-tiktok" />
                <span>@sdnloji3bogor</span>
              </a>
              <a
                aria-label="Kunjungi profil Instagram resmi SDN Loji 3 Bogor"
                className="social-link instagram"
                href="https://www.instagram.com/sdn_loji3/?hl=id"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram" />
                <span>@Sdnlojitiga</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h2>SDN Loji 3 Bogor</h2>
              <p>
                SDN Loji 3 Kota Bogor adalah sekolah yang berkomitmen membentuk peserta didik yang cerdas,
                terampil, dan berbudaya dengan menjadikan IMTAQ sebagai fondasi karakter serta IPTEK sebagai
                bekal menghadapi masa depan.
              </p>
            </div>
            <div className="footer-map">
              <h2>Lokasi Sekolah</h2>
              <iframe
                allowFullScreen={true}
                height={200}
                loading="lazy"
                src="https://maps.google.com/maps?q=-6.5903,106.7667&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                style={{ border: 0, borderRadius: "20px", width: "100%" }}
                title="Peta Lokasi SDN Loji 3"
              />
            </div>
            <div className="footer-links" id="kontak">
              <h2>Hubungi Kami</h2>
              <ul>
                <li>
                  <a
                    aria-label="Buka Lokasi Sekolah di Google Maps: Jl. Loji Kp No.136, Bogor Barat"
                    href="https://maps.app.goo.gl/1KFSFmSVw7vXxpXDA"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i aria-hidden="true" className="fas fa-map-marker-alt" />
                    Jl. Loji Kp No.136, RT.05/RW.05, Loji, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16117
                  </a>
                </li>
                <li>
                  <a aria-label="Kirim Email Resmi ke: sdnegeriloji3@gmail.com" href="mailto:sdnegeriloji3@gmail.com">
                    <i aria-hidden="true" className="fas fa-envelope" />
                    sdnegeriloji3@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &#169; 2026 SDN Loji 3 Bogor. Powered By{" "}
            <a
              className="dev-link"
              href="https://pancakalabs.my.id"
              rel="noopener noreferrer"
              target="_blank"
            >
              PancakaLabs
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        aria-label="Kembali ke Atas"
        id="backToTop"
        className={showBackToTop ? "show" : ""}
        onClick={handleBackToTop}
        title="Kembali ke Atas"
        type="button"
      >
        <i aria-hidden="true" className="fas fa-arrow-up" />
      </button>
    </div>
  );
}
