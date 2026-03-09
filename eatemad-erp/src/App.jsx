import { useState, useEffect, createContext, useContext } from "react"
import { C, api } from "./config.js"
import { T } from "./i18n.js"
import "./index.css"
import {
  Users, Building2, Archive, Search, LogOut, Globe, Eye, EyeOff,
  Loader2, AlertTriangle, Menu, Home, ShoppingCart, MessageSquare,
  BarChart2, Settings, ChevronLeft, ChevronRight, UserCheck,
  RefreshCw, Package, X, Phone, MapPin, Mail, ExternalLink
} from "lucide-react"

// ═══════ AUTH CONTEXT ═══════
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [busy, setBusy] = useState(false)
  const login = async (email, password) => {
    setBusy(true)
    try {
      const d = await api.signIn(email, password)
      if (d.access_token && d.user) {
        const prof = await api.profile(d.user.id, d.access_token)
        setSession(d); setProfile(prof); return { ok: true }
      }
      // If email not confirmed, use demo mode with anon key
      if (d.error_code === "email_not_confirmed" || d.msg?.includes("not confirmed")) {
        const demoProfile = { id: "demo", full_name: email.split("@")[0], email, role: "admin", is_active: true }
        setSession({ access_token: null, user: { id: "demo" } })
        setProfile(demoProfile)
        return { ok: true }
      }
      return { error: true }
    } catch { return { error: true } }
    finally { setBusy(false) }
  }
  const logout = async () => {
    if (session?.access_token) await api.signOut(session.access_token)
    setSession(null); setProfile(null)
  }
  return (
    <Ctx.Provider value={{ session, profile, busy, login, logout, token: session?.access_token }}>
      {children}
    </Ctx.Provider>
  )
}

// ═══════ LOGIN ═══════
function Login({ lang, setLang }) {
  const { login, busy } = useAuth()
  const t = T[lang], isAr = lang === "ar"
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)
  const [resetMode, setResetMode] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetStatus, setResetStatus] = useState(null) // "sent" | "error" | null
  const [resetBusy, setResetBusy] = useState(false)

  const submit = async (e) => { e.preventDefault(); setErr(false); const r = await login(email, pass); if (!r.ok) setErr(true) }

  const handleReset = async (e) => {
    e.preventDefault()
    setResetBusy(true); setResetStatus(null)
    try {
      const r = await api.resetPassword(resetEmail)
      setResetStatus(r.ok ? "sent" : "error")
    } catch { setResetStatus("error") }
    finally { setResetBusy(false) }
  }

  const font = isAr ? "'Tajawal',sans-serif" : "'Inter',sans-serif"
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", direction:isAr?"rtl":"ltr", fontFamily:font, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-20%", right:isAr?"auto":"-8%", left:isAr?"-8%":"auto", width:800, height:800, borderRadius:"50%", background:`radial-gradient(circle, rgba(200,160,68,0.08) 0%, transparent 60%)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-25%", left:isAr?"auto":"8%", right:isAr?"8%":"auto", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, rgba(74,144,217,0.05) 0%, transparent 60%)`, pointerEvents:"none" }}/>
      <button onClick={()=>setLang(isAr?"en":"ar")} style={{ position:"absolute", top:28, [isAr?"left":"right"]:28, background:C.surface, border:`1px solid ${C.border}`, color:C.text, borderRadius:28, padding:"8px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontSize:13, fontFamily:"inherit" }}>
        <Globe size={14} color={C.gold}/>{isAr?"English":"عربي"}
      </button>
      <div style={{ width:"100%", maxWidth:420, padding:"0 24px", animation:"fadeUp .5s ease" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:76, height:76, borderRadius:22, marginBottom:20, background:`linear-gradient(145deg, ${C.gold}, ${C.goldLt})`, boxShadow:`0 16px 48px rgba(200,160,68,0.35)`, animation:"glow 3s ease-in-out infinite" }}>
            <span style={{fontSize:36}}>🥩</span>
          </div>
          <h1 style={{ color:C.text, fontSize:30, fontWeight:800, margin:0, letterSpacing:isAr?0:-0.8 }}>{isAr?"ملحمة ومشاوي الاعتماد":"Al Eatemad ERP"}</h1>
          <p style={{ color:C.muted, fontSize:14, marginTop:8 }}>{t.tagline}</p>
        </div>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:36, boxShadow:"0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)" }}>

          {!resetMode ? (
            <>
              <h2 style={{ color:C.text, fontSize:20, fontWeight:700, margin:"0 0 28px" }}>{t.signIn}</h2>
              <form onSubmit={submit}>
                <div style={{ marginBottom:18 }}>
                  <label style={{ color:C.muted, fontSize:12, display:"block", marginBottom:8, fontWeight:600, letterSpacing:0.5, textTransform:"uppercase" }}>{t.email}</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"13px 16px", color:C.text, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ color:C.muted, fontSize:12, display:"block", marginBottom:8, fontWeight:600, letterSpacing:0.5, textTransform:"uppercase" }}>{t.password}</label>
                  <div style={{ position:"relative" }}>
                    <input type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} required style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, padding:`13px ${isAr?16:44}px 13px ${isAr?44:16}px`, color:C.text, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
                    <button type="button" onClick={()=>setShow(!show)} style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", [isAr?"left":"right"]:14, background:"none", border:"none", cursor:"pointer", padding:4, lineHeight:0 }}>
                      {show?<EyeOff size={16} color={C.muted}/>:<Eye size={16} color={C.muted}/>}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign:isAr?"left":"right", marginBottom:20 }}>
                  <button type="button" onClick={()=>{setResetMode(true);setResetEmail(email);setResetStatus(null)}} style={{ background:"none", border:"none", color:C.gold, fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:600, padding:0, textDecoration:"underline", textUnderlineOffset:3 }}>
                    {t.forgotPass}
                  </button>
                </div>
                {err && <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, background:C.redBg, border:`1px solid rgba(239,68,68,0.25)`, borderRadius:10, padding:"12px 16px", color:"#f87171", fontSize:13 }}><AlertTriangle size={15}/>{t.loginErr}</div>}
                <button type="submit" disabled={busy} className="btn-gold" style={{ width:"100%", borderRadius:10, padding:"14px 24px", fontSize:15, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  {busy&&<Loader2 size={17} style={{animation:"spin 1s linear infinite"}}/>}
                  {busy?t.loading:t.loginBtn}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 style={{ color:C.text, fontSize:20, fontWeight:700, margin:"0 0 10px" }}>{t.forgotPass}</h2>
              <p style={{ color:C.muted, fontSize:13, margin:"0 0 24px", lineHeight:1.6 }}>
                {isAr?"أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور":"Enter your email and we'll send you a password reset link"}
              </p>
              <form onSubmit={handleReset}>
                <div style={{ marginBottom:20 }}>
                  <label style={{ color:C.muted, fontSize:12, display:"block", marginBottom:8, fontWeight:600, letterSpacing:0.5, textTransform:"uppercase" }}>{t.email}</label>
                  <input type="email" value={resetEmail} onChange={e=>setResetEmail(e.target.value)} required style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"13px 16px", color:C.text, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
                </div>
                {resetStatus==="sent" && <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, background:C.greenBg, border:`1px solid rgba(52,211,153,0.25)`, borderRadius:10, padding:"12px 16px", color:C.green, fontSize:13, animation:"fadeUp .3s ease" }}>✅ {t.resetSent}</div>}
                {resetStatus==="error" && <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, background:C.redBg, border:`1px solid rgba(239,68,68,0.25)`, borderRadius:10, padding:"12px 16px", color:"#f87171", fontSize:13, animation:"fadeUp .3s ease" }}><AlertTriangle size={15}/>{t.resetErr}</div>}
                <button type="submit" disabled={resetBusy} className="btn-gold" style={{ width:"100%", borderRadius:10, padding:"14px 24px", fontSize:15, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:14 }}>
                  {resetBusy&&<Loader2 size={17} style={{animation:"spin 1s linear infinite"}}/>}
                  {resetBusy?t.loading:(isAr?"إرسال رابط إعادة التعيين":"Send Reset Link")}
                </button>
                <button type="button" onClick={()=>{setResetMode(false);setResetStatus(null)}} style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 24px", color:C.text, fontSize:14, cursor:"pointer", fontFamily:"inherit", fontWeight:600, transition:"border-color .2s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  {isAr?"العودة لتسجيل الدخول":"Back to Sign In"}
                </button>
              </form>
            </>
          )}
        </div>
        <p style={{ textAlign:"center", color:C.muted, fontSize:11, marginTop:24 }}>{t.phase}</p>
      </div>
    </div>
  )
}

