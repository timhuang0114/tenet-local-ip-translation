const $ = id => document.getElementById(id);
let config, result = null, approvals = [], busy = false;
let lastCheckTargets = null;
async function api(path, payload) {
  const response = await fetch(path, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if (!response.ok) throw new Error((await response.json()).error);
  return response;
}
function targets(){ return [...document.querySelectorAll('.target')].map(x=>x.value); }
function payload(){ return {sample:$('sample').value,source_text:$('source').value,targets:targets(),approvals}; }
function update(){
  const approved = approvals.filter(Boolean).length;
  const checked = result && JSON.stringify(targets()) === lastCheckTargets;
  $('counts').textContent = `${approved} / ${result?.segments.length||0} segments approved`;
  $('export').disabled = busy || !checked || result.qa_issue_count !== 0 || approved !== result.segments.length;
  for (const id of ['translate','sample','source']) $(id).disabled = busy;
  for (const id of ['terms','check']) $(id).disabled = busy || !result;
}
function reset(){
  result = null; approvals = []; lastCheckTargets = null;
  $('segments').replaceChildren();
  const s=config.samples[$('sample').value];
  $('source').value=s.source_text;
  $('glossary').textContent=s.glossary.map(x=>`${x.source} = ${x.target}`).join(' / ');
  $('notice').textContent=s.notice+(config.mode==='fixture'?' Fixture mode demonstrates workflow only.':' Local inference is enabled.');
  $('status').textContent='Load a synthetic case to begin';update();
}
function render(){
  $('segments').replaceChildren();
  result.segments.forEach((s,i)=>{
    const node=document.createElement('article');node.className='segment';
    const head=document.createElement('div');head.className='segmenthead';head.textContent=`${s.id}   SOURCE / TRANSLATION`;
    const columns=document.createElement('div');columns.className='columns';
    const source=document.createElement('div');source.className='source';source.textContent=s.source;
    const target=document.createElement('textarea');target.className='target';target.value=s.target;target.setAttribute('aria-label',`Translation ${s.id}`);
    const right=document.createElement('div');right.append(target);
    const issues=document.createElement('div');issues.className='issues'+(s.issues.length?'':' clean');
    issues.textContent=s.issues.length?s.issues.map(x=>`${x.rule}: ${x.detail}`).join(' · '):'Selected rule checks passed. Human review required.';right.append(issues);
    const label=document.createElement('label');label.className='review';
    const box=document.createElement('input');box.type='checkbox';box.disabled=s.issues.length>0;box.checked=approvals[i]===s.revision;
    box.addEventListener('change',()=>{approvals[i]=box.checked?s.revision:null;update();});
    const labelText=document.createElement('span');labelText.textContent='I reviewed this source and translation';label.append(box,labelText);right.append(label);
    target.addEventListener('input',()=>{approvals[i]=null;box.checked=false;box.disabled=true;issues.textContent='Text changed. Run quality checks again.';issues.className='issues';$('status').textContent='Unverified revision';update();});
    target.disabled=busy;columns.append(source,right);node.append(head,columns);$('segments').append(node);
  });
  lastCheckTargets=JSON.stringify(targets());
  $('status').textContent=`${result.qa_issue_count} rule warnings · ${result.mode==='fixture'?'Synthetic fixture workflow':'Local OpenVINO run'}`;
  update();
}
async function action(fn){busy=true;update();try{await fn();}catch(e){$('status').textContent=e.message;}finally{busy=false;document.querySelectorAll('.target').forEach(x=>x.disabled=false);update();}}
$('sample').addEventListener('change',reset);
$('source').addEventListener('input',()=>{result=null;approvals=[];lastCheckTargets=null;$('segments').replaceChildren();$('status').textContent='Source changed. Prepare a new draft.';update();});
$('translate').addEventListener('click',()=>action(async()=>{result=await(await api('/api/translate',payload())).json();approvals=result.segments.map(()=>null);render();}));
$('check').addEventListener('click',()=>action(async()=>{const old=approvals.slice();result=await(await api('/api/check',payload())).json();approvals=result.segments.map((s,i)=>old[i]===s.revision?old[i]:null);render();}));
$('terms').addEventListener('click',()=>action(async()=>{
  const glossary=config.samples[$('sample').value].glossary;
  document.querySelectorAll('.target').forEach((node,i)=>{let text=node.value;for(const term of glossary){if(result.segments[i].source.includes(term.source)){for(const alt of term.alternatives)text=text.split(alt).join(term.target);}}if(text!==node.value)approvals[i]=null;node.value=text;});
  result=await(await api('/api/check',payload())).json();render();
}));
$('export').addEventListener('click',()=>action(async()=>{const blob=await(await api('/api/export',payload())).blob();const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='TENET_reviewed_draft.html';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);$('status').textContent='Reviewed draft exported. Filing review remains required.';}));
fetch('/api/status').then(x=>x.json()).then(x=>{config=x;$('mode').textContent=x.mode==='fixture'?'LOCAL WORKFLOW · SYNTHETIC FIXTURES · NO AI INFERENCE':`LOCAL OPENVINO · ${x.device} · ${x.model}`;reset();if(x.mode!=='fixture')$('notice').textContent=config.samples[$('sample').value].notice+' Local inference is enabled.';}).catch(e=>{$('status').textContent=e.message;});
