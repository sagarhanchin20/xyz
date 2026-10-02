import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {
  LayoutDashboard, FolderKanban, Map, Settings, LogOut, Menu, X,
  ChevronDown, ChevronRight, Check, Circle, Sparkles, Plus,
  MoreHorizontal, Pencil, Clock3, Target, Package, ArrowLeft
} from "lucide-react";
import "./styles.css";

const phases = [
  {
    id: 1, name: "Validation", status: "completed", progress: 100,
    objective: "Validate the problem, target users and market opportunity.",
    timeline: "2–3 weeks",
    milestones: [
      ["Define target users", "completed"],
      ["Conduct market research", "completed"],
      ["Validate the problem", "completed"],
      ["Analyze competitors", "completed"]
    ],
    deliverables: ["Market research summary", "Competitor analysis", "Validated problem statement"]
  },
  {
    id: 2, name: "MVP Development", status: "progress", progress: 45,
    objective: "Build and test the minimum viable product with the core functionality.",
    timeline: "8–12 weeks",
    milestones: [
      ["Define MVP scope", "completed"],
      ["Create UI prototype", "progress"],
      ["Develop core functionality", "upcoming"],
      ["Conduct user testing", "upcoming"]
    ],
    deliverables: ["MVP requirements document", "Working prototype", "User testing report"]
  },
  {
    id: 3, name: "Go to Market", status: "upcoming", progress: 0,
    objective: "Launch the product and acquire the first users.",
    timeline: "4–6 weeks",
    milestones: [
      ["Prepare launch", "upcoming"],
      ["Acquire first users", "upcoming"],
      ["Collect feedback", "upcoming"],
      ["Improve product", "upcoming"]
    ],
    deliverables: ["Launch plan", "Marketing assets", "Initial user feedback"]
  },
  {
    id: 4, name: "Growth", status: "upcoming", progress: 0,
    objective: "Scale customer acquisition, retention and product operations.",
    timeline: "3–6 months",
    milestones: [
      ["Increase customer acquisition", "upcoming"],
      ["Improve retention", "upcoming"],
      ["Expand features", "upcoming"],
      ["Optimize operations", "upcoming"]
    ],
    deliverables: ["Growth strategy", "Retention plan", "Operations playbook"]
  },
  {
    id: 5, name: "Long Term", status: "upcoming", progress: 0,
    objective: "Scale the business and explore new markets, products and partnerships.",
    timeline: "6–18 months",
    milestones: [
      ["Expand into new markets", "upcoming"],
      ["Introduce new products", "upcoming"],
      ["Scale operations", "upcoming"],
      ["Explore partnerships", "upcoming"]
    ],
    deliverables: ["Expansion roadmap", "Product strategy", "Partnership plan"]
  }
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [open, setOpen] = useState(2);
  const [mobile, setMobile] = useState(false);
  const [auth, setAuth] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  if (!auth) return <Auth onDone={() => setAuth(true)} />;

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} mobile={mobile} close={() => setMobile(false)} />
      <main className="main">
        <header className="topbar">
          <button className="iconBtn mobileOnly" onClick={() => setMobile(true)}><Menu size={20}/></button>
          <div className="crumb">Workspace <span>/</span> {page === "dashboard" ? "Dashboard" : "Execution Plan"}</div>
          <div className="topActions">
            <button className="userMini"><span>SH</span><b>Sagar</b><ChevronDown size={15}/></button>
          </div>
        </header>

        {page === "dashboard"
          ? <Dashboard onOpen={() => setPage("execution")} />
          : <Execution open={open} setOpen={setOpen} notify={notify} back={() => setPage("dashboard")} />}
        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  );
}

