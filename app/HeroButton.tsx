'use client';

import { useRef } from 'react';

export default function HeroButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a className="primary-button" href="#tool" ref={ref}>
      Get Started Free <span aria-hidden="true">↓</span>
    </a>
  );
}
