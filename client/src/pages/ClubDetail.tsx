import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { footballClubs } from "@/data/clubs";
import { ArrowLeft, ExternalLink, MapPin, Trophy, Ticket } from "lucide-react";
import { useLocation, useRoute } from "wouter";

// Fonction pour obtenir le logo du club
const getClubLogo = (clubId: string): string => {
  // Logos locaux (prioritaires)
  const localLogos: Record<string, string> = {
    sporting: "/logos/sporting.png",
    atleticomadrid: "/logos/atleticomadrid.png",
    alnassr: "/logos/alnassr.png",
    besiktas: "/logos/besiktas.png",
    fenerbahce: "/logos/fenerbahce.png",
    intermiami: "/logos/intermiami.png",
  };

  // Si le logo local existe, l'utiliser
  if (localLogos[clubId]) {
    return localLogos[clubId];
  }

  // Sinon, utiliser les URLs Wikimedia (même mapping que WorldMap.tsx)
  const logoMap: Record<string, string> = {
    psg: "https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/150px-Paris_Saint-Germain_Logo.svg.png",
    om: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/150px-Olympique_Marseille_logo.svg.png",
    ol: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Olympique_Lyonnais_logo.svg/150px-Olympique_Lyonnais_logo.svg.png",
    realmadrid: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/150px-Real_Madrid_CF.svg.png",
    barcelona: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/150px-FC_Barcelona_%28crest%29.svg.png",
    liverpool: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/150px-Liverpool_FC.svg.png",
    manutd: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/150px-Manchester_United_FC_crest.svg.png",
    arsenal: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/150px-Arsenal_FC.svg.png",
    chelsea: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/150px-Chelsea_FC.svg.png",
    bayern: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/150px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    dortmund: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/150px-Borussia_Dortmund_logo.svg.png",
    juventus: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg/150px-Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg.png",
    milan: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/150px-Logo_of_AC_Milan.svg.png",
    inter: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/150px-FC_Internazionale_Milano_2021.svg.png",
    benfica: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/150px-SL_Benfica_logo.svg.png",
    porto: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/150px-FC_Porto.svg.png",
    ajax: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/150px-Ajax_Amsterdam.svg.png",
    galatasaray: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Galatasaray_Sports_Club_Logo.png/150px-Galatasaray_Sports_Club_Logo.png",
    boca: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/CABJ_Logo.svg/150px-CABJ_Logo.svg.png",
    river: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/150px-Escudo_del_C_A_River_Plate.svg.png",
    flamengo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flamengo-RJ_%28BRA%29.png/150px-Flamengo-RJ_%28BRA%29.png",
  };
  
  return logoMap[clubId] || "";
};

export default function ClubDetail() {
  const [, params] = useRoute("/club/:id");
  const [, setLocation] = useLocation();

  const club = footballClubs.find((c) => c.id === params?.id);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Club introuvable</CardTitle>
            <CardDescription>
              Le club que vous recherchez n'existe pas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la carte
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header avec navigation */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            size="sm"
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la carte
          </Button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête du club */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-100 p-2">
                <img 
                  src={getClubLogo(club.id)} 
                  alt={`Logo ${club.name}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback vers les initiales si le logo ne charge pas
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-blue-600');
                      parent.innerHTML = `<span class="text-white text-3xl font-bold">${club.name.substring(0, 2).toUpperCase()}</span>`;
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-slate-900">
                  {club.name}
                </h1>
                <div className="flex items-center gap-4 text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{club.city}, {club.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{club.league}</span>
                  </div>
                </div>
                {club.description && (
                  <p className="text-slate-700 text-lg">{club.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Informations du stade */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Stade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{club.stadium}</h3>
                  <p className="text-muted-foreground">
                    {club.city}, {club.country}
                  </p>
                </div>
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-slate-600">
                    <strong>Coordonnées :</strong> {club.latitude.toFixed(4)}°N, {club.longitude.toFixed(4)}°E
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section billetterie */}
          <Card className="border-2 border-primary mb-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Ticket className="h-6 w-6" />
                Billetterie
              </CardTitle>
              <CardDescription>
                Réservez vos places pour les prochains matchs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Billetterie officielle */}
              {club.ticketUrl && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Billetterie officielle</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Achetez vos billets directement auprès du club
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(club.ticketUrl, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Billetterie officielle {club.name}
                  </Button>
                </div>
              )}

              {/* Plateformes de revente */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg mb-3">Plateformes de revente</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Trouvez des billets sur les marchés secondaires
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {club.stubhubUrl && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(club.stubhubUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      StubHub
                    </Button>
                  )}
                  {club.viagogoUrl && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(club.viagogoUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Viagogo
                    </Button>
                  )}
                  {club.footballTicketsUrl && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(club.footballTicketsUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Football Tickets
                    </Button>
                  )}
                </div>
              </div>

              {!club.ticketUrl && !club.stubhubUrl && !club.viagogoUrl && !club.footballTicketsUrl && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    La billetterie pour ce club sera bientôt disponible.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section informations complémentaires */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations pratiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Pays</span>
                  <span className="font-medium">{club.country}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Ville</span>
                  <span className="font-medium">{club.city}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Championnat</span>
                  <span className="font-medium">{club.league}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Stade</span>
                  <span className="font-medium">{club.stadium}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

