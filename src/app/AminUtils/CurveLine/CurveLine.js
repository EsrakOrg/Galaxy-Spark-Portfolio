"use client";

import React, { useEffect, useRef, useState } from "react";
import "./CurveLine.scss";

const CurveLine = () => {
      const path = useRef(null);
      let progress = 0;
      let x = 0.5;
      let time = Math.PI / 2;
      let reqId = null;

      // Ensure rendering only happens on the client
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
            setMounted(true);
      }, []);

      useEffect(() => {
            if (mounted) {
                  setPath(progress);
            }
      }, [mounted]);

      const setPath = (progress) => {
            const width = window.innerWidth * 0.7;
            path.current.setAttribute(
                  "d",
                  `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
            );
      };

      const lerp = (x, y, a) => x * (1 - a) + y * a;

      const manageMouseEnter = () => {
            if (reqId) {
                  cancelAnimationFrame(reqId);
                  resetAnimation();
            }
      };

      const manageMouseMove = (e) => {
            const { movementY, clientX } = e;
            const pathBound = path.current.getBoundingClientRect();
            x = (clientX - pathBound.left) / pathBound.width;
            progress += movementY;
            setPath(progress);
      };

      const manageMouseLeave = () => {
            animateOut();
      };

      const animateOut = () => {
            const newProgress = progress * Math.sin(time);
            progress = lerp(progress, 0, 0.025);
            time += 0.2;
            setPath(newProgress);
            if (Math.abs(progress) > 0.75) {
                  reqId = requestAnimationFrame(animateOut);
            } else {
                  resetAnimation();
            }
      };

      const resetAnimation = () => {
            time = Math.PI / 2;
            progress = 0;
      };

      if (!mounted) {
            // Skip rendering on the server
            return null;
      }

      return (
            <div className="line">
                  <div
                        onMouseEnter={() => {
                              manageMouseEnter();
                        }}
                        onMouseMove={(e) => {
                              manageMouseMove(e);
                        }}
                        onMouseLeave={() => {
                              manageMouseLeave();
                        }}
                        className="box"
                  ></div>
                  <svg>
                        <path ref={path}></path>
                  </svg>
            </div>
      );
};

export default CurveLine;