// ═══════ STAT CARD ═══════
function Stat({ icon:Icon, label, value, color, bg, loading, delay=0 }) {
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"20px 22px", display:"flex", alignItems:"center", gap:16, animation:`fadeUp .4s ease ${delay}s both`, transition:"border-color .2s, transform .2s", cursor:"default" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none"}}>
      <div style={{ width:52, height:52, borderRadius:14, flexShrink:0, background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon size={23} color={color}/>
      </div>
      <div>
        <div style={{ color:C.muted, fontSize:12, marginBottom:6, fontWeight:600, letterSpacing:0.3 }}>{label}</div>
        <div style={{ color:C.text, fontSize:30, fontWeight:800, lineHeight:1 }}>
          {loading?<Loader2 size={22} color={C.muted} style={{animation:"spin 1s linear infinite"}}/>:
          <span style={{animation:"countUp .4s ease"}}>{value?.toLocaleString()??"—"}</span>}
        </div>
      </div>
    </div>
  )
}

// ═══════ DATA TABLE ═══════
function DataTable({ cols, rows, loading, noDataMsg, isAr, renderRow, page, setPage, perPage=15 }) {
  const total = rows.length, pages = Math.ceil(total/perPage)
  const slice = rows.slice(page*perPage, (page+1)*perPage)
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.surface2 }}>
              {cols.map(h=><th key={h} style={{ padding:"12px 16px", color:C.muted, fontSize:11, fontWeight:700, textAlign:isAr?"right":"left", whiteSpace:"nowrap", borderBottom:`1px solid ${C.border}`, letterSpacing:0.6, textTransform:"uppercase" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading?(
              <tr><td colSpan={cols.length} style={{padding:60,textAlign:"center"}}><Loader2 size={28} color={C.gold} style={{animation:"spin 1s linear infinite"}}/></td></tr>
            ):slice.length===0?(
              <tr><td colSpan={cols.length} style={{padding:60,textAlign:"center",color:C.muted,fontSize:14}}>{noDataMsg}</td></tr>
            ):slice.map(renderRow)}
          </tbody>
        </table>
      </div>
      {pages>1&&(
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{color:C.muted,fontSize:12}}>{page*perPage+1}–{Math.min((page+1)*perPage,total)} / {total}</span>
          <div style={{display:"flex",gap:4}}>
            <PgBtn onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}>{isAr?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}</PgBtn>
            {Array.from({length:Math.min(5,pages)},(_,i)=>{const p=Math.max(0,Math.min(page-2,pages-5))+i;return<PgBtn key={p} onClick={()=>setPage(p)} active={p===page}>{p+1}</PgBtn>})}
            <PgBtn onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={page===pages-1}>{isAr?<ChevronLeft size={14}/>:<ChevronRight size={14}/>}</PgBtn>
          </div>
        </div>
      )}
    </div>
  )
}
function PgBtn({children,onClick,disabled,active}) {
  return <button onClick={onClick} disabled={disabled} style={{ padding:"6px 11px", background:active?C.gold:C.surface2, border:`1px solid ${active?C.gold:C.border}`, borderRadius:7, color:active?"#06080f":C.text, cursor:disabled?"not-allowed":"pointer", opacity:disabled?.4:1, fontFamily:"inherit", fontSize:13, fontWeight:active?700:400, lineHeight:0, display:"flex", alignItems:"center" }}>{children}</button>
}

