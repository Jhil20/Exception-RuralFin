import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import MoneyMaze from '../components/MoneyMaze';
import FarmToFortune from '../components/FarmToFortune';

function Game() {
  const mountRef = useRef(null);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      camera.position.z = 5;
    };

    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    handleResize();
    window.addEventListener('resize', handleResize);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      <button
        type="button" // Changed from 'submit' to 'button'
        className="cursor-pointer"
        onClick={() => {
          console.log('click');
          navigate('/money');
        }}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#4299e1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Money Maze
      </button>

      <button
        type="button" // Changed from 'submit' to 'button'
        className="cursor-pointer"
        onClick={() => {
          console.log('click');
          navigate('/farm');
        }}
        style={{
          position: "absolute",
          zIndex: 2,
          top: '100px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#4299e1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Farm To Fortune
      </button>
      {/* <Routes>
        <Route path="/" element={<GameSelection setShowGame={setShowGame} />} />
        <Route
          path="/game"
          element={
            showGame === 'moneyMaze' ? (
              <MoneyMaze onExit={() => setShowGame(false)} />
            ) : showGame === 'farmToFortune' ? (
              <FarmToFortune onExit={() => setShowGame(false)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/money" element={<MoneyMaze />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> */}
    </div>
  );
}

export default Game;
