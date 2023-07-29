import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

const ParticlesComponent = (props) => {
  const options = useMemo(() => {
    return {
      background: {
        color: "#1A1B1F",
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 10,
          },
          repulse: {
            distance: 100,
          },
        },
      },
      particles: {
        color: {
          value: "#f84246", // A shade of blue (you can change it as desired)
        },
        links: {
          color: "#f84246", // Blue links between particles
          enable: true,
          distance: 150, // Reduced the distance for better visibility
          opacity: 0.5, // Reduce the opacity of the links
        },
        move: {
          enable: true,
          speed: { min: 2, max: 4 }, // Slightly reduced speed for a calmer effect
        },
        opacity: {
          value: { min: 0.6, max: 1 }, // Increased minimum opacity for better visibility
        },
        shape: {
          type: "circle", // Change the particle shape to circle (you can use 'square', 'triangle', etc.)
          stroke: {
            width: 2,
            color: "#f84246", // Stroke color to match the particle color
          },
        },
        size: {
          value: { min: 4, max: 8 }, // Increase the size range for larger particles
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