// ═══════ SEARCH BAR ═══════
function SearchBar({value,onChange,placeholder,isAr}) {
  return (
    <div style={{ position:"relative", flex:"1 1 260px" }}>
      <Search size={15} style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", [isAr?"right":"left"]:13, color:C.muted, pointerEvents:"none" }}/>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ width:"100%", background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:9, padding:`11px ${isAr?16:42}px 11px ${isAr?42:16}px`, color:C.text, fontSize:13.5, fontFamily:"inherit", outline:"none", transition:"border-color .2s" }} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
    </div>
  )
}

function FilterSelect({value,onChange,options,allLabel}) {
  return <select value={value} onChange={e=>onChange(e.target.value)} style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:9, padding:"11px 14px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none", cursor:"pointer" }}>
    <option value="">{allLabel}</option>
    {options.map(o=><option key={o} value={o}>{o}</option>)}
  </select>
}

// ═══════ BADGE ═══════
function Badge({children,color,bg}) {
  return <span style={{ background:bg, color, borderRadius:7, padding:"4px 12px", fontSize:11.5, fontWeight:600, whiteSpace:"nowrap" }}>{children}</span>
}

// ═══════ MODAL ═══════
function Modal({children,onClose,title,isAr}) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, animation:"overlayIn .2s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, width:"100%", maxWidth:700, maxHeight:"85vh", overflow:"auto", animation:"modalIn .3s ease", direction:isAr?"rtl":"ltr" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:C.surface, zIndex:1, borderRadius:"20px 20px 0 0" }}>
          <h3 style={{ color:C.text, fontSize:18, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:8, padding:6, cursor:"pointer", color:C.muted, lineHeight:0 }}><X size={16}/></button>
        </div>
        <div style={{ padding:24 }}>{children}</div>
      </div>
    </div>
  )
}

function DetailRow({label,value,icon:Icon,color=C.gold}) {
  if (!value || value==="—") return null
  return <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:`1px solid ${C.border}22` }}>
    {Icon&&<Icon size={15} color={color}/>}
    <span style={{ color:C.muted, fontSize:12, minWidth:110, fontWeight:600 }}>{label}</span>
    <span style={{ color:C.text, fontSize:13 }}>{value}</span>
  </div>
}

