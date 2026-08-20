import { useState } from 'react'
import { useGame } from './store/gameStore'
import { BattleView } from './ui/BattleView'
import { Codex } from './ui/Codex'
import { DungeonMap } from './ui/DungeonMap'
import { GameOver } from './ui/GameOver'
import { Hud } from './ui/Hud'
import { MiniQuiz } from './ui/MiniQuiz'
import { Roadmap } from './ui/Roadmap'
import { SecretsVault } from './ui/SecretsVault'
import { TitleScreen } from './ui/TitleScreen'
import { WhyPanel } from './ui/WhyPanel'
import { ZoneComplete } from './ui/ZoneComplete'
import { ZoneNotes } from './ui/ZoneNotes'

export default function App() {
  const phase = useGame((s) => s.state.phase)
  const openSecretsVault = useGame((s) => s.openSecretsVault)
  const [codexOpen, setCodexOpen] = useState(false)
  const showHud = phase !== 'title'

  return (
    <div className="min-h-svh bg-ink bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(232,184,109,0.12),transparent),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(125,211,208,0.08),transparent)] text-parchment">
      {showHud ? (
        <Hud
          onOpenCodex={() => setCodexOpen(true)}
          onOpenSecrets={() => openSecretsVault()}
        />
      ) : null}
      {phase === 'title' ? (
        <TitleScreen onOpenStudy={() => setCodexOpen(true)} />
      ) : null}
      {phase === 'hub' ? <Roadmap /> : null}
      {phase === 'notes' ? <ZoneNotes /> : null}
      {phase === 'quiz' ? <MiniQuiz /> : null}
      {phase === 'map' ? <DungeonMap /> : null}
      {phase === 'battle' ? <BattleView /> : null}
      {phase === 'feedback' ? <WhyPanel /> : null}
      {phase === 'gameOver' ? <GameOver /> : null}
      {phase === 'zoneClear' ? <ZoneComplete /> : null}
      {phase === 'courseClear' ? <SecretsVault /> : null}
      {codexOpen ? <Codex onClose={() => setCodexOpen(false)} /> : null}
    </div>
  )
}
