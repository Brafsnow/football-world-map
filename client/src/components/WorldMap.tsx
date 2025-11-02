import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { footballClubs, type FootballClub } from "@/data/clubs";

// Fix pour les icônes Leaflet avec Vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WorldMapProps {
  onClubClick?: (club: FootballClub) => void;
}

export default function WorldMap({ onClubClick }: WorldMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialiser la carte
    const map = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 3);
    mapRef.current = map;

    // Style moderne et minimaliste avec fond clair (CartoDB Positron)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      minZoom: 2,
      noWrap: true,
      subdomains: "abcd",
    }).addTo(map);

    // Limiter les bounds de la carte pour éviter la répétition
    const southWest = L.latLng(-85, -180);
    const northEast = L.latLng(85, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
    });

    // Fonction pour obtenir le logo du club depuis une API
    const getClubLogo = (clubId: string) => {
      // Logos locaux (prioritaires)
      const localLogos: Record<string, string> = {
        sporting: "/logos/sporting.png",
        atleticomadrid: "/logos/atleticomadrid.png",
        alnassr: "/logos/alnassr.png",
        besiktas: "/logos/besiktas.png",
        fenerbahce: "/logos/fenerbahce.png",
        intermiami: "/logos/intermiami.png",
        alahli: "/logos/al-ahlisaudifc.png",
        alhilal: "/logos/alhilalsfc.png",
        alittihad: "/logos/alittihadclub.png",
        atleticomineiro: "/logos/atleticomineiro.png",
        basaksehir: "/logos/istanbulbasaksehir.png",
        braga: "/logos/scbraga.png",
        brighton: "/logos/brightonhovealbion.png",
        clubbrugge: "/logos/clubbrugge.png",
        frankfurt: "/logos/eintrachtfrankfurt.png",
        gremio: "/logos/gremiofbpa.png",
        guimaraes: "/logos/vitoriasc.png",
        independiente: "/logos/caindependiente.png",
        internacional: "/logos/scinternacional.png",
        konyaspor: "/logos/konyaspor.png",
        lafc: "/logos/losangelesfc.png",
        lagalaxy: "/logos/lagalaxy.png",
        leverkusen: "/logos/bayerleverkusen.png",
        nottinghamforest: "/logos/nottinghamforest.png",
        nycfc: "/logos/newyorkcityfc.png",
        paok: "/logos/paokthessaloniki.png",
        racing: "/logos/racingclub.png",
        realbetis: "/logos/realbetis.png",
        realsociedad: "/logos/realsociedad.png",
        sanlorenzo: "/logos/sanlorenzo.png",
        saopaulo: "/logos/saopaulofc.png",
        seattle: "/logos/seattlesoundersfc.png",
        stuttgart: "/logos/vfbstuttgart.png",
        trabzonspor: "/logos/trabzonspor.png",
        unionsg: "/logos/unionsaintgilloise.png",
        villarreal: "/logos/villarrealcf.png",
      };

      // Si le logo local existe, l'utiliser
      if (localLogos[clubId]) {
        return localLogos[clubId];
      }

      // Sinon, utiliser les URLs Wikimedia
      const logoMap: Record<string, string> = {
        psg: "https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/150px-Paris_Saint-Germain_Logo.svg.png",
        om: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/150px-Olympique_Marseille_logo.svg.png",
        ol: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Olympique_Lyonnais_logo.svg/150px-Olympique_Lyonnais_logo.svg.png",
        manutd: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/150px-Manchester_United_FC_crest.svg.png",
        liverpool: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/150px-Liverpool_FC.svg.png",
        arsenal: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/150px-Arsenal_FC.svg.png",
        chelsea: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/150px-Chelsea_FC.svg.png",
        realmadrid: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/150px-Real_Madrid_CF.svg.png",
        barcelona: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/150px-FC_Barcelona_%28crest%29.svg.png",
        atletico: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/150px-Atletico_Madrid_2017_logo.svg.png",
        bayern: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/150px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
        dortmund: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/150px-Borussia_Dortmund_logo.svg.png",
        juventus: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg/150px-Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg.png",
        milan: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/150px-Logo_of_AC_Milan.svg.png",
        inter: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/150px-FC_Internazionale_Milano_2021.svg.png",
        benfica: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/150px-SL_Benfica_logo.svg.png",
        porto: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/150px-FC_Porto.svg.png",
        ajax: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/150px-Ajax_Amsterdam.svg.png",
        anderlecht: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/RSC_Anderlecht_logo.svg/150px-RSC_Anderlecht_logo.svg.png",
        galatasaray: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Galatasaray_Sports_Club_Logo.png/150px-Galatasaray_Sports_Club_Logo.png",
        boca: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/CABJ_Logo.svg/150px-CABJ_Logo.svg.png",
        river: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/150px-Escudo_del_C_A_River_Plate.svg.png",
        flamengo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flamengo-RJ_%28BRA%29.png/150px-Flamengo-RJ_%28BRA%29.png",
        sporting: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Sporting_Clube_de_Portugal_logo.svg/150px-Sporting_Clube_de_Portugal_logo.svg.png",
        napoli: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Neapel.svg/150px-SSC_Neapel.svg.png",
        roma: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/AS_Roma_logo_%282017%29.svg/150px-AS_Roma_logo_%282017%29.svg.png",
        lazio: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/S.S._Lazio_badge.svg/150px-S.S._Lazio_badge.svg.png",
        sevilla: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/150px-Sevilla_FC_logo.svg.png",
        valencia: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/150px-Valenciacf.svg.png",
        tottenham: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/150px-Tottenham_Hotspur.svg.png",
        mancity: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/150px-Manchester_City_FC_badge.svg.png",
        leicester: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/150px-Leicester_City_crest.svg.png",
        psv: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/PSV_Eindhoven.svg/150px-PSV_Eindhoven.svg.png",
        feyenoord: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Feyenoord_logo.svg/150px-Feyenoord_logo.svg.png",
        celtic: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Celtic_FC.svg/150px-Celtic_FC.svg.png",
        rangers: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Rangers_FC.svg/150px-Rangers_FC.svg.png",
        olympiacos: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Olympiacos_FC_logo.svg/150px-Olympiacos_FC_logo.svg.png",
        fenerbahce: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Fenerbahce.svg/150px-Fenerbahce.svg.png",
        besiktas: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Be%C5%9Fikta%C5%9F_JK_logo_%282019%29.svg/150px-Be%C5%9Fikta%C5%9F_JK_logo_%282019%29.svg.png",
        shakhtar: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/FC_Shakhtar_Donetsk.svg/150px-FC_Shakhtar_Donetsk.svg.png",
        palmeiras: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/150px-Palmeiras_logo.svg.png",
        corinthians: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/S.C._Corinthians_Paulista_crest.svg/150px-S.C._Corinthians_Paulista_crest.svg.png",
        santos: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/150px-Santos_logo.svg.png",
        lille: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Losc_lille_logo.svg/150px-Losc_lille_logo.svg.png",
        monaco: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/AS_Monaco_FC_logo.svg/150px-AS_Monaco_FC_logo.svg.png",
        newcastle: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/150px-Newcastle_United_Logo.svg.png",
        astonvilla: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/150px-Aston_Villa_FC_crest_%282016%29.svg.png",
        brighton: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/150px-Brighton_%26_Hove_Albion_logo.svg.png",
        nottinghamforest: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/150px-Nottingham_Forest_F.C._logo.svg.png",
        athletic: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/150px-Club_Athletic_Bilbao_logo.svg.png",
        realsociedad: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/150px-Real_Sociedad_logo.svg.png",
        realbetis: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/150px-Real_betis_logo.svg.png",
        villarreal: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Villarreal_CF_logo-en.svg/150px-Villarreal_CF_logo-en.svg.png",
        leverkusen: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/150px-Bayer_04_Leverkusen_logo.svg.png",
        leipzig: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/150px-RB_Leipzig_2014_logo.svg.png",
        frankfurt: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/150px-Eintracht_Frankfurt_Logo.svg.png",
        stuttgart: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/150px-VfB_Stuttgart_1893_Logo.svg.png",
        atalanta: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Atalanta_BC_logo.svg/150px-Atalanta_BC_logo.svg.png",
        fiorentina: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/ACF_Fiorentina.svg/150px-ACF_Fiorentina.svg.png",
        bologna: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Bologna_F.C._1909_logo.svg/150px-Bologna_F.C._1909_logo.svg.png",
        braga: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Sporting_Clube_de_Braga_Logo.svg/150px-Sporting_Clube_de_Braga_Logo.svg.png",
        guimaraes: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vit%C3%B3ria_S.C._logo.svg/150px-Vit%C3%B3ria_S.C._logo.svg.png",
        clubbrugge: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Club_Brugge_KV_logo.svg/150px-Club_Brugge_KV_logo.svg.png",
        unionsg: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Royale_Union_Saint-Gilloise_logo.svg/150px-Royale_Union_Saint-Gilloise_logo.svg.png",
        paok: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/PAOK_FC_logo.svg/150px-PAOK_FC_logo.svg.png",
        saopaulo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/150px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
        trabzonspor: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Trabzonspor_logo.svg/150px-Trabzonspor_logo.svg.png",
        basaksehir: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Istanbul_Basaksehir_FK_logo.svg/150px-Istanbul_Basaksehir_FK_logo.svg.png",
        konyaspor: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Konyaspor_logo.svg/150px-Konyaspor_logo.svg.png",
        lafc: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Los_Angeles_FC_logo.svg/150px-Los_Angeles_FC_logo.svg.png",
        lagalaxy: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/LA_Galaxy_logo.svg/150px-LA_Galaxy_logo.svg.png",
        intermiami: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Inter_Miami_CF_logo.svg/150px-Inter_Miami_CF_logo.svg.png",
        nycfc: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/New_York_City_FC.svg/150px-New_York_City_FC.svg.png",
        seattle: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Seattle_Sounders_FC.svg/150px-Seattle_Sounders_FC.svg.png",
        alhilal: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Al-Hilal_Saudi_FC_Logo.svg/150px-Al-Hilal_Saudi_FC_Logo.svg.png",
        alnassr: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Al-Nassr_FC_Logo.svg/150px-Al-Nassr_FC_Logo.svg.png",
        alittihad: "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Al-Ittihad_Club_Logo.svg/150px-Al-Ittihad_Club_Logo.svg.png",
        alahli: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Al-Ahli_Saudi_FC_Logo.svg/150px-Al-Ahli_Saudi_FC_Logo.svg.png",
        gremio: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gremio.svg/150px-Gremio.svg.png",
        internacional: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/150px-Escudo_do_Sport_Club_Internacional.svg.png",
        atleticomineiro: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.svg/150px-Atletico_mineiro_galo.svg.png",
        racing: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Escudo_de_Racing_Club_%282014%29.svg/150px-Escudo_de_Racing_Club_%282014%29.svg.png",
        independiente: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg/150px-Escudo_del_Club_Atl%C3%A9tico_Independiente.svg.png",
        sanlorenzo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escudo_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro.svg/150px-Escudo_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro.svg.png",
      };
      return logoMap[clubId] || "";
    };

    // Ajouter les marqueurs pour chaque club
    footballClubs.forEach((club) => {
      const logoUrl = getClubLogo(club.id);
      
      // Créer une icône personnalisée avec le logo du club
      const clubIcon = L.divIcon({
        className: "custom-club-marker",
        html: `<div class="marker-container">
          <div class="marker-logo-wrapper">
            <img src="${logoUrl}" alt="${club.name}" class="marker-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="marker-fallback" style="display: none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a10 10 0 0 0 0 20"/>
              </svg>
            </div>
          </div>
          <div class="marker-pulse"></div>
        </div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
      });
      
      const marker = L.marker([club.latitude, club.longitude], {
        icon: clubIcon,
      }).addTo(map);

      // Créer le contenu du popup
      const popupContent = `
        <div class="club-popup">
          <h3 class="font-bold text-lg mb-1">${club.name}</h3>
          <p class="text-sm text-muted-foreground mb-2">${club.stadium}</p>
          <p class="text-xs mb-3">${club.city}, ${club.country}</p>
          <button 
            class="popup-button w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            data-club-id="${club.id}"
          >
            Voir la billetterie
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: "custom-popup",
      });

      // Gérer le clic sur le bouton du popup
      marker.on("popupopen", () => {
        const button = document.querySelector(
          `[data-club-id="${club.id}"]`
        ) as HTMLButtonElement;
        if (button) {
          button.addEventListener("click", () => {
            onClubClick?.(club);
          });
        }
      });
    });

    // Nettoyage
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onClubClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

