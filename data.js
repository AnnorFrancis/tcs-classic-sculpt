export const services = [
 {id:'style',name:'Hair styling',category:'Hair',price:250,minutes:90,description:'A fresh finish, with your own point of view.'},
 {id:'wash',name:'Keracare shampooing',category:'Hair',price:150,minutes:60,description:'A little care for your hair and scalp.'},
 {id:'relax',name:'Affirm relaxing service',category:'Hair',price:300,minutes:75,description:'Consult with the salon about your hair needs.'},
 {id:'braids',name:'Braids take out',category:'Hair',price:50,minutes:30,description:'Gentle removal before your next chapter.'},
 {id:'lashes',name:'Wispy / wet look add-on',category:'Beauty',price:100,minutes:25,description:'A finishing detail for your lash appointment.'},
 {id:'nails',name:'Luxury manicure',category:'Beauty',price:170,minutes:60,description:'Discuss your shape, colour and finish.'},
 {id:'makeup',name:'Soft glam makeup',category:'Beauty',price:300,minutes:90,description:'Your look, from soft definition to occasion-ready.'},
 {id:'facial',name:'Classic facial',category:'Wellness',price:450,minutes:60,description:'Find the right skin ritual with the salon.'},
 {id:'massage',name:'Deep tissue massage',category:'Wellness',price:550,minutes:75,description:'Make space for a slower moment.'},
 {id:'wax',name:'Full arm waxing',category:'Wellness',price:250,minutes:45,description:'Enquire about treatment areas and options.'}
];
export const money=n=>'GH₵ '+Number(n).toLocaleString('en-GH',{maximumFractionDigits:0});
export const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Accra',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateTime(date,time,minutes){if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time))throw new Error('Choose a valid date and time.');if(date<today())throw new Error('Please choose today or a future date.');const day=new Date(date+'T12:00:00Z').getUTCDay(),start=Number(time.slice(0,2))*60+Number(time.slice(3)),open=day===0?780:480,close=day===0||day===3?1080:1140;if(!Number.isFinite(day)||start<open||start+minutes>close)throw new Error(`Choose a time within salon hours (${day===0?'13:00':'08:00'}–${close===1080?'18:00':'19:00'}) that allows the full service.`);}
const key='tcs-studio-demo-v1';
export function seed(){const date=today();return {appointments:[
 {id:'TCS-1001',name:'Akua Mensah',phone:'Demo contact',service:'style',staff:'Rita',date,time:'09:00',status:'Completed',price:250,notes:'Soft waves. Demo client.',paid:true,payment:'Mobile Money'},
 {id:'TCS-1002',name:'Nana Asante',phone:'Demo contact',service:'nails',staff:'Beauty artist',date,time:'10:00',status:'In service',price:220,notes:'Neutral palette. Demo client.',paid:false},
 {id:'TCS-1003',name:'Efua Osei',phone:'Demo contact',service:'wash',staff:'Rita',date,time:'11:00',status:'Confirmed',price:150,notes:'Demo client.',paid:false},
 {id:'TCS-1004',name:'Ama Boateng',phone:'Demo contact',service:'facial',staff:'Beauty artist',date,time:'13:30',status:'Confirmed',price:350,notes:'Demo client.',paid:false},
 {id:'TCS-1005',name:'Abena Owusu',phone:'Demo contact',service:'style',staff:'Rita',date,time:'15:00',status:'Requested',price:250,notes:'Demo client.',paid:false},
 {id:'TCS-1006',name:'Adwoa Arthur',phone:'Demo contact',service:'lashes',staff:'Beauty artist',date,time:'16:30',status:'Confirmed',price:100,notes:'Demo client.',paid:false}],
 clients:[{id:'C1',name:'Akua Mensah',phone:'Demo contact',note:'Prefers morning appointments.'},{id:'C2',name:'Nana Asante',phone:'Demo contact',note:'Neutral nail colours.'},{id:'C3',name:'Efua Osei',phone:'Demo contact',note:'Regular hair care.'},{id:'C4',name:'Ama Boateng',phone:'Demo contact',note:'Weekend preferences.'},{id:'C5',name:'Abena Owusu',phone:'Demo contact',note:'Occasion styling.'},{id:'C6',name:'Adwoa Arthur',phone:'Demo contact',note:'Natural finish.'}],
 inventory:[{id:'I1',name:'Hydrating shampoo',category:'Hair care',stock:12,threshold:5,cost:85},{id:'I2',name:'Conditioning treatment',category:'Hair care',stock:4,threshold:5,cost:120},{id:'I3',name:'Gel polish · Soft rose',category:'Nails',stock:8,threshold:3,cost:65},{id:'I4',name:'Lash trays · Mixed',category:'Lashes',stock:3,threshold:4,cost:150},{id:'I5',name:'Facial cleanser',category:'Skin care',stock:9,threshold:3,cost:95}],settings:{salon:'The Classic Sculpt',currency:'GHS',reminders:false},activity:[]};}
export function load(){try{let d=JSON.parse(localStorage.getItem(key));if(d&&Array.isArray(d.appointments)&&Array.isArray(d.clients)&&Array.isArray(d.inventory))return d;}catch{}return seed();}
export function save(d){try{localStorage.setItem(key,JSON.stringify(d));window.dispatchEvent(new Event('tcs-update'));return true;}catch{throw new Error('Browser storage is unavailable. Enable local storage to save this demo.');}}
export function reset(){save(seed());}
export function addBooking(a){const d=load();const s=services.find(x=>x.id===a.service);if(!s)throw new Error('Please select a service.');validateTime(a.date,a.time,s.minutes);const start=t=>Number(t.slice(0,2))*60+Number(t.slice(3));let staff=a.staff||'Rita';if(d.appointments.some(x=>x.date===a.date&&x.staff===staff&&x.status!=='Cancelled'&&start(a.time)<start(x.time)+(services.find(s=>s.id===x.service)?.minutes||60)&&start(a.time)+s.minutes>start(x.time)))throw new Error('That demo time overlaps another appointment. Please choose another time or artist.');const entry={...a,staff,id:'TCS-'+Date.now().toString().slice(-7),status:'Requested',price:s.price,paid:false};d.appointments.push(entry);if(!d.clients.some(c=>c.name.toLowerCase()===a.name.toLowerCase()))d.clients.push({id:'C'+Date.now(),name:a.name,phone:a.phone||'Not provided',note:a.notes||''});save(d);return entry;}
