/** Scroll-driven recorded update workflow. The lazy player never auto-plays. */
import type { CSSProperties } from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { ArrowRight, Check, Circle, ShieldCheck, TriangleAlert } from 'lucide-react'
import { WALL_STATIONS, stationConfirm, stationFinalLabel, stationOutcome, stationStart } from './labels'
import type { WallLabels, WallLayout, WallStation } from './labels'

export type FlightPollProps = { labels: WallLabels; layout: WallLayout }
const C = {
 bg: 'var(--bg-elev)', sunk:'var(--bg-sunk)', fg:'var(--fg)', muted:'var(--fg-muted)', rule:'var(--rule)',
 accent:'var(--accent-text)', soft:'var(--accent-soft)', hold:'var(--hold)', holdSoft:'var(--hold-soft)',
}
const sans = 'var(--font-sans)'
const mono = 'var(--font-mono)'
const ease = (value:number) => 1 - Math.pow(1-value,3)
function currentIndex(frame:number) {
 const index = WALL_STATIONS.findIndex((s,i)=> frame >= stationStart(s) && (i === WALL_STATIONS.length-1 || frame < stationStart(WALL_STATIONS[i+1])))
 return Math.max(0,index)
}
function StateIcon({ station, complete, size=24 }: {station:WallStation;complete:boolean;size?:number}) {
 const outcome=stationOutcome(station)
 const Icon = !complete ? Circle : outcome==='hold' ? TriangleAlert : outcome==='standby' ? Circle : Check
 return <Icon size={size} strokeWidth={1.6} style={{flexShrink:0,color:complete && outcome==='hold' ? C.hold : complete && outcome==='go' ? C.accent : C.muted}} />
}
function Artwork({ index, portrait }: { index:number;portrait:boolean }) {
 const panel = index===4 ? 1 : index===6 || index===5 ? 2 : 0
 const style:CSSProperties={position:'absolute',width:'300%',maxWidth:'none',height:'100%',objectFit:'cover',left:`${panel*-100}%`}
 return <div style={{width:portrait?200:270,height:portrait?200:270,position:'relative',overflow:'hidden',flexShrink:0}}>
  <img className="feature-image-light" src="/images/workflow-triptych.webp" style={style} alt="" />
  <img className="feature-image-dark" src="/images/workflow-triptych-dark.webp" style={style} alt="" />
 </div>
}
function StepList({ labels, frame, active, portrait }: {labels:WallLabels;frame:number;active:number;portrait:boolean}) {
 return <div style={{display:'grid',gridTemplateColumns:portrait?'1fr 1fr':'1fr',gap:portrait?'14px 30px':'4px'}}>
  {WALL_STATIONS.map((station,index)=>{
   const complete=frame>=stationConfirm(station)
   const selected=index===active
   return <div key={station.id} style={{display:'flex',alignItems:'center',gap:portrait?16:22,padding:portrait?'16px 0':'18px 20px',background:selected?C.soft:'transparent',borderRadius:2,minWidth:0}}>
    <span style={{fontFamily:mono,fontSize:portrait?25:21,width:portrait?34:28,flexShrink:0,color:selected?C.accent:C.muted}}>{String(index+1).padStart(2,'0')}</span>
    <span style={{fontSize:portrait?28:26,fontWeight:selected?600:400,lineHeight:1.25,color:selected?C.fg:C.muted,flex:1}}>
      {labels[station.name]}
      {complete && stationOutcome(station) !== 'go' && <span style={{display:'block',fontSize:portrait?23:20,fontWeight:400,marginTop:6,color:stationOutcome(station)==='hold'?C.hold:C.muted}}>{stationFinalLabel(station,labels)}</span>}
    </span>
    <StateIcon station={station} complete={complete} size={portrait?26:24}/>
   </div>
  })}
 </div>
}
export function FlightPollComposition({ labels, layout }: FlightPollProps) {
 const frame=useCurrentFrame()
 const portrait=layout==='portrait'
 const active=currentIndex(frame)
 const station=WALL_STATIONS[active]
 const complete=frame>=stationConfirm(station)
 const outcome=stationOutcome(station)
 const elapsed=Math.max(0,frame-stationStart(station))
 const enter=ease(interpolate(elapsed,[0,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}))
 const body=portrait?31:25
 const finished=frame>=stationConfirm(WALL_STATIONS[WALL_STATIONS.length-1])
 const warning=WALL_STATIONS.flatMap(step=>step.rows).find(row=>row.outcome==='hold' && frame>=row.confirm)
 return <AbsoluteFill style={{background:C.bg,color:C.fg,fontFamily:sans,fontVariantLigatures:'none',padding:portrait?'48px 50px':'44px 52px',border:`1px solid ${C.rule}`,borderRadius:2}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:portrait?30:28,borderBottom:`1px solid ${C.rule}`,gap:30}}>
   <span style={{fontSize:portrait?36:30,fontWeight:500,letterSpacing:'-0.03em'}}>{labels['wall.screen.title']}</span>
   <span style={{fontSize:portrait?24:21,color:C.muted}}>{labels['wall.screen.example']}</span>
  </div>
  <div style={{display:'grid',gridTemplateColumns:portrait?'1fr':'480px minmax(0,1fr)',gap:portrait?36:64,flex:1,minHeight:0,paddingTop:portrait?34:36}}>
   <div style={{order:portrait?2:0,paddingRight:portrait?0:36,borderRight:portrait?undefined:`1px solid ${C.rule}`}}>
    <StepList labels={labels} frame={frame} active={active} portrait={portrait}/>
   </div>
   <div style={{display:'flex',flexDirection:'column',minWidth:0,order:portrait?1:0}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:24,alignItems:'center',minHeight:portrait?240:280}}>
     <div style={{minWidth:0,transform:`translateY(${(1-enter)*12}px)`,opacity:0.65+enter*0.35}}>
      <p style={{fontSize:portrait?26:22,color:C.muted,margin:'0 0 18px'}}>{labels['wall.screen.current']} {active+1} / {WALL_STATIONS.length}</p>
      <h2 style={{fontSize:portrait?50:54,fontWeight:500,lineHeight:1.1,letterSpacing:'-0.035em',margin:0}}>{labels[station.name]}</h2>
      <p style={{fontSize:body,lineHeight:1.5,color:C.muted,margin:'20px 0 0'}}>{labels[station.desc]}</p>
     </div>
     <Artwork index={active} portrait={portrait}/>
    </div>
    <div style={{marginTop:portrait?24:22,borderTop:`1px solid ${C.rule}`,paddingTop:22}}>
     {station.rows.map(row=>{
      const confirmed=frame>=row.confirm
      const warning=confirmed&&row.outcome==='hold'
      return <div key={row.id} style={{marginBottom:16,padding:warning?'20px 24px':'10px 0',background:warning?C.holdSoft:'transparent',color:warning?C.hold:C.fg,borderRadius:2}}>
       {row.subject&&<div style={{fontSize:portrait?32:28,fontWeight:500,marginBottom:12}}>{row.subject}</div>}
       {row.from&&row.to&&<div style={{display:'flex',alignItems:'center',gap:20,fontFamily:mono,fontSize:portrait?32:30,color:confirmed?C.accent:C.muted,marginBottom:12}}><span style={{color:C.muted}}>{row.from}</span><ArrowRight size={26}/><span style={{opacity:confirmed?1:0.5}}>{row.to}</span></div>}
       {(confirmed?row.done:row.pending)&&<div style={{display:'flex',alignItems:'flex-start',gap:12,fontSize:body-1,lineHeight:1.45}}>{warning&&<TriangleAlert size={26} style={{flexShrink:0,marginTop:3}}/>}<span>{labels[(confirmed?row.done:row.pending)!]}</span></div>}
      </div>
     })}
    </div>
    {station.note&&<div style={{display:'flex',alignItems:'flex-start',gap:14,fontSize:body-2,lineHeight:1.45,color:C.muted,marginTop:'auto',paddingTop:16}}><ShieldCheck size={27} style={{color:C.accent,flexShrink:0}}/><span>{labels[station.note]}</span></div>}
    <div style={{marginTop:'auto',paddingTop:20,display:'flex',gap:12,alignItems:'center',fontSize:portrait?26:22,color:complete&&outcome==='hold'?C.hold:complete&&outcome==='go'?C.accent:C.muted}}><StateIcon station={station} complete={complete}/><span>{complete?stationFinalLabel(station,labels):labels['wall.state.polling']}</span></div>
   </div>
  </div>
  <div style={{display:'flex',alignItems:'center',gap:14,paddingTop:portrait?26:24,marginTop:portrait?24:20,borderTop:`1px solid ${C.rule}`,fontSize:portrait?24:21,lineHeight:1.4,color:C.muted}}>
   {finished?<Check size={24} style={{color:C.accent,flexShrink:0}}/>:<Circle size={22} style={{flexShrink:0}}/>}
   <span>{finished?labels['wall.screen.complete']:labels['wall.screen.running']}</span>
   {warning && <span style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10,color:C.hold}}><TriangleAlert size={23} /><span>{warning.subject} · {labels['wall.state.hold']}</span></span>}
  </div>
 </AbsoluteFill>
}