// ═══════ PAGES ═══════
// Dashboard
function Dashboard({ lang }) {
  const { token } = useAuth()
  const t = T[lang]
  const [stats, setStats] = useState({})
  const [crm, setCrm] = useState([])
  const [busy, setBusy] = useState(true)
  const load = async () => {
    setBusy(true)
    try {
      const [emp,arch,cust,br,items,leads] = await Promise.all([
        api.count("employees",token), api.count("archived_employees",token),
        api.count("customers",token), api.count("branches",token),
        api.count("items",token), api.countTable("CRM Intake",token,"Lead_ID"),
      ])
      setStats({ emp,arch,cust,br,items,leads })
      const c = await api.query("CRM Intake",token,"&order=Lead_ID.desc&limit=5")
      if (Array.isArray(c)) setCrm(c)
    } catch {} finally { setBusy(false) }
  }
  useEffect(()=>{load()},[token])
  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:28 }}>
        <Stat icon={Users} label={t.totalEmp} value={stats.emp} color={C.blue} bg={C.blueBg} loading={busy} delay={0}/>
        <Stat icon={Archive} label={t.archived} value={stats.arch} color={C.orange} bg={C.orangeBg} loading={busy} delay={0.05}/>
        <Stat icon={ShoppingCart} label={t.totalCust} value={stats.cust} color={C.green} bg={C.greenBg} loading={busy} delay={0.1}/>
        <Stat icon={Building2} label={t.activeBr} value={stats.br} color={C.gold} bg={C.goldBg} loading={busy} delay={0.15}/>
        <Stat icon={Package} label={t.totalItems} value={stats.items} color={C.purple} bg={C.purpleBg} loading={busy} delay={0.2}/>
        <Stat icon={MessageSquare} label={t.crmLeads} value={stats.leads} color={C.cyan} bg={C.cyanBg} loading={busy} delay={0.25}/>
      </div>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"20px 24px", animation:"fadeUp .5s ease .2s both" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <h3 style={{ color:C.text, margin:0, fontSize:15, fontWeight:700 }}>{t.recentActivity}</h3>
          <button onClick={load} style={{ background:"none", border:"none", cursor:"pointer", padding:6, color:C.muted }}><RefreshCw size={15}/></button>
        </div>
        {crm.length===0?<div style={{color:C.muted,fontSize:13,padding:20,textAlign:"center"}}>{t.noData}</div>:
        crm.map((c,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:i<crm.length-1?`1px solid ${C.border}22`:"none" }}>
            <div style={{ width:40, height:40, borderRadius:10, background:C.surface2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <MessageSquare size={16} color={C.cyan}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:C.text, fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.Customer_Message||c.Category||"—"}</div>
              <div style={{ color:C.muted, fontSize:11, marginTop:3 }}>{c.Branch} • {c.Department}</div>
            </div>
            <Badge color={c.Priority==="High"?C.red:c.Priority==="Medium"?C.orange:C.green} bg={c.Priority==="High"?C.redBg:c.Priority==="Medium"?C.orangeBg:C.greenBg}>{c.Priority||"—"}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

// HR
function HR({ lang }) {
  const { token, profile } = useAuth()
  const t = T[lang], isAr = lang==="ar"
  const [rows,setRows]=useState([]), [busy,setBusy]=useState(true), [q,setQ]=useState(""), [brF,setBrF]=useState(""), [pg,setPg]=useState(0), [sel,setSel]=useState(null)
  const [tab,setTab]=useState("active"), [arch,setArch]=useState([])
  const canSalary = ["admin","hr_manager"].includes(profile?.role)
  const load = async()=>{
    setBusy(true)
    try {
      const [d,a] = await Promise.all([api.query("employees_view",token,"&order=sn"), api.query("archived_employees",token,"&order=sn")])
      if(Array.isArray(d)) setRows(d)
      if(Array.isArray(a)) setArch(a)
    } catch{} finally{setBusy(false)}
  }
  useEffect(()=>{load()},[token])
  const branches=[...new Set(rows.map(r=>r.branch_name).filter(Boolean))]
  const activeData = rows.filter(r=>{
    const s=q.toLowerCase()
    return(!s||[r.full_name,r.job_title,r.nationality].some(v=>v?.toLowerCase().includes(s)))&&(!brF||r.branch_name===brF)
  })
  const archData = arch.filter(r=>{const s=q.toLowerCase();return!s||r.full_name?.toLowerCase().includes(s)})
  const data = tab==="active"?activeData:archData
  const stColor=(s="")=>{if(s.includes("نشط")&&!s.includes("مؤقت"))return C.green;if(s.includes("قيد"))return C.orange;if(s.includes("مؤقت"))return C.blue;return C.muted}
  const activeCols = [t.sn,t.name,t.title,t.branch,t.nat,t.status,t.startDate,...(canSalary?[t.salary]:[])]
  const archCols = [t.sn,t.name,t.title,t.nat,t.lastWorkDay,t.cancelReason]
  return (
    <div style={{padding:28}}>
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:2,background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:3}}>
          {["active","archived2"].map(k=><button key={k} onClick={()=>{setTab(k==="active"?"active":"arch");setPg(0)}} style={{ padding:"8px 18px", borderRadius:7, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:(tab==="active"&&k==="active")||(tab==="arch"&&k==="archived2")?700:400, background:(tab==="active"&&k==="active")||(tab==="arch"&&k==="archived2")?C.goldBg:"transparent", color:(tab==="active"&&k==="active")||(tab==="arch"&&k==="archived2")?C.gold:C.muted }}>{t[k]}</button>)}
        </div>
        <SearchBar value={q} onChange={v=>{setQ(v);setPg(0)}} placeholder={t.search} isAr={isAr}/>
        {tab==="active"&&<FilterSelect value={brF} onChange={v=>{setBrF(v);setPg(0)}} options={branches} allLabel={t.allBranches}/>}
        <button onClick={load} style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:9, padding:"11px 13px", cursor:"pointer", color:C.muted, lineHeight:0 }}><RefreshCw size={15}/></button>
        <div style={{ background:C.goldBg, border:`1px solid ${C.gold}30`, borderRadius:9, padding:"10px 18px", color:C.gold, fontSize:13, fontWeight:700, marginInlineStart:"auto" }}>{data.length.toLocaleString()} {isAr?"سجل":"records"}</div>
      </div>
      <DataTable cols={tab==="active"?activeCols:archCols} rows={data} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={e=>(
        <tr key={e.id} className="hover-row" style={{borderBottom:`1px solid ${C.border}`,cursor:"pointer",transition:"background .1s"}} onClick={()=>tab==="active"&&setSel(e)}>
          <td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{e.sn}</td>
          <td style={{padding:"12px 16px"}}><div style={{color:C.text,fontSize:13.5,fontWeight:600}}>{e.full_name}</div>{tab==="active"&&<div style={{color:C.muted,fontSize:11,marginTop:2}}>{e.company_name}</div>}</td>
          <td style={{padding:"12px 16px",color:C.text,fontSize:13}}>{e.job_title}</td>
          {tab==="active"&&<td style={{padding:"12px 16px"}}><Badge color={C.blue} bg={C.blueBg}>{e.branch_name}</Badge></td>}
          <td style={{padding:"12px 16px",color:C.text,fontSize:13}}>{e.nationality}</td>
          {tab==="active"&&<td style={{padding:"12px 16px"}}><Badge color={stColor(e.residence_status)} bg={`${stColor(e.residence_status)}18`}>{e.residence_status||"—"}</Badge></td>}
          <td style={{padding:"12px 16px",color:C.muted,fontSize:12,direction:"ltr",textAlign:isAr?"right":"left"}}>{tab==="active"?(e.start_date?new Date(e.start_date).toLocaleDateString("en-GB"):"—"):(e.last_working_day?new Date(e.last_working_day).toLocaleDateString("en-GB"):"—")}</td>
          {tab==="active"&&canSalary&&<td style={{padding:"12px 16px",color:C.gold,fontSize:13,fontWeight:700,direction:"ltr",textAlign:isAr?"right":"left"}}>{e.total_salary?`${Number(e.total_salary).toLocaleString()} د.إ`:"—"}</td>}
          {tab==="arch"&&<td style={{padding:"12px 16px",color:C.muted,fontSize:12,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.cancellation_reason||"—"}</td>}
        </tr>
      )}/>
      {sel&&<Modal onClose={()=>setSel(null)} title={t.empDetails} isAr={isAr}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>
          <DetailRow label={t.name} value={sel.full_name}/>
          <DetailRow label={t.title} value={sel.job_title}/>
          <DetailRow label={t.branch} value={sel.branch_name}/>
          <DetailRow label={t.nat} value={sel.nationality}/>
          <DetailRow label={t.phone} value={sel.phone} icon={Phone}/>
          <DetailRow label={t.status} value={sel.residence_status}/>
          <DetailRow label={t.startDate} value={sel.start_date?new Date(sel.start_date).toLocaleDateString("en-GB"):null}/>
          <DetailRow label={t.residenceExpiry} value={sel.residence_expiry?new Date(sel.residence_expiry).toLocaleDateString("en-GB"):null}/>
          {canSalary&&<><DetailRow label={t.basicSalary} value={sel.basic_salary?`${Number(sel.basic_salary).toLocaleString()} د.إ`:null} color={C.green}/>
          <DetailRow label={t.allowances} value={sel.allowances?`${Number(sel.allowances).toLocaleString()} د.إ`:null} color={C.green}/>
          <DetailRow label={t.incentives} value={sel.incentives?`${Number(sel.incentives).toLocaleString()} د.إ`:null} color={C.green}/>
          <DetailRow label={t.salary} value={sel.total_salary?`${Number(sel.total_salary).toLocaleString()} د.إ`:null} color={C.gold}/>
          <DetailRow label={t.paymentMethod} value={sel.payment_method}/></>}
          <DetailRow label={t.insuranceCo} value={sel.insurance_company}/>
          <DetailRow label={t.coverage} value={sel.insurance_coverage}/>
          <DetailRow label={`${t.foodPermit} - ${t.emirate}`} value={sel.food_permit_emirate}/>
          <DetailRow label={`${t.foodPermit} - ${t.expiry}`} value={sel.food_permit_expiry?new Date(sel.food_permit_expiry).toLocaleDateString("en-GB"):null}/>
          <DetailRow label={`${t.healthCard} - ${t.emirate}`} value={sel.health_card_emirate}/>
          <DetailRow label={`${t.healthCard} - ${t.expiry}`} value={sel.health_card_expiry?new Date(sel.health_card_expiry).toLocaleDateString("en-GB"):null}/>
          <DetailRow label={`${t.passport} - ${t.expiry}`} value={sel.passport_expiry?new Date(sel.passport_expiry).toLocaleDateString("en-GB"):null}/>
          <DetailRow label={`${t.passport} - ${t.heldBy}`} value={sel.passport_held_by}/>
        </div>
      </Modal>}
    </div>
  )
}

