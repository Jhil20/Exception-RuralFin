import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGSAP = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configure default ease
    gsap.config({
      nullTargetWarn: false
    });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export const fadeInAnimation = (element, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay,
    ease: 'power3.out'
  });
};

export const staggerAnimation = (elements, stagger = 0.1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger,
    duration: 0.8,
    ease: 'power2.out'
  });
};
