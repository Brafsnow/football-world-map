import { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { footballClubs } from "@/data/clubs";
import { useLocation } from "wouter";

export default function GlobeMap() {
  const globeEl = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!globeEl.current) return;

    // Créer le globe
    const globe = Globe()
      (globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointOfView({ altitude: 2.5 })
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25);

    // Préparer les données des clubs
    const clubsData = footballClubs.map(club => ({
      lat: club.latitude,
      lng: club.longitude,
      name: club.name,
      city: club.city,
      country: club.country,
      id: club.id,
      color: getClubColor(club.country)
    }));

    // Ajouter les marqueurs des clubs
    globe
      .pointsData(clubsData)
      .pointAltitude(0.01)
      .pointRadius(0.3)
      .pointColor('color')
      .pointLabel((d: any) => `
        <div style="background: rgba(0,0,0,0.9); padding: 12px; border-radius: 8px; color: white; font-family: system-ui;">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">${d.name}</div>
          <div style="font-size: 14px; opacity: 0.9;">${d.city}, ${d.country}</div>
        </div>
      `)
      .onPointClick((point: any) => {
        setLocation(`/club/${point.id}`);
      })
      .pointsMerge(false);

    // Ajouter des arcs entre les clubs pour un effet visuel
    const arcsData = [];
    for (let i = 0; i < Math.min(20, footballClubs.length); i++) {
      const startClub = footballClubs[i];
      const endClub = footballClubs[(i + 10) % footballClubs.length];
      arcsData.push({
        startLat: startClub.latitude,
        startLng: startClub.longitude,
        endLat: endClub.latitude,
        endLng: endClub.longitude,
        color: ['rgba(255, 100, 100, 0.3)', 'rgba(100, 100, 255, 0.3)']
      });
    }

    globe
      .arcsData(arcsData)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(3000)
      .arcStroke(0.5);

    // Animation de rotation automatique
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Responsive
    const handleResize = () => {
      globe.width(window.innerWidth);
      globe.height(window.innerHeight - 200);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      globe._destructor();
    };
  }, [setLocation]);

  return (
    <div className="relative w-full">
      <div ref={globeEl} className="w-full" />
      
      {/* Légende */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 max-w-xs">
        <h3 className="font-semibold text-lg mb-2">🌍 Globe Interactif</h3>
        <ul className="text-sm space-y-1 text-slate-700">
          <li>• <strong>Cliquez</strong> sur un point pour voir le club</li>
          <li>• <strong>Glissez</strong> pour faire tourner le globe</li>
          <li>• <strong>Scroll</strong> pour zoomer/dézoomer</li>
          <li>• <strong>{footballClubs.length} clubs</strong> dans le monde</li>
        </ul>
      </div>

      {/* Compteur de clubs */}
      <div className="absolute top-8 right-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg shadow-xl p-6 text-center">
        <div className="text-4xl font-bold">{footballClubs.length}</div>
        <div className="text-sm opacity-90 mt-1">Clubs disponibles</div>
      </div>
    </div>
  );
}

// Fonction pour attribuer une couleur selon le pays
function getClubColor(country: string): string {
  const colorMap: Record<string, string> = {
    "France": "#0055A4",
    "Angleterre": "#C8102E",
    "Espagne": "#AA151B",
    "Allemagne": "#000000",
    "Italie": "#009246",
    "Portugal": "#006600",
    "Pays-Bas": "#FF6C00",
    "Belgique": "#FFD100",
    "Écosse": "#0065BF",
    "Grèce": "#0D5EAF",
    "Turquie": "#E30A17",
    "Ukraine": "#FFD700",
    "Argentine": "#74ACDF",
    "Brésil": "#009C3B",
    "États-Unis": "#B22234",
    "Arabie Saoudite": "#165B33"
  };
  
  return colorMap[country] || "#3B82F6";
}