function Auth({onDone}) {
  const [signup, setSignup] = useState(false);
  return (
    <div className="authPage">
      <div className="authVisual">
        <div className="brand"><span className="brandMark">L</span> launchpad</div>
        <div className="visualCopy">
          <p className="eyebrow">AI STARTUP WORKSPACE</p>
          <h1>From startup idea<br/>to <em>execution.</em></h1>
          <p>Build a clear, phase-wise roadmap and turn your validated idea into an actionable plan.</p>
          <div className="miniRoadmap">
            {["Validation","MVP Development","Go to Market","Growth","Long Term"].map((x,i)=>
              <div key={x} className={i===1?"active":""}><span>{i+1}</span>{x}</div>
            )}
          </div>
        </div>
      </div>
      <div className="authCardWrap">
        <div className="authCard">
          <div className="authBrand"><span className="brandMark">L</span></div>
          <h2>{signup ? "Create your account" : "Welcome back"}</h2>
          <p>{signup ? "Start building your execution roadmap." : "Sign in to continue to your workspace."}</p>
          {signup && <label>Full name<input placeholder="Sagar Hanchinal"/></label>}
          <label>Email<input type="email" placeholder="you@example.com"/></label>
          <label>Password<input type="password" placeholder="••••••••"/></label>
          {signup && <label>Confirm password<input type="password" placeholder="••••••••"/></label>}
          {!signup && <div className="forgot"><label className="check"><input type="checkbox"/> Remember me</label><button>Forgot password?</button></div>}
          <button className="primary full" onClick={onDone}>{signup ? "Create account" : "Sign in"}</button>
          <div className="or"><span/>or<span/></div>
          <button className="google">G&nbsp;&nbsp; Continue with Google</button>
          <p className="switch">{signup ? "Already have an account?" : "Don't have an account?"} <button onClick={()=>setSignup(!signup)}>{signup ? "Sign in" : "Sign up"}</button></p>
        </div>
      </div>
    </div>
  );
}

function Sidebar({page,setPage,mobile,close}) {
  return <aside className={"sidebar "+(mobile?"show":"")}>
    <div className="sideTop">
      <div className="brand"><span className="brandMark">L</span> launchpad</div>
      <button className="iconBtn mobileOnly" onClick={close}><X size={20}/></button>
    </div>
    <nav>
      <p className="navLabel">WORKSPACE</p>
      <Nav icon={<LayoutDashboard/>} text="Dashboard" active={page==="dashboard"} onClick={()=>{setPage("dashboard");close()}}/>
      <Nav icon={<FolderKanban/>} text="My Projects" onClick={()=>{setPage("dashboard");close()}}/>
      <Nav icon={<Map/>} text="Execution Plans" active={page==="execution"} onClick={()=>{setPage("execution");close()}}/>
      <p className="navLabel settingsLabel">ACCOUNT</p>
      <Nav icon={<Settings/>} text="Settings" onClick={()=>close()}/>
    </nav>
    <div className="sideBottom">
      <div className="profile"><div className="avatar">SH</div><div><b>Sagar</b><small>sagar@example.com</small></div><MoreHorizontal size={17}/></div>
      <button className="logout" onClick={()=>window.location.reload()}><LogOut size={17}/> Log out</button>
    </div>
  </aside>
}
function Nav({icon,text,active,onClick}) {
  return <button className={"navItem "+(active?"active":"")} onClick={onClick}>{React.cloneElement(icon,{size:18})}<span>{text}</span>{text==="Execution Plans"&&<span className="navDot"/>}</button>
}

function Dashboard({onOpen}) {
  return <section className="content dashboard">
    <div className="pageHead">
      <div><p className="eyebrow">WORKSPACE</p><h1>Your startup projects</h1><p>View and manage your execution plans.</p></div>
      <button className="primary"><Plus size={18}/> New project</button>
    </div>
    <div className="projectGrid">
      <div className="projectCard">
        <div className="projectTop"><div className="projectIcon">LH</div><button className="iconBtn"><MoreHorizontal/></button></div>
        <h3>Local Home Services Platform</h3>
        <p>Connecting customers with trusted local service providers.</p>
        <div className="projectMeta"><span>Execution Plan</span><span>5 phases</span></div>
        <div className="progressLine"><span style={{width:"42%"}}/></div>
        <div className="projectFoot"><div><small>Current phase</small><b>Phase 2 · MVP Development</b></div><button className="outline" onClick={onOpen}>View plan <ChevronRight size={16}/></button></div>
      </div>
      <div className="emptyCard"><div className="emptyIcon"><Plus/></div><h3>Create another project</h3><p>Start a new startup execution plan.</p><button className="outline"><Plus size={16}/> New project</button></div>
    </div>
  </section>
}