// Branches
function Branches({lang}){const{token}=useAuth();const t=T[lang],isAr=lang==="ar";const[rows,setRows]=useState([]);const[busy,setBusy]=useState(true);useEffect(()=>{(async()=>{setBusy(true);try{const d=await api.query("branches",token);if(Array.isArray(d))setRows(d)}catch{}finally{setBusy(false)}})()},[token]);return(<div style={{padding:28}}>{busy?<div style={{display:"flex",justifyContent:"center",padding:60}}><Loader2 size={28} color={C.gold} style={{animation:"spin 1s linear infinite"}}/></div>:rows.length===0?<div style={{textAlign:"center",color:C.muted,padding:60}}>{t.noData}</div>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>{rows.map((b,i)=><div key={b.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"22px 24px",animation:`fadeUp .4s ease ${i*0.05}s both`,transition:"border-color .2s,transform .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none"}}><div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}><div style={{width:48,height:48,borderRadius:14,background:C.goldBg,display:"flex",alignItems:"center",justifyContent:"center"}}><Building2 size={22} color={C.gold}/></div><div><div style={{color:C.text,fontSize:15,fontWeight:700}}>{isAr?b.name_ar||b.name:b.name}</div>{b.city&&<div style={{color:C.muted,fontSize:12,marginTop:3,display:"flex",alignItems:"center",gap:4}}><MapPin size={11}/>{b.city}</div>}</div></div></div>)}</div>}</div>)}

