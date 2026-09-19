"use client";
import Link from "next/link";
import {Arrow,Photo} from "./site";

export default function Hero(){return <section className="object-hero shell" aria-labelledby="hero-title">
 <div className="object-hero-top label"><span>EQUIPMENT FOR PEOPLE WHO TRAIN.</span><span>THE TEMPER COLLECTION / 2026</span></div>
 <div className="hero-intent"><h1 id="hero-title">DON’T JUST<br/>WORK OUT.<span className="sr-only">TRAIN.</span></h1><p>Equipment for people serious<br/>about getting stronger.</p><Link className="hero-explore" href="#equipment">EXPLORE EQUIPMENT<span><Arrow/></span></Link></div>
 <div className="hero-object"><Photo name="gripper" alt="Sculptural close-up of an unbranded steel gripper concept: a polished spring and deeply textured handles" priority/></div>
 <div className="hero-object-caption label"><span className="caption-line"/><span>002 / GRIP 150<br/><span className="muted">STRENGTH STARTS HERE.</span></span></div>
 <div className="hero-monument" aria-hidden="true">TRAIN.</div>
 <div className="object-hero-bottom label"><a href="#manifesto" className="scroll-link">SCROLL TO EXPLORE<span>↓</span></a><Link href="#commercial">EQUIP YOUR GYM <Arrow/></Link><span>PROTOTYPE OBJECT / SPECIFICATIONS TO BE CONFIRMED</span></div>
 </section>}
