import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════
// ألوان براند الإعتماد الرسمية من Brand Guideline
// Primary: Bronze #995d26 | Beige #ead395 | Baby Beige #f7edd2
// Secondary: Dark Red #7d0a12 | Gray #2d2e31
// ═══════════════════════════════════════════════

const C = {
  // Primary Brand Colors
  bronze: "#995d26",
  bronzeDark: "#7a4a1e",
  bronzeLight: "#b37840",

  beige: "#ead395",
  beigeDark: "#d4b876",
  beigeLight: "#f7edd2",

  // Secondary
  darkRed: "#7d0a12",
  red: "#9b0d16",
  redLight: "#b91a23",

  gray: "#2d2e31",
  grayDark: "#1a1b1d",
  grayLight: "#3d3e42",

  // UI Colors
  black: "#0a0806",
  white: "#ffffff",
  text: "#1a1a1c",
  textMuted: "#6b6c70",

  // Semantic
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Borders & Overlays
  border: "rgba(153,93,38,0.15)",
  borderLight: "rgba(234,211,149,0.2)",
  overlay: "rgba(10,8,6,0.85)",
};

function BrandLogo({ size = 48 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.15,
      background: C.beigeLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 4px 20px rgba(153,93,38,0.25), inset 0 1px 2px rgba(255,255,255,0.3)`,
      border: `1.5px solid ${C.beige}`,
      padding: 4,
    }}>
      <img
        src="/logo.png"
        alt="Al Eatemad"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          const parent = e.target.parentElement;
          parent.innerHTML = `
            <svg width="${size*0.7}" height="${size*0.7}" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="45" r="32" stroke="${C.bronze}" stroke-width="2.5" fill="none"/>
              <path d="M28 60 Q28 40 40 30 M72 60 Q72 40 60 30" stroke="${C.bronze}" stroke-width="2" stroke-linecap="round"/>
              <path d="M35 50 L45 55 M55 55 L65 50" stroke="${C.bronze}" stroke-width="2"/>
              <text x="50" y="88" font-size="12" fill="${C.bronze}" text-anchor="middle" font-weight="600">الإعتماد</text>
            </svg>
          `;
        }}
      />
    </div>
  );
}

function WheatDecor({ size = 100, opacity = 0.08, flip = false }) {
  return (
    <svg width={size*0.45} height={size} viewBox="0 0 50 160" fill="none" style={{display:"block",transform:flip?"scaleX(-1)":"none",opacity,pointerEvents:"none"}}>
      <path d="M25 5 Q27 80 24 158" stroke={C.bronze} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {[[25,15],[32,30],[20,44],[34,58],[18,72],[33,88],[17,104],[31,120],[16,136],[28,150]].map(([cx,cy],i)=>{
        const left=i%2===0; const cx2=left?cx-16:cx+16;
        return <ellipse key={i} cx={cx2} cy={cy} rx="11" ry="6" transform={`rotate(${left?-38:38} ${cx2} ${cy})`} fill={C.beige}/>;
      })}
    </svg>
  );
}

const AV_BG = [C.bronze, C.bronzeDark, C.darkRed, C.red, "#8a5021", "#a6642f"];
function avBg(n){ return AV_BG[(n?.charCodeAt(0)||0) % AV_BG.length]; }

function Avatar({ name, size = 40 }) {
  const initials = name?.split(" ").slice(0,2).map(w=>w[0]).join("") || "؟";
  return (
    <div style={{
      width:size,
      height:size,
      borderRadius:size*0.25,
      flexShrink:0,
      background:`linear-gradient(135deg, ${avBg(name)}, ${C.bronze})`,
      border:`2px solid ${C.beige}`,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:size*0.32,
      fontWeight:900,
      color:C.beigeLight,
      fontFamily:"'Cairo', sans-serif",
      boxShadow:`0 3px 12px rgba(153,93,38,0.3)`,
      letterSpacing:-0.5
    }}>
      {initials}
    </div>
  );
}

const STATUS = {
  "نشط":         { c:C.success, bg:"rgba(34,197,94,0.12)",  bd:"rgba(34,197,94,0.3)",  l:"نشط" },
  "نشط/ مؤقت":  { c:C.warning, bg:"rgba(245,158,11,0.12)", bd:"rgba(245,158,11,0.3)", l:"مؤقت" },
  "نشط/اعارة":  { c:C.info,    bg:"rgba(59,130,246,0.12)", bd:"rgba(59,130,246,0.3)", l:"إعارة" },
  "خارجي":       { c:C.textMuted,bg:"rgba(107,108,112,0.1)",bd:"rgba(107,108,112,0.2)",l:"خارجي" },
  "قيد الاجراء": { c:C.warning, bg:"rgba(245,158,11,0.12)", bd:"rgba(245,158,11,0.3)", l:"إجراء" },
  "بلاغ هروب":  { c:C.error,   bg:"rgba(239,68,68,0.12)",  bd:"rgba(239,68,68,0.3)",  l:"هروب" },
};

function Badge({ status, sm }) {
  const s = STATUS[status] || { c:C.textMuted, bg:"rgba(107,108,112,0.1)", bd:"rgba(107,108,112,0.2)", l:status||"—" };
  return (
    <span style={{
      display:"inline-flex",
      alignItems:"center",
      gap:5,
      padding:sm?"3px 9px":"4px 12px",
      borderRadius:20,
      fontSize:sm?10:11,
      fontWeight:700,
      background:s.bg,
      color:s.c,
      border:`1.5px solid ${s.bd}`,
      whiteSpace:"nowrap"
    }}>
      <span style={{width:5,height:5,borderRadius:"50%",background:s.c,display:"inline-block",flexShrink:0}}/>
      {s.l}
    </span>
  );
}

function GoldLine() {
  return <div style={{
    height:1,
    background:`linear-gradient(to left,transparent,${C.beige},transparent)`,
    opacity:0.4,
    margin:"0"
  }}/>;
}

const NAV = [
  { id:"overview",   label:"الرئيسية",  icon:"◈" },
  { id:"employees",  label:"الموظفون",  icon:"◉" },
  { id:"residence",  label:"الإقامات",  icon:"⊞" },
  { id:"payroll",    label:"الرواتب",   icon:"◎" },
  { id:"workplaces", label:"الفروع",    icon:"◑" },
];

const ALL_POS = ["مدير إداري","محاسب","مندوب مبيعات","شيف / مشاوي","لحام بسطة","قصاب","كاشير","سائق سيارة","عامل نظافة","امين مخزن","مدير موارد بشرية","عامل شحن"];
const ALL_WP  = ["الملحمة /الشارقة","الملحمة /مردف","الملحمة /البرشا","الملحمة /العين","الملحمة /أبو ظبي","الشركة /الربوع","الشركة /الركن"];
const ALL_NAT = ["الأردن","مصر","سوريا","باكستان","بنجلاديش","الهند","الفلبين","السودان","فلسطين","نيبال"];
const ALL_ST  = ["نشط","نشط/ مؤقت","نشط/اعارة","خارجي","قيد الاجراء","بلاغ هروب"];

const EMPLOYEES = [
  {id:1, name:"اسماعيل فيصل البايض",  position:"مدير إداري",       nationality:"الأردن",    workplace:"الملحمة /الشارقة", status:"نشط",         start_date:"2015-08-04", iqama_end:"2026-06-03", basic:8000, allowance:24000, total:32000, passport_end:"2030-07-08", phone:"", notes:""},
  {id:2, name:"خليل فيصل البياض",      position:"مدير إداري",       nationality:"الأردن",    workplace:"الشركة /الربوع",   status:"نشط",         start_date:"2021-11-25", iqama_end:"2028-02-05", basic:8000, allowance:10000, total:18000, passport_end:"2030-06-03", phone:"", notes:""},
  {id:3, name:"كريم عفيف شرف",          position:"مدير موارد بشرية", nationality:"مصر",       workplace:"الشركة /الربوع",   status:"نشط/ مؤقت",  start_date:"2025-07-24", iqama_end:"2025-12-29", basic:4000, allowance:5000,  total:9000,  passport_end:"2029-04-25", phone:"", notes:""},
  {id:4, name:"ابراهيم تاج الدين",      position:"لحام بسطة",        nationality:"مصر",       workplace:"الملحمة /مردف",    status:"نشط",         start_date:"2015-06-13", iqama_end:"2027-06-10", basic:800,  allowance:3800,  total:4600,  passport_end:"2026-06-14", phone:"", notes:""},
  {id:5, name:"وجدي جمال عريج",         position:"كاشير",            nationality:"سوريا",     workplace:"الملحمة /الشارقة", status:"نشط",         start_date:"2022-01-09", iqama_end:"2026-04-25", basic:800,  allowance:3400,  total:4200,  passport_end:"2030-03-09", phone:"", notes:""},
  {id:6, name:"محمد ابوطالب مياه",      position:"سائق سيارة",       nationality:"بنجلاديش",  workplace:"الشركة /الربوع",   status:"نشط",         start_date:"2012-10-21", iqama_end:"2026-10-06", basic:700,  allowance:1500,  total:2200,  passport_end:"2034-03-25", phone:"", notes:""},
  {id:7, name:"اسد حسين اورحمن",        position:"سائق سيارة",       nationality:"باكستان",   workplace:"الشركة /الربوع",   status:"نشط",         start_date:"2021-12-21", iqama_end:"2026-03-10", basic:800,  allowance:1700,  total:2500,  passport_end:"2028-10-22", phone:"", notes:""},
  {id:8, name:"شارلان ديلا كروز",       position:"امين مخزن",        nationality:"الفلبين",   workplace:"الشركة /الركن",    status:"نشط",         start_date:"2025-08-25", iqama_end:"2027-11-13", basic:800,  allowance:2200,  total:3000,  passport_end:"2029-01-21", phone:"", notes:""},
  {id:9, name:"انور عابدين الحسن",      position:"لحام بسطة",        nationality:"مصر",       workplace:"الشركة /الركن",    status:"قيد الاجراء", start_date:"2023-10-02", iqama_end:"2028-01-30", basic:800,  allowance:700,   total:1500,  passport_end:"2031-04-28", phone:"", notes:""},
  {id:10,name:"عمر عثمان عبدللى",       position:"كاشير",            nationality:"السودان",   workplace:"الملحمة /الشارقة", status:"بلاغ هروب",  start_date:"2020-11-09", iqama_end:"2023-04-29", basic:800,  allowance:2000,  total:2800,  passport_end:"2023-06-11", phone:"", notes:""},
];

const EMPTY = {id:null,name:"",position:"",nationality:"",workplace:"",status:"نشط",start_date:"",iqama_end:"",basic:800,allowance:0,total:800,passport_end:"",phone:"",notes:""};

function isExpSoon(d){ if(!d||d==="None") return false; const diff=(new Date(d)-new Date())/864e5; return diff>=0&&diff<=90; }
function isExpired(d){ if(!d||d==="None") return false; return new Date(d)<new Date(); }
function useMob(){ const[w,setW]=useState(window.innerWidth); useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return w<680; }

function Modal({ emp, isNew, onSave, onDelete, onClose }) {
  const mob = useMob();
  const [form, setForm] = useState({...EMPTY,...emp});
  const [tab, setTab] = useState("info");
  const [del, setDel] = useState(false);
  const f = (k,v) => setForm(p=>({...p,[k]:v}));
  useEffect(()=>{ setForm(p=>({...p,total:(+p.basic||0)+(+p.allowance||0)})); },[form.basic,form.allowance]);

  const inp = { background:C.beigeLight, border:`1.5px solid ${C.borderLight}`, borderRadius:12, padding:"11px 14px", color:C.text, fontSize:13, outline:"none", fontFamily:"'Cairo',sans-serif", width:"100%", transition:"all 0.2s" };
  const lbl = { fontSize:11, color:C.bronze, marginBottom:6, fontWeight:700, display:"block", textTransform:"uppercase", letterSpacing:0.5 };
  const TABS = [{id:"info",l:"البيانات"},{id:"work",l:"العمل"},{id:"sal",l:"الراتب"},{id:"docs",l:"الوثائق"}];

  return (
    <div style={{position:"fixed",inset:0,background:C.overlay,display:"flex",alignItems:mob?"flex-end":"center",justifyContent:"center",zIndex:900,backdropFilter:"blur(10px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:mob?"28px 28px 0 0":24,width:mob?"100%":560,maxWidth:"96vw",maxHeight:mob?"92vh":"90vh",display:"flex",flexDirection:"column",direction:"rtl",overflow:"hidden",boxShadow:`0 30px 90px rgba(10,8,6,0.6), 0 0 0 1px ${C.borderLight}`,border:`2px solid ${C.beige}`}}>
        {mob&&<div style={{display:"flex",justifyContent:"center",padding:"12px 0 0"}}><div style={{width:40,height:5,borderRadius:6,background:C.beige}}/></div>}

        <div style={{padding:"18px 24px",display:"flex",alignItems:"center",gap:14,flexShrink:0,position:"relative",overflow:"hidden",background:`linear-gradient(135deg, ${C.beigeLight}, ${C.white})`}}>
          <div style={{position:"absolute",left:-20,top:-15,opacity:0.08}}><WheatDecor size={150}/></div>
          <BrandLogo size={52}/>
          <div style={{flex:1,zIndex:1}}>
            <div style={{fontSize:16,fontWeight:900,color:C.bronze}}>{isNew?"موظف جديد":form.name||"تعديل"}</div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{isNew?"New Employee":"Edit Record"}</div>
          </div>
          {!isNew&&<Badge status={form.status}/>}
          <button onClick={onClose} style={{background:C.beigeLight,border:`1.5px solid ${C.beige}`,cursor:"pointer",color:C.bronze,width:36,height:36,borderRadius:10,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",fontWeight:"bold"}}>✕</button>
        </div>

        <GoldLine/>

        <div style={{display:"flex",background:C.beigeLight,flexShrink:0,padding:"0 12px"}}>
          {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px 6px",border:"none",cursor:"pointer",background:"transparent",color:tab===t.id?C.bronze:C.textMuted,fontSize:12,fontWeight:tab===t.id?900:600,fontFamily:"'Cairo',sans-serif",borderBottom:tab===t.id?`3px solid ${C.bronze}`:"3px solid transparent",transition:"all 0.25s ease"}}>{t.l}</button>))}
        </div>

        <div style={{flex:1,overflow:"auto",padding:"20px 24px 12px",background:C.white,WebkitOverflowScrolling:"touch"}}>
          {tab==="info"&&(<>
            <label style={lbl}>الاسم الكامل *</label>
            <input style={{...inp,marginBottom:14}} value={form.name} onChange={e=>f("name",e.target.value)} placeholder="أدخل الاسم..."/>
            <label style={lbl}>الجنسية</label>
            <select style={{...inp,marginBottom:14}} value={form.nationality} onChange={e=>f("nationality",e.target.value)}><option value="">اختر</option>{ALL_NAT.map(n=><option key={n}>{n}</option>)}</select>
            <label style={lbl}>الهاتف</label>
            <input style={{...inp,marginBottom:14}} value={form.phone||""} onChange={e=>f("phone",e.target.value)} placeholder="+971 50 000 0000"/>
            <label style={lbl}>ملاحظات</label>
            <textarea style={{...inp,height:70,resize:"none"}} value={form.notes||""} onChange={e=>f("notes",e.target.value)} placeholder="..."/>
          </>)}

          {tab==="work"&&(<>
            <label style={lbl}>المهنة *</label>
            <select style={{...inp,marginBottom:14}} value={form.position} onChange={e=>f("position",e.target.value)}><option value="">اختر</option>{ALL_POS.map(p=><option key={p}>{p}</option>)}</select>
            <label style={lbl}>الفرع</label>
            <select style={{...inp,marginBottom:14}} value={form.workplace} onChange={e=>f("workplace",e.target.value)}><option value="">اختر</option>{ALL_WP.map(w=><option key={w}>{w}</option>)}</select>
            <label style={lbl}>الحالة</label>
            <select style={{...inp,marginBottom:14}} value={form.status} onChange={e=>f("status",e.target.value)}>{ALL_ST.map(s=><option key={s}>{s}</option>)}</select>
            <label style={lbl}>تاريخ الانضمام</label>
            <input type="date" style={inp} value={form.start_date} onChange={e=>f("start_date",e.target.value)}/>
          </>)}

          {tab==="sal"&&(<>
            <div style={{background:`linear-gradient(135deg, ${C.beigeLight}, ${C.white})`,border:`2px solid ${C.beige}`,borderRadius:16,padding:"16px 20px",marginBottom:16,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,textAlign:"center"}}>
              {[["أساسي",form.basic],["بدلات",form.allowance],["إجمالي",(+form.basic||0)+(+form.allowance||0)]].map(([k,v],i)=>(<div key={k} style={i===2?{background:C.bronze,borderRadius:12,padding:"8px 4px"}:{}}><div style={{fontSize:10,color:i===2?C.beigeLight:C.textMuted,textTransform:"uppercase",marginBottom:4,fontWeight:700}}>{k}</div><div style={{fontSize:20,fontWeight:900,color:i===2?C.white:C.bronze}}>{(+v||0).toLocaleString()}</div><div style={{fontSize:10,color:i===2?C.beige:C.textMuted,fontWeight:600}}>درهم</div></div>))}
            </div>
            <label style={lbl}>الراتب الأساسي</label>
            <input type="number" style={{...inp,marginBottom:14}} value={form.basic} onChange={e=>f("basic",+e.target.value)} min="0"/>
            <label style={lbl}>البدلات</label>
            <input type="number" style={inp} value={form.allowance} onChange={e=>f("allowance",+e.target.value)} min="0"/>
          </>)}

          {tab==="docs"&&(<>
            <label style={lbl}>انتهاء الإقامة</label>
            <input type="date" style={{...inp,marginBottom:6,borderColor:isExpired(form.iqama_end)?C.error:isExpSoon(form.iqama_end)?C.warning:C.borderLight}} value={form.iqama_end} onChange={e=>f("iqama_end",e.target.value)}/>
            {isExpired(form.iqama_end)&&<p style={{fontSize:11,color:C.error,margin:"0 0 12px",fontWeight:600}}>⛔ منتهية</p>}
            {isExpSoon(form.iqama_end)&&!isExpired(form.iqama_end)&&<p style={{fontSize:11,color:C.warning,margin:"0 0 12px",fontWeight:600}}>⚠ تنتهي خلال 90 يوم</p>}
            {!isExpired(form.iqama_end)&&!isExpSoon(form.iqama_end)&&<div style={{marginBottom:14}}/>}
            <label style={lbl}>انتهاء جواز السفر</label>
            <input type="date" style={{...inp,borderColor:isExpired(form.passport_end)?C.error:C.borderLight}} value={form.passport_end} onChange={e=>f("passport_end",e.target.value)}/>
          </>)}
        </div>

        <GoldLine/>

        <div style={{padding:"16px 24px",display:"flex",gap:10,flexShrink:0,background:C.beigeLight}}>
          <button onClick={()=>{if(!form.name.trim())return;onSave(form);}} style={{flex:2,padding:"13px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${C.bronze},${C.bronzeLight})`,color:C.white,fontFamily:"'Cairo',sans-serif",fontSize:14,fontWeight:900,cursor:"pointer",boxShadow:`0 6px 20px rgba(153,93,38,0.35)`,letterSpacing:0.3}}>{isNew?"＋ إضافة":"💾 حفظ"}</button>
          {!isNew&&!del&&<button onClick={()=>setDel(true)} style={{flex:1,padding:"13px",borderRadius:12,border:`2px solid ${C.error}`,background:C.white,color:C.error,fontFamily:"'Cairo',sans-serif",fontSize:13,fontWeight:800,cursor:"pointer"}}>🗑</button>}
          {del&&<button onClick={()=>onDelete(form.id)} style={{flex:1,padding:"13px",borderRadius:12,border:"none",background:C.error,color:C.white,fontFamily:"'Cairo',sans-serif",fontSize:12,fontWeight:900,cursor:"pointer"}}>تأكيد ⚠</button>}
          <button onClick={onClose} style={{flex:1,padding:"13px",borderRadius:12,border:`2px solid ${C.borderLight}`,background:C.white,color:C.textMuted,fontFamily:"'Cairo',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const mob = useMob();
  const [tab, setTab] = useState("overview");
  const [emps, setEmps] = useState(EMPLOYEES);
  const [search, setSearch] = useState("");
  const [wpF, setWpF] = useState("الكل");
  const [stF, setStF] = useState("الكل");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg,t="ok") => { setToast({msg,t}); setTimeout(()=>setToast(null),3000); };
  const openAdd  = () => setModal({mode:"add",emp:{...EMPTY,id:Date.now()}});
  const openEdit = e => setModal({mode:"edit",emp:e});
  const saveEmp  = form => {
    if(!form.name.trim()){notify("أدخل الاسم","err");return;}
    if(modal.mode==="add") setEmps(p=>[{...form,id:Date.now()},...p]);
    else setEmps(p=>p.map(e=>e.id===form.id?form:e));
    notify(modal.mode==="add"?"✅ تمت الإضافة":"✅ تم الحفظ");
    setModal(null);
  };
  const delEmp = id => { setEmps(p=>p.filter(e=>e.id!==id)); notify("🗑 تم الحذف"); setModal(null); };

  const filtered = emps.filter(e=>
    (wpF==="الكل"||e.workplace===wpF) &&
    (stF==="الكل"||e.status?.includes(stF.replace("/ مؤقت",""))) &&
    (!search||(e.name?.includes(search)||e.position?.includes(search)))
  );

  const totalSal = emps.reduce((s,e)=>s+(e.total||0),0);
  const exp90 = emps.filter(e=>isExpSoon(e.iqama_end));
  const expiredList = emps.filter(e=>isExpired(e.iqama_end));
  const wpCounts = ALL_WP.map(w=>({name:w,count:emps.filter(e=>e.workplace===w).length})).filter(w=>w.count>0).sort((a,b)=>b.count-a.count);
  const maxWP = Math.max(...wpCounts.map(w=>w.count),1);
  const natC = {}; emps.forEach(e=>{ natC[e.nationality]=(natC[e.nationality]||0)+1; });
  const topNat = Object.entries(natC).sort((a,b)=>b[1]-a[1]).slice(0,6);

  const sInp = { background:C.beigeLight, border:`1.5px solid ${C.beige}`, borderRadius:11, padding:"9px 13px", color:C.bronze, fontSize:13, outline:"none", fontFamily:"'Cairo',sans-serif", appearance:"none", WebkitAppearance:"none", fontWeight:600 };
  const card = { background:C.white, border:`2px solid ${C.beige}`, borderRadius:18, overflow:"hidden", boxShadow:"0 6px 28px rgba(153,93,38,0.12)" };
  const cT = { fontSize:12, fontWeight:900, color:C.bronze, marginBottom:16, textTransform:"uppercase", letterSpacing:0.6, display:"flex", alignItems:"center", gap:10 };

  return (<>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
    <style>{`
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:${C.black};overscroll-behavior:none;-webkit-font-smoothing:antialiased;}
      ::-webkit-scrollbar{width:6px;height:6px;}
      ::-webkit-scrollbar-thumb{background:${C.beige};border-radius:8px;}
      ::-webkit-scrollbar-track{background:${C.beigeLight};}
      input::placeholder,textarea::placeholder{color:${C.textMuted};opacity:0.6;}
      select option{background:${C.white};color:${C.bronze};}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      .fade{animation:fadeUp 0.35s ease forwards;}
      @keyframes bronzeShine{0%{background-position:200%}100%{background-position:-200%}}
      .bronzeText{
        background:linear-gradient(90deg,${C.bronzeDark},${C.bronze},${C.beige},${C.bronze},${C.bronzeDark});
        background-size:300%;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        animation:bronzeShine 5s linear infinite;
      }
      .hov:hover{background:${C.beigeLight}!important;transform:translateY(-1px);}
      .rh:hover{background:${C.beigeLight}!important;}
      .tap{-webkit-tap-highlight-color:transparent;}
      .ch{transition:all 0.25s ease;}
      .ch:hover{
        box-shadow:0 10px 35px rgba(153,93,38,0.2),0 0 0 2px ${C.beige}!important;
        transform:translateY(-3px);
      }
      input:focus, select:focus, textarea:focus{
        border-color:${C.bronze}!important;
        box-shadow:0 0 0 3px rgba(153,93,38,0.1)!important;
      }
    `}</style>

    {toast && <div style={{
      position:"fixed",
      top:mob?undefined:24,
      bottom:mob?90:undefined,
      left:mob?20:undefined,
      right:mob?20:28,
      zIndex:9999,
      background:toast.t==="err"?C.error:`linear-gradient(135deg,${C.bronze},${C.bronzeLight})`,
      color:C.white,
      padding:"13px 20px",
      borderRadius:14,
      fontSize:14,
      fontWeight:800,
      boxShadow:`0 10px 40px rgba(0,0,0,0.3), 0 0 0 2px ${C.beige}`,
      fontFamily:"'Cairo',sans-serif",
      border:`2px solid ${C.beige}`,
      animation:"fadeUp 0.3s ease"
    }}>{toast.msg}</div>}

    {modal && <Modal emp={modal.emp} isNew={modal.mode==="add"} onSave={saveEmp} onDelete={delEmp} onClose={()=>setModal(null)}/>}

    <div style={{
      fontFamily:"'Cairo',sans-serif",
      direction:"rtl",
      background:`linear-gradient(to bottom, ${C.grayDark}, ${C.black})`,
      minHeight:"100vh",
      display:"flex",
      paddingBottom:mob?70:0
    }}>

      {/* SIDEBAR */}
      {!mob && (
        <div style={{
          width:240,
          flexShrink:0,
          background:`linear-gradient(to bottom, ${C.gray}, ${C.grayDark})`,
          display:"flex",
          flexDirection:"column",
          position:"sticky",
          top:0,
          height:"100vh",
          overflow:"auto",
          borderLeft:`2px solid ${C.beige}`,
          boxShadow:`4px 0 24px rgba(0,0,0,0.3)`
        }}>
          <div style={{padding:"24px 18px 20px",position:"relative",overflow:"hidden",background:`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`}}>
            <div style={{position:"absolute",right:-25,top:-10,opacity:0.12}}><WheatDecor size={240} flip/></div>
            <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:14,flexDirection:"column",textAlign:"center"}}>
              <BrandLogo size={70}/>
              <div>
                <div className="bronzeText" style={{fontSize:20,fontWeight:900,color:C.beigeLight}}>الإعتماد</div>
                <div style={{fontSize:10,color:C.beige,letterSpacing:2.5,textTransform:"uppercase",marginTop:3,fontWeight:700}}>AL EATEMAD</div>
              </div>
            </div>
          </div>

          <GoldLine/>

          <div style={{flex:1,padding:"18px 12px",background:`linear-gradient(to bottom, ${C.gray}, ${C.grayDark})`}}>
            <div style={{fontSize:10,color:C.beige,marginBottom:12,marginRight:10,letterSpacing:2.2,textTransform:"uppercase",fontWeight:700,opacity:0.7}}>القائمة</div>
            {NAV.map(n=>(
              <div key={n.id} className="tap hov" onClick={()=>setTab(n.id)} style={{
                display:"flex",
                alignItems:"center",
                gap:12,
                padding:"12px 13px",
                borderRadius:13,
                marginBottom:6,
                cursor:"pointer",
                background:tab===n.id?`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`:"transparent",
                color:tab===n.id?C.white:C.beige,
                border:tab===n.id?`2px solid ${C.beige}`:"2px solid transparent",
                fontWeight:tab===n.id?900:600,
                fontSize:14,
                transition:"all 0.25s ease",
                boxShadow:tab===n.id?`0 4px 16px rgba(153,93,38,0.4)`:""
              }}>
                <span style={{fontSize:16,width:20,textAlign:"center",flexShrink:0}}>{n.icon}</span>
                <span>{n.label}</span>
                {tab===n.id&&<div style={{marginRight:"auto",width:6,height:6,borderRadius:"50%",background:C.white,flexShrink:0,boxShadow:`0 0 8px ${C.white}`}}/>}
              </div>
            ))}
          </div>

          <GoldLine/>

          <div style={{padding:"16px 18px",textAlign:"center",background:C.grayDark}}>
            <div style={{fontSize:10,color:C.beige,letterSpacing:1.2,fontWeight:700,opacity:0.6}}>HR SYSTEM v2.0</div>
            <div style={{fontSize:10,color:C.beige,marginTop:4,opacity:0.5}}>{emps.length} موظف مسجل</div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{flex:1,overflow:"auto",minWidth:0,background:`linear-gradient(to bottom, #f5f5f5, #e8e8e8)`}}>
        {/* HEADER */}
        <div style={{
          background:`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`,
          borderBottom:`3px solid ${C.beige}`,
          padding:mob?"14px 18px":"16px 28px",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          position:"sticky",
          top:0,
          zIndex:50,
          boxShadow:"0 4px 24px rgba(0,0,0,0.2)"
        }}>
          {mob ? (<>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <BrandLogo size={38}/>
              <div>
                <div className="bronzeText" style={{fontSize:15,fontWeight:900,color:C.white}}>الإعتماد</div>
                <div style={{fontSize:10,color:C.beige,fontWeight:600}}>{NAV.find(n=>n.id===tab)?.label}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              {tab==="employees"&&<button className="tap" onClick={openAdd} style={{height:38,padding:"0 14px",borderRadius:10,border:`2px solid ${C.white}`,background:C.white,color:C.bronze,fontFamily:"'Cairo',sans-serif",fontSize:13,fontWeight:900,cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}>＋ إضافة</button>}
            </div>
          </>):(<>
            <div>
              <div style={{fontSize:18,fontWeight:900,color:C.white}}>{NAV.find(n=>n.id===tab)?.label}</div>
              <div style={{fontSize:11,color:C.beige,marginTop:2,fontWeight:600}}>{new Date().toLocaleDateString("ar-AE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{background:"rgba(255,255,255,0.15)",border:`2px solid ${C.beige}`,borderRadius:12,padding:"8px 14px",display:"flex",alignItems:"center",gap:8,backdropFilter:"blur(8px)"}}>
                <span style={{color:C.white,fontSize:14}}>⊕</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..." style={{...sInp,background:"transparent",border:"none",padding:0,width:140,fontSize:13,color:C.white,fontWeight:700}}/>
                {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:C.white,fontSize:15,padding:0,fontWeight:"bold"}}>✕</button>}
              </div>
              {tab==="employees"&&<button className="tap" onClick={openAdd} style={{height:40,padding:"0 18px",borderRadius:12,border:`2px solid ${C.white}`,background:C.white,color:C.bronze,fontFamily:"'Cairo',sans-serif",fontSize:14,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:`0 6px 20px rgba(0,0,0,0.3)`}}><span>＋</span>إضافة</button>}
            </div>
          </>)}
        </div>

        {/* Mobile Search */}
        {mob&&tab==="employees"&&(
          <div style={{padding:"12px 18px",background:C.beigeLight,borderBottom:`2px solid ${C.beige}`}}>
            <div style={{background:C.white,border:`2px solid ${C.beige}`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:C.bronze,fontSize:14}}>⊕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..." style={{...sInp,flex:1,background:"transparent",border:"none",padding:0,fontSize:13}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:C.bronze,fontSize:15,padding:0,fontWeight:"bold"}}>✕</button>}
            </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div style={{padding:mob?"16px":"24px 28px"}} className="fade" key={tab}>

          {/* OVERVIEW */}
          {tab==="overview"&&(<>
            <div style={{
              background:`linear-gradient(135deg,${C.bronze} 0%,${C.bronzeDark} 50%,${C.bronze} 100%)`,
              border:`3px solid ${C.beige}`,
              borderRadius:22,
              padding:mob?"20px":"28px 32px",
              marginBottom:mob?16:20,
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              position:"relative",
              overflow:"hidden",
              boxShadow:"0 8px 32px rgba(153,93,38,0.3)"
            }}>
              <div style={{position:"absolute",right:-30,top:-15,opacity:0.1}}><WheatDecor size={mob?200:280} flip/></div>
              <div style={{position:"absolute",left:-30,top:-15,opacity:0.08}}><WheatDecor size={mob?180:260}/></div>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{fontSize:11,color:C.beige,textTransform:"uppercase",letterSpacing:2.2,marginBottom:6,fontWeight:700}}>نظام الموارد البشرية</div>
                <div className="bronzeText" style={{fontSize:mob?26:38,fontWeight:900,marginBottom:6,color:C.white}}>الإعتماد للملاحم</div>
                <div style={{fontSize:mob?12:14,color:C.beigeLight,fontWeight:600}}>{emps.filter(e=>e.status==="نشط").length} موظف نشط · {ALL_WP.length} فروع</div>
              </div>
              <div style={{position:"relative",zIndex:1,textAlign:"center",flexShrink:0,background:"rgba(255,255,255,0.1)",padding:"16px 20px",borderRadius:16,backdropFilter:"blur(10px)",border:`2px solid ${C.beige}`}}>
                <div style={{fontSize:mob?11:12,color:C.beige,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6,fontWeight:700}}>إجمالي الرواتب</div>
                <div className="bronzeText" style={{fontSize:mob?28:40,fontWeight:900,color:C.white}}>{(totalSal/1000).toFixed(0)}K</div>
                <div style={{fontSize:11,color:C.beigeLight,fontWeight:600}}>درهم / شهر</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?12:16,marginBottom:mob?16:20}}>
              {[
                {icon:"◉",label:"الموظفون",value:emps.length,accent:C.bronze,bg:`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`},
                {icon:"✦",label:"النشطون",value:emps.filter(e=>e.status==="نشط").length,accent:C.success,bg:"linear-gradient(135deg, #22c55e, #16a34a)"},
                {icon:"⚠",label:"إقامات تنتهي",value:exp90.length,accent:C.warning,bg:"linear-gradient(135deg, #f59e0b, #d97706)"},
                {icon:"✕",label:"إقامات منتهية",value:expiredList.length,accent:C.error,bg:"linear-gradient(135deg, #ef4444, #dc2626)"}
              ].map((s,i)=>(
                <div key={i} className="ch" style={{
                  ...card,
                  padding:"18px 20px",
                  background:s.bg,
                  border:`2px solid ${C.beige}`,
                  position:"relative",
                  overflow:"hidden"
                }}>
                  <div style={{position:"absolute",top:-20,left:-15,width:70,height:70,borderRadius:"50%",background:C.white,opacity:0.1,filter:"blur(20px)"}}/>
                  <div style={{fontSize:22,marginBottom:8,color:C.white,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"}}>{s.icon}</div>
                  <div style={{fontSize:28,fontWeight:900,color:C.white}}>{s.value}</div>
                  <div style={{fontSize:10,color:C.beigeLight,marginTop:4,textTransform:"uppercase",letterSpacing:0.6,fontWeight:700}}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"3fr 2fr",gap:mob?16:18,marginBottom:mob?16:18}}>
              <div style={{...card,padding:"20px 24px"}}>
                <div style={cT}><span style={{color:C.bronze,fontSize:18}}>◈</span> توزيع الفروع</div>
                {wpCounts.map(w=>(<div key={w.name} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:C.bronze,fontWeight:700}}>{w.name}</span><span style={{fontSize:13,fontWeight:900,color:C.bronze}}>{w.count}</span></div><div style={{height:8,background:C.beigeLight,borderRadius:6,border:`1px solid ${C.beige}`}}><div style={{height:"100%",borderRadius:6,width:`${w.count/maxWP*100}%`,background:`linear-gradient(to left,${C.bronze},${C.beige})`,transition:"width 0.8s ease",boxShadow:`0 0 10px ${C.bronze}`}}/></div></div>))}
              </div>

              <div style={{...card,padding:"20px 24px"}}>
                <div style={cT}><span style={{fontSize:18}}>◑</span> الحالات</div>
                {[
                  {l:"نشط",c:C.success},
                  {l:"خارجي",c:C.textMuted},
                  {l:"قيد الاجراء",c:C.warning},
                  {l:"نشط/ مؤقت",c:C.info},
                  {l:"بلاغ هروب",c:C.error}
                ].map(s=>{
                  const cnt=emps.filter(e=>e.status?.includes(s.l.replace("/ مؤقت",""))).length;
                  return(<div key={s.l} className="hov" style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    padding:"10px 14px",
                    borderRadius:12,
                    marginBottom:8,
                    background:C.beigeLight,
                    border:`2px solid ${C.beige}`,
                    transition:"all 0.2s ease",
                    cursor:"pointer"
                  }}>
                    <span style={{fontSize:12,color:s.c,fontWeight:700}}>{s.l}</span>
                    <span style={{fontSize:22,fontWeight:900,color:s.c}}>{cnt}</span>
                  </div>);
                })}
              </div>
            </div>

            {exp90.length>0&&(<div style={{...card,padding:"18px 24px",border:`3px solid ${C.warning}`,marginBottom:mob?16:18,background:`linear-gradient(135deg, ${C.beigeLight}, ${C.white})`}}>
              <div style={{...cT,color:C.warning}}>⚠ إقامات تنتهي قريباً ({exp90.length})</div>
              {exp90.slice(0,4).map(e=>(<div key={e.id} className="tap rh" onClick={()=>openEdit(e)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,cursor:"pointer",marginBottom:6,background:C.white,border:`2px solid ${C.beige}`}}><Avatar name={e.name} size={38}/><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:C.bronze}}>{e.name}</div><div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{e.position}</div></div><div style={{fontSize:12,fontWeight:800,color:C.warning,flexShrink:0,direction:"ltr"}}>{e.iqama_end}</div></div>))}
            </div>)}

            <div style={{...card,padding:"20px 24px"}}>
              <div style={cT}><span style={{fontSize:18}}>🌍</span> الجنسيات</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {topNat.map(([nat,cnt])=>(<div key={nat} className="ch" style={{background:C.beigeLight,border:`2px solid ${C.beige}`,borderRadius:14,padding:"14px 10px",textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:C.bronze}}>{cnt}</div><div style={{fontSize:11,color:C.textMuted,marginTop:3,fontWeight:700}}>{nat}</div></div>))}
              </div>
            </div>
          </>)}

          {/* EMPLOYEES */}
          {tab==="employees"&&(<>
            <div style={{...card,padding:"14px 18px",marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",background:C.beigeLight}}>
              <select style={sInp} value={wpF} onChange={e=>setWpF(e.target.value)}>{["الكل",...new Set(emps.map(e=>e.workplace).filter(Boolean))].map(w=><option key={w}>{w}</option>)}</select>
              <select style={sInp} value={stF} onChange={e=>setStF(e.target.value)}>{["الكل",...ALL_ST].map(s=><option key={s}>{s}</option>)}</select>
              <span style={{fontSize:12,color:C.bronze,marginRight:"auto",fontWeight:800}}>{filtered.length} موظف</span>
              {!mob&&<button className="tap" onClick={openAdd} style={{padding:"10px 18px",borderRadius:11,border:`2px solid ${C.bronze}`,background:`linear-gradient(135deg,${C.bronze},${C.bronzeLight})`,color:C.white,fontFamily:"'Cairo',sans-serif",fontSize:13,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:`0 6px 18px rgba(153,93,38,0.3)`}}>＋ إضافة موظف</button>}
            </div>

            {mob?(<div style={{display:"flex",flexDirection:"column",gap:12}}>
              {filtered.map(e=>(<div key={e.id} className="ch" style={{...card,padding:"16px",borderRight:`4px solid ${STATUS[e.status]?.c||C.bronze}`}}><div style={{display:"flex",alignItems:"center",gap:12}}><div onClick={()=>openEdit(e)} style={{cursor:"pointer",flexShrink:0}}><Avatar name={e.name} size={50}/></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:900,color:C.bronze,cursor:"pointer"}} onClick={()=>openEdit(e)}>{e.name}</div><div style={{fontSize:12,color:C.textMuted,marginTop:3,fontWeight:600}}>{e.position}</div><div style={{fontSize:11,color:C.textMuted,marginTop:2}}>🏢 {e.workplace}</div></div><div style={{textAlign:"left",flexShrink:0}}><Badge status={e.status} sm/><div style={{fontSize:14,fontWeight:900,color:C.bronze,marginTop:8,direction:"ltr"}}>{(e.total||0).toLocaleString()} <span style={{fontSize:10}}>د.إ</span></div></div></div><div style={{display:"flex",gap:8,marginTop:12,paddingTop:12,borderTop:`2px solid ${C.beige}`}}><button className="tap hov" onClick={()=>openEdit(e)} style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${C.bronze}`,background:C.beigeLight,color:C.bronze,fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}>✏ تعديل</button><button className="tap" onClick={()=>{if(window.confirm(`حذف ${e.name}؟`))delEmp(e.id);}} style={{padding:"9px 13px",borderRadius:10,border:`2px solid ${C.error}`,background:C.white,color:C.error,fontSize:13,cursor:"pointer",fontWeight:"bold"}}>🗑</button></div></div>))}
            </div>):(<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
              <div className="tap hov" onClick={openAdd} style={{background:C.beigeLight,border:`2.5px dashed ${C.beige}`,borderRadius:18,padding:"24px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,minHeight:170,transition:"all 0.25s ease"}} onMouseEnter={e=>{e.currentTarget.style.background=C.white;e.currentTarget.style.borderColor=C.bronze;e.currentTarget.style.transform="translateY(-4px)";}} onMouseLeave={e=>{e.currentTarget.style.background=C.beigeLight;e.currentTarget.style.borderColor=C.beige;e.currentTarget.style.transform="translateY(0)";}}><div style={{width:52,height:52,borderRadius:14,background:C.bronze,border:`2px solid ${C.beige}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:C.white,fontWeight:"bold",boxShadow:"0 4px 16px rgba(153,93,38,0.3)"}}>＋</div><div style={{fontSize:12,fontWeight:800,color:C.bronze}}>إضافة موظف</div></div>

              {filtered.map(e=>(<div key={e.id} className="ch" style={{...card,padding:"16px",borderTop:`3px solid ${STATUS[e.status]?.c||C.bronze}`}}><div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}><div onClick={()=>openEdit(e)} style={{cursor:"pointer"}}><Avatar name={e.name} size={44}/></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:900,color:C.bronze,lineHeight:1.4,cursor:"pointer"}} onClick={()=>openEdit(e)}>{e.name}</div><div style={{fontSize:11,color:C.textMuted,marginTop:3,fontWeight:600}}>{e.position}</div></div></div><div style={{fontSize:11,color:C.textMuted,marginBottom:12,lineHeight:2,fontWeight:500}}><div>🏢 {e.workplace}</div><div>🌍 {e.nationality}</div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><Badge status={e.status} sm/><span style={{fontSize:14,fontWeight:900,color:C.bronze}}>{(e.total||0).toLocaleString()} <span style={{fontSize:10,fontWeight:700}}>د.إ</span></span></div><div style={{display:"flex",gap:6,paddingTop:10,borderTop:`2px solid ${C.beige}`}}><button className="tap hov" onClick={()=>openEdit(e)} style={{flex:1,padding:"7px",borderRadius:9,border:`2px solid ${C.bronze}`,background:C.beigeLight,color:C.bronze,fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}>✏ تعديل</button><button className="tap" onClick={()=>{if(window.confirm(`حذف ${e.name}؟`))delEmp(e.id);}} style={{padding:"7px 11px",borderRadius:9,border:`2px solid ${C.error}`,background:C.white,color:C.error,fontSize:12,cursor:"pointer",fontWeight:"bold"}}>🗑</button></div></div>))}
            </div>)}
          </>)}

          {/* RESIDENCE */}
          {tab==="residence"&&(<>
            <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?12:16,marginBottom:mob?16:20}}>
              {[
                {icon:"✅",l:"سارية",v:emps.filter(e=>!isExpired(e.iqama_end)&&e.iqama_end).length,a:C.success,bg:"linear-gradient(135deg, #22c55e, #16a34a)"},
                {icon:"⚠",l:"تنتهي 90 يوم",v:exp90.length,a:C.warning,bg:"linear-gradient(135deg, #f59e0b, #d97706)"},
                {icon:"✕",l:"منتهية",v:expiredList.length,a:C.error,bg:"linear-gradient(135deg, #ef4444, #dc2626)"},
                {icon:"◌",l:"إجراء",v:emps.filter(e=>e.status==="قيد الاجراء").length,a:C.info,bg:"linear-gradient(135deg, #3b82f6, #2563eb)"}
              ].map((s,i)=>(
                <div key={i} className="ch" style={{...card,padding:"16px 18px",background:s.bg,border:`2px solid ${C.beige}`}}><div style={{fontSize:20,marginBottom:6,color:C.white}}>{s.icon}</div><div style={{fontSize:24,fontWeight:900,color:C.white}}>{s.v}</div><div style={{fontSize:10,color:C.beigeLight,marginTop:3,textTransform:"uppercase",fontWeight:700}}>{s.l}</div></div>
              ))}
            </div>

            <div style={card}>
              <div style={{padding:"16px 24px",borderBottom:`2px solid ${C.beige}`,background:C.beigeLight}}><div style={cT}><span style={{width:10,height:10,borderRadius:"50%",background:C.bronze,display:"inline-block"}}/>تقرير الإقامات</div></div>
              {emps.map(e=>{const iE=isExpired(e.iqama_end),iS=isExpSoon(e.iqama_end);return(
                <div key={e.id} className="tap rh" onClick={()=>openEdit(e)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 24px",borderBottom:`1px solid ${C.beige}`,cursor:"pointer",transition:"all 0.2s ease"}}><Avatar name={e.name} size={42}/><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:C.bronze}}>{e.name}</div><div style={{fontSize:11,color:C.textMuted,marginTop:2,fontWeight:600}}>{e.position} · {e.workplace}</div></div><div style={{textAlign:"left",flexShrink:0}}><div style={{fontSize:12,fontWeight:800,color:iE?C.error:iS?C.warning:C.success,direction:"ltr"}}>{iE?"⛔":iS?"⚠":"✓"} {e.iqama_end||"—"}</div><div style={{marginTop:4}}><Badge status={e.status} sm/></div></div></div>
              );})}
            </div>
          </>)}

          {/* PAYROLL */}
          {tab==="payroll"&&(<>
            <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?12:16,marginBottom:mob?16:20}}>
              {[
                {icon:"💰",l:"الإجمالي/شهر",v:`${(totalSal/1000).toFixed(0)}K`,a:C.bronze,bg:`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`},
                {icon:"📊",l:"المتوسط",v:Math.round(totalSal/emps.length).toLocaleString(),a:C.beige,bg:"linear-gradient(135deg, #ead395, #d4b876)"},
                {icon:"⬆",l:"أعلى راتب",v:Math.max(...emps.map(e=>e.total||0)).toLocaleString(),a:C.success,bg:"linear-gradient(135deg, #22c55e, #16a34a)"},
                {icon:"⬇",l:"أدنى راتب",v:Math.min(...emps.filter(e=>e.total>0).map(e=>e.total)).toLocaleString(),a:C.info,bg:"linear-gradient(135deg, #3b82f6, #2563eb)"}
              ].map((s,i)=>(
                <div key={i} className="ch" style={{...card,padding:"16px 18px",background:s.bg,border:`2px solid ${C.beige}`}}><div style={{fontSize:20,marginBottom:6,color:C.white}}>{s.icon}</div><div style={{fontSize:24,fontWeight:900,color:C.white}}>{s.v}</div><div style={{fontSize:10,color:C.beigeLight,marginTop:3,textTransform:"uppercase",fontWeight:700}}>{s.l}</div></div>
              ))}
            </div>

            <div style={card}>
              <div style={{padding:"16px 24px",borderBottom:`2px solid ${C.beige}`,background:C.beigeLight}}><div style={cT}><span style={{width:10,height:10,borderRadius:"50%",background:C.bronze,display:"inline-block"}}/>كشف الرواتب</div></div>
              {[...emps].sort((a,b)=>(b.total||0)-(a.total||0)).map(e=>(
                <div key={e.id} className="tap rh" onClick={()=>openEdit(e)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 24px",borderBottom:`1px solid ${C.beige}`,cursor:"pointer",transition:"all 0.2s ease"}}><Avatar name={e.name} size={42}/><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:C.bronze}}>{e.name}</div><div style={{fontSize:11,color:C.textMuted,marginTop:2,fontWeight:600}}>{e.position}</div></div><div style={{textAlign:"left",flexShrink:0}}><div style={{fontSize:18,fontWeight:900,color:C.bronze,direction:"ltr"}}>{(e.total||0).toLocaleString()}</div><div style={{fontSize:10,color:C.textMuted,direction:"ltr",marginTop:2,fontWeight:600}}>أساسي: {(e.basic||0).toLocaleString()}</div></div></div>
              ))}
              <div style={{padding:"16px 24px",background:`linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`,display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:`3px solid ${C.beige}`}}><span style={{fontSize:14,fontWeight:900,color:C.white}}>الإجمالي الشهري</span><span style={{fontSize:22,fontWeight:900,color:C.white}}>{totalSal.toLocaleString()} <span style={{fontSize:13}}>درهم</span></span></div>
            </div>
          </>)}

          {/* WORKPLACES */}
          {tab==="workplaces"&&(
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:16}}>
              {wpCounts.map(w=>{const wE=emps.filter(e=>e.workplace===w.name);const wSal=wE.reduce((s,e)=>s+(e.total||0),0);const nats=[...new Set(wE.map(e=>e.nationality).filter(Boolean))];return(
                <div key={w.name} className="ch" style={{...card,overflow:"hidden"}}>
                  <div style={{background:`linear-gradient(135deg,${C.bronze},${C.bronzeDark})`,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden",borderBottom:`3px solid ${C.beige}`}}>
                    <div style={{position:"absolute",left:-20,opacity:0.1}}><WheatDecor size={130}/></div>
                    <div style={{position:"relative",zIndex:1}}><div style={{fontSize:15,fontWeight:900,color:C.white}}>{w.name}</div><div style={{fontSize:10,color:C.beige,marginTop:3,textTransform:"uppercase",letterSpacing:1.5,fontWeight:700}}>AL EATEMAD</div></div>
                    <div style={{position:"relative",zIndex:1,fontSize:32,fontWeight:900,color:C.white}}>{w.count}</div>
                  </div>
                  <div style={{padding:"16px 24px",background:C.beigeLight}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                      {[["النشطون",wE.filter(e=>e.status==="نشط").length],["الرواتب",`${(wSal/1000).toFixed(0)}K`]].map(([k,v])=>(<div key={k} style={{background:C.white,border:`2px solid ${C.beige}`,borderRadius:12,padding:"10px 14px"}}><div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.6,marginBottom:3,fontWeight:700}}>{k}</div><div style={{fontSize:18,fontWeight:900,color:C.bronze}}>{v}</div></div>))}
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{nats.slice(0,5).map(n=>(<span key={n} style={{fontSize:10,padding:"4px 10px",borderRadius:20,background:C.white,color:C.bronze,border:`2px solid ${C.beige}`,fontWeight:800}}>{n}</span>))}</div>
                  </div>
                </div>
              );})}
            </div>
          )}

        </div>
      </div>
    </div>

    {/* Mobile Bottom Nav */}
    {mob&&(
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:`linear-gradient(to top, ${C.bronze}, ${C.bronzeDark})`,borderTop:`3px solid ${C.beige}`,display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom)",boxShadow:`0 -6px 24px rgba(0,0,0,0.4)`}}>
        {NAV.map(n=>(
          <button key={n.id} className="tap" onClick={()=>setTab(n.id)} style={{flex:1,padding:"10px 6px 9px",border:"none",cursor:"pointer",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontFamily:"'Cairo',sans-serif",transition:"all 0.2s ease"}}>
            <span style={{fontSize:18,color:tab===n.id?C.white:C.beige,opacity:tab===n.id?1:0.5,filter:tab===n.id?`drop-shadow(0 0 6px ${C.white})`:"none",transition:"all 0.2s"}}>{n.icon}</span>
            <span style={{fontSize:10,fontWeight:tab===n.id?900:600,color:tab===n.id?C.white:C.beige,transition:"all 0.2s"}}>{n.label}</span>
            {tab===n.id&&<div style={{width:20,height:3,borderRadius:3,background:C.white,boxShadow:`0 0 8px ${C.white}`}}/>}
          </button>
        ))}
      </div>
    )}
  </>);
}