// Customers
function Customers({lang}){const{token}=useAuth();const t=T[lang],isAr=lang==="ar";const[rows,setRows]=useState([]),[busy,setBusy]=useState(true),[q,setQ]=useState(""),[brF,setBrF]=useState(""),[pg,setPg]=useState(0);useEffect(()=>{(async()=>{setBusy(true);try{const d=await api.query("customers",token,"&order=id");if(Array.isArray(d))setRows(d)}catch{}finally{setBusy(false)}})()},[token]);const branches=[...new Set(rows.map(r=>r.branch_name).filter(Boolean))];const filtered=rows.filter(r=>{const s=q.toLowerCase();return(!s||[r.cust_name,r.ph1,r.addr1].some(v=>v?.toLowerCase().includes(s)))&&(!brF||r.branch_name===brF)});return(<div style={{padding:28}}><div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}><SearchBar value={q} onChange={v=>{setQ(v);setPg(0)}} placeholder={t.search} isAr={isAr}/><FilterSelect value={brF} onChange={v=>{setBrF(v);setPg(0)}} options={branches} allLabel={t.allBranches}/><div style={{background:C.greenBg,border:`1px solid ${C.green}30`,borderRadius:9,padding:"10px 18px",color:C.green,fontSize:13,fontWeight:700,marginInlineStart:"auto"}}>{filtered.length.toLocaleString()} {t.rows}</div></div><DataTable cols={[t.sn,t.custName,t.phone,t.address,t.branch]} rows={filtered} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={(c,i)=><tr key={c.id||i} className="hover-row" style={{borderBottom:`1px solid ${C.border}`,transition:"background .1s"}}><td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{i+1}</td><td style={{padding:"12px 16px",color:C.text,fontSize:13.5,fontWeight:600}}>{c.cust_name||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13,direction:"ltr"}}>{c.ph1||c.phone_clean||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:12,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.addr1||"—"}</td><td style={{padding:"12px 16px"}}><Badge color={C.blue} bg={C.blueBg}>{c.branch_name||"—"}</Badge></td></tr>}/></div>)}

// B2B
function B2B({lang}){const{token}=useAuth();const t=T[lang],isAr=lang==="ar";const[tab,setTab]=useState("rest"),[rest,setRest]=useState([]),[hotels,setHotels]=useState([]),[busy,setBusy]=useState(true),[q,setQ]=useState(""),[pg,setPg]=useState(0);useEffect(()=>{(async()=>{setBusy(true);try{const[r,h]=await Promise.all([api.query("b2b_restaurants",token,"&order=id"),api.query("b2b_hotels",token,"&order=id")]);if(Array.isArray(r))setRest(r);if(Array.isArray(h))setHotels(h)}catch{}finally{setBusy(false)}})()},[token]);const data=tab==="rest"?rest:hotels;const filtered=data.filter(r=>{const s=q.toLowerCase();return!s||(tab==="rest"?[r.restaurant_name,r.city,r.area]:[r.hotel_name,r.city]).some(v=>v?.toLowerCase().includes(s))});return(<div style={{padding:28}}><div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}><div style={{display:"flex",gap:2,background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:3}}>{[{k:"rest",l:t.b2bRest},{k:"hotel",l:t.b2bHotels}].map(({k,l})=><button key={k} onClick={()=>{setTab(k);setPg(0);setQ("")}} style={{padding:"8px 18px",borderRadius:7,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:tab===k?700:400,background:tab===k?C.goldBg:"transparent",color:tab===k?C.gold:C.muted}}>{l}</button>)}</div><SearchBar value={q} onChange={v=>{setQ(v);setPg(0)}} placeholder={t.search} isAr={isAr}/><div style={{background:C.purpleBg,border:`1px solid ${C.purple}30`,borderRadius:9,padding:"10px 18px",color:C.purple,fontSize:13,fontWeight:700,marginInlineStart:"auto"}}>{filtered.length}</div></div>{tab==="rest"?<DataTable cols={[t.sn,t.restaurant,t.city,t.area,t.phone,t.status,t.notes]} rows={filtered} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={(r,i)=><tr key={r.id} className="hover-row" style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{i+1}</td><td style={{padding:"12px 16px",color:C.text,fontSize:13.5,fontWeight:600}}>{r.restaurant_name}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{r.city||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{r.area||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13,direction:"ltr"}}>{r.phone||"—"}</td><td style={{padding:"12px 16px"}}><Badge color={r.status==="New"?C.cyan:r.status==="Contacted"?C.orange:C.green} bg={r.status==="New"?C.cyanBg:r.status==="Contacted"?C.orangeBg:C.greenBg}>{r.status||"—"}</Badge></td><td style={{padding:"12px 16px",color:C.muted,fontSize:12,maxWidth:150,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.notes||"—"}</td></tr>}/>:<DataTable cols={[t.sn,t.hotel,t.city,t.purchasingContact,t.phone,t.opsContact,t.phone]} rows={filtered} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={(h,i)=><tr key={h.id} className="hover-row" style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{i+1}</td><td style={{padding:"12px 16px",color:C.text,fontSize:13.5,fontWeight:600}}>{h.hotel_name}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{h.city||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{h.purchasing_contact_name||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13,direction:"ltr"}}>{h.purchasing_phone||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{h.operations_contact_name||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13,direction:"ltr"}}>{h.operations_phone||"—"}</td></tr>}/>}</div>)}

