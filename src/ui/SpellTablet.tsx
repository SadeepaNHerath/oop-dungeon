import { useState } from 'react'
import { Highlight, themes, Prism } from 'prism-react-renderer'
import type { PuzzleFile } from '../puzzles/types'
import { cn } from './cn'

interface SpellTabletProps {
  code: string
  files?: PuzzleFile[]
  filename?: string
}

export function SpellTablet({ code, files, filename }: SpellTabletProps) {
  const language = Prism.languages.java ? 'java' : 'clike'
  const tabs = files && files.length > 0 ? files : null
  const [tab, setTab] = useState(0)
  const source = tabs ? tabs[Math.min(tab, tabs.length - 1)].contents : code
  const name = tabs
    ? tabs[Math.min(tab, tabs.length - 1)].path
    : (filename ?? 'SpellTablet.java')

  return (
    <div className="overflow-hidden rounded-xl border border-rune/30 bg-[#011627] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-blood/80" />
        <span className="size-2 rounded-full bg-rune/80" />
        <span className="size-2 rounded-full bg-moss/80" />
        {tabs ? (
          <div className="ml-2 flex flex-wrap gap-1">
            {tabs.map((file, index) => (
              <button
                key={file.path}
                type="button"
                onClick={() => setTab(index)}
                className={cn(
                  'rounded px-2 py-0.5 font-mono text-xs',
                  index === tab ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white',
                )}
              >
                {file.path}
              </button>
            ))}
          </div>
        ) : (
          <span className="ml-2 font-mono text-xs text-white/50">{name}</span>
        )}
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={source.trimEnd()}
        language={language}
        prism={Prism}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} m-0 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 inline-block w-6 select-none text-right text-white/30">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
