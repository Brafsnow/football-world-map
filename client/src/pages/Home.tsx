import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WorldMap from "@/components/WorldMap";
import { type FootballClub, footballClubs } from "@/data/clubs";
import { Globe, MapPin, Ticket } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleClubClick = (club: FootballClub) => {
    setLocation(`/club/${club.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header avec design moderne */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Football World Map
                </h1>
                <p className="text-sm text-slate-600 font-medium">
                  Billetterie des {footballClubs.length} plus grands clubs du monde
                </p>
              </div>
            </div>
            
            {/* Badge du nombre de clubs */}
            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
              <Ticket className="h-5 w-5" />
              <span className="font-bold text-lg">{footballClubs.length}</span>
              <span className="text-sm opacity-90">clubs</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌍 Découvrez les clubs de football du monde entier
            </h2>
            <p className="text-lg md:text-xl text-blue-50 mb-6">
              Explorez notre carte interactive et accédez aux billetteries officielles et plateformes de revente 
              (StubHub, Viagogo, Football Tickets) pour {footballClubs.length} clubs prestigieux.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🇪🇺 Europe • 🇺🇸 Amériques • 🇸🇦 Moyen-Orient
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                ⚽ Messi • Ronaldo • Neymar • Benzema
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte principale avec design amélioré */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="shadow-2xl border-2 border-blue-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  Carte Interactive Mondiale
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  Cliquez sur un marqueur pour accéder aux informations et à la billetterie du club
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[600px] md:h-[700px] relative">
              <WorldMap onClubClick={handleClubClick} />
              
              {/* Overlay d'instructions */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
                <h3 className="font-bold text-lg mb-2 text-blue-900">💡 Comment utiliser</h3>
                <ul className="text-sm space-y-1 text-slate-700">
                  <li>🖱️ <strong>Cliquez</strong> sur un logo pour voir le club</li>
                  <li>🔍 <strong>Zoomez</strong> pour explorer une région</li>
                  <li>🎫 <strong>4 sources</strong> de billetterie par club</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">{footballClubs.length}</div>
              <div className="text-sm opacity-90">Clubs disponibles</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">18</div>
              <div className="text-sm opacity-90">Pays représentés</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-sm opacity-90">Sources billetterie</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">⭐</div>
              <div className="text-sm opacity-90">Clubs prestigieux</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer amélioré */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Football World Map</span>
            </div>
            <p className="text-slate-300 mb-2">
              Accédez aux billetteries des plus grands clubs de football
            </p>
            <p className="text-sm text-slate-400">
              {footballClubs.length} clubs • 18 pays • 4 plateformes de billetterie
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