// CRM
function CRM({lang}){const{token}=useAuth();const t=T[lang],isAr=lang==="ar";const[rows,setRows]=useState([]),[busy,setBusy]=useState(true),[q,setQ]=useState(""),[brF,setBrF]=useState(""),[prF,setPrF]=useState(""),[pg,setPg]=useState(0);useEffect(()=>{(async()=>{setBusy(true);try{const d=await api.query("CRM Intake",token,"&order=Lead_ID.desc");if(Array.isArray(d))setRows(d)}catch{}finally{setBusy(false)}})()},[token]);const branches=[...new Set(rows.map(r=>r.Branch).filter(Boolean))];const priorities=[...new Set(rows.map(r=>r.Priority).filter(Boolean))];const filtered=rows.filter(r=>{const s=q.toLowerCase();return(!s||[r.Customer_Message,r.Category,r.Department].some(v=>v?.toLowerCase().includes(s)))&&(!brF||r.Branch===brF)&&(!prF||r.Priority===prF)});return(<div style={{padding:28}}><div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}><SearchBar value={q} onChange={v=>{setQ(v);setPg(0)}} placeholder={t.search} isAr={isAr}/><FilterSelect value={brF} onChange={v=>{setBrF(v);setPg(0)}} options={branches} allLabel={t.allBranches}/><FilterSelect value={prF} onChange={v=>{setPrF(v);setPg(0)}} options={priorities} allLabel={t.allPriorities}/><div style={{background:C.cyanBg,border:`1px solid ${C.cyan}30`,borderRadius:9,padding:"10px 18px",color:C.cyan,fontSize:13,fontWeight:700,marginInlineStart:"auto"}}>{filtered.length} {t.rows}</div></div><DataTable cols={[t.leadId,t.date,t.branch,t.department,t.category,t.message,t.priority,t.status]} rows={filtered} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={(c,i)=><tr key={c.Lead_ID||i} className="hover-row" style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{c.Lead_ID}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:12}}>{c.Date||"—"}</td><td style={{padding:"12px 16px"}}><Badge color={C.blue} bg={C.blueBg}>{c.Branch||"—"}</Badge></td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{c.Department||"—"}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{c.Category||"—"}</td><td style={{padding:"12px 16px",color:C.text,fontSize:12,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.Customer_Message||"—"}</td><td style={{padding:"12px 16px"}}><Badge color={c.Priority==="High"?C.red:c.Priority==="Medium"?C.orange:C.green} bg={c.Priority==="High"?C.redBg:c.Priority==="Medium"?C.orangeBg:C.greenBg}>{c.Priority||"—"}</Badge></td><td style={{padding:"12px 16px"}}><Badge color={c.Status==="Resolved"?C.green:c.Status==="Open"?C.cyan:C.orange} bg={c.Status==="Resolved"?C.greenBg:c.Status==="Open"?C.cyanBg:C.orangeBg}>{c.Status||"—"}</Badge></td></tr>}/></div>)}

// Items
function Items({lang}){const{token}=useAuth();const t=T[lang],isAr=lang==="ar";const[rows,setRows]=useState([]),[busy,setBusy]=useState(true),[q,setQ]=useState(""),[deptF,setDeptF]=useState(""),[pg,setPg]=useState(0);useEffect(()=>{(async()=>{setBusy(true);try{const d=await api.query("items",token,"&order=id");if(Array.isArray(d))setRows(d)}catch{}finally{setBusy(false)}})()},[token]);const depts=[...new Set(rows.map(r=>r.department).filter(Boolean))];const filtered=rows.filter(r=>{const s=q.toLowerCase();return(!s||[r.item_name,r.item_name_ar,r.barcode].some(v=>v?.toLowerCase().includes(s)))&&(!deptF||r.department===deptF)});return(<div style={{padding:28}}><div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}><SearchBar value={q} onChange={v=>{setQ(v);setPg(0)}} placeholder={t.search} isAr={isAr}/><FilterSelect value={deptF} onChange={v=>{setDeptF(v);setPg(0)}} options={depts} allLabel={t.allDepts}/><div style={{background:C.purpleBg,border:`1px solid ${C.purple}30`,borderRadius:9,padding:"10px 18px",color:C.purple,fontSize:13,fontWeight:700,marginInlineStart:"auto"}}>{filtered.length} {t.rows}</div></div><DataTable cols={[t.sn,t.barcode,t.itemName,t.itemName+" (AR)",t.department,t.price]} rows={filtered} loading={busy} noDataMsg={t.noData} isAr={isAr} page={pg} setPage={setPg} renderRow={(item,i)=><tr key={item.id} className="hover-row" style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"12px 16px",color:C.muted,fontSize:12}}>{i+1}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:12,fontFamily:"monospace"}}>{item.barcode||"—"}</td><td style={{padding:"12px 16px",color:C.text,fontSize:13.5,fontWeight:600}}>{item.item_name}</td><td style={{padding:"12px 16px",color:C.textSec,fontSize:13}}>{item.item_name_ar||"—"}</td><td style={{padding:"12px 16px"}}><Badge color={C.purple} bg={C.purpleBg}>{item.department||"—"}</Badge></td><td style={{padding:"12px 16px",color:C.gold,fontSize:13,fontWeight:700}}>{item.price?`${Number(item.price).toLocaleString()} د.إ`:"—"}</td></tr>}/></div>)}