function Execution({open,setOpen,notify,back}) {
  return <section className="content execution">
    <button className="back" onClick={back}><ArrowLeft size={16}/> All projects</button>
    <div className="pageHead executionHead">
      <div><p className="eyebrow">EXECUTION PLAN</p><h1>Phase-wise execution plan</h1><p>A structured roadmap from validation to long-term growth.</p></div>
      <div className="headButtons"><button className="outline" onClick={()=>notify("Edit mode opened") }><Pencil size={16}/> Edit plan</button><button className="primary" onClick={()=>notify("AI is improving your roadmap…")}><Sparkles size={16}/> Improve with AI</button></div>
    </div>

    <div className="projectBanner">
      <div><div className="projectTitle"><span className="projectIcon small">LH</span><div><b>Local Home Services Platform</b><span>AI-generated roadmap</span></div></div></div>
      <div className="bannerStats"><div><small>STATUS</small><b><i className="statusDot"/> In progress</b></div><div><small>OVERALL PROGRESS</small><b>42%</b></div><div className="bannerProgress"><span style={{width:"42%"}}/></div></div>
    </div>

    <div className="roadmap">
      {phases.map((p,i)=><Phase key={p.id} p={p} open={open===p.id} setOpen={setOpen} last={i===phases.length-1}/>)}
    </div>
    <div className="aiNote"><Sparkles size={17}/><div><b>AI-generated roadmap</b><span>This plan was created from your validated startup analysis. You can edit any phase as your strategy evolves.</span></div><button className="textBtn" onClick={()=>notify("Regenerating roadmap…")}>Regenerate</button></div>
  </section>
}

function Phase({p,open,setOpen,last}) {
  return <div className="phaseWrap">
    <div className={"timelineDot "+p.status}>{p.status==="completed"?<Check size={14}/>:p.status==="progress"?<span/>:<Circle size={10}/>}</div>
    {!last && <div className="timelineLine"/>}
    <article className={"phaseCard "+(open?"expanded":"")}>
      <button className="phaseHeader" onClick={()=>setOpen(open?null:p.id)}>
        <div className="phaseTitle"><span className="phaseNum">0{p.id}</span><div><div className="phaseName">{p.name}</div><span className="objective">{p.objective}</span></div></div>
        <div className="phaseRight"><Status status={p.status}/><span className="chev">{open?<ChevronDown/>:<ChevronRight/>}</span></div>
      </button>
      {open && <div className="phaseBody">
        <div className="phaseInfo">
          <div className="infoBlock"><Target size={17}/><div><small>OBJECTIVE</small><p>{p.objective}</p></div></div>
          <div className="infoBlock"><Clock3 size={17}/><div><small>TIMELINE</small><p>{p.timeline}</p></div></div>
          <div className="infoBlock"><Package size={17}/><div><small>PROGRESS</small><p>{p.progress}% complete</p><div className="tinyProgress"><span style={{width:p.progress+"%"}}/></div></div></div>
        </div>
        <div className="phaseColumns">
          <div><h4>Milestones</h4><div className="milestones">{p.milestones.map(([name,s],i)=><div className="milestone" key={name}><span className={"milestoneIcon "+s}>{s==="completed"?<Check size={13}/>:s==="progress"?<span/>:<Circle size={9}/>}</span><span>{name}</span>{s==="progress"&&<em>In progress</em>}</div>)}</div></div>
          <div><h4>Deliverables</h4><ul>{p.deliverables.map(d=><li key={d}>{d}</li>)}</ul></div>
        </div>
      </div>}
    </article>
  </div>
}

function Status({status}) {
  const map={completed:["Completed","green"],progress:["In progress","blue"],upcoming:["Upcoming","gray"]};
  const [t,c]=map[status]; return <span className={"badge "+c}>{status==="completed"?<Check size={12}/>:status==="progress"?<span className="pulse"/>:null}{t}</span>
}

createRoot(document.getElementById("root")).render(<App/>);
