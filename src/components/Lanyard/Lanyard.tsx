/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../../assets/lanyard/card.glb';
import lanyard from '../../assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

interface BadgeDetails {
  name?: string;
  role?: string;
  initials?: string;
  phone?: string;
  github?: string;
  email?: string;
  avatar?: string;
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  badge?: BadgeDetails;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  badge
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-stage relative z-0 flex h-full min-h-[430px] w-[300%] -ml-[100%] origin-center scale-100 items-start justify-center overflow-visible pt-0">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        style={{ width: '100%', height: '100%', minHeight: isMobile ? 430 : 'calc(100vh - 16px)' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0xffffff), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} badge={badge} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  badge?: BadgeDetails;
}

function createBadgeTexture(details?: BadgeDetails, avatarImgElement?: HTMLImageElement | null) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const name = details?.name ?? 'Ravish Paul';
  const role = details?.role ?? 'AI & LLM Developer';
  const initials = details?.initials ?? 'RP';
  const email = details?.email ?? 'ravishdemo@gmail.com';
  const github = details?.github ?? 'Ravish-sketch';
  const phone = details?.phone ?? '';

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  const scale = 0.88;
  ctx.translate(canvas.width * (1 - scale) / 2 - 90, canvas.height * (1 - scale) / 2);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#171717';
  ctx.fillRect(0, 0, canvas.width, 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 42px Inter, Arial, sans-serif';
  ctx.fillText('AI & LLM DEVELOPER', 72, 82);

  // Main white container
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 92, 205, 840, 640, 44);
  ctx.fill();
  ctx.strokeStyle = '#d4d4d4';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Premium circular avatar container (wrapped in horizontal compression to compensate for Three.js mesh stretching)
  const photoSizeX = 420; // Increased size: 380 -> 420
  const photoSizeY = 420; // Increased size: 380 -> 420
  const photoX = 132; // Shifted 8px left: 140 -> 132
  const photoY = 225; // Adjusted for larger size
  const centerX = photoX + photoSizeX / 2;
  const centerY = photoY + photoSizeY / 2;
  const radius = photoSizeX / 2;
  
  ctx.save();
  // Compress horizontally by 30% (0.70) to achieve a perfect circular shape on the 3D mesh
  ctx.translate(centerX, centerY);
  ctx.scale(0.70, 1.0);
  ctx.translate(-centerX, -centerY);

  ctx.fillStyle = '#171717';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  if (avatarImgElement) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();
    
    const imgAspect = avatarImgElement.width / avatarImgElement.height;
    const containerAspect = photoSizeX / photoSizeY;
    let drawWidth = photoSizeX;
    let drawHeight = photoSizeY;
    let drawX = photoX;
    let drawY = photoY;
    
    if (imgAspect > containerAspect) {
      drawWidth = photoSizeY * imgAspect;
      drawX = photoX + (photoSizeX - drawWidth) / 2;
    } else {
      drawHeight = photoSizeX / imgAspect;
      drawY = photoY + (photoSizeY - drawHeight) / 2;
    }
    
    ctx.drawImage(avatarImgElement, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 120px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials.toUpperCase(), centerX, centerY);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

  // Contact Info Box inside the main white container
  ctx.fillStyle = '#ffffff';
  const showPhone = !!phone;
  const boxHeight = showPhone ? 190 : 140;
  roundRect(ctx, 92, 670, 800, boxHeight, 24); // Height dynamically adjusted for phone number
  ctx.fill();
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.fillStyle = '#262626';
  ctx.font = '700 26px Inter, Arial, sans-serif';
  if (showPhone) {
    ctx.fillText(`Email:  ${email}`, 145, 718);
    ctx.fillText(`GitHub: ${github}`, 145, 768);
    ctx.fillText(`Phone:  ${phone}`, 145, 818);
  } else {
    ctx.fillText(`Email:  ${email}`, 145, 725);
    ctx.fillText(`GitHub: ${github}`, 145, 775);
  }

  // Name & Role text below white container
  ctx.fillStyle = '#171717';
  ctx.font = '800 68px Inter, Arial, sans-serif';
  wrapText(ctx, name, 92, 955, 800, 84); // Shifted right on canvas (left on 3D card): 72 + 20 = 92
  
  ctx.fillStyle = '#525252';
  ctx.font = '700 44px Inter, Arial, sans-serif';
  wrapText(ctx, role, 92, 1025, 800, 64); // Shifted right on canvas (left on 3D card): 72 + 20 = 92

  // Footer separator and branding text
  ctx.fillStyle = '#e5e5e5';
  ctx.fillRect(92, 1140, 800, 4); // Shifted right on canvas (left on 3D card): 72 + 20 = 92
  ctx.fillStyle = '#6b7280';
  ctx.font = '700 30px Inter, Arial, sans-serif';
  ctx.fillText('RAG  ·  AGENTS  ·  AUTOMATION', 92, 1200); // Shifted right on canvas (left on 3D card): 72 + 20 = 92

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let lineY = y;

  words.forEach(word => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
      ctx.fillText(line.trim(), x, lineY);
      line = `${word} `;
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  });

  ctx.fillText(line.trim(), x, lineY);
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, badge }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  
  const [avatarImgElement, setAvatarImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (badge?.avatar) {
      const img = new Image();
      img.src = badge.avatar;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setAvatarImgElement(img);
      };
    } else {
      setAvatarImgElement(null);
    }
  }, [badge?.avatar]);

  const badgeTexture = useMemo(() => createBadgeTexture(badge, avatarImgElement), [badge, avatarImgElement]);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.15]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.15]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.15]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 2.92, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      if (!dragged) {
        // card.current?.wakeUp();
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[-0.25, 5.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.7, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.2, 1.75, 0.01]} />
          <group
            scale={3.5}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={badgeTexture || materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#2f2f2f"
          depthTest
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={0.58}
        />
      </mesh>
    </>
  );
}