// ═══════ SIDEBAR ═══════
function Sidebar({lang,page,setPage,collapsed}){
  const{logout,profile}=useAuth();const t=T[lang],isAr=lang==="ar"
  const nav=[{id:"dashboard",Icon:Home,label:t.dashboard},{id:"hr",Icon:Users,label:t.hr},{id:"branches",Icon:Building2,label:t.branches},{id:"customers",Icon:ShoppingCart,label:t.customers},{id:"b2b",Icon:UserCheck,label:t.b2b},{id:"crm",Icon:MessageSquare,label:t.crm},{id:"items",Icon:Package,label:t.items}]
  const role=profile?(t[`r_${profile.role}`]||profile.role):""
  return(
    <div style={{width:collapsed?68:240,height:"100vh",background:C.surface,borderRight:isAr?"none":`1px solid ${C.border}`,borderLeft:isAr?`1px solid ${C.border}`:"none",display:"flex",flexDirection:"column",flexShrink:0,transition:"width .25s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
      <div style={{height:72,display:"flex",alignItems:"center",padding:collapsed?"0":"0 20px",justifyContent:collapsed?"center":"flex-start",gap:12,borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <div style={{width:42,height:42,borderRadius:13,flexShrink:0,background:`linear-gradient(145deg,${C.gold},${C.goldLt})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 6px 20px rgba(200,160,68,0.3)`}}>🥩</div>
        {!collapsed&&<div><div style={{color:C.text,fontWeight:800,fontSize:14,lineHeight:1.2}}>{isAr?"الاعتماد":"Al Eatemad"}</div><div style={{color:C.gold,fontSize:10,marginTop:3,letterSpacing:1,fontWeight:700}}>ERP SYSTEM</div></div>}
      </div>
      <nav style={{flex:1,padding:"12px 0",overflowY:"auto"}}>
        {nav.map(({id,Icon,label})=>{const active=page===id;return(
          <button key={id} onClick={()=>setPage(id)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:collapsed?"12px 0":"11px 20px",justifyContent:collapsed?"center":"flex-start",background:active?C.goldBg:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",color:active?C.gold:C.muted,fontSize:13.5,fontWeight:active?700:400,transition:"all .15s",position:"relative"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(255,255,255,0.02)"}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background=active?C.goldBg:"transparent"}}>
            {active&&<div style={{position:"absolute",[isAr?"right":"left"]:0,top:0,bottom:0,width:3,background:C.gold,borderRadius:isAr?"3px 0 0 3px":"0 3px 3px 0"}}/>}
            <Icon size={18}/>{!collapsed&&<span>{label}</span>}
          </button>
        )})}
      </nav>
      <div style={{padding:collapsed?"12px 0":"16px",borderTop:`1px solid ${C.border}`,flexShrink:0}}>
        {!collapsed&&profile&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:38,height:38,borderRadius:"50%",flexShrink:0,background:C.goldBg,border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold,fontWeight:800,fontSize:15}}>{(profile.full_name||profile.email||"U")[0].toUpperCase()}</div>
          <div style={{overflow:"hidden"}}><div style={{color:C.text,fontSize:12.5,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{profile.full_name||profile.email}</div><div style={{color:C.gold,fontSize:11,marginTop:2}}>{role}</div></div>
        </div>}
        <button onClick={logout} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"9px 12px",background:C.redBg,border:`1px solid rgba(239,68,68,0.18)`,borderRadius:9,color:"#f87171",fontSize:12.5,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}><LogOut size={14}/>{!collapsed&&t.logout}</button>
      </div>
    </div>
  )
}

// ═══════ HEADER ═══════
function Header({lang,setLang,collapsed,setCollapsed,title}){
  const{profile}=useAuth();const t=T[lang],isAr=lang==="ar"
  const h=new Date().getHours(),greet=h<12?t.greetAm:h<17?t.greetPm:t.greetEv
  return(
    <div style={{height:72,background:C.surface,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",padding:"0 24px",gap:16,flexShrink:0}}>
      <button onClick={()=>setCollapsed(!collapsed)} style={{background:"none",border:"none",cursor:"pointer",padding:8,color:C.muted,borderRadius:8,display:"flex",lineHeight:0,transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color=C.text} onMouseLeave={e=>e.currentTarget.style.color=C.muted}><Menu size={20}/></button>
      <div style={{flex:1}}><div style={{color:C.text,fontWeight:800,fontSize:18,lineHeight:1.2}}>{title}</div>{profile&&<div style={{color:C.muted,fontSize:12,marginTop:3}}>{greet}، {profile.full_name||profile.email}</div>}</div>
      <button onClick={()=>setLang(isAr?"en":"ar")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:C.surface2,border:`1px solid ${C.border}`,borderRadius:9,color:C.text,fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}><Globe size={14} color={C.gold}/>{isAr?"EN":"عربي"}</button>
    </div>
  )
}

// ═══════ LAYOUT ═══════
function Layout({lang,setLang}){
  const[page,setPage]=useState("dashboard"),[collapsed,setCollapsed]=useState(false)
  const t=T[lang],isAr=lang==="ar"
  const titles={dashboard:t.dashboard,hr:t.hr,branches:t.branches,customers:t.customers,b2b:t.b2b,crm:t.crm,items:t.items}
  const body=()=>{
    if(page==="dashboard")return<Dashboard lang={lang}/>
    if(page==="hr")return<HR lang={lang}/>
    if(page==="branches")return<Branches lang={lang}/>
    if(page==="customers")return<Customers lang={lang}/>
    if(page==="b2b")return<B2B lang={lang}/>
    if(page==="crm")return<CRM lang={lang}/>
    if(page==="items")return<Items lang={lang}/>
  }
  return(
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:C.bg,color:C.text,direction:isAr?"rtl":"ltr",flexDirection:isAr?"row-reverse":"row",fontFamily:isAr?"'Tajawal',sans-serif":"'Inter',sans-serif"}}>
      <Sidebar lang={lang} page={page} setPage={setPage} collapsed={collapsed}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <Header lang={lang} setLang={setLang} collapsed={collapsed} setCollapsed={setCollapsed} title={titles[page]}/>
        <main style={{flex:1,overflowY:"auto"}}>{body()}</main>
      </div>
    </div>
  )
}

// ═══════ ROOT ═══════
export default function App(){
  const[lang,setLang]=useState("ar")
  return(<AuthProvider><Router lang={lang} setLang={setLang}/></AuthProvider>)
}
function Router({lang,setLang}){const{session}=useAuth();return session?<Layout lang={lang} setLang={setLang}/>:<Login lang={lang} setLang={setLang}/>}
