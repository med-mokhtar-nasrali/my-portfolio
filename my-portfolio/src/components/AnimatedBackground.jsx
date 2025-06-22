import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
    const mount = useRef(null);

    useEffect(() => {
        let frameId;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.current.appendChild(renderer.domElement);

        // ⭐ simple star‑field
        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 1000; i++) {
            starVertices.push((Math.random() - 0.5) * 1000);
            starVertices.push((Math.random() - 0.5) * 1000);
            starVertices.push((Math.random() - 0.5) * 1000);
        }
        starGeo.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(starVertices, 3)
        );
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // 🌀 animate
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            stars.rotation.x += 0.0005;
            stars.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        // 📏 resize handling
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        // 🧹 cleanup
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", onResize);
            mount.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mount} className="fixed inset-0 -z-10" />;
}